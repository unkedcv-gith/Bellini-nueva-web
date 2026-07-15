import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import img10 from '../assets/images/bellini_imagen_10_1.jpeg';
import img11 from '../assets/images/bellini_imagen_11_1.jpeg';
import img12 from '../assets/images/bellini_imagen_12_1.jpeg';

interface HeroProps {
  activeSubSlide?: number;
  onSubSlideChange?: (idx: number) => void;
}

const slideData = [
  {
    img: img10,
    subtitle: "Estudio de Odontología",
    title: "Odontología de precisión estética.",
  },
  {
    img: img11,
    subtitle: "Estudio de Odontología",
    title: "La sutileza de una armonía invisible.",
  },
  {
    img: img12,
    subtitle: "Estudio de Odontología",
    title: "Su bienestar comienza con la calma.",
  }
];

export function Hero({ activeSubSlide = 0, onSubSlideChange }: HeroProps) {
  const currentSlide = activeSubSlide;
  const direction = 1; // Constant direction so all slides consistently flow from right to left

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section 
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image Slider with Real Scroll-Slide Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            className="absolute inset-0 w-full h-full"
            initial={{ 
              x: direction > 0 ? "100%" : "-100%", 
              opacity: 0 
            }}
            animate={{ 
              x: "0%", 
              opacity: 1,
              transition: { 
                x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.2, ease: "easeInOut" }
              }
            }}
            exit={{ 
              x: direction > 0 ? "-100%" : "100%",
              opacity: 0,
              transition: { 
                x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.2, ease: "easeInOut" }
              }
            }}
          >
            {/* Grayscale Base Image - Slightly more opacity than before (was 0.25, now 0.45) */}
            <img 
              src={slideData[currentSlide]?.img || img10} 
              alt="Bellini luxury dentistry" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 select-none opacity-45"
            />
            
            {/* Color Overlay (Shows completely on hover) */}
            <img 
              src={slideData[currentSlide]?.img || img10} 
              alt="Color View" 
              className="absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-[1500ms] ease-out"
              style={{
                opacity: isHovering ? 1 : 0,
              }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Subtle dark gradient overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/90 z-10 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-end pb-44 md:pb-36 pointer-events-none">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-8 border-l border-bellini-primary/20 pl-6 md:pl-8">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left"
            >
              {/* Very snug line spacing and removed 'Autor' */}
              <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#A3A6AC] mb-0.5 select-none drop-shadow-sm">
                {slideData[currentSlide]?.subtitle}
              </span>

              <h1 className="font-serif text-[18px] xs:text-[21px] sm:text-[25px] md:text-[38px] lg:text-[46px] tracking-[0.05em] text-bellini-primary/90 leading-[1.3] md:leading-none font-light sm:whitespace-nowrap select-none drop-shadow-lg max-w-[280px] xs:max-w-[340px] sm:max-w-none">
                {slideData[currentSlide]?.title}
              </h1>

              {/* Tappable / Clickable Pagination indicators */}
              {onSubSlideChange && (
                <div className="flex items-center gap-3 mt-4 pointer-events-auto select-none">
                  {slideData.map((_, idx) => (
                    <button
                      key={idx}
                      id={`hero-dot-${idx}`}
                      onClick={() => onSubSlideChange(idx)}
                      className="group flex items-center py-2 focus:outline-none cursor-pointer"
                      title={`Ir a imagen ${idx + 1}`}
                    >
                      <div 
                        className="h-[2px] transition-all duration-500 ease-out" 
                        style={{ 
                          width: currentSlide === idx ? '24px' : '10px',
                          backgroundColor: currentSlide === idx ? 'var(--color-bellini-bone)' : 'rgba(163, 166, 172, 0.25)'
                        }} 
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Right signature removed as requested */}
        </div>
      </div>

      {/* Sutil microindicador de scroll hacia la derecha */}
      <div className="absolute bottom-[84px] md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-80 select-none drop-shadow-md">
        <span className="text-[7.5px] uppercase tracking-[0.3em] text-[#A3A6AC] mb-2 font-light">
          Scroll para recorrer
        </span>
        <div className="flex items-center gap-2">
          {/* Mouse silhouette style horizontal track */}
          <div className="w-10 h-5 rounded-full border border-[#A3A6AC]/50 relative flex items-center px-1">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-bellini-primary"
              animate={{ x: [0, 22, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <motion.span 
            className="text-[10px] text-[#A3A6AC] leading-none"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.span>
        </div>
      </div>
    </section>
  );
}
