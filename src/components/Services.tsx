import { motion, AnimatePresence } from 'motion/react';
import { Watermark } from './Watermark';

// Use actual images from the project
import img1 from '../assets/images/bellini_imagen_1_1.jpeg';
import img2 from '../assets/images/bellini_imagen_14_1.jpeg';
import img3 from '../assets/images/bellini_imagen_15_1.jpeg';
import img4 from '../assets/images/bellini_imagen_13.jpeg';
import img5 from '../assets/images/bellini_imagen_12_1.jpeg';

interface ServicesProps {
  activeSubSlide: number;
  onSubSlideChange: (val: number) => void;
}

export function Services({ activeSubSlide, onSubSlideChange }: ServicesProps) {
  const activeIndex = activeSubSlide;

  const services = [
    { title: 'Estética', subtitle: 'Dental', desc: 'Carillas cerámicas de espesor mínimo, blanqueamiento de alta precisión y escultura de composites.', img: img1 },
    { title: 'Rehabilitación', subtitle: 'Oral', desc: 'Restauración integral de la función y biología con materiales biomiméticos de última generación.', img: img2 },
    { title: 'Implantes', subtitle: '3D', desc: 'Implantología guiada por software 3D para posicionamiento quirúrgico milimétrico sin incisiones mayores.', img: img3 },
    { title: 'Diseño', subtitle: 'Digital', desc: 'Arquitectura dental digital. Planificación para predecir el resultado final con exactitud.', img: img4 },
    { title: 'Ortodoncia', subtitle: 'Invisible', desc: 'Alineación silenciosa y eficiente. Micro-movimientos calculados para un flujo ininterrumpido diario.', img: img5 },
  ];

  return (
    <section className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center pt-24 sm:pt-28 pb-16 md:pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Subtle grid background for structural web feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', 
          backgroundSize: '100px 100px' 
        }} 
      />
      
      <Watermark text="EXCELENCIA" className="top-1/3 left-10 opacity-10" />

      {/* Main Content Box with fine borders */}
      <div className="w-full max-w-[1280px] border border-white/5 relative flex flex-col md:flex-row bg-[#0a0a0a]/50 backdrop-blur-sm shadow-2xl z-10 mt-12 md:mt-0 overflow-y-auto md:overflow-visible max-h-[75vh] md:max-h-none custom-scrollbar">
        
        {/* Exquisite corner markings (filetes) */}
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-bellini-primary" />
        <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-bellini-primary" />
        <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-bellini-primary" />
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-bellini-primary" />
        
        {/* Left Panel: Entirely dedicated to the modern, elegant, and contemporary visual gallery */}
        <div className="w-full md:w-[45%] min-h-[420px] md:min-h-[580px] border-b md:border-b-0 md:border-r border-white/5 relative bg-[#0b0b0b] overflow-hidden flex items-center justify-center">
          {/* Subtle glowing ambient behind image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Continuous slow pan image viewport with clean editorial spacing */}
          <div className="absolute inset-4 md:inset-6 overflow-hidden rounded-lg group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1, filter: 'brightness(0.6) contrast(1.05)' }}
                animate={{ 
                  opacity: 0.85, 
                  scale: 1.02, 
                  filter: 'brightness(0.95) contrast(1)',
                }}
                exit={{ opacity: 0, scale: 0.97, filter: 'brightness(0.5) contrast(0.95)' }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                src={services[activeIndex].img}
                className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-104 group-hover:opacity-100 group-hover:filter group-hover:brightness-100"
              />
            </AnimatePresence>

            {/* Contemporary artistic layout lines & frames */}
            <div className="absolute inset-0 border border-white/10 pointer-events-none z-10 rounded-lg" />
            
            {/* Elegant corner bracket design indicators */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/20 pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/20 pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/20 pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/20 pointer-events-none z-20" />

            {/* Modern vertical text strip decoration */}
            <div className="absolute top-6 left-6 flex items-center gap-2 z-20 mix-blend-difference">
              <span className="text-[7px] font-mono tracking-[0.4em] text-white/40 uppercase">
                CLINICAL PRACTICE //
              </span>
              <span className="text-[7px] font-mono tracking-[0.2em] text-bellini-primary uppercase">
                {services[activeIndex].title}
              </span>
            </div>

            {/* Bottom minimal HUD bar */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20 mix-blend-difference">
              <div className="flex flex-col">
                <span className="text-[6px] uppercase tracking-[0.3em] text-white/30 mb-0.5 font-mono">REGISTRO DIGITAL</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/95 font-light font-sans">FIG. 0{activeIndex + 1}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[6px] uppercase tracking-[0.3em] text-white/30 mb-0.5 font-mono">DISCIPLINA</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-bellini-primary font-medium font-sans">
                  {services[activeIndex].title} {services[activeIndex].subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: The Ledger List */}
        <div className="w-full md:w-[55%] flex flex-col pt-8 md:pt-0 justify-center">
           {services.map((service, index) => {
             const isActive = activeIndex === index;
             return (
               <motion.div
                 key={service.title}
                 onMouseEnter={() => onSubSlideChange(index)}
                 className="group relative flex flex-col py-6 lg:py-8 px-8 md:px-12 lg:px-16 border-b border-white/5 last:border-b-0 cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-white/[0.02]"
               >
                 {/* Fine vertical line on active */}
                 <div className={`absolute left-0 top-0 bottom-0 w-[1px] transition-colors duration-500 ${isActive ? 'bg-bellini-primary' : 'bg-transparent'}`} />
                 
                 <div className="relative flex items-center justify-between gap-4 z-10">
                   <div className="flex items-end gap-6 md:gap-10">
                     <span className={`text-[9px] font-mono tracking-widest pb-1 transition-colors duration-500 ${isActive ? 'text-bellini-primary' : 'text-[#A3A6AC]/30'}`}>
                       0{index + 1}
                     </span>
                     <h2 className={`font-serif text-2xl md:text-3xl lg:text-4xl transition-all duration-500 font-light ${isActive ? 'text-bellini-bone italic' : 'text-[#A3A6AC]/60'}`}>
                       {service.title}
                     </h2>
                   </div>
                   
                   <div className="hidden sm:flex items-center gap-4">
                     <span className={`text-[8px] uppercase tracking-[0.3em] text-right transition-colors duration-500 ${isActive ? 'text-bellini-primary' : 'text-[#A3A6AC]/30'}`}>
                       {service.subtitle}
                     </span>
                     <div className={`w-8 h-[1px] transition-colors duration-500 ${isActive ? 'bg-bellini-primary/50' : 'bg-white/10'}`} />
                   </div>
                  </div>

                  <AnimatePresence>
                   {isActive && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                       exit={{ height: 0, opacity: 0, marginTop: 0 }}
                       className="pl-14 md:pl-[3.75rem] overflow-hidden"
                     >
                       <p className="text-[11px] md:text-[12px] text-[#A3A6AC] font-light max-w-sm leading-relaxed border-l border-white/10 pl-5 py-0.5">
                         {service.desc}
                       </p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             )
           })}
        </div>
        
      </div>
    </section>
  );
}
