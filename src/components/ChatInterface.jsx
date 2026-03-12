import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import DataTable from './DataTable';
import ReasoningTrace from './ReasoningTrace';

const ChatInterface = ({ agentId }) => {
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      text: `Hello! I am the ${agentId.replace(/-/g, ' ')}. How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages((prev) => [...prev, { type: 'user', text: userMsg }]);
    
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = {
        message: "Here are the results for your query.",
        data: [
          { name: "Rahul", roll: "CS001", attendance: "68%" },
          { name: "Priya", roll: "CS002", attendance: "70%" },
          { name: "Amit", roll: "CS005", attendance: "65%" }
        ],
        trace: [
          { title: "Query Parsing", details: "Deconstructing user request for attendance records...", status: "completed" },
          { title: "Database Lookup", details: "Querying ERP student_attendance table for module CS101...", status: "completed" },
          { title: "Data Formatting", details: "Transforming raw SQL results into presentation format.", status: "completed" }
        ]
      };
      
      setMessages((prev) => [
        ...prev, 
        { 
          type: 'agent', 
          text: response.message,
          data: response.data,
          trace: response.trace 
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-card rounded-2xl border border-border overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === 'user' ? 'bg-white text-black' : 'bg-secondary text-white border border-border'
              }`}>
                {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-white text-black font-medium' 
                    : 'bg-secondary text-gray-200 border border-border'
                }`}>
                  {msg.text}
                </div>
                {msg.trace && <ReasoningTrace steps={msg.trace} />}
                {msg.data && <DataTable data={msg.data} />}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                <Bot size={16} className="text-gray-500" />
              </div>
              <div className="p-4 rounded-2xl bg-secondary border border-border text-gray-500 text-sm flex items-center gap-2">
                <Sparkles size={14} className="animate-spin" />
                Thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-secondary/50 border-t border-border">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            className="w-full bg-card border border-border rounded-xl py-4 pl-4 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder-gray-500"
            placeholder="Type your query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-white text-black disabled:opacity-50 hover:bg-gray-200 transition-all"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
