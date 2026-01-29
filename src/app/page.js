"use client"
import React from 'react';
import { MapPin, Clock, Calendar, MessageCircle, ChevronRight, Send, CheckCircle2, Globe, Mail, Phone, Target, Mic, Briefcase, Users, Zap, ArrowRight, Sparkles, Instagram, Linkedin, Youtube, HelpCircle, ExternalLink, Star } from 'lucide-react';
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

// DATA PARA FAQs (Traducido)
const faqs = [
  {
    question: "Do I have to attend all modules?",
    answer: "No. You can choose the ones that interest you. Keep in mind that your registration is a commitment to attend both sessions of the topic you selected. In case of absence, Further reserves the right to review access conditions to new sessions."
  },
  {
    question: "Do I need an advanced English level?",
    answer: "No. The workshop is designed for everyone to join. Keep in mind that we won't focus on grammar, but rather on practical tools with short-term impact."
  },
  {
    question: "Is there an exam or evaluation?",
    answer: "No. This is a Practical Workshop designed to enhance communication skills needed for daily work life. No tests, just practice."
  },
  {
    question: "Will I receive a certificate?",
    answer: "Absolutely. As with all our academic programs, upon completion, a certificate will be issued to those who have participated in at least 75% of the modules."
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
      
      {/* --- ENHANCED NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-[#0C212D]/95 backdrop-blur-xl border-b border-[#112C3E] shadow-lg shadow-black/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
            <Image 
              src="/images/logo.png"
              alt="Further Corporate" 
              width={180}
              height={50}
              priority
            />
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 items-center">
            <a href="#program" className="hover:text-[#EE7203] transition-colors relative group">
              Program
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EE7203] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#modules" className="hover:text-[#EE7203] transition-colors relative group">
              Modules
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EE7203] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#locations" className="hover:text-[#EE7203] transition-colors relative group">
              Locations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EE7203] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="group px-6 py-2.5 bg-gradient-to-r from-[#FF3816] to-[#EE7203] text-white rounded-full hover:shadow-xl hover:shadow-[#FF3816]/30 transition-all duration-300 hover:-translate-y-0.5 font-semibold flex items-center gap-2">
              Contact Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </nav>


      {/* --- ENHANCED HERO SECTION CON VIDEO --- */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        
        {/* STATIC Background Effects (Luz ambiental fija) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Luz Naranja (Superior Derecha) - SIN ANIMACIÓN */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#EE7203] opacity-[0.08] blur-[120px] rounded-full" />
          
          {/* Luz Roja (Inferior Izquierda) - SIN ANIMACIÓN */}
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#FF3816] opacity-[0.06] blur-[100px] rounded-full" />
          
          {/* Grid pattern overlay (Mantenemos la textura) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(238,114,3,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(238,114,3,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* MAIN HERO GRID */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* LEFT COLUMN: TEXT & CTA */}
            <div className="space-y-8 animate-fadeIn">
              
              {/* Badge with enhanced styling */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112C3E] to-[#0d2230] text-[#EE7203] text-xs font-bold tracking-widest uppercase rounded-full border border-[#EE7203]/30 shadow-lg shadow-[#EE7203]/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF3816] mr-2 animate-pulse shadow-[0_0_8px_rgba(255,56,22,0.6)]"></span>
                Corporate Training Excellence
              </div>
              
              {/* Main Headline with stagger animation */}
              <div className="space-y-2">
                <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter animate-slideUp">
                  <span className="inline-block" style={{animationDelay: '0.1s'}}>ENGLISH</span>
                </h1>
                <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter animate-slideUp" style={{animationDelay: '0.2s'}}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] bg-[length:200%_auto] animate-gradient">
                    BOOSTER
                  </span>
                </h1>
              </div>
              
              {/* Subheadline with emphasis */}
              <p className="text-2xl md:text-3xl font-light text-gray-300 max-w-xl leading-snug animate-slideUp" style={{animationDelay: '0.3s'}}>
                From <span className="text-white font-bold relative inline-block">
                  Daily Communication
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#EE7203] to-transparent"></span>
                </span> to <span className="text-[#EE7203] font-bold">Client Impact</span>
              </p>
              
              {/* Description */}
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed animate-slideUp" style={{animationDelay: '0.4s'}}>
                Highly practical <span className="text-white font-semibold">in-person modules</span> designed to solve specific communication challenges in English. Each session targets a concrete workplace problem with clear objectives and immediate results.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 animate-slideUp" style={{animationDelay: '0.5s'}}>
                
                <a 
  href="#modules" 
  className="group px-10 py-5 bg-gradient-to-r from-[#EE7203] to-[#FF3816] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#EE7203]/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
>
  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
  <span className="relative z-10">Start Boosting</span>
  <ChevronRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300"/>
</a>
                
               
              </div>

              {/* Quick Stats Bar */}
              <div className="flex flex-wrap gap-8 pt-6 animate-slideUp" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center gap-2 text-gray-400 group cursor-default">
                  <Zap size={20} className="text-[#EE7203] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Immediate Application</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 group cursor-default">
                  <Users size={20} className="text-[#EE7203] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Live Feedback</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 group cursor-default">
                  <Target size={20} className="text-[#EE7203] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Real Scenarios</span>
                </div>
              </div>
            </div>
            
            {/* RIGHT COLUMN: VIDEO PLAYER */}
            <div className="relative group animate-fadeIn" style={{animationDelay: '0.3s'}}>
              {/* Animated gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] rounded-3xl blur-sm opacity-30 group-hover:opacity-60 transition-all duration-500 animate-gradient bg-[length:200%_auto]"></div>
              
              {/* Video Container with glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden border border-[#EE7203]/30 bg-gradient-to-br from-[#112C3E]/60 to-[#000]/80 backdrop-blur-xl shadow-2xl shadow-[#EE7203]/20 group-hover:shadow-[#EE7203]/40 transition-all duration-500">
                <video 
                  className="w-full h-auto object-cover aspect-video"
                  controls 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play indicator overlay (shown when video is paused) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full bg-[#EE7203]/20 backdrop-blur-md flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#EE7203]/10 rounded-full blur-2xl animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#FF3816]/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

        </div>
      </section>

      {/* --- NUEVA SECCIÓN: PROGRAM DETAILS (CON FONDO DISTINTO) --- */}
      <section className="py-24 bg-[#08151D] border-t border-[#112C3E] relative overflow-hidden">
        
        {/* Decoración de fondo sutil para esta sección */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#EE7203]/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-[#FF3816]/5 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Título de la sección (Opcional, para dar contexto) */}
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Methodology & Objectives</h2>
             <div className="h-1 w-20 bg-gradient-to-r from-[#EE7203] to-[#FF3816] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* What are the Modules? */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EE7203]/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative h-full p-8 bg-[#0C212D] rounded-3xl border border-[#112C3E] hover:border-[#EE7203]/30 transition-all duration-300 hover:-translate-y-1 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#112C3E] flex items-center justify-center border border-[#EE7203]/20 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle size={28} className="text-[#EE7203]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">What Are the Modules?</h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  <span className="text-[#EE7203] font-semibold">In-person training sessions</span>, highly practical and laser-focused. Each module is designed to address a specific English communication challenge in the workplace.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#091821] border border-[#112C3E]">
                    <div className="w-2 h-2 rounded-full bg-[#EE7203] mt-2.5 flex-shrink-0 shadow-[0_0_8px_#EE7203]"></div>
                    <p className="text-gray-400"><span className="text-white font-medium block mb-1">Clear structure</span> Each session has a defined start and finish.</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#091821] border border-[#112C3E]">
                    <div className="w-2 h-2 rounded-full bg-[#EE7203] mt-2.5 flex-shrink-0 shadow-[0_0_8px_#EE7203]"></div>
                    <p className="text-gray-400"><span className="text-white font-medium block mb-1">Targeted approach</span> One problem, one solution, immediate impact.</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#091821] border border-[#112C3E]">
                    <div className="w-2 h-2 rounded-full bg-[#EE7203] mt-2.5 flex-shrink-0 shadow-[0_0_8px_#EE7203]"></div>
                    <p className="text-gray-400"><span className="text-white font-medium block mb-1">Active learning</span> Practice-based methodology with real-world scenarios.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Objectives */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3816]/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative h-full p-8 bg-[#0C212D] rounded-3xl border border-[#112C3E] hover:border-[#FF3816]/30 transition-all duration-300 hover:-translate-y-1 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#112C3E] flex items-center justify-center border border-[#FF3816]/20 group-hover:scale-110 transition-transform duration-300">
                    <Target size={28} className="text-[#FF3816]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Module Objectives</h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Every session is designed with <span className="text-[#FF3816] font-semibold">four core goals</span> in mind to ensure maximum efficiency:
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-4 p-3 bg-[#091821]/50 border-l-2 border-[#EE7203] pl-4">
                    <span className="text-[#EE7203] font-bold text-lg">01</span>
                    <p className="text-gray-300 text-sm font-medium">Solve Real Workplace Situations</p>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#091821]/50 border-l-2 border-[#FF3816] pl-4">
                    <span className="text-[#FF3816] font-bold text-lg">02</span>
                    <p className="text-gray-300 text-sm font-medium">Build Fluency & Confidence</p>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#091821]/50 border-l-2 border-[#EE7203] pl-4">
                    <span className="text-[#EE7203] font-bold text-lg">03</span>
                    <p className="text-gray-300 text-sm font-medium">Acquire Immediate-Use Vocabulary</p>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#091821]/50 border-l-2 border-[#FF3816] pl-4">
                    <span className="text-[#FF3816] font-bold text-lg">04</span>
                    <p className="text-gray-300 text-sm font-medium">Practice with Live Feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* --- LOGISTICS SECTION (LAYOUT "BENTO" / 2 FILAS) --- */}
      <section id="program" className="relative py-24 bg-[#091821] border-y border-[#112C3E] overflow-hidden">
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(238,114,3,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header igual que antes */}
          <div className="text-center mb-16 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#112C3E]/50 rounded-full border border-[#EE7203]/20 mb-6">
              <Sparkles size={16} className="text-[#EE7203]" />
              <span className="text-sm font-semibold text-[#EE7203] uppercase tracking-wide">Program Details</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] to-[#FF3816]">Logistics</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Flexible, focused sessions designed to fit your team's schedule and needs
            </p>
          </div>

          {/* --- GRID NUEVO: 2 COLUMNAS --- */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* 1. DURATION */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EE7203]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative p-8 bg-gradient-to-br from-[#0C212D] to-[#091821] rounded-2xl border border-[#112C3E] hover:border-[#EE7203]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#EE7203]/10 h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#112C3E] to-[#0d2230] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#FF3816]/20">
                    <Clock className="w-7 h-7 text-[#FF3816]" />
                    </div>
                    <span className="bg-[#FF3816]/10 text-[#FF3816] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#FF3816]/20">Time</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Duration</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Each module lasts <strong className="text-white font-bold">4 hours</strong> total.
                </p>
                <div className="inline-block bg-[#112C3E] px-4 py-2 rounded-lg border border-[#EE7203]/20 text-sm text-gray-300">
                    Splitted into <span className="text-[#EE7203] font-semibold">two 2-hour sessions</span>
                </div>
              </div>
            </div>
            
            {/* 2. FREQUENCY */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EE7203]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative p-8 bg-gradient-to-br from-[#0C212D] to-[#091821] rounded-2xl border border-[#112C3E] hover:border-[#EE7203]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#EE7203]/10 h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#112C3E] to-[#0d2230] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#EE7203]/20">
                    <Calendar className="w-7 h-7 text-[#EE7203]" />
                    </div>
                    <span className="bg-[#EE7203]/10 text-[#EE7203] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#EE7203]/20">Pace</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Frequency</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  <strong className="text-white font-bold">1 weekly encounter</strong> per module.
                </p>
                <div className="inline-block bg-[#112C3E] px-4 py-2 rounded-lg border border-[#EE7203]/20 text-sm text-gray-300">
                    Designed for <span className="text-[#EE7203] font-semibold">immediate application</span>
                </div>
              </div>
            </div>

            {/* 3. LOCATIONS (FULL WIDTH) */}
            <div id="locations" className="group relative md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3816]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#0C212D] to-[#091821] rounded-2xl border border-[#112C3E] hover:border-[#EE7203]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF3816]/10">
                
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-b border-[#112C3E] pb-8 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#112C3E] to-[#0d2230] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#FF3816]/20">
                        <MapPin className="w-8 h-8 text-[#FF3816]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">In-Person Locations</h3>
                        <p className="text-gray-400 max-w-2xl">
                            Experience our immersive sessions in our premium corporate rooms located in 5 major cities.
                        </p>
                    </div>
                </div>

                {/* Grid interno de 3 a 5 columnas para las ciudades */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { city: 'Mar del Plata', room: 'Bristol Room' },
                    { city: 'Rosario', room: 'Pichincha Room' },
                    { city: 'Córdoba', room: 'Córdoba Room' },
                    { city: 'Salta', room: 'Cafayate Room' },
                    { city: 'Mendoza', room: 'Valle de Uco Room' },
                  ].map((item) => (
                    <div 
                        key={item.city} 
                        className="bg-[#112C3E]/50 border border-[#112C3E] rounded-xl p-4 hover:bg-[#EE7203]/10 hover:border-[#EE7203]/30 transition-all duration-300 group/item text-center"
                    >
                      <span className="block text-white font-bold text-sm mb-1">{item.city}</span>
                      <span className="inline-block text-[#EE7203] text-[10px] font-bold uppercase tracking-wider bg-[#EE7203]/10 px-2 py-0.5 rounded group-hover/item:bg-[#EE7203] group-hover/item:text-white transition-colors">
                        {item.room}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      

      {/* --- CAPSULES GRID --- */}
      <CapsulasGrid 
        modules={modules} 
        selectedIds={selectedCapsules} 
        onToggle={toggleCapsule} 
      />

{/* --- PROMO: CONVERSATIONAL CLUB --- */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#091821]">
  {/* Ya no necesitas el div con bg-[#0C212D] porque la section tiene su propio bg */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-r from-[#EE7203]/10 to-[#112C3E]/50 opacity-30"></div>
  </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative rounded-3xl overflow-hidden border border-[#EE7203]/40 bg-[#08151D] shadow-2xl">
            {/* Decorative Top Line */}
            <div className="h-2 w-full bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203]"></div>
            
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 items-center">
              
              {/* Left: Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EE7203]/10 text-[#EE7203] rounded-full text-xs font-bold uppercase tracking-wider border border-[#EE7203]/20">
                  <Star size={14} fill="currentColor" />
                  Premium In-Person Experience
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Looking for continuous <br />
                  <span className="text-[#EE7203]">Conversation Practice?</span>
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  Discover the <strong>Conversational Club Federal</strong>. Eliminate the gap between classroom English and authentic real-world communication.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="text-[#EE7203] shrink-0" size={20}/>
                    <span>Tailored for <strong>B1 & B2 Ahead</strong> Levels</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="text-[#EE7203] shrink-0" size={20}/>
                    <span>Small groups (8 spots) in <strong>5 major cities</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="text-[#EE7203] shrink-0" size={20}/>
                    <span>Discuss current events & real-world topics</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <a 
                    href="https://conversationalclub-federal.furthercorporate.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0C212D] font-bold rounded-xl hover:bg-[#EE7203] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#EE7203]/30 transform hover:-translate-y-1"
                  >
                    Explore Conversational Club
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Right: Visual Abstract Representation */}
              <div className="relative h-full min-h-[300px] bg-gradient-to-br from-[#112C3E] to-[#091821] rounded-2xl border border-[#112C3E] p-8 flex flex-col justify-center items-center text-center overflow-hidden group">
                 {/* Decorative Blobs */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#EE7203]/20 rounded-full blur-[80px] group-hover:bg-[#EE7203]/30 transition-colors"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF3816]/20 rounded-full blur-[80px] group-hover:bg-[#FF3816]/30 transition-colors"></div>
                 
                 <div className="relative z-10 space-y-4">
                    <div className="w-20 h-20 bg-[#EE7203] rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-[#EE7203]/20 rotate-3 group-hover:rotate-6 transition-transform">
                      <MessageCircle size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Federal Network</h3>
                    <p className="text-sm text-gray-400">
                      Mar del Plata • Rosario • Córdoba <br/> Salta • Mendoza
                    </p>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (SIN FONDO, TARJETAS DE ALTO CONTRASTE) --- */}
      <section className="py-24 relative border-y border-[#112C3E]">
        
        {/* Patrón de puntos sutil para dar textura al fondo vacío */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A4C_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 p-3 bg-[#112C3E] rounded-full border border-[#EE7203]/20 shadow-lg shadow-[#EE7203]/10">
               <HelpCircle size={32} className="text-[#EE7203]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#EE7203] to-[#FF3816] mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="group relative bg-[#132F42] p-8 rounded-2xl border border-[#2A4A61] hover:border-[#EE7203] transition-all duration-300 shadow-xl hover:shadow-[#EE7203]/10 hover:-translate-y-1">
                
                {/* Efecto de luz naranja lateral al hacer hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EE7203] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex items-start gap-5">
                  {/* Icono Q: Fondo oscuro para contrastar con la tarjeta clara */}
                  <div className="mt-1 bg-[#091821] p-3 rounded-xl text-[#EE7203] border border-[#2A4A61] group-hover:border-[#EE7203]/50 group-hover:scale-110 transition-all shadow-inner">
                    <span className="font-bold text-lg leading-none">Q.</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#EE7203] transition-colors">{faq.question}</h3>
                    {/* Texto más claro para mejor lectura */}
                    <p className="text-gray-300 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- ENHANCED FOOTER --- */}
      <footer id="contact" className="relative bg-[#091821] border-t border-[#112C3E] pt-24 pb-10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE7203]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            
            {/* Left Column: Brand & Slogan */}
            <div className="space-y-6">
              <div className="inline-block">
                <Image 
                  src="/images/logo.png"
                  alt="Further Corporate" 
                  width={200}
                  height={55}
                  className="brightness-110"
                />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                The more you know, <br />
                the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] to-[#FF3816]">FURTHER</span> you'll go!
              </h2>
              
              <div className="flex gap-3 mb-6">
                <div className="h-1.5 w-16 bg-[#EE7203] rounded-full animate-pulse" />
                <div className="h-1.5 w-10 bg-[#FF3816] rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                <div className="h-1.5 w-6 bg-[#EE7203] rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
              
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Empowering global teams through targeted language strategies and practical communication solutions.
              </p>

              {/* Social proof badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#112C3E]/40 rounded-lg border border-[#EE7203]/20">
                <CheckCircle2 size={16} className="text-[#EE7203]" />
                <span className="text-sm text-gray-300">Trusted by leading companies</span>
              </div>
            </div>
            
            {/* Right Column: Contact Info */}
            <div className="space-y-6">
              <div className="relative group">
                {/* Glow Effect de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#EE7203]/5 to-transparent rounded-2xl blur-xl"></div>
                
                {/* Contenedor Principal (Card) */}
                <div className="relative bg-gradient-to-br from-[#112C3E]/40 to-[#0d2230]/20 p-8 rounded-2xl border border-[#112C3E] backdrop-blur-sm">
                  
                  {/* Título */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EE7203] to-[#FF3816] flex items-center justify-center shadow-lg shadow-[#EE7203]/20">
                      <Mail size={20} className="text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl tracking-tight">Get in Touch</h3>
                  </div>
                  
                  <div className="space-y-6">
                    
                    {/* 1. EMAIL (Principal) */}
                    <div className="group flex items-start gap-4 p-5 bg-[#0C212D]/60 rounded-xl border border-[#112C3E] hover:border-[#EE7203]/50 hover:bg-[#112C3E]/60 transition-all duration-300">
                      <Mail className="text-[#EE7203] shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20}/>
                      <div className="overflow-hidden">
                        <p className="text-white font-medium mb-1">Email Us</p>
                        <a 
                          href="mailto:coordinacionacademica@furthercorporate.com" 
                          className="text-gray-400 text-sm hover:text-[#EE7203] transition-colors leading-relaxed block break-all"
                        >
                          coordinacionacademica@furthercorporate.com
                        </a>
                      </div>
                    </div>

                    {/* Separador Visual Sutil */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#112C3E] to-transparent"></div>

                    {/* 2. REDES SOCIALES (Fila de botones) */}
                    <div>
                      <p className="text-gray-400 text-sm mb-4 font-medium pl-1">Follow us</p>
                      <div className="flex gap-4">
                        {/* Instagram */}
                        <a 
                          href="https://www.instagram.com/furthercorporate/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center p-3 bg-[#0C212D]/60 rounded-xl border border-[#112C3E] hover:border-[#EE7203] hover:text-[#EE7203] hover:-translate-y-1 text-gray-400 transition-all duration-300 shadow-sm"
                          aria-label="Instagram"
                        >
                           <Instagram size={22} />
                        </a>

                        {/* LinkedIn */}
                        <a 
                          href="https://www.linkedin.com/company/furthercorporate/posts/?feedView=all" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center p-3 bg-[#0C212D]/60 rounded-xl border border-[#112C3E] hover:border-[#0077b5] hover:text-[#0077b5] hover:-translate-y-1 text-gray-400 transition-all duration-300 shadow-sm"
                          aria-label="LinkedIn"
                        >
                           <Linkedin size={22} />
                        </a>

                        {/* YouTube */}
                        <a 
                          href="https://www.youtube.com/@furthercorporate" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center p-3 bg-[#0C212D]/60 rounded-xl border border-[#112C3E] hover:border-[#FF0000] hover:text-[#FF0000] hover:-translate-y-1 text-gray-400 transition-all duration-300 shadow-sm"
                          aria-label="YouTube"
                        >
                           <Youtube size={22} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright Bar */}
          <div className="border-t border-[#112C3E] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Further Corporate. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <p className="text-gray-600">English Booster Program</p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#EE7203]/50"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FF3816]/50"></div>
                  <div className="w-2 h-2 rounded-full bg-[#EE7203]/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* --- CHATBOT WIDGET --- */}
<ChatbotWidget preSelectedModules={selectedCapsules} />

   
      
    </main>
  );
}