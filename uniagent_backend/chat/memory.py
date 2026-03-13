"""
chat/memory.py

Stores conversation history per session_id.
"""

_memory_store = {}

def get_memory(session_id: str) -> list:
    """Return the memory for a given session, empty list if not found."""
    return _memory_store.get(session_id, [])

def save_memory(session_id: str, user_message: str, agent_message: str):
    """
    Append user message and agent response to memory for the session.
    Keep only the last 20 messages (10 pairs) to avoid context overflow.
    """
    if not isinstance(user_message, str):
        user_message = str(user_message) if user_message is not None else ""
    if not isinstance(agent_message, str):
        agent_message = str(agent_message) if agent_message is not None else ""

    history = _memory_store.get(session_id, [])
    
    # Append user message
    if user_message:
        history.append({
            "role": "user",
            "content": user_message
        })
    
    # Append assistant message
    if agent_message:
        history.append({
            "role": "assistant",
            "content": agent_message
        })
    
    # Keep only the last 20 messages (10 pairs)
    _memory_store[session_id] = history[-20:]
