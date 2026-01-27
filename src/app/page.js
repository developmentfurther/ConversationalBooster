"use client"
import React from 'react';
import { MapPin, Clock, Calendar, MessageCircle, ChevronRight, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import ChatbotWidget from '@/components/ChatbotWidget';
import CapsulasGrid from '@/components/CapsulasGrid';
import { useState } from 'react';

// TU DATA PROVISTA
const modules = [
  {
    id: 1,
    title: "Boost Your Speaking Confidence",
    subtitle: "From hesitation to clarity",
    description: "Clear and effective personal presentations • Key vocabulary for work contexts • Guided roleplays: 'Meet your global team'",
    objective: "Break through speaking barriers and gain immediate confidence",
    color: "from-[#EE7203] to-[#FF3816]"
  },
  {
    id: 2,
    title: "Pronunciation Essentials",
    subtitle: "Sound clearer, sound more natural",
    description: "Problematic sounds for Spanish speakers • Quick techniques to sound more natural • Live mini-coaching",
    objective: "Communicate with clarity and proper pronunciation",
    color: "from-[#FF3816] to-[#EE7203]"
  },
  {
    id: 3,
    title: "Everyday Business English",
    subtitle: "The English you actually use",
    description: "Key phrases for meetings, emails and chats • Common mistakes (and how to avoid them) • Practical simulation: daily stand-up meeting",
    objective: "Communicate naturally in day-to-day work",
    color: "from-[#EE7203] to-[#FF3816]"
  },
  {
    id: 4,
    title: "Meetings That Flow",
    subtitle: "Participate, agree, disagree, move forward",
    description: "How to intervene clearly in global meetings • Language to agree, disagree and guide conversations • Roleplay with real project agenda",
    objective: "Actively participate in meetings",
    color: "from-[#FF3816] to-[#EE7203]"
  },
  {
    id: 5,
    title: "Clear Email & Chat Communication",
    subtitle: "Say it clearly. Get it done.",
    description: "Simple structures for clear messages • Useful templates: clarify · request · escalate • Async communication simulation (Slack/Teams)",
    objective: "Write clear, brief and effective messages",
    color: "from-[#EE7203] to-[#FF3816]"
  },
  {
    id: 6,
    title: "Networking & Cross-Cultural Communication",
    subtitle: "Connect beyond language",
    description: "Professional small talk • Language for client and colleague conversations • Keys to handle different cultural styles",
    objective: "Build connection and trust in international contexts",
    color: "from-[#FF3816] to-[#EE7203]"
  },
  {
    id: 7,
    title: "Presenting to Clients",
    subtitle: "Clear messages, strong delivery",
    description: "Storytelling applied to professional contexts • How to structure demos and status updates • Live feedback on 2-minute presentations",
    objective: "Present with clarity, focus and authority",
    color: "from-[#EE7203] to-[#FF3816]"
  },
  {
    id: 8,
    title: "Facilitation & Problem-Solving Language",
    subtitle: "Drive decisions",
    description: "Language for workshops, ideation and decision-making • Request clarifications, align teams, synthesize agreements • Simulation: discovery session",
    objective: "Facilitate complex conversations in English",
    color: "from-[#FF3816] to-[#EE7203]"
  },
  {
    id: 9,
    title: "Negotiation & Difficult Conversations",
    subtitle: "Say what needs to be said",
    description: "Handling objections and disagreements • Language for risks, limits and misalignments • Real project and client scenarios",
    objective: "Communicate difficult topics with clarity and professionalism",
    color: "from-[#EE7203] to-[#FF3816]"
  }
];

export default function EnglishBoosterLanding() {
  // ESTADO PARA "EL CARRITO"
  const [selectedCapsules, setSelectedCapsules] = useState([]);

  // Lógica para añadir/quitar
  const toggleCapsule = (title) => {
    setSelectedCapsules(prev => {
      if (prev.includes(title)) {
        return prev.filter(t => t !== title);
      } else {
        return [...prev, title];
      }
    });
  };
  
  return (
    <main className="min-h-screen bg-[#0C212D] text-white selection:bg-[#EE7203] selection:text-white font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-[#0C212D]/90 backdrop-blur-md border-b border-[#112C3E]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* 2. LOGO REEMPLAZADO AQUI */}
          <div className="flex items-center">
            <Image 
              src="/images/logo.png"       // Asegúrate de poner tu logo en la carpeta /public
              alt="Further Corporate" 
              width={180}           // Ajusta este ancho según tu imagen real
              height={50}           // Ajusta este alto según tu imagen real
               // Esto asegura que no se deforme
              priority              // Carga prioritaria para el LCP (Largest Contentful Paint)
            />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#program" className="hover:text-[#EE7203] transition-colors">Program</a>
            <a href="#modules" className="hover:text-[#EE7203] transition-colors">Capsules</a>
            <a href="#locations" className="hover:text-[#EE7203] transition-colors">Locations</a>
            <a href="#contact" className="px-5 py-2 bg-[#FF3816] text-white rounded-full hover:bg-[#EE7203] transition-colors shadow-lg shadow-[#FF3816]/20">
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#EE7203] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 bg-[#112C3E] text-[#EE7203] text-xs font-bold tracking-widest uppercase rounded border border-[#EE7203]/20">
              <span className="w-2 h-2 rounded-full bg-[#FF3816] mr-2 animate-pulse"></span>
              Corporate Training
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              ENGLISH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] to-[#FF3816]">
                BOOSTER
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              From <span className="text-white font-semibold">Daily Communication</span> to <span className="text-white font-semibold">Client Impact</span>. 
              Highly practical capsules designed to solve specific communication challenges.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="px-8 py-4 bg-[#EE7203] text-white font-bold rounded hover:bg-[#FF3816] transition-all flex items-center gap-2 shadow-lg shadow-[#EE7203]/20 group">
                Start Boosting 
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </button>
              <button className="px-8 py-4 border border-[#112C3E] bg-[#112C3E]/30 text-gray-300 hover:bg-[#112C3E] hover:text-white rounded font-medium transition-all">
                Download Brochure
              </button>
            </div>
          </div>
          
          {/* Hero Statistics/Cards Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#112C3E]/80 backdrop-blur-sm p-6 rounded-2xl border-t-4 border-[#EE7203] shadow-xl">
                <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
                <p className="text-gray-400 text-sm font-medium">Practical Real-World Scenarios</p>
              </div>
              <div className="bg-[#112C3E]/80 backdrop-blur-sm p-6 rounded-2xl border-t-4 border-[#FF3816] shadow-xl mt-8">
                <h3 className="text-4xl font-bold text-white mb-2">Live</h3>
                <p className="text-gray-400 text-sm font-medium">Feedback & Simulations</p>
              </div>
              <div className="col-span-2 bg-gradient-to-r from-[#112C3E] to-[#0C212D] p-6 rounded-2xl border border-[#EE7203]/10 flex items-center justify-between shadow-xl">
                <div>
                  <p className="font-bold text-white text-lg">Flexible Format</p>
                  <p className="text-sm text-gray-400">Take capsules independently</p>
                </div>
                <div className="bg-[#0C212D] p-3 rounded-full">
                   <Calendar className="text-[#EE7203]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGISTICS SECTION --- */}
      <section id="program" className="py-24 bg-[#091821] border-y border-[#112C3E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logistic Card 1 */}
            <div className="group p-8 bg-[#0C212D] rounded-2xl border border-[#112C3E] hover:border-[#EE7203]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#112C3E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-[#FF3816]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Duration</h3>
              <p className="text-gray-400 leading-relaxed">
                Each capsule is <strong className="text-white">4 hours</strong> total. <br/>
                Divided into 2 meetings of 2 hours each.
              </p>
            </div>
            
            {/* Logistic Card 2 */}
            <div className="group p-8 bg-[#0C212D] rounded-2xl border border-[#112C3E] hover:border-[#EE7203]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#112C3E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-[#EE7203]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Frequency</h3>
              <p className="text-gray-400 leading-relaxed">
                1 weekly encounter per capsule. <br/>
                Designed for immediate workplace application.
              </p>
            </div>

            {/* Logistic Card 3 */}
            <div id="locations" className="group p-8 bg-[#0C212D] rounded-2xl border border-[#112C3E] hover:border-[#EE7203]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#112C3E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-[#FF3816]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Locations</h3>
              <p className="text-gray-400 leading-relaxed">
                In-person modality available in: <br/>
                <span className="text-[#EE7203]">MDQ, Rosario, Mendoza, Salta, Córdoba.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- AQUÍ USAMOS EL NUEVO COMPONENTE --- */}
      <CapsulasGrid 
        modules={modules} 
        selectedIds={selectedCapsules} 
        onToggle={toggleCapsule} 
      />

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#091821] border-t border-[#112C3E] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-8 leading-tight">
              The more you know, <br />
              the <span className="text-[#EE7203]">FURTHER</span> you'll go!
            </h2>
            <div className="flex gap-3 mb-8">
              <div className="h-1.5 w-16 bg-[#EE7203] rounded-full" />
              <div className="h-1.5 w-8 bg-[#FF3816] rounded-full" />
            </div>
            <p className="text-gray-400 max-w-sm">
              Empowering global teams through targeted language strategies.
            </p>
          </div>
          
          <div className="space-y-6 text-gray-300 bg-[#112C3E]/20 p-8 rounded-2xl border border-[#112C3E]">
            <h3 className="text-white font-bold text-xl mb-2">Contact Us</h3>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#EE7203]" size={20}/>
              <p>Arcos 2215, Belgrano - CABA</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 flex justify-center"><span className="font-bold text-[#EE7203]">@</span></div>
              <p className="text-white hover:text-[#EE7203] cursor-pointer transition-colors">furthercorporate</p>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[#EE7203]">✉️</span>
               <a href="mailto:incompany@furtherenglish.com" className="hover:text-white transition-colors">incompany@furtherenglish.com</a>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[#EE7203]">📞</span>
               <p>+54 (011) 3529-8671</p>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm border-t border-[#112C3E] pt-8 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Further Corporate. All rights reserved.</p>
          <p className="mt-2 md:mt-0">English Booster Program</p>
        </div>
      </footer>

      {/* --- CHATBOT WIDGET --- */}
      <ChatbotWidget preSelectedCapsules={selectedCapsules} />
    </main>
  );
}

