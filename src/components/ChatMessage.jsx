import React from 'react';
import { User, Bot } from 'lucide-react';
import TextType from './TextType';

const ChatMessage = ({ message, type }) => {
  const isUser = type === 'user';

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[800px] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
          isUser ? 'bg-white text-black border-white' : 'bg-card text-white border-border'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
            isUser 
              ? 'bg-card text-white border border-border' 
              : 'bg-secondary text-gray-200 border border-border'
          }`}>
            {!isUser ? (
              <TextType 
                text={message}
                typingSpeed={30}
                loop={false}
                showCursor={true}
                cursorCharacter="▋"
                hideCursorWhileTyping={false}
              />
            ) : (
              message
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
