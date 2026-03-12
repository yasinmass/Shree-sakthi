# UniAgent 🎓

A college ERP AI Agent system combining a **Django backend** with a **React + Vite frontend**.

> Built for a hackathon project (Shree-sakthi team)

## Project Structure

```
UniAgent/
├── uniagent_backend/     # Django REST API backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/           # Django settings & URLs
│   ├── agents/           # AI agent models & views
│   ├── chat/             # Chat engine & memory
│   ├── college/          # College data models
│   ├── tools/            # Analytics, course, student tools
│   └── seed/             # Seed data scripts
│
└── frontend (root)       # React + Vite frontend
    ├── src/
    │   ├── api/          # Axios config
    │   ├── components/   # Reusable UI components
    │   └── pages/        # Dashboard, Chat, Login pages
    ├── public/
    ├── package.json
    └── vite.config.js
```

## Getting Started

### Backend
```bash
cd uniagent_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### Frontend
```bash
npm install
npm run dev
```
