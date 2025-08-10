import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface InputAreaProps {
  onStartChat: () => void;
  isMobile?: boolean;
}

export function InputArea({ onStartChat, isMobile = false }: InputAreaProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onStartChat();
      setInput('');
    }
  };

  return (
    <div className="relative z-10">
      <div 
        className={`mx-auto ${isMobile ? 'max-w-[390px]' : 'max-w-[760px]'}`}
        style={{
          paddingLeft: isMobile ? '16px' : '24px',
          paddingRight: isMobile ? '16px' : '24px',
          paddingBottom: isMobile ? '24px' : '32px'
        }}
      >
        <form onSubmit={handleSubmit} className="relative">
          <div 
            className="relative flex items-end bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-gray-300 focus-within:shadow-md transition-all duration-200"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
              borderColor: 'rgba(0, 0, 0, 0.08)'
            }}
          >
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-3"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message CelesteOS..."
              className="flex-1 resize-none bg-transparent border-0 py-4 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
              style={{
                fontSize: isMobile ? '16px' : '16px',
                lineHeight: isMobile ? '24px' : '24px',
                fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                minHeight: '24px',
                maxHeight: '120px'
              }}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-gray-900 rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <div 
            className="mt-2 text-center text-xs text-gray-500"
            style={{
              fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            CelesteOS can make mistakes. Check important info.
          </div>
        </form>
      </div>
    </div>
  );
}