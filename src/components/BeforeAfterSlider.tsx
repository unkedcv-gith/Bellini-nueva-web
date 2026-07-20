import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.pointerType === 'mouse') {
      handleMove(e.clientX);
    } else if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Safe guard for cases where pointer capture is already released
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[1.32] xs:aspect-[1.38] sm:aspect-[1.25] md:aspect-[1.4] lg:aspect-auto h-auto lg:h-full min-h-[255px] xs:min-h-[290px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-0 overflow-hidden select-none cursor-ew-resize rounded-lg border border-white/5 bg-[#080808] touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* AFTER picture in background */}
      <img 
        src={afterImage} 
        alt="After clinical case results" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Label: AFTER (wrapped in opposite clipPath to disappear symmetrically under slider) */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-20"
        style={{ 
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          WebkitClipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
        }}
      >
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded text-[10px] tracking-widest text-[#f4f3ef]/60 uppercase font-mono font-bold sm:top-4 sm:right-4 sm:bg-black/80 sm:backdrop-blur-md sm:border-white/10 sm:px-3 sm:py-1.5 sm:rounded-md sm:text-xs sm:text-[#f4f3ef] sm:shadow-lg">
          Después
        </div>
      </div>

      {/* BEFORE picture clipped in foreground */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-10"
        style={{ 
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <img 
          src={beforeImage} 
          alt="Before clinical case state" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Label: BEFORE */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded text-[10px] tracking-widest text-[#f4f3ef]/60 uppercase font-mono z-20 font-bold sm:top-4 sm:left-4 sm:bg-black/80 sm:backdrop-blur-md sm:border-white/10 sm:px-3 sm:py-1.5 sm:rounded-md sm:text-xs sm:text-[#f4f3ef] sm:shadow-lg">
          Antes
        </div>
      </div>

      {/* Interactive central dividing bar */}
      <div 
        className="absolute top-0 bottom-0 w-[1.5px] bg-bellini-primary/80 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Sleek metallic luxury handlebar in the center - enlarged for perfect touch usability on mobile */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-bellini-primary bg-[#0c0c0c]/90 backdrop-blur-md shadow-2xl flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-transform duration-200">
          <div className="flex gap-1.5 items-center justify-center">
            <span className="text-[9px] text-[#f4f3ef] select-none font-bold animate-pulse">◀</span>
            <span className="text-[9px] text-[#f4f3ef] select-none font-bold animate-pulse">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
