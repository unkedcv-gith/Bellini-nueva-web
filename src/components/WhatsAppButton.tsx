import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppButtonProps {
  activeSection?: string;
  phoneNumber?: string;
}

export function WhatsAppButton({
  activeSection = 'hero',
  phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5492216105296'
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 1. Hide on hero section (the slide)
  if (activeSection === 'hero') {
    return null;
  }

  // 2. Determine preset text and labels based on section
  const isCourses = activeSection === 'cursos';
  const message = isCourses
    ? "Hola! Quisiera recibir información sobre los próximos cursos de la Academia Bellini."
    : "Hola! Quisiera realizar una consulta / solicitar un turno en la clínica Bellini Odontología.";
  
  const labelText = isCourses
    ? "Información de Cursos"
    : "Consultar Turno";

  const encodedMessage = encodeURIComponent(message);
  const rawPhone = phoneNumber || '5492216105296';
  const digits = rawPhone.replace(/[^0-9]/g, '');
  const cleanPhone = digits.startsWith('549') 
    ? digits 
    : digits.startsWith('54') 
      ? '549' + digits.slice(2) 
      : '549' + digits;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center gap-3 pointer-events-auto select-none">
      <AnimatePresence>
        {isHovered && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden sm:flex items-center gap-2 bg-[#121110]/95 text-[#FAF7F0] border border-[#B89C5D]/40 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-medium hover:border-[#B89C5D] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>{labelText}</span>
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label={labelText}
        className="relative group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#121110] text-[#B89C5D] border border-[#B89C5D]/40 hover:border-[#B89C5D] hover:bg-[#B89C5D] hover:text-[#121110] shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer"
      >
        {/* Subtle glowing ring pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#B89C5D] opacity-10 group-hover:opacity-30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

        {/* Dynamic Green dot indicator for live presence */}
        <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#121110]" />

        {/* Elegant Minimal WhatsApp Icon SVG */}
        <svg className="w-5 h-5 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </motion.a>
    </div>
  );
}
