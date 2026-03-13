import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Agent API ──────────────────────────────────────────────────────────────

/** GET /api/agents/ — fetch all agents */
export const getAgents = (email) => api.get('/agents/', { params: { email } });

/** POST /api/agents/create/ — generate a new agent from a purpose string */
export const createAgent = (purpose, owner_email, role) => api.post('/agents/create/', { purpose, owner_email, role });

/** DELETE /api/agents/{id}/ — delete an agent by id */
export const deleteAgent = (id) => api.delete(`/agents/${id}/`);

// ── Chat API ───────────────────────────────────────────────────────────────

/** POST /api/chat/ — send a chat message to an agent */
export const sendChat = (agent_id, message, session_id, role) =>
  api.post('/chat/', { agent_id, message, session_id, role });

// ── Auth API ───────────────────────────────────────────────────────────────

export const signupUser = (name, email, password, role) => 
  api.post('/auth/signup/', { name, email, password, role });

export const loginUser = (email, password) => 
  api.post('/auth/login/', { email, password });

export default api;
