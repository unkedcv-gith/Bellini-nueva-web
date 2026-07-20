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
    { title: 'Estética', subtitle: 'Dental', desc: 'Carillas cerámicas ultrafinas, blanqueamiento de alta precisión y escultura dental personalizada.', img: img1 },
    { title: 'Rehabilitación', subtitle: 'Oral', desc: 'Prótesis de alta durabilidad y restauración dental guiada digitalmente.', img: img2 },
    { title: 'Implantes', subtitle: '3D', desc: 'Cirugía guiada mínimamente invasiva con carga inmediata de alta predictibilidad.', img: img3 },
    { title: 'Diseño', subtitle: 'Digital', desc: 'Planificación 3D y mockup personalizado para previsualizar su sonrisa ideal.', img: img4 },
    { title: 'Ortodoncia', subtitle: 'Invisible', desc: 'Alineadores transparentes secuenciados mediante ortodoncia digital avanzada.', img: img5 },
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
        <div className="sticky top-0 z-20 w-full md:relative md:top-auto md:z-auto md:w-[45%] h-[180px] xs:h-[210px] md:h-auto md:min-h-[580px] border-b md:border-b-0 md:border-r border-white/5 bg-[#0b0b0b] overflow-hidden flex items-center justify-center shrink-0 shadow-xl md:shadow-none">
          {/* Subtle glowing ambient behind image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Continuous slow pan image viewport with clean editorial spacing */}
          <div className="absolute inset-3 md:inset-6 overflow-hidden rounded-lg group">
            <AnimatePresence>
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: 0.85, 
                  scale: 1, 
                }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                src={services[activeIndex].img}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-104 group-hover:opacity-100"
              />
            </AnimatePresence>

            {/* Contemporary artistic layout lines & frames */}
            <div className="absolute inset-0 border border-white/10 pointer-events-none z-10 rounded-lg" />
            
            {/* Elegant corner bracket design indicators */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/20 pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/20 pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/20 pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/20 pointer-events-none z-20" />
          </div>
        </div>

        {/* Right Panel: The Ledger List */}
        <div className="w-full md:w-[55%] flex flex-col pt-4 md:pt-0 justify-center">
           {services.map((service, index) => {
             const isActive = activeIndex === index;
             return (
               <motion.div
                 key={service.title}
                 onMouseEnter={() => onSubSlideChange(index)}
                 onClick={() => onSubSlideChange(index)}
                 className="group relative flex flex-col py-4 xs:py-5 md:py-6 lg:py-8 px-6 md:px-12 lg:px-16 border-b border-white/5 last:border-b-0 cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-white/[0.02]"
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
