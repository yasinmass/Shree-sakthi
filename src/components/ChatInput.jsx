import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

const ChatInput = ({ onSend, placeholder = "Ask your academic assistant..." }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 pb-8">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center bg-card border border-border rounded-2xl shadow-xl focus-within:border-white/20 transition-all p-2 group"
      >
        <button
          type="button"
          className="p-3 text-gray-500 hover:text-white transition-colors"
        >
          <Paperclip size={20} />
        </button>
        
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-3 px-2 resize-none max-h-40 overflow-y-auto outline-none"
        />
        
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-3 bg-white text-black rounded-xl disabled:opacity-30 hover:bg-gray-200 transition-all ml-2"
        >
          <Send size={18} />
        </button>
      </form>
      <p className="text-[10px] text-gray-600 text-center mt-3 uppercase tracking-widest font-bold">
        AI Agents can make mistakes. Verify important academic information.
      </p>
    </div>
  );
};

export default ChatInput;
