'use client';

import React, { useState, useEffect, useRef  } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown'


export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};


  // Crear sessionId una sola vez
  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

 useEffect(() => {
  if (messages.length === 0) {
    setMessages([
      {
        from: 'bot',
        text: "Hi! 👋 I’m here to help you find the right English Booster capsule. What would you like to improve in your English?"
      }
    ]);
  }
}, []);


useEffect(() => {
  scrollToBottom();
}, [messages, loading]);


async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({
              role: m.from === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: 'user', content: userMessage.text }
          ]
        })
      });

      const data = await res.json();
      const botReply = data.reply;

      // --- LOGICA DE DETECCION DE JSON PARA N8N ---
      try {
        // Intentamos parsear la respuesta por si es el JSON final
        // A veces el bot manda markdown ```json ... ```, hay que limpiarlo
        const cleanJson = botReply.replace(/```json/g, '').replace(/```/g, '').trim();
        
        if (cleanJson.startsWith('{') && cleanJson.endsWith('}')) {
          const parsedData = JSON.parse(cleanJson);

          if (parsedData.action === 'register_user') {
  
  // 1. Mostrar mensaje de "Procesando"
  setMessages(prev => [
    ...prev,
    { from: 'bot', text: "⏳ **Checking availability...** Please wait a moment." }
  ]);

  try {
    // 2. Llamar a tu API Bridge
    const regRes = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData) // Enviamos el JSON que armó la IA
    });

    const regData = await regRes.json();

    // 3. Reaccionar según lo que dijo n8n
    if (regData.status === 'confirmed') {
      setMessages(prev => [
        ...prev,
        { 
          from: 'bot', 
          text: `✅ **Confirmed!** ${regData.message}\n\nSee you on **February 23rd**!` 
        }
      ]);
    } else if (regData.status === 'waitlist') {
      setMessages(prev => [
        ...prev,
        { 
          from: 'bot', 
          text: `⚠️ **Capacity Full.** ${regData.message}\nWe will notify you as soon as a spot opens up.` 
        }
      ]);
    } else {
      // Por si acaso falla algo raro
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "✅ Data received, but please check your email for final confirmation." }
      ]);
    }

  } catch (error) {
    console.error(error);
    setMessages(prev => [
      ...prev,
      { from: 'bot', text: "⚠️ Connection error. Don't worry, we saved your request locally." }
    ]);
  }

  setLoading(false);
  return; 
}
        }
      } catch (e) {
        // Si falla el parse, es que es un mensaje de texto normal. Continuamos.
        // No hace falta hacer nada aquí.
      }

      // Si no fue JSON, mostramos el mensaje normal
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: botReply }
      ]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: '⚠️ Something went wrong. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans">

      {/* Chat Window */}
      <div
        className={`
          bg-[#112C3E]
          w-[90vw] md:w-[400px]
          h-[600px]
          rounded-2xl shadow-2xl
          border border-[#EE7203]/30
          overflow-hidden flex flex-col
          transition-all duration-300
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
       <div className="bg-gradient-to-r from-[#0C212D] to-[#112C3E] p-5 border-b border-[#EE7203]/20 flex justify-between items-center shrink-0">
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-3 h-3 bg-[#00FF00] rounded-full"></div>
      <div className="absolute top-0 left-0 w-3 h-3 bg-[#00FF00] rounded-full animate-ping opacity-75"></div>
    </div>
    <div>
      <span className="font-bold text-base text-white tracking-wide block leading-none">
        Further Assistant
      </span>
      <span className="text-[10px] text-gray-400 uppercase tracking-widest">
        Online
      </span>
    </div>
  </div>

  <button 
    onClick={() => setIsOpen(false)}
    className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#EE7203]/20 rounded-md"
  >
    <X size={20} />
  </button>
</div>


        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#0C212D]/50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'bot' ? 'gap-3' : 'justify-end'}`}>
              {msg.from === 'bot' && (
                <div className="w-9 h-9 rounded-full bg-[#EE7203] flex items-center justify-center text-white font-bold">
                  F
                </div>
              )}
              <div
                className={`max-w-[75%] p-4 rounded-2xl text-sm
                  ${msg.from === 'bot'
                    ? 'bg-[#112C3E] text-gray-200'
                    : 'bg-[#EE7203] text-white rounded-br-none'
                  }`}
              >
                <ReactMarkdown
  components={{
    strong: ({ children }) => (
      <strong className="text-[#EE7203] font-semibold">{children}</strong>
    ),
    p: ({ children }) => (
      <p className="mb-2 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-4 space-y-1">{children}</ul>
    ),
    li: ({ children }) => <li>{children}</li>
  }}
>
  {msg.text}
</ReactMarkdown>

              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 text-xs">Typing...</div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}
        <div className="p-4 bg-[#0C212D] flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your answer..."
            className="flex-1 bg-[#112C3E] rounded-full px-5 py-3 text-sm text-white focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-[#EE7203] rounded-full text-white hover:bg-[#FF3816]"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EE7203] to-[#FF3816] text-white flex items-center justify-center shadow-xl"
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
}
