# 🎓 UniAgent

> AI Agent Platform for University Management

<p align="center">
  <img src="https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Mistral_7B-Ollama-FF7000?style=for-the-badge&logo=ollama&logoColor=white" />
  <img src="https://img.shields.io/badge/LangChain-Memory-1C3C3C?style=for-the-badge" />
</p>

---

## What is UniAgent?

UniAgent is **not a chatbot**. Admins type a purpose → AI generates a custom agent → agent performs **real database actions** using natural language.

```
Admin types:  "manage student attendance"
                        ↓
Agent created — understands natural language
                        ↓
User asks:    "show students below 75% attendance"
                        ↓
Mistral 7B (Ollama) calls get_low_attendance(threshold=75)
                        ↓
PostgreSQL returns real student records ✅
```

> 🔒 **100% Local** — Mistral 7B runs on your own machine via Ollama. No API keys. No data sent to the cloud.

---

## 6 Agents

| Agent | Domain | Key Actions |
|-------|--------|-------------|
| 👨‍🎓 Student Manager | `student` | Enroll, search, update, delete |
| 📅 Attendance Tracker | `attendance` | Track, flag low, mark present |
| 👨‍🏫 Faculty Manager | `faculty` | Add faculty, assign subjects |
| 📝 Exam Agent | `exam` | Schedule exams, record marks |
| 📚 Course Manager | `course` | Create, list courses |
| 📊 Analytics Agent | `analytics` | Pass stats, dept performance |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + TailwindCSS |
| Backend | Django 4.2 + Django REST Framework |
| Database | PostgreSQL |
| AI Model | Mistral 7B (via Ollama — runs locally) |
| Memory | LangChain Conversation Memory |

---

## Quick Start

### Prerequisites

```bash
# Install Ollama
# Download from: https://ollama.com

# Pull Mistral 7B model
ollama pull mistral

# Verify it runs
ollama run mistral "hello"
```

### Run the Project

```bash
# 1. Clone
git clone https://github.com/yourusername/uniagent.git
cd uniagent

# 2. Backend
cd uniagent_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# 3. Configure .env
DB_NAME=uniagent_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral

# 4. Database
python manage.py migrate
python seed/seed_data.py

# 5. Start Ollama (keep running)
ollama serve

# 6. Run backend (new terminal)
python manage.py runserver 127.0.0.1:8000

# 7. Run frontend (new terminal)
npm install
npm run dev
```

Open → `http://localhost:3000`

---

## API

```http
GET  /api/agents/           → list all agents
POST /api/agents/create/    → create agent from purpose
POST /api/chat/             → chat with an agent
```

```json
// Chat Request
{
  "agent_id": 1,
  "message": "show all CSE students",
  "session_id": "abc123"
}

// Chat Response
{
  "message": "Found 17 students.",
  "data": [{ "name": "Rahul", "dept": "CSE" }],
  "reasoning": "Called get_students(dept=CSE)",
  "action_taken": "get_students",
  "agent_name": "Student Manager"
}
```

---

## How Tool Calling Works

Mistral 7B runs locally via Ollama. It reads the user message, understands the **intent**, picks the right database function and executes it — no keyword matching, no cloud dependency.

```
User:    "who has poor attendance in ECE?"
Mistral: understands → low attendance + ECE dept
         calls → get_low_attendance(dept="ECE", threshold=75)
Result:  real PostgreSQL rows returned ✅
```

---

## Why Local LLM?

```
✅ No API key needed
✅ No cost per request
✅ Student data never leaves the server
✅ Works offline
✅ Full data privacy for institutions
```

---

## Team

| Name | Role |
|------|------|
| Mohammed Yasin A | AI Architect · Backend · System Design |
| Keerthivarman | Backend · AI Engine · PostgreSQL |
| Yogesh | Frontend · React · UI/UX |
| Vaishnav | Frontend · Research and Development | 

---

## Built For

**Responsive Hackathon 2026**  
*PS: Actionable AI Agents for College / University Management*

---

<p align="center"><i>Every university. Every workflow. One platform.</i></p>
