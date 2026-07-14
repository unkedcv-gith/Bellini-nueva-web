import { motion } from 'motion/react';
import { Lock } from 'lucide-react';


export function Contact() {
  return (
    <section className="w-full h-full relative px-6 md:px-16 lg:px-24 pt-20 sm:pt-28 md:pt-32 pb-16 md:pb-20 flex flex-col justify-center bg-[#0a0a0a] text-bellini-primary overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full max-h-[85vh] lg:max-h-none overflow-y-auto lg:overflow-visible py-4 custom-scrollbar">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 font-light leading-none"
            >
              Agenda <br className="hidden md:block"/>
              <span className="italic">una sesión.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[12px] text-[#8e8e8e] font-light max-w-sm mb-6 md:mb-10"
            >
              Nuestro concierge programará una cita inicial para realizar una valoración personalizada de su estética dental.
            </motion.p>

            <address className="not-italic text-[10px] md:text-[11px] uppercase tracking-widest text-[#8e8e8e] space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-bellini-primary mb-1 font-medium">Ubicación</p>
                <p>Av. Alvear 1890, Recoleta</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-[#f4f3ef] mb-1 font-medium">Línea Directa</p>
                <p className="font-serif tracking-widest text-[11px] md:text-[12px]">+54 11 4000 0000</p>
              </motion.div>
            </address>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full flex justify-end"
          >
            <form className="w-full max-w-md flex flex-col gap-6 md:gap-8 border-t border-[#333] pt-6 md:pt-8" onSubmit={(e) => e.preventDefault()}>
              
              <div className="relative group">
                <input type="text" id="name" placeholder=" " className="peer w-full bg-transparent border-b border-[#333] py-2 text-[12px] md:text-[13px] text-white focus:outline-none focus:border-[#f4f3ef] transition-colors" required />
                <label htmlFor="name" className="absolute left-0 top-2 text-[10px] text-[#8e8e8e] uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-valid:-top-4 peer-valid:text-[8px]">Nombre completo</label>
              </div>

              <div className="relative group">
                <input type="email" id="email" placeholder=" " className="peer w-full bg-transparent border-b border-[#333] py-2 text-[12px] md:text-[13px] text-white focus:outline-none focus:border-[#f4f3ef] transition-colors" required />
                <label htmlFor="email" className="absolute left-0 top-2 text-[10px] text-[#8e8e8e] uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-valid:-top-4 peer-valid:text-[8px]">Correo electrónico</label>
              </div>

              <div className="relative group">
                <textarea id="message" rows={2} placeholder=" " className="peer w-full bg-transparent border-b border-[#333] py-2 text-[12px] md:text-[13px] text-white focus:outline-none focus:border-[#f4f3ef] transition-colors resize-none" required></textarea>
                <label htmlFor="message" className="absolute left-0 top-2 text-[10px] text-[#8e8e8e] uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-valid:-top-4 peer-valid:text-[8px]">Motivo de consulta</label>
              </div>

              <button type="submit" className="self-start mt-2 text-[9px] uppercase tracking-[0.2em] px-6 py-3 border border-[#f4f3ef] text-[#f4f3ef] hover:bg-[#f4f3ef] hover:text-[#0a0a0a] transition-all duration-500 cursor-pointer">
                Enviar solicitud
              </button>

            </form>
          </motion.div>
        </div>

        {/* Integrated Luxury Editorial Footer */}
        <div className="w-full border-t border-[#222] pt-6 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-[#555] gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Bellini Dental Studio.</span>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('bellini-open-admin'));
              }}
              className="opacity-[0.03] hover:opacity-80 transition-opacity ml-1 bg-transparent border-none text-[#ECE8E1] cursor-pointer"
              title=""
            >
              <Lock size={9} />
            </button>
          </div>
          <div className="flex flex-col items-center">

            <span className="text-[12px] md:text-[14px] tracking-[0.25em] font-serif uppercase text-bellini-primary">
              Bellini
            </span>
            <span className="text-[5px] md:text-[6px] tracking-[0.4em] font-sans uppercase text-bellini-primary/80 mt-1">
              Odontología
            </span>
          </div>
          <div className="flex gap-6 pointer-events-auto">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>

      </div>
    </section>
  )
}
