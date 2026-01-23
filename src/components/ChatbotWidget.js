'use client'; // Necesario para la interactividad (useState)

import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans">
      
      {/* Ventana del Chat (Aumentada de tamaño) */}
      {/* Dimensiones cambiadas: w-80 -> w-[400px] y h-96 -> h-[600px] */}
      <div 
        className={`
          bg-[#112C3E] 
          w-[90vw] md:w-[400px] 
          h-[600px] 
          rounded-2xl shadow-2xl 
          border border-[#EE7203]/30 
          overflow-hidden flex flex-col 
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none absolute bottom-20'}
        `}
      >
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
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#EE7203]/20 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 bg-[#0C212D]/50 custom-scrollbar">
          {/* Mensaje de bienvenida */}
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EE7203] to-[#FF3816] flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg shadow-[#EE7203]/20">
              F
            </div>
            <div className="bg-[#112C3E] p-4 rounded-2xl rounded-tl-none text-sm text-gray-200 border border-[#EE7203]/10 shadow-md">
              <p className="leading-relaxed">
                Hello! 👋 Welcome to <strong className="text-[#EE7203]">English Booster</strong>.
              </p>
              <p className="mt-2 leading-relaxed">
                I can help you choose the best capsules for your team or answer questions about logistics. How can I help you today?
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0C212D] border-t border-[#112C3E] flex gap-3 shrink-0">
          <input 
            type="text" 
            placeholder="Type your question..." 
            className="flex-1 bg-[#112C3E] rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EE7203] transition-all shadow-inner"
          />
          <button className="p-3 bg-[#EE7203] rounded-full text-white hover:bg-[#FF3816] hover:scale-105 transition-all shadow-lg shadow-[#EE7203]/20 flex items-center justify-center">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Botón Flotante (Toggle) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full shadow-2xl shadow-[#EE7203]/30 flex items-center justify-center text-white transition-all duration-300 z-50
          ${isOpen ? 'bg-[#112C3E] hover:bg-[#0C212D] rotate-90' : 'bg-gradient-to-br from-[#EE7203] to-[#FF3816] hover:scale-110'}
        `}
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={32} className="" />}
      </button>
    </div>
  );
}