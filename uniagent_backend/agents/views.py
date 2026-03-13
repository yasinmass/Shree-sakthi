import json
import re
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Agent
from .serializers import AgentSerializer, AgentCreateRequestSerializer

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_MODEL = "mistral:7b"

class AgentListView(APIView):
    """GET /api/agents/ — list all agents."""

    def get(self, request):
        email = request.query_params.get('email', None)
        if email:
            agents = Agent.objects.filter(owner_email=email)
        else:
            agents = Agent.objects.all()
        serializer = AgentSerializer(agents, many=True)
        return Response(serializer.data)


class AgentCreateView(APIView):
    """POST /api/agents/create/ — auto-generate an agent from a purpose string."""

    def post(self, request):
        req_ser = AgentCreateRequestSerializer(data=request.data)
        if not req_ser.is_valid():
            return Response(req_ser.errors, status=status.HTTP_400_BAD_REQUEST)

        purpose = req_ser.validated_data['purpose']
        owner_email = req_ser.validated_data['owner_email']
        role_label = req_ser.validated_data['role']

        allowed_domains = {
            'Student': ['student', 'course'],
            'Faculty': ['student', 'attendance', 'exam', 'course'],
            'HOD': ['student', 'faculty', 'attendance', 'exam', 'course', 'analytics'],
            'Admin': ['student', 'faculty', 'attendance', 'exam', 'course', 'analytics']
        }.get(role_label, ['student'])
        
        domain_string = " | ".join(allowed_domains)

        # --- Ask Ollama to generate the agent definition or reject if out-of-bounds ---
        prompt = f"""You are configuring an AI agent for a user with the '{role_label}' role.

The user wants to create an agent with this purpose:
"{purpose}"

IMPORTANT AUTHORIZATION RULES:
A user with the '{role_label}' role is ONLY permitted to create agents for these domains: {domain_string}.
If the user's purpose clearly involves tasks outside their allowed domains (e.g. if a Student asks to manage faculty, exams, grading, or admin records), they are NOT authorized.

If the purpose is UNAUTHORIZED for their role, you MUST reject it by returning exactly this JSON:
{{
  "error": "You do not have permission to create an agent for this purpose."
}}

If the purpose is AUTHORIZED, return a valid JSON object describing the agent:
{{
  "name": "short agent name (3-5 words)",
  "description": "one line description of what this agent does",
  "domain": "one of: {domain_string}",
  "system_prompt": "detailed system instructions (3-5 sentences) telling the agent to stay strictly within its domain and not answer off-topic questions"
}}
"""

        try:
            messages = [{"role": "user", "content": prompt}]
            
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

            # Strip markdown fences if model adds them anyway
            raw = re.sub(r'^```json\s*', '', raw)
            raw = re.sub(r'^```\s*', '', raw)
            raw = re.sub(r'\s*```$', '', raw)

            if "{" in raw and "}" in raw:
                raw = "{" + raw.split("{", 1)[1].rsplit("}", 1)[0] + "}"

            data = json.loads(raw)
            
            # If Ollama decided to reject the request based on RBAC restrictions
            if 'error' in data:
                return Response({'error': data['error']}, status=status.HTTP_403_FORBIDDEN)
                
        except json.JSONDecodeError as e:
            return Response(
                {'error': 'LLM returned invalid JSON', 'raw': raw, 'detail': str(e)},
                status=status.HTTP_502_BAD_GATEWAY,
            )
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        # Validate domain is one of the allowed values for their role
        if data.get('domain') not in allowed_domains:
            data['domain'] = allowed_domains[0]  # safe fallback for this user's power level

        agent = Agent.objects.create(
            name=data.get('name', 'Unnamed Agent'),
            description=data.get('description', ''),
            domain=data['domain'],
            system_prompt=data.get('system_prompt', ''),
            owner_email=owner_email,
        )

        return Response(AgentSerializer(agent).data, status=status.HTTP_201_CREATED)


class AgentDeleteView(APIView):
    """DELETE /api/agents/{id}/ — remove an agent."""

    def delete(self, request, pk):
        try:
            agent = Agent.objects.get(pk=pk)
        except Agent.DoesNotExist:
            return Response({'error': 'Agent not found'}, status=status.HTTP_404_NOT_FOUND)

        agent.delete()
        return Response({'message': f'Agent {pk} deleted successfully.'}, status=status.HTTP_200_OK)
