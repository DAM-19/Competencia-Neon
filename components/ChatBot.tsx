import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../geminiService';

interface ChatBotProps {
  context: {
    user?: any;
    teams?: any;
  };
}

const ChatBot: React.FC<ChatBotProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    {
      role: 'bot',
      text: 'Saludos, operador. Soy NOVA. Inicia sesión para acceder al núcleo táctico.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const user = context?.user;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    // 🔒 GUARDIA CRÍTICA
    if (!user) {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Acceso denegado. Autenticación requerida.' },
      ]);
      setInput('');
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const botResponse = await getChatbotResponse(userMsg, context);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Error de conexión con el núcleo central.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 lg:bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl z-[60] transition-all duration-500
        ${
          isOpen
            ? 'bg-red-500 rotate-90'
            : 'bg-neon-purple hover:scale-110 active:scale-95 shadow-neon-purple/40 animate-glow'
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-headset'} text-xl`} />
      </button>

      <div
        className={`fixed bottom-36 lg:bottom-28 right-8 w-[calc(100vw-4rem)] md:w-[400px] h-[500px] glass-card rounded-2xl border border-neon-purple/30 flex flex-col z-[60] transition-all duration-500 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-neon-purple/5">
          <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-sm">
            <i className="fas fa-microchip"></i>
          </div>
          <div>
            <h4 className="font-orbitron font-bold text-sm text-white tracking-widest">
              ASISTENTE NOVA
            </h4>
            <span className="text-[10px] text-neon-green uppercase font-bold">
              {user ? 'Enlace Neuronal Activo' : 'Autenticación requerida'}
            </span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-rajdhani">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm
                ${
                  m.role === 'user'
                    ? 'bg-neon-blue/20 text-neon-blue rounded-tr-none'
                    : 'bg-white/5 text-gray-300 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={!user}
              placeholder={user ? 'Consulta al sistema...' : 'Inicia sesión para continuar'}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!user}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-neon-purple rounded-lg text-white disabled:opacity-50"
            >
              <i className="fas fa-paper-plane text-xs" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
