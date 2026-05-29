import React from 'react';

interface WatermarkProps {
  text: string;
  className?: string;
}

export function Watermark({ text, className = '' }: WatermarkProps) {
  return (
    <div 
      className={`absolute select-none pointer-events-none font-serif text-[12vw] font-black tracking-[0.2em] leading-none uppercase text-[#f4f3ef]/5 select-none ${className}`}
      style={{
        WebkitTextStroke: '1px rgba(244, 243, 239, 0.05)',
      }}
    >
      {text}
    </div>
  );
}
