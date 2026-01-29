import React from 'react';
// 1. IMPORTA EL ICONO CALENDAR
import { CheckCircle2, Plus, Check, MessageCircle, Sparkles, Calendar } from 'lucide-react';

export default function CapsulasGrid({ modules, selectedIds, onToggle }) {
  
  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Modules</h2>
        
        {/* Banner explicativo del Chatbot */}
        <div className="max-w-2xl mx-auto mb-8 bg-[#112C3E]/50 border border-[#EE7203]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#EE7203]/40 transition-colors">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#EE7203]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 bg-[#EE7203]/10 rounded-full flex items-center justify-center shrink-0 border border-[#EE7203]/20">
                    <MessageCircle size={24} className="text-[#EE7203]" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1 flex items-center justify-center md:justify-start gap-2">
                        How to Register <Sparkles size={14} className="text-[#EE7203]" />
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Select the modules you are interested in by clicking the <span className="inline-flex items-center justify-center w-5 h-5 bg-[#0C212D] rounded-full border border-[#EE7203]/30 mx-1"><Plus size={12} className="text-[#EE7203]"/></span> button. 
                        Once you're ready, open the <strong>"Register via Chat"</strong> assistant to complete your enrollment instantly.
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((mod) => {
          const isSelected = selectedIds.includes(mod.title);

          return (
            <div 
              key={mod.id} 
              className={`group relative flex flex-col bg-[#112C3E] rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl 
              ${isSelected 
                ? 'border-[#EE7203] shadow-[0_0_30px_rgba(238,114,3,0.15)] -translate-y-2' 
                : 'border-[#112C3E] hover:border-[#EE7203]/30 hover:shadow-[#000000]/40'
              }`}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${mod.color}`} />
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${mod.color} opacity-70 select-none`}>
                    0{mod.id}
                  </span>
                  
                  <button
                    onClick={() => onToggle(mod.title)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-20
                      ${isSelected 
                        ? 'bg-[#EE7203] text-white rotate-0 scale-110' 
                        : 'bg-[#0C212D] text-gray-400 hover:bg-[#EE7203]/20 hover:text-[#EE7203] -rotate-90'
                      }
                    `}
                    aria-label={isSelected ? "Remove from plan" : "Add to plan"}
                  >
                    {isSelected ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 leading-tight min-h-[3.5rem] flex items-center">
                  {mod.title}
                </h3>
                <p className="text-[#EE7203] text-sm font-bold uppercase tracking-wide mb-6">
                  {mod.subtitle}
                </p>
                
                <div className="space-y-3 mb-8 flex-1">
                  {mod.description.split('•').map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 mt-1 shrink-0 transition-colors ${isSelected ? 'text-[#EE7203]' : 'text-[#FF3816]'}`} />
                      <p className="text-sm text-gray-300 leading-snug">{item.trim()}</p>
                    </div>
                  ))}
                </div>
                
                {/* --- NUEVA SECCIÓN DE CALENDARIO --- */}
                {mod.schedule && (
                  <div className="mb-6 p-3 bg-[#091821] rounded-xl border border-[#1E3A4C] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} className="text-[#EE7203]" />
                      <span className="text-xs font-bold uppercase tracking-wide">Dates</span>
                    </div>
                    <div className="flex gap-3 text-sm font-mono text-white">
                      <div className="flex flex-col items-end leading-none gap-1">
                        <span className="opacity-60 text-[10px] uppercase">Session 1</span>
                        <span>{mod.schedule.s1}</span>
                      </div>
                      <div className="w-px bg-[#1E3A4C]"></div>
                      <div className="flex flex-col items-start leading-none gap-1">
                        <span className="opacity-60 text-[10px] uppercase">Session 2</span>
                        <span>{mod.schedule.s2}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Objective */}
                <div className="pt-6 border-t border-[#0C212D]/50 mt-auto">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-2 tracking-wider">Objective:</p>
                  <p className={`text-sm italic font-medium p-3 rounded-lg border transition-colors ${isSelected ? 'bg-[#EE7203]/10 border-[#EE7203]/30 text-white' : 'bg-[#0C212D]/30 border-[#EE7203]/10 text-gray-400'}`}>
                    {mod.objective}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="absolute inset-0 bg-[#EE7203]/5 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}