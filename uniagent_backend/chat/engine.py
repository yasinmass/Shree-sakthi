"""
chat/engine.py

Core AI processing pipeline using Ollama.
"""

import json
import requests
from agents.models import Agent
from chat.tool_registry import TOOL_REGISTRY, TOOL_DECLARATIONS
from chat.memory import get_memory, save_memory

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_MODEL = "mistral:7b"

def process_chat(agent_id, message, session_id, user_role='Student'):
    try:
        agent = Agent.objects.get(id=agent_id)
        domain = agent.domain
        
        history = get_memory(session_id)
        raw_tool_decls = TOOL_DECLARATIONS.get(domain, [])
        raw_tool_funcs = TOOL_REGISTRY.get(domain, {})
        
        # --- Role-Based Tool Restrictions ---
        allowed_tools = None
        if user_role == 'Student':
            allowed_tools = ['get_student_attendance']
        elif user_role == 'Faculty':
            allowed_tools = [
                # student tools
                'get_students', 'enroll_student', 'update_student', 'delete_student',
                # exam tools
                'get_top_students', 'record_marks', 'schedule_exam',
                # attendance tools
                'get_low_attendance', 'mark_attendance', 'get_student_attendance'
            ]
        # HOD / Admin have allowed_tools = None (unrestricted)
        
        tool_decls = []
        for td in raw_tool_decls:
            if allowed_tools is None or td['name'] in allowed_tools:
                tool_decls.append(td)
                
        tool_funcs = {}
        for tname, func in raw_tool_funcs.items():
            if allowed_tools is None or tname in allowed_tools:
                tool_funcs[tname] = func

        if not tool_decls:
            tool_list = "\n(No tools are authorized for your current role in this domain)"
        else:
            tool_list = "\n".join([
                f"- {t.get('name', 'unknown')}: {t.get('description', '')}"
                for t in tool_decls
            ])

        system_prompt = f"""{agent.system_prompt}

You are an AI data retrieval agent. DO NOT answer data questions from your own knowledge. YOU MUST USE TOOLS to fetch real data from the database.

Available tools for domain '{domain}':
{tool_list}

INSTRUCTIONS:
1. If the user asks for data (e.g. "show faculty", "get attendance"), YOU MUST call the appropriate tool.
2. ALWAYS return EXACTLY ONE valid JSON object. No lists, no extra text.
3. To call a tool, use exactly this format:
{{
  "action": "tool_name",
  "params": {{"param1": "value1"}}
}}
4. Only if the user says a casual greeting (like "hello"), use this format:
{{
  "action": "text",
  "params": {{}},
  "message": "Hello! I can help you fetch data."
}}

CRITICAL: Do NOT hallucinate data. Do NOT return an array of JSON objects. Choose ONE tool and return ONE tool-call JSON."""

        messages = [{"role": "system", "content": system_prompt}]

        for h in history:
            if isinstance(h, dict) and "role" in h and "content" in h:
                if isinstance(h["content"], str):
                    messages.append({"role": h["role"], "content": h["content"]})

        messages.append({"role": "user", "content": message})

        print(f"[DEBUG] Sending {len(messages)} messages to Ollama")

        response = requests.post(OLLAMA_URL, json={
            "model": OLLAMA_MODEL,
            "messages": messages,
            "stream": False,
            "format": "json",
            "options": {
                "temperature": 0.0
            }
        }, timeout=60)

        response.raise_for_status()
        raw = response.json()["message"]["content"].strip()
        print(f"[ENGINE] Raw model output: {raw}")

        # Strip markdown code blocks if model added them
        if "```" in raw:
            raw = raw.split("```")[1]
            if raw.lower().startswith("json"):
                raw = raw[4:]
        raw = raw.strip()

        try:
            parsed = json.loads(raw)
            
            # If Ollama hallucinates a list of JSONs, grab the first one
            if isinstance(parsed, list):
                if len(parsed) > 0:
                    parsed = parsed[0]
                else:
                    parsed = {}

            action = parsed.get("action", "text")
            params = parsed.get("params", {})
            
            if action != "text" and action in tool_funcs:
                print(f"[ENGINE] Calling: {action}({params})")
                try:
                    result = tool_funcs[action](**params)
                    data = result if isinstance(result, list) else [result]
                    save_memory(session_id, message, f"Called {action} returning data.")
                    return {
                        "message": "Here are the results.",
                        "data": data,
                        "reasoning": f"Called {action} with {params}",
                        "action_taken": action,
                        "agent_name": agent.name,
                        "session_id": session_id
                    }
                except Exception as e:
                    return {
                        "message": f"Tool execution error: {str(e)}",
                        "data": [],
                        "reasoning": str(e),
                        "action_taken": "error",
                        "agent_name": agent.name,
                        "session_id": session_id
                    }
            
            # Action text or unknown action
            text_response = parsed.get("message", raw)
            save_memory(session_id, message, text_response)
            return {
                "message": text_response,
                "data": [],
                "reasoning": "Text response",
                "action_taken": "text_response",
                "agent_name": agent.name,
                "session_id": session_id
            }

        except json.JSONDecodeError as e:
            print(f"[ENGINE] JSON parse failed: {e} | Raw: {raw}")
            save_memory(session_id, message, raw)
            return {
                "message": raw,
                "data": [],
                "reasoning": "Model returned text instead of JSON",
                "action_taken": "text_response",
                "agent_name": agent.name,
                "session_id": session_id
            }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "message": f"Error: {str(e)}",
            "data": [],
            "reasoning": str(e),
            "action_taken": "error",
            "agent_name": "Unknown",
            "session_id": session_id
        }