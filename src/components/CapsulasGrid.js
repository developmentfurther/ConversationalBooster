import React from 'react';
import { CheckCircle2, Plus, Check } from 'lucide-react';

export default function CapsulasGrid({ modules, selectedIds, onToggle }) {
  
  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Capsules</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select the capsules you are interested in to build your plan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((mod) => {
          const isSelected = selectedIds.includes(mod.title); // Usamos el Título como ID para facilitar lectura al bot

          return (
            <div 
              key={mod.id} 
              className={`group relative flex flex-col bg-[#112C3E] rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl 
              ${isSelected 
                ? 'border-[#EE7203] shadow-[0_0_30px_rgba(238,114,3,0.15)] -translate-y-2' 
                : 'border-[#112C3E] hover:border-[#EE7203]/30 hover:shadow-[#000000]/40'
              }`}
            >
              
              {/* Gradient Top Bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${mod.color}`} />
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${mod.color} opacity-20 select-none`}>
                    0{mod.id}
                  </span>
                  
                  {/* --- BOTÓN DE SELECCIÓN (EL CARRITO) --- */}
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
                
                {/* Description */}
                <div className="space-y-3 mb-8 flex-1">
                  {mod.description.split('•').map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 mt-1 shrink-0 transition-colors ${isSelected ? 'text-[#EE7203]' : 'text-[#FF3816]'}`} />
                      <p className="text-sm text-gray-300 leading-snug">{item.trim()}</p>
                    </div>
                  ))}
                </div>
                
                {/* Objective */}
                <div className="pt-6 border-t border-[#0C212D]/50 mt-auto">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-2 tracking-wider">Objective:</p>
                  <p className={`text-sm italic font-medium p-3 rounded-lg border transition-colors ${isSelected ? 'bg-[#EE7203]/10 border-[#EE7203]/30 text-white' : 'bg-[#0C212D]/30 border-[#EE7203]/10 text-gray-400'}`}>
                    {mod.objective}&quot
                  </p>
                </div>
              </div>

              {/* Overlay visual cuando está seleccionado */}
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