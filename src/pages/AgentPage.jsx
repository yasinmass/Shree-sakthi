import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import { ArrowLeft, Bot, Info, Shield } from 'lucide-react';

const AgentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Helper to determine role from URL/ID (for demo purposes)
  const getRoleFromContext = () => {
    if (id.startsWith('student')) return 'Student';
    if (id.startsWith('faculty')) return 'Faculty';
    if (id.startsWith('hod')) return 'HOD';
    return 'Admin';
  };

  const role = getRoleFromContext();

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar role={role} />
      
      <main className="flex-1 ml-64 p-10 flex flex-col h-screen">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-white hover:bg-card transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white uppercase tracking-tight">
                  {id.split('-').join(' ')}
                </h1>
                <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white tracking-widest uppercase">
                  ACTIVE
                </span>
              </div>
              <p className="text-gray-500 text-sm">AI Agent Instance #{Math.floor(Math.random() * 9000) + 1000}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="p-3 bg-secondary/30 border border-border rounded-xl text-gray-400 hover:text-white transition-colors cursor-help">
              <Info size={18} />
            </div>
            <div className="p-3 bg-secondary/30 border border-border rounded-xl text-gray-400 hover:text-white transition-colors cursor-help">
              <Shield size={18} />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ChatInterface agentId={id} />
        </div>
      </main>
    </div>
  );
};

export default AgentPage;
