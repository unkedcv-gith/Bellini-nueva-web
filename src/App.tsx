/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { AdminPanel } from './components/AdminPanel';


export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Only show the splash screen on mobile viewports (< 768px)
    if (window.innerWidth < 768) {
      setShowSplash(true);
    }
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
  };

  // Monitor event cues requesting to open the administrative terminal
  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsAdminOpen(true);
    };
    window.addEventListener('bellini-open-admin', handleOpenAdmin);
    return () => {
      window.removeEventListener('bellini-open-admin', handleOpenAdmin);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const isTransitioning = useRef(false);

  const [heroSubSlide, _setHeroSubSlide] = useState(0);
  const heroSubSlideRef = useRef(0);
  const [aboutSubSlide, _setAboutSubSlide] = useState(0);
  const aboutSubSlideRef = useRef(0);
  const [servicesSubSlide, _setServicesSubSlide] = useState(0);
  const servicesSubSlideRef = useRef(0);
  const lastNavWasWheelUp = useRef(false);

  // Lock system scroll of the body/window to (0,0) at all times.
  // This completely eliminates horizontal/vertical viewport-drifts leading to black screens in Vercel.
  useEffect(() => {
    const handleViewportLock = () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      }
    };
    window.addEventListener('scroll', handleViewportLock, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleViewportLock);
    };
  }, []);

  const setHeroSubSlide = (val: number | ((prev: number) => number)) => {
    if (typeof val === 'function') {
      _setHeroSubSlide(prev => {
        const next = val(prev);
        heroSubSlideRef.current = next;
        return next;
      });
    } else {
      _setHeroSubSlide(val);
      heroSubSlideRef.current = val;
    }
  };

  const setAboutSubSlide = (val: number | ((prev: number) => number)) => {
    if (typeof val === 'function') {
      _setAboutSubSlide(prev => {
        const next = val(prev);
        aboutSubSlideRef.current = next;
        return next;
      });
    } else {
      _setAboutSubSlide(val);
      aboutSubSlideRef.current = val;
    }
  };

  const setServicesSubSlide = (val: number | ((prev: number) => number)) => {
    if (typeof val === 'function') {
      _setServicesSubSlide(prev => {
        const next = val(prev);
        servicesSubSlideRef.current = next;
        return next;
      });
    } else {
      _setServicesSubSlide(val);
      servicesSubSlideRef.current = val;
    }
  };

  useEffect(() => {
    if (activeSection === 'hero') {
      if (!lastNavWasWheelUp.current) {
        setHeroSubSlide(0);
      }
    } else {
      lastNavWasWheelUp.current = false;
    }
    
    // Reset About slide to 0 when leaving the section to start fresh
    if (activeSection !== 'nosotros') {
      setAboutSubSlide(0);
    }

    // Reset Services slide to 0 when leaving the section to start fresh
    if (activeSection !== 'servicios') {
      setServicesSubSlide(0);
    }
  }, [activeSection]);

  // Autoplay Hero and Nosotros sub-slides when resting on those sections
  useEffect(() => {
    let interval: any = null;
    
    if (activeSection === 'hero') {
      interval = setInterval(() => {
        if (!isTransitioning.current) {
          setHeroSubSlide(prev => (prev + 1) % 3);
        }
      }, 6000);
    } else if (activeSection === 'nosotros') {
      interval = setInterval(() => {
        if (!isTransitioning.current) {
          setAboutSubSlide(prev => (prev + 1) % 3);
        }
      }, 7000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSection]);

  const sections = ['hero', 'nosotros', 'casos', 'servicios', 'contacto'];

  useEffect(() => {
    const handleNavScroll = (e: Event) => {
      isTransitioning.current = true;
      const customEvent = e as CustomEvent;
      const targetIdx = customEvent.detail?.targetIndex;
      if (targetIdx === 0) {
        setHeroSubSlide(0);
      }
      setTimeout(() => {
        isTransitioning.current = false;
      }, 1100);
    };

    window.addEventListener('nav-scroll-start', handleNavScroll);
    return () => {
      window.removeEventListener('nav-scroll-start', handleNavScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Convert mouse wheel events to seamless section transitions
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) {
        return; // Don't intercept wheel event on mobile
      }
      // Direct escape when scrolling inside any custom scrollbar/overflow container
      const targetElement = e.target as HTMLElement;
      if (targetElement) {
        const scrollContainer = targetElement.closest('.overflow-y-auto, .custom-scrollbar') as HTMLElement;
        if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight) {
          return; // Allow native mouse wheel scrolling inside the element
        }
      }

      // Direct escape when any modal, modal-open class, or dialog is currently open
      if (
        document.body.classList.contains('modal-open') || 
        document.querySelector('.modal-overlay') || 
        document.querySelector('[role="dialog"]')
      ) {
        return; // Allow native, continuous vertical scrolling inside the open details panel
      }

      // Ignore if vertical scrolling is negligible or if a transition is active
      if (Math.abs(e.deltaY) < 25 || isTransitioning.current) {
        if (isTransitioning.current) {
          e.preventDefault();
        }
        return;
      }

      // Allow natural horizontal swipe adjustments on trackpads
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      e.preventDefault();

      // Find current index with fallback guards for clientWidth
      const viewportWidth = container.clientWidth || window.innerWidth || 1;
      const currentScrollLeft = container.scrollLeft;
      const rawIndex = Math.round(currentScrollLeft / viewportWidth);
      const currentIndex = isNaN(rawIndex) ? 0 : Math.max(0, Math.min(rawIndex, sections.length - 1));

      // Scroll-driven Hero sub-slide management
      if (currentIndex === 0) {
        const currentHeroSlide = heroSubSlideRef.current;
        if (e.deltaY > 0) {
          // Scrolling down
          if (currentHeroSlide < 2) {
            isTransitioning.current = true;
            setHeroSubSlide(prev => prev + 1);
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1100);
            return;
          }
        } else {
          // Scrolling up
          if (currentHeroSlide > 0) {
            isTransitioning.current = true;
            setHeroSubSlide(prev => prev - 1);
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1100);
            return;
          }
        }
      }

      // Scroll-driven About (Nosotros) sub-slide management
      if (currentIndex === 1) {
        const currentAboutSlide = aboutSubSlideRef.current;
        if (e.deltaY > 0) {
          // Scrolling down
          if (currentAboutSlide < 2) {
            isTransitioning.current = true;
            setAboutSubSlide(prev => prev + 1);
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1000);
            return;
          }
        } else {
          // Scrolling up
          if (currentAboutSlide > 0) {
            isTransitioning.current = true;
            setAboutSubSlide(prev => prev - 1);
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1000);
            return;
          }
        }
      }

      // Intercept wheel up on Nosotros (index 1) to land on the 3rd sub-slide of Hero (index 2)
      if (currentIndex === 1 && e.deltaY < 0 && aboutSubSlideRef.current === 0) {
        isTransitioning.current = true;
        lastNavWasWheelUp.current = true;
        setHeroSubSlide(2);
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isTransitioning.current = false;
        }, 1100);
        return;
      }

      // Scroll-driven Services (Disciplinas) sub-slide management
      if (currentIndex === 3) {
        const currentServicesSlide = servicesSubSlideRef.current;
        if (e.deltaY > 0) {
          // Scrolling down
          if (currentServicesSlide < 4) {
            isTransitioning.current = true;
            setServicesSubSlide(prev => prev + 1);
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1000);
            return;
          }
        } else {
          // Scrolling up
          if (currentServicesSlide > 0) {
            isTransitioning.current = true;
            setServicesSubSlide(prev => prev - 1);
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1000);
            return;
          }
        }
      }

      let targetIndex = currentIndex;
      if (e.deltaY > 0) {
        // Scroll down / scroll right
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else {
        // Scroll up / scroll left
        targetIndex = Math.max(currentIndex - 1, 0);
      }

      if (targetIndex !== currentIndex) {
        isTransitioning.current = true;
        if (targetIndex !== 0) {
          lastNavWasWheelUp.current = false;
        }
        
        container.scrollTo({
          left: targetIndex * viewportWidth,
          behavior: 'smooth'
        });

        // Throttle next trigger until transition completes for high-end feel
        setTimeout(() => {
          isTransitioning.current = false;
        }, 1100);
      }
    };

    // Track scroll progress and active section based on bounds
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const scrollHeight = container.scrollHeight - container.clientHeight;
        if (scrollHeight > 0) {
          setScrollProgress((container.scrollTop / scrollHeight) * 100);
        }
        const viewportHeight = container.clientHeight || window.innerHeight || 1;
        const rawIndex = Math.round(container.scrollTop / viewportHeight);
        const currentIndex = isNaN(rawIndex) ? 0 : Math.max(0, Math.min(rawIndex, sections.length - 1));
        if (sections[currentIndex]) {
          setActiveSection(sections[currentIndex]);
        }
      } else {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        if (scrollWidth > 0) {
          setScrollProgress((container.scrollLeft / scrollWidth) * 100);
        }
        const viewportWidth = container.clientWidth || window.innerWidth || 1;
        const currentScrollLeft = container.scrollLeft;
        const rawIndex = Math.round(currentScrollLeft / viewportWidth);
        const currentIndex = isNaN(rawIndex) ? 0 : Math.max(0, Math.min(rawIndex, sections.length - 1));
        if (sections[currentIndex]) {
          setActiveSection(sections[currentIndex]);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Quick navigation helpers for arrow keys or subtle side floating triggers
  const navigateHorizontal = (direction: 'next' | 'prev') => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden font-sans">
      {/* Absolute Noise Overlay */}
      <div className="fixed inset-0 bg-noise z-0 pointer-events-none"></div>

      {/* Modern Top Luxury Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Snapping Container (Vertical on Mobile, Horizontal on Desktop) */}
      <div
        ref={containerRef}
        id="main-scroll-container"
        className="flex flex-col md:flex-row flex-nowrap overflow-y-auto md:overflow-y-hidden overflow-x-hidden md:overflow-x-auto h-full w-full md:snap-x md:snap-mandatory relative z-10 select-none scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div id="hero" className="w-screen min-h-full md:h-full flex-shrink-0 md:snap-start">
          <Hero activeSubSlide={heroSubSlide} onSubSlideChange={setHeroSubSlide} />
        </div>
        <div id="nosotros" className="w-screen min-h-full md:h-full flex-shrink-0 md:snap-start">
          <About activeSubSlide={aboutSubSlide} onSubSlideChange={setAboutSubSlide} />
        </div>
        <div id="casos" className="w-screen min-h-full md:h-full flex-shrink-0 md:snap-start">
          <Gallery />
        </div>
        <div id="servicios" className="w-screen min-h-full md:h-full flex-shrink-0 md:snap-start">
          <Services activeSubSlide={servicesSubSlide} onSubSlideChange={setServicesSubSlide} />
        </div>
        <div id="contacto" className="w-screen min-h-full md:h-full flex-shrink-0 md:snap-start">
          <Contact />
        </div>
      </div>



      {/* Behind the scenes clinical database editing console */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onCasesUpdated={() => {
          // Push event notifying the gallery that live datasets have changed
          window.dispatchEvent(new CustomEvent('bellini-cases-updated'));
        }} 
      />

      {/* Elegant Mobile Splash Screen Loader */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ 
              y: '-100%', 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            drag="y"
            dragConstraints={{ top: -300, bottom: 0 }}
            dragElastic={{ top: 0.1, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y < -50 || info.velocity.y < -200) {
                handleDismissSplash();
              }
            }}
            onClick={handleDismissSplash}
            className="fixed inset-0 w-full h-full bg-black z-[100] flex flex-col justify-between items-center py-20 px-6 touch-none select-none md:hidden cursor-pointer"
          >
            {/* Absolute subtle gold/warm radial glow in the background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
            

            {/* Empty top spacing replacing top indicator to balance layout */}
            <div className="relative h-4" />

            {/* Centered Logo & Elegant Welcome Message */}
            <div className="relative z-10 flex flex-col items-center max-w-sm">
              {/* Logo with fade-in from translucent to gold */}
              <motion.div
                initial={{ opacity: 0.2, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="flex flex-col items-center mb-8"
              >
                <span 
                  className="text-4xl tracking-[0.25em] font-serif uppercase text-bellini-primary"
                  style={{ transform: 'translateX(0.125em)' }}
                >
                  Bellini
                </span>
                <span 
                  className="text-[9px] tracking-[0.45em] font-sans uppercase text-bellini-primary/80 mt-1.5"
                  style={{ transform: 'translateX(0.225em)' }}
                >
                  Odontología
                </span>
              </motion.div>

              {/* Welcome message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.85 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="text-center text-[20px] md:text-[13.5px] font-serif font-light italic text-[#ece8e1]/85 leading-snug md:leading-relaxed max-w-xs px-2 tracking-tighter md:tracking-normal"
                style={{ fontWeight: 300 }}
              >
                Donde la precisión de la ciencia<br />
                se funde con el arte de su sonrisa.
              </motion.p>
            </div>

            {/* Bottom sliding finger gesture graphic */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#A3A6AC] font-light text-center leading-normal">
                Deslizar para<br />comenzar
              </span>
              
              {/* Animated Scroll Capsule with moving dot */}
              <div className="flex flex-col items-center mt-5 gap-2">
                <div className="w-5 h-9 rounded-full border border-bellini-primary/50 relative flex justify-center py-1.5">
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-bellini-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    animate={{ y: [0, 14, 0] }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <motion.span 
                  className="text-[9px] text-bellini-primary/60 font-sans leading-none mt-1"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2.0,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ▼
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

