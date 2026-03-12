import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Sparkles, MessageSquare, Zap, GraduationCap, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleCreateAgent = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    // For demo, just navigate to agents
    navigate('/agents');
  };

  const examplePrompts = [
    { text: "Show my attendance for the current semester", icon: Zap },
    { text: "Help me register for my elective courses", icon: GraduationCap },
    { text: "Generate a summary of my recent exam results", icon: MessageSquare },
  ];

  return (
    <div className="flex bg-background min-h-screen text-white font-sans">
      <Sidebar role="Student" />
      
      <main className="flex-1 ml-[260px] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/30 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
              <Sparkles size={12} className="text-white" />
              University AI Intelligence
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-green-500 italic">Responsive <span className="text-white not-italic">formaly</span></h1>
            <p className="text-gray-500 text-lg">Your personalized agent portal for all academic operations.</p>
          </div>

          {/* Prompt Entry Card */}
          <div className="bg-secondary/50 border border-border rounded-3xl p-2 shadow-2xl backdrop-blur-sm mb-12 group focus-within:border-white/20 transition-all">
            <form onSubmit={handleCreateAgent} className="relative">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 p-6 text-lg tracking-tight resize-none outline-none min-h-[140px]"
                placeholder="What do you want the AI agent to do?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="p-4 flex justify-between items-center border-t border-border/50">
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest border border-border px-2 py-1 rounded">Shift + Enter for new line</span>
                </div>
                <button 
                  type="submit"
                  disabled={!prompt.trim()}
                  className="bg-white text-black px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-30 shadow-lg"
                >
                  <Plus size={18} />
                  Create Agent
                </button>
              </div>
            </form>
          </div>

          {/* Example Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examplePrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(item.text)}
                className="flex flex-col items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:bg-accent/50 hover:border-white/20 transition-all text-left group"
              >
                <item.icon size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                <p className="text-sm font-medium text-gray-400 group-hover:text-white leading-snug tracking-tight">
                  {item.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
