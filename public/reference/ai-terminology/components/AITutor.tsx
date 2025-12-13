import React, { useState, useRef, useEffect } from 'react';
import { generateTutorResponse } from '../services/gemini';
import { Message } from '../types';
import { Send, Bot, User, Loader2, X } from 'lucide-react';

interface AITutorProps {
  isOpen: boolean;
  onClose: () => void;
}

const AITutor: React.FC<AITutorProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Greetings, Cadet. I am Neuro, your specialized AI Tutor. Query me about any term in the database." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateTutorResponse(input, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] bg-slate-900 border border-cyan-500/50 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-800 p-3 border-b border-cyan-500/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          <span className="font-display font-bold text-cyan-400 text-sm">NEURO TUTOR v2.5</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/90" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'model' ? 'bg-cyan-900/50 text-cyan-400' : 'bg-violet-900/50 text-violet-400'}`}>
              {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`rounded-lg p-3 text-sm max-w-[80%] ${msg.role === 'model' ? 'bg-slate-800 text-cyan-50 border border-cyan-900' : 'bg-violet-900/20 text-violet-100 border border-violet-900'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-cyan-900/50 text-cyan-400 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="flex items-center gap-2 text-cyan-500 text-xs mt-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Processing data stream...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-800 border-t border-cyan-500/30 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about MoE, RAG, etc..."
          className="flex-1 bg-slate-900 border border-slate-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 placeholder-slate-500"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-md transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AITutor;