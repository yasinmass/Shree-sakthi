import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import DataTable from '../components/DataTable';
import ReasoningTrace from '../components/ReasoningTrace';
import { Shield, Sparkles, Bot, Info, Settings } from 'lucide-react';
import { sendChat } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { user } = useAuth();
  const { agentId } = useParams();
  const dbAgentId = parseInt(agentId) || agentId; // Fallback if string
  
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      text: `Hello! I am your agent. How can I help with your academic data today?`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text }]);
    
    // Process AI response
    setIsTyping(true);
    
    try {
      const dbIdParam = (typeof dbAgentId === 'string' && agentId.includes('-')) ? 1 : dbAgentId;
      const res = await sendChat(dbIdParam, text, sessionId, user?.role);
      const data = res.data;
      
      const responseData = data.data || [];
      const traceInfo = [
        { title: "Reasoning", details: data.reasoning, status: "completed" },
        { title: "Action Taken", details: data.action_taken || "None", status: "completed" }
      ];

      setMessages((prev) => [
        ...prev, 
        { 
          type: 'agent', 
          text: data.message,
          data: responseData.length > 0 ? responseData : null,
          trace: traceInfo 
        }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { 
          type: 'agent', 
          text: 'Sorry, I encountered an error answering your request. Ensure the backend is active and reachable.' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex bg-background min-h-screen text-white">
      <Sidebar role="Student" />
      
      {/* Main chat layout */}
      <main className="flex-1 ml-[260px] flex flex-col h-screen relative">
        
        {/* Header - Minimalist */}
        <header className="h-[70px] border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight uppercase">Agent Instance</h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Connect</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-gray-500 hover:text-white">
              <Info size={18} />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-gray-500 hover:text-white">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto pt-8 pb-32">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="flex flex-col">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col w-full ${msg.type === 'user' ? 'items-end' : 'items-start'} mb-8`}>
                  <ChatMessage message={msg.text} type={msg.type} />
                  
                  {/* Append Trace & Data immediately below Agent's message */}
                  {msg.trace && msg.type === 'agent' && (
                    <div className="w-full pl-12 -mt-4 mb-4">
                      <ReasoningTrace steps={msg.trace} />
                    </div>
                  )}
                  {msg.data && msg.type === 'agent' && (
                    <div className="w-full pl-12 mb-4">
                      <DataTable data={msg.data} />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-4 animate-pulse mb-8">
                  <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                    <Bot size={16} className="text-gray-500" />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-secondary border border-border italic text-xs text-gray-500">
                    <Sparkles size={12} className="animate-spin" />
                    Ollama is analyzing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Floating Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-10">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </main>
    </div>
  );
};

export default Chat;
