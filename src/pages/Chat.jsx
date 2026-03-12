import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { Shield, Sparkles, Bot, Info, Settings } from 'lucide-react';

const Chat = () => {
  const { agentId } = useParams();
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      text: `Hello! I am your ${agentId.replace(/-/g, ' ')}. How can I help with your academic data today?`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text }]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'agent', 
        text: "I've analyzed your request. Based on the university database records, everything seems to be in order. Is there anything specific from your profile you'd like to dive into?" 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex bg-background min-h-screen text-white">
      <Sidebar role="Student" />
      
      {/* Main chat layout */}
      <main className="flex-1 ml-[260px] flex flex-col h-screen relative">
        
        {/* Header - Minimalist */}
        <header className="h-[70px] border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight uppercase">{agentId.replace(/-/g, ' ')}</h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Instance</span>
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
                <ChatMessage key={idx} message={msg.text} type={msg.type} />
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-4 animate-pulse mb-8">
                  <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                    <Bot size={16} className="text-gray-500" />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-secondary border border-border italic text-xs text-gray-500">
                    <Sparkles size={12} className="animate-spin" />
                    Agent is processing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Floating Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-10">
          <ChatInput onSend={handleSend} />
        </div>
      </main>
    </div>
  );
};

export default Chat;
