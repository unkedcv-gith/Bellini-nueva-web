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
      id: 'arquitectura',
      num: '01',
      title: 'Arquitectura',
      subtitle: '01 / EQUILIBRIO FACIAL',
      miniTitle: 'DISEÑO & PROPORCIÓN ÁUREA',
      description: 'Partimos de los cánones de la proporción áurea para proyectar sonrisas que se integran armoniosamente en la expresión del rostro. Diseñamos con un concepto de geometría facial fluida, donde la estética sigue a la naturaleza.',
      highlight: 'Proporciones biológicas',
      mainImg: clinicArt,
      overlayImg: teethMacro,
    },
    {
      id: 'precision',
      num: '02',
      title: 'Precisión',
      subtitle: '02 / ALTA INGENIERÍA',
      miniTitle: 'MICRO-RELOJERÍA CLÍNICA',
      description: 'Fusión de odontología restauradora avanzada y diagnóstico digitalizado en tres dimensiones. Trabajamos con microscopios quirúrgicos y tolerancias micrométricas, garantizando un ajuste óptimo y una durabilidad sin precedentes.',
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
      description: 'Cada espacio físico y acústico ha sido esculpido para neutralizar el estrés y fomentar el sosiego. Desde la iluminación difusa hasta el aroma de maderas nobles y lino, todo se confabula para brindar una experiencia de paz pura.',
      highlight: 'Atención monocromática',
      mainImg: portrait,
      overlayImg: calmInterior,
    },
  ];

  const currentIndex = Math.max(0, Math.min(activeSubSlide, tabs.length - 1));
  const current = tabs[currentIndex];

  // Editorial custom layouts per slide index to break the standard grid monotony:
  const layouts = [
    {
      // ARQUITECTURA: Vertical portrait main structure with wide horizontal macro detail bottom-right
      mainWrapClass: "relative w-full max-w-[280px] md:max-w-[320px] aspect-[10/14] md:aspect-[3/4] rounded-2xl mt-12 md:mt-16 lg:mt-20",
      overlayClass: "absolute -bottom-6 -right-4 md:-right-8 w-40 md:w-48 aspect-[16/10] rounded-xl shadow-[0_25px_50px_-10px_rgba(0,0,0,0.95)] z-20",
      gridTickTop: "+ GEOMETRÍA // 1.618",
      gridTickBottom: "SCALE // OPTICAL CORRECTION",
      frameOffset: "-inset-6",
    },
    {
      // PRECISION: Landscape horizontal widescreen main with deep vertical tall micro-zoom overlapping top-left
      mainWrapClass: "relative w-full max-w-[330px] md:max-w-[380px] aspect-[16/10] rounded-xl mt-12 md:mt-16 lg:mt-20",
      overlayClass: "absolute -top-8 -left-6 md:-left-10 w-32 md:w-38 aspect-[3/5] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] z-20",
      gridTickTop: "MICROMETRIC // RESOLUTION",
      gridTickBottom: "TOL. // 0.01um 3D SCAN",
      frameOffset: "-inset-4 md:-inset-8",
    },
    {
      // CALMA: Harmonious elegant square layout with compact square offset on the bottom-right corner representing pure negative space
      mainWrapClass: "relative w-full max-w-[280px] md:max-w-[320px] aspect-[1/1] rounded-3xl mt-12 md:mt-16 lg:mt-20",
      overlayClass: "absolute -bottom-4 -right-2 md:-right-6 w-32 md:w-36 aspect-[1/1] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95)] z-20",
      gridTickTop: "DECIBEL // -12dB AMBIENT",
      gridTickBottom: "TEXTURA // LINO & MONOCROMO",
      frameOffset: "-inset-8",
    }
  ];

  const currentLayout = layouts[currentIndex];

  return (
    <section className="w-full h-full relative px-6 md:px-12 lg:px-24 pt-48 pb-16 md:pt-[24vh] md:pb-24 lg:pt-[26vh] lg:pb-24 flex flex-col justify-center bg-[#0a0a0a] overflow-hidden selection:bg-bellini-primary/20">
      
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

      {/* 2. DYNAMIC SHIFTING HAIRLINE (FILETE DE SECCIÓN ELEGANTE) */}
      <div className="absolute top-28 left-0 right-0 h-[1.5px] bg-[#ebdcae]/5 pointer-events-none z-10">
        <motion.div 
          className="h-full bg-gradient-to-r from-transparent via-[#ebdcae]/50 to-transparent w-48 md:w-80"
          animate={{ x: `${currentIndex * 33.3}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Main asymmetric grid layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: highly-styled framing compositions that shift structurally */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center relative min-h-[400px] md:min-h-[520px]">
          
          {/* Main frame wrapper with slow floating motion */}
          <motion.div 
            key={current.id + '-layout-frame'}
            layout="position"
            className={currentLayout.mainWrapClass}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Fine architectural outer filete/frame */}
            <motion.div 
              className={`absolute ${currentLayout.frameOffset} border border-bellini-primary/15 rounded-3xl pointer-events-none z-0`}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Micro coordinate grid indicators */}
            <div className="absolute -top-12 -left-6 text-[8px] font-mono text-bellini-primary/50 tracking-widest hidden md:block uppercase select-none">
              {currentLayout.gridTickTop}
            </div>
            
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
              
              {/* Dynamic stamp metadata inside photoborder */}
              <div className="absolute bottom-6 left-6 flex items-baseline gap-2 text-[10px] font-mono tracking-widest text-[#f4f3ef]/40 select-none">
                <span className="text-bellini-primary font-bold">{current.num}</span>
                <span className="uppercase">{current.id}</span>
              </div>
            </div>

            {/* Overlapping secondary Detail Image Frame (Asymmetric shifting overlap layout) */}
            <motion.div 
              layout="position"
              className={`${currentLayout.overlayClass} overflow-hidden border border-white/10 bg-black group/overlay`}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id + '-overlay-img'}
                  src={current.overlayImg}
                  alt={current.title + ' detail'}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 0.82, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover select-none pointer-events-none transition-[filter,opacity,transform] duration-[1000ms] ease-out filter grayscale brightness-[0.85] group-hover/overlay:grayscale-0 group-hover/overlay:brightness-[1.15] group-hover/overlay:opacity-100 group-hover/overlay:scale-[1.04]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 to-transparent"></div>
              
              {/* Subtle structural visual guide lines inside overlapping image */}
              <div className="absolute bottom-3 right-4 text-[7px] font-mono text-bellini-primary/60 tracking-widest select-none">
                [ DETAIL // {current.num} ]
              </div>
            </motion.div>

            {/* Bottom auxiliary coordinate tick */}
            <div className="absolute top-full pt-8 right-2 text-[8px] font-mono text-bellini-primary/40 tracking-widest hidden md:block uppercase select-none">
              {currentLayout.gridTickBottom}
            </div>
          </motion.div>
        </div>

        {/* Right Column: studio content dynamic text & custom tab controls */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center">
          
          <div className="mb-4 text-[9px] uppercase tracking-[0.40em] text-bellini-primary lg:text-bellini-primary/95 font-medium font-mono select-none">
            — FILOSOFÍA DE AUTOR
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-[#f4f3ef] leading-[1.1] mb-10 tracking-tight">
            El valor supremo de la <span className="font-light italic text-bellini-primary">sutileza</span>.
          </h2>

          {/* LUXURY DESKTOP SEGMENTED FILETER CONTROLS */}
          <div className="flex flex-col md:flex-row border-b border-white/5 mb-10 relative">
            {tabs.map((tab, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={tab.id}
                  id={`philosophy-tab-btn-${tab.id}`}
                  onClick={() => onSubSlideChange(idx)}
                  className="relative flex items-center justify-between md:justify-start gap-4 py-4 md:py-5 md:pr-10 text-left transition-colors font-mono select-none cursor-pointer outline-none group"
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
                  
                  {/* Subtle chevron/arrow on mobile */}
                  <span className={`text-[9.5px] text-[#f4f3ef]/50 transition-transform md:hidden ${
                    isSelected ? 'rotate-90 text-bellini-primary font-bold' : 'rotate-0'
                  }`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Philosophic Description Canvas layout */}
          <div className="min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono uppercase bg-bellini-primary/10 border border-bellini-primary/25 text-[#ebdcae] px-2.5 py-0.5 rounded tracking-widest select-none">
                    {current.highlight}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#f4f3ef]/40 select-none">
                    {current.miniTitle}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-wider text-bellini-primary uppercase leading-none">
                    {current.subtitle}
                  </h4>
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-[#f4f3ef]/70 font-light max-w-lg">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer with fine signatures & direction trigger links */}
            <div className="mt-12 pt-5 border-t border-white/5 flex items-center justify-between">
              <div className="text-[9px] font-mono text-[#f4f3ef]/30 tracking-widest uppercase select-none">
                ESTUDIO BELLINI // ARTISANAL GEOMETRY DEPT
              </div>

              <a 
                href="#contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  const container = document.getElementById('main-scroll-container');
                  if (container) {
                    window.dispatchEvent(new CustomEvent('nav-scroll-start', { detail: { targetIndex: 4 } }));
                    container.scrollTo({
                      left: 4 * container.clientWidth,
                      behavior: 'smooth'
                    });
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
