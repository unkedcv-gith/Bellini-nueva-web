import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Send, CheckCircle2, X } from 'lucide-react';
import { Watermark } from './Watermark';
import { cleanArgentinePhoneNumber } from '../lib/phone';
import coursesBg from '../assets/images/cursos_bg_classroom_1784659978057.jpg';

export function Courses() {
  const rawPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '5492216105296';
  const cleanPhone = cleanArgentinePhoneNumber(rawPhone);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hola! Quisiera unirme a la lista de espera para los próximos cursos de la Academia Bellini.")}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section className="relative w-full h-full min-h-screen md:min-h-full bg-[#0a0a0a] flex items-center justify-center pt-24 sm:pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Reference Image - Dental Masterclass Classroom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <img 
          src={coursesBg} 
          alt="Academia Bellini Masterclass Background" 
          className="w-full h-full object-cover object-center grayscale contrast-110 opacity-30 mix-blend-luminosity"
        />
        {/* Dark Vignette and Radial Gradients for legibility and seamless aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0a0a0a_85%)]" />
      </div>

      {/* Subtle structural grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', 
          backgroundSize: '100px 100px' 
        }} 
      />
      
      <Watermark text="ACADEMIA" className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" />

      {/* Main Centered Minimal Block */}
      <div className="w-full max-w-xl relative flex flex-col items-center text-center px-4 py-8 z-10 my-auto">
        
        {/* 1. PRÓXIMAMENTE - bien al medio */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-2xl sm:text-3xl md:text-4xl font-serif text-bellini-primary uppercase tracking-[0.28em] font-light leading-none">
            Próximamente
          </span>
          <div className="w-14 h-[1px] bg-bellini-primary/40 mt-5" />
        </div>

        {/* 2. Academia BELLINI - con un buen espacio vertical */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4f3ef] font-light tracking-tight mb-3">
          Academia <span className="font-serif uppercase tracking-[0.22em] text-bellini-primary ml-1.5">BELLINI</span>
        </h2>

        {/* 3. Subtitle / Formación continua */}
        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#a3a6ac] font-light mb-6">
          Formación continua para odontólogos
        </span>

        {/* 4. Description */}
        <p className="text-xs sm:text-sm text-[#8e8e8e] font-light max-w-md leading-relaxed text-center mb-10">
          Capacitación de posgrado y masterclasses enfocadas en la excelencia clínica, estética dental avanzada y odontología digital guiada.
        </p>

        {/* 5. Button - Exact style match with 'Consultar caso' (Bone color #FAF7F0, semi-rounded pill, text #0a0a0a, hover white) */}
        <div className="flex justify-center w-full">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-[9px] sm:text-[10px] uppercase tracking-[0.2em] bg-[#FAF7F0] text-[#0a0a0a] border border-[#FAF7F0] px-7 py-3.5 rounded-full hover:bg-white hover:border-white transition-all duration-300 font-bold cursor-pointer whitespace-nowrap active:scale-95 inline-flex items-center justify-center gap-2.5 shadow-xl"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0a0a0a] shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span className="whitespace-nowrap">Unirme a la lista de espera</span>
          </a>
        </div>

      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#111111] border border-white/15 p-6 sm:p-8 rounded-sm shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#8e8e8e] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-bellini-primary block mb-1">
                  Academia Bellini
                </span>
                <h3 className="text-xl font-serif text-white font-light">
                  Lista de Espera para Cursos
                </h3>
                <p className="text-xs text-[#a3a6ac] font-light mt-1">
                  Déjenos sus datos para recibir la propuesta académica y prioridad en los cupos.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-[#141814] border border-emerald-500/30 rounded-sm flex flex-col items-center text-center gap-3 my-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <h4 className="text-sm font-serif text-white font-medium">
                    ¡Registro Exitoso!
                  </h4>
                  <p className="text-xs text-[#a3a6ac] font-light">
                    Le notificaremos en cuanto abramos las inscripciones para las próximas masterclasses.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsModalOpen(false);
                      setFormData({ name: '', email: '', profession: '', message: '' });
                    }}
                    className="mt-2 text-[10px] font-mono text-bellini-primary hover:underline uppercase tracking-widest cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#a3a6ac] mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 focus:border-bellini-primary/60 rounded-sm px-3.5 py-2.5 text-xs text-[#ece8e1] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#a3a6ac] mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="doctor@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 focus:border-bellini-primary/60 rounded-sm px-3.5 py-2.5 text-xs text-[#ece8e1] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#a3a6ac] mb-1">
                      Especialidad / Matrícula
                    </label>
                    <input
                      type="text"
                      placeholder="Odontología General / Estética"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 focus:border-bellini-primary/60 rounded-sm px-3.5 py-2.5 text-xs text-[#ece8e1] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#a3a6ac] mb-1">
                      Consulta adicional
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Comentarios o temas de su interés..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 focus:border-bellini-primary/60 rounded-sm px-3.5 py-2.5 text-xs text-[#ece8e1] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] bg-[#FAF7F0] text-[#0a0a0a] border border-[#FAF7F0] px-6 py-3 rounded-full hover:bg-white hover:border-white transition-all duration-300 font-bold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Registrando...' : 'Confirmar Registro'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
