'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatbotWidget({ preSelectedCapsules = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 0) {
      if (preSelectedCapsules.length > 0) {
        const list = preSelectedCapsules.map(c => `* **${c}**`).join('\n');
        setMessages([
          {
            from: 'bot',
            text: `Hi! 👋 I see you have selected the following capsules:\n\n${list}\n\nWould you like to **add more capsules** to your plan, or **proceed directly to registration**?`
          }
        ]);
      } else {
        // AQUÍ ESTÁ LA LISTA NUMERADA CORREGIDA
        setMessages([
          {
            from: 'bot',
            text: `Hi! 👋 Welcome to **English Booster**.\n\nYou can sign up for **one or more** capsules. Here is the full list:\n\n1. **Boost Your Speaking Confidence**\n2. **Pronunciation Essentials**\n3. **Everyday Business English**\n4. **Meetings That Flow**\n5. **Clear Email & Chat Communication**\n6. **Networking & Cross-Cultural Communication**\n7. **Presenting to Clients**\n8. **Facilitation & Problem-Solving**\n9. **Negotiation & Difficult Conversations**\n\nPlease type the **number(s)** of the capsules you'd like to join (e.g., "1 and 5").`
          }
        ]);
      }
    }
  }, [preSelectedCapsules]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let apiMessages = messages.map(m => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      if (preSelectedCapsules.length > 0) {
        const contextString = `[SYSTEM CONTEXT: The user has visually selected: "${preSelectedCapsules.join(', ')}". If the user says "proceed" or "register", start the registration for these capsules. If they ask to add more, help them choose from the list.]`;
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
            try {
              const regRes = await fetch('/api/register', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsedData)
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
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#0C212D]/50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'bot' ? 'gap-3' : 'justify-end'}`}>
              {msg.from === 'bot' && <div className="w-9 h-9 rounded-full bg-[#EE7203] flex items-center justify-center text-white font-bold">F</div>}
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm ${msg.from === 'bot' ? 'bg-[#112C3E] text-gray-200' : 'bg-[#EE7203] text-white rounded-br-none'}`}>
                
                {/* --- AQUÍ ESTÁ EL FIX VISUAL --- */}
                <ReactMarkdown components={{
                    strong: ({ children }) => <strong className="text-[#EE7203] font-semibold">{children}</strong>,
                    p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                    
                    // Configuramos la lista desordenada (puntos)
                    ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
                    
                    // ¡NUEVO! Configuramos la lista ordenada (números)
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

        {/* Input */}
        <div className="p-4 bg-[#0C212D] flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type your answer..." className="flex-1 bg-[#112C3E] rounded-full px-5 py-3 text-sm text-white focus:outline-none" />
          <button onClick={() => sendMessage()} className="p-3 bg-[#EE7203] rounded-full text-white hover:bg-[#FF3816]"><Send size={18} /></button>
        </div>
      </div>

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="pointer-events-auto relative w-16 h-16 rounded-full bg-gradient-to-br from-[#EE7203] to-[#FF3816] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
        {isOpen ? <X size={30} /> : <MessageCircle size={32} />}
        {!isOpen && preSelectedCapsules.length > 0 && (
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-white text-[#EE7203] rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-bounce">
            {preSelectedCapsules.length}
          </div>
        )}
      </button>
    </div>
  );
}