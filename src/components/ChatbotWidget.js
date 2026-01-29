'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Asegúrate de que en el padre le estés pasando la prop correcta: preSelectedModules={selectedCapsules}
export default function ChatbotWidget({ preSelectedModules = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado del botón flotante
  const [showQuickAction, setShowQuickAction] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- EFECTO 1: MANEJAR VISIBILIDAD DEL BOTÓN FLOTANTE ---
  // Este efecto corre CADA VEZ que cambia la selección de módulos.
  useEffect(() => {
    if (preSelectedModules.length > 0) {
      // Si seleccionas algo, mostramos el botón (incluso si ya habías hablado antes)
      setShowQuickAction(true);
    } else {
      // Si deseleccionas todo, ocultamos el botón
      setShowQuickAction(false);
    }
  }, [preSelectedModules]);


  // --- EFECTO 2: MENSAJE DE BIENVENIDA (SOLO INICIAL) ---
  useEffect(() => {
    if (messages.length === 0) {
      if (preSelectedModules.length > 0) {
        const list = preSelectedModules.map(c => `* **${c}**`).join('\n');
        setMessages([
          {
            from: 'bot',
            text: `Hi! 👋 I see you have selected the following modules:\n\n${list}\n\nWould you like to **add more modules** to your plan, or **proceed directly to registration**?`
          }
        ]);
      } else {
        setMessages([
          {
            from: 'bot',
            text: `Hi! 👋 Welcome to **English Booster**.\n\nYou can sign up for **one or more** modules. Here is the full list:\n\n1. **Boost Your Speaking Confidence**\n2. **Pronunciation Essentials**\n3. **Everyday Business English**\n4. **Meetings That Flow**\n5. **Clear Email & Chat Communication**\n6. **Networking & Cross-Cultural Communication**\n7. **Presenting to Clients**\n8. **Facilitation & Problem-Solving**\n9. **Negotiation & Difficult Conversations**\n\nPlease type the **number(s)** of the modules you'd like to join (e.g., "1 and 5").`
          }
        ]);
      }
    }
  }, [preSelectedModules]); // Mantenemos dependencia para actualizar el saludo si ocurre antes de abrir el chat

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen, showQuickAction]);

  const handleQuickReply = () => {
    const text = "I've already selected the modules I want to register for.";
    // Ocultamos el botón inmediatamente al hacer click para mejor feedback
    setShowQuickAction(false); 
    setInput(text);
    
    setTimeout(() => {
        sendMessage(text); 
    }, 100);
  };

  async function sendMessage(textOverride = null) {
    const textToSend = textOverride || input;
    
    if (!textToSend.trim() || loading) return;

    // Aseguramos que el botón se oculte al enviar cualquier mensaje
    setShowQuickAction(false);

    const userMessage = { from: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let apiMessages = messages.map(m => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      // LÓGICA DE CONTEXTO: Si hay módulos seleccionados, le avisamos a la IA
      if (preSelectedModules.length > 0) {
        const contextString = `[SYSTEM CONTEXT: The user has visually selected: "${preSelectedModules.join(', ')}". If the user says "proceed", "register" or "already selected", start the registration for these modules strictly.]`;
        apiMessages.push({ role: "system", content: contextString });
      }

      apiMessages.push({ role: 'user', content: userMessage.text });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      const botReply = data.reply;

      try {
        const cleanJson = botReply.replace(/```json/g, '').replace(/```/g, '').trim();
        if (cleanJson.startsWith('{') && cleanJson.endsWith('}')) {
          const parsedData = JSON.parse(cleanJson);
          if (parsedData.action === 'register_user') {
            setMessages(prev => [...prev, { from: 'bot', text: "⏳ **Checking availability...** Please wait a moment." }]);
            
            // MAPEO DE SEGURIDAD (Si tu backend espera 'capsules' en lugar de 'modules')
            // Si ya cambiaste tu backend para recibir 'modules', puedes borrar la línea 'capsules: ...'
            const payload = {
                ...parsedData,
                capsules: parsedData.modules || parsedData.capsules // Compatibilidad
            };

            try {
              const regRes = await fetch('/api/register', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
              });
              const regData = await regRes.json();
              if (regData.status === 'confirmed') {
                setMessages(prev => [...prev, { from: 'bot', text: `✅ **Confirmed!** ${regData.message}\n\nSee you on **February 23rd**!` }]);
              } else if (regData.status === 'waitlist') {
                setMessages(prev => [...prev, { from: 'bot', text: `⚠️ **Capacity Full.** ${regData.message}\nWe will notify you as soon as a spot opens up.` }]);
              } else {
                setMessages(prev => [...prev, { from: 'bot', text: "✅ Data received, check your email." }]);
              }
            } catch (error) {
              setMessages(prev => [...prev, { from: 'bot', text: "⚠️ Connection error." }]);
            }
            setLoading(false);
            return; 
          }
        }
      } catch (e) {}

      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: 'bot', text: '⚠️ Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans pointer-events-none">
      <div className={`bg-[#112C3E] w-[90vw] md:w-[400px] h-[600px] rounded-2xl shadow-2xl border border-[#EE7203]/30 overflow-hidden flex flex-col transition-all duration-300 pointer-events-auto ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C212D] to-[#112C3E] p-5 border-b border-[#EE7203]/20 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-[#00FF00] rounded-full"></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#00FF00] rounded-full animate-ping opacity-75"></div>
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-wide block leading-none">Further Assistant</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Online</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#EE7203]/20 rounded-md">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#0C212D]/50 relative">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'bot' ? 'gap-3' : 'justify-end'}`}>
              {msg.from === 'bot' && <div className="w-9 h-9 rounded-full bg-[#EE7203] flex items-center justify-center text-white font-bold">F</div>}
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm ${msg.from === 'bot' ? 'bg-[#112C3E] text-gray-200' : 'bg-[#EE7203] text-white rounded-br-none'}`}>
                
                <ReactMarkdown components={{
                    strong: ({ children }) => <strong className="text-[#EE7203] font-semibold">{children}</strong>,
                    p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2 text-white">{children}</ol>,
                    li: ({ children }) => <li>{children}</li>
                  }}>
                  {msg.text}
                </ReactMarkdown>

              </div>
            </div>
          ))}
          {loading && <div className="text-gray-400 text-xs">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#0C212D] p-4 flex flex-col gap-2">
          
          {/* --- BOTÓN DE ACCIÓN RÁPIDA (SUGGESTION CHIP) --- */}
          {/* Se muestra si showQuickAction es true */}
          {showQuickAction && (
            <div className="flex justify-end animate-fadeIn">
              <button 
                onClick={handleQuickReply}
                className="bg-[#112C3E] border border-[#EE7203]/50 hover:bg-[#EE7203] text-white text-xs py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg group"
              >
                <span>I have selected the modules I want</span>
                <ArrowUpRight size={14} className="text-[#EE7203] group-hover:text-white transition-colors"/>
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && sendMessage()} 
              placeholder="Type your answer..." 
              className="flex-1 bg-[#112C3E] rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#EE7203]/50 transition-all" 
            />
            <button 
              onClick={() => sendMessage()} 
              className="p-3 bg-[#EE7203] rounded-full text-white hover:bg-[#FF3816] transition-colors shadow-lg hover:shadow-[#EE7203]/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="pointer-events-auto relative w-16 h-16 rounded-full bg-gradient-to-br from-[#EE7203] to-[#FF3816] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
        {isOpen ? <X size={30} /> : <MessageCircle size={32} />}
        {!isOpen && preSelectedModules.length > 0 && (
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-white text-[#EE7203] rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-bounce">
            {preSelectedModules.length}
          </div>
        )}
      </button>
    </div>
  );
}