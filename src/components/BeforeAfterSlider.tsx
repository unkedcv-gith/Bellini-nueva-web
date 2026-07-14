import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
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
      className="relative w-full aspect-[16/10] md:aspect-auto h-auto md:h-full min-h-[200px] sm:min-h-[280px] md:min-h-[440px] lg:min-h-[480px] overflow-hidden select-none cursor-ew-resize rounded-lg border border-white/5 bg-[#080808] touch-none"
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
      
      {/* Label: AFTER */}
      <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[8px] tracking-widest text-[#f4f3ef]/80 uppercase font-mono z-20">
        Después
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
        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[8px] tracking-widest text-[#f4f3ef]/80 uppercase font-mono">
          Antes
        </div>
      </div>

      {/* Interactive central dividing bar */}
      <div 
        className="absolute top-0 bottom-0 w-[1.5px] bg-bellini-primary/80 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Sleek metallic luxury handlebar in the center */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-bellini-primary bg-[#0c0c0c] shadow-2xl flex items-center justify-center">
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[7px] text-[#f4f3ef]/45 select-none">◀</span>
            <span className="text-[7px] text-[#f4f3ef]/45 select-none">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
