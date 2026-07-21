import { motion, AnimatePresence } from 'motion/react';

// Direct, verified image imports
import portrait from '../assets/images/bellini_imagen_2_1.jpeg';
import teethMacro from '../assets/images/bellini_imagen_3.jpeg';
import clinicArt from '../assets/images/bellini_imagen_5.jpeg';
import techDetail from '../assets/images/bellini_imagen_6.jpeg';
import precisionShot from '../assets/images/bellini_imagen_10_1.jpeg';
import calmInterior from '../assets/images/bellini_imagen_11_1.jpeg';

interface PhilosophyTab {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  miniTitle: string;
  description: string;
  highlight: string;
  mainImg: string;
  overlayImg: string;
}

interface AboutProps {
  activeSubSlide: number;
  onSubSlideChange: (index: number) => void;
}

export function About({ activeSubSlide, onSubSlideChange }: AboutProps) {
  const tabs: PhilosophyTab[] = [
    {
      id: 'estetica',
      num: '01',
      title: 'Estética',
      subtitle: '01 / EQUILIBRIO FACIAL',
      miniTitle: 'DISEÑO & PROPORCIÓN ÁUREA',
      description: 'Diseño de sonrisas naturales bajo cánones de proporción áurea y armonía facial.',
      highlight: 'Proporciones biológicas',
      mainImg: clinicArt,
      overlayImg: teethMacro,
    },
    {
      id: 'precision',
      num: '02',
      title: 'Precisión',
      subtitle: '02 / ALTA INGENIERÍA',
      miniTitle: 'MICRO-ODONTOLOGÍA DE PRECISIÓN',
      description: 'Microscopia clínica y tecnología digital para lograr un ajuste micrométrico y duradero.',
      highlight: 'Resolución micrométrica',
      mainImg: precisionShot,
      overlayImg: techDetail,
    },
    {
      id: 'calma',
      num: '03',
      title: 'Calma',
      subtitle: '03 / SILENCIO SENSORIAL',
      miniTitle: 'BIENESTAR INTANGIBLE',
      description: 'Espacios de silencio acústico y confort diseñados para una experiencia de paz absoluta.',
      highlight: 'Atención monocromática',
      mainImg: portrait,
      overlayImg: calmInterior,
    },
  ];

  const currentIndex = Math.max(0, Math.min(activeSubSlide, tabs.length - 1));
  const current = tabs[currentIndex];

  const mainWrapClass = "relative w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[460px] aspect-[4/3] xs:aspect-[1.5] md:aspect-[4/5] rounded-2xl mt-1 md:mt-12";
  const frameOffset = "-inset-4 md:-inset-6";

  return (
    <section className="w-full min-h-full md:h-full relative px-6 md:px-12 lg:px-24 pt-12 xs:pt-14 md:pt-[24vh] pb-4 md:pb-24 lg:pt-[26vh] lg:pb-24 flex flex-col justify-center bg-[#0a0a0a] overflow-hidden selection:bg-bellini-primary/20">
      
      {/* 1. GARGANTUAN INTERACTIVE BACKGROUND OUTLINE TYPOGRAPHY - TRANSITIONING LIVE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id + '-bg-text'}
            initial={{ x: '20vw', opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ x: '0vw', opacity: 0.05, filter: 'blur(0px)', scale: 1 }}
            exit={{ x: '-20vw', opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[34vw] md:text-[38vw] lg:text-[42vw] xl:text-[46vw] font-black tracking-[-0.05em] leading-none uppercase text-[#f4f3ef] whitespace-nowrap"
            style={{
              WebkitTextStroke: '1.5px rgba(244, 243, 239, 0.08)',
              color: 'transparent',
            }}
          >
            {current.title}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main asymmetric grid layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-center relative z-10 overflow-visible md:overflow-y-auto lg:overflow-visible max-h-none md:max-h-[82vh] lg:max-h-none py-2 custom-scrollbar pr-1">
        
        {/* Left Column: highly-styled framing compositions that shift structurally */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center relative min-h-0 md:min-h-[520px]">
          
          {/* Main frame wrapper with slow floating motion */}
          <motion.div 
            key={current.id + '-layout-frame'}
            layout="position"
            className={mainWrapClass}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Fine architectural outer filete/frame */}
            <motion.div 
              className={`absolute ${frameOffset} border border-bellini-primary/15 rounded-3xl pointer-events-none z-0`}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main Image Container */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 relative bg-black/40 z-10 group shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id + '-main-img'}
                  src={current.mainImg}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover select-none pointer-events-none transition-[filter,opacity,transform] duration-[1000ms] ease-out filter grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-[1.15] group-hover:opacity-100 group-hover:scale-[1.03]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/30"></div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: studio content dynamic text & custom tab controls */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center">
          
          <div className="mb-4 text-[9px] uppercase tracking-[0.40em] text-bellini-primary lg:text-bellini-primary/95 font-medium font-mono select-none">
            — FILOSOFÍA ODONTOLÓGICA
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#f4f3ef] leading-[1.1] mb-4 md:mb-10 tracking-tight">
            El valor supremo de la <span className="font-light italic text-bellini-primary">sutileza</span>.
          </h2>

          {/* LUXURY DESKTOP SEGMENTED FILETER CONTROLS */}
          <div className="flex flex-row border-b border-white/5 mb-4 md:mb-10 relative overflow-x-auto scrollbar-none gap-4 md:gap-0 justify-between md:justify-start">
            {tabs.map((tab, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={tab.id}
                  id={`philosophy-tab-btn-${tab.id}`}
                  onClick={() => onSubSlideChange(idx)}
                  className="relative flex items-center gap-2 md:gap-4 py-3 md:py-5 md:pr-10 text-left transition-colors font-mono select-none cursor-pointer outline-none group shrink-0"
                >
                  <span className={`text-[10px] md:text-[11px] transition-colors ${
                    isSelected ? 'text-bellini-primary font-bold' : 'text-[#f4f3ef]/30 group-hover:text-[#f4f3ef]/60'
                  }`}>
                    {tab.num}
                  </span>
                  
                  <span className={`text-xs uppercase tracking-[0.25em] transition-colors ${
                    isSelected ? 'text-white' : 'text-[#f4f3ef]/45 group-hover:text-[#f4f3ef]/70'
                  }`}>
                    {tab.title}
                  </span>

                  {/* Dynamic Underline Filete Indicator */}
                  {isSelected && (
                    <motion.div 
                      layoutId="philosophy-tab-underline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-bellini-primary z-30"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Philosophic Description Canvas layout */}
          <div className="min-h-[80px] md:min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2 md:space-y-4"
              >
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-base md:text-xl font-serif text-white tracking-wide">
                    {current.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] leading-relaxed text-[#f4f3ef]/70 font-light max-w-lg">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer with fine signatures & direction trigger links */}
            <div className="mt-4 md:mt-12 pt-4 border-t border-white/5 flex items-center justify-end">
              <a 
                href="#contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  const container = document.getElementById('main-scroll-container');
                  if (container) {
                    window.dispatchEvent(new CustomEvent('nav-scroll-start', { detail: { targetIndex: 4 } }));
                    const isMobile = window.innerWidth < 768;
                    if (isMobile) {
                      container.scrollTo({
                        top: 4 * container.clientHeight,
                        behavior: 'smooth'
                      });
                    } else {
                      container.scrollTo({
                        left: 4 * container.clientWidth,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-bellini-primary hover:text-white transition-colors"
              >
                <span>Saber Más</span>
                <span className="group-hover:translate-x-1.5 duration-350 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
