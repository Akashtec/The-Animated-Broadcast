import React, { useEffect, useState } from 'react';

interface CrtOverlayProps {
  glitchActive?: boolean;
  trackingIntensity?: number;
}

export const CrtOverlay: React.FC<CrtOverlayProps> = ({
  glitchActive = false,
  trackingIntensity = 1,
}) => {
  const [randomOffset, setRandomOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomOffset(Math.floor(Math.random() * 8) - 4);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* SVG Filters for crayon/charcoal texture */}
      <svg className="hidden">
        <defs>
          {/* Subtle analog tape grain */}
          <filter id="analog-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"
            />
            <feBlend mode="overlay" in="SourceGraphic" result="blend" />
          </filter>

          {/* Sketchy hand-drawn outline jitter */}
          <filter id="sketch-edge">
            <feTurbulence type="turbulence" baseFrequency="0.04 0.08" numOctaves="2" result="turb" />
            <feDisplacementMap in2="turb" in="SourceGraphic" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Heavy glitch displacement */}
          <filter id="tape-tear">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.4" numOctaves="1" result="glitch" />
            <feDisplacementMap in2="glitch" in="SourceGraphic" scale="12" xChannelSelector="R" />
          </filter>
        </defs>
      </svg>

      {/* CRT Scanline Grid */}
      <div className="crt-scanlines absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" />

      {/* CRT Tube Vignette & Ambient Bulb Glow */}
      <div className="crt-vignette absolute inset-0 pointer-events-none" />

      {/* Subtle Phosphor flicker */}
      <div
        className="absolute inset-0 bg-amber-500/5 mix-blend-color-dodge transition-opacity duration-75 pointer-events-none"
        style={{ opacity: 0.03 + Math.random() * 0.04 }}
      />

      {/* CRT Bezel Frame (Retro 4:3 subtle rounded borders on desktop) */}
      <div className="absolute inset-0 border-[6px] md:border-[12px] border-black/80 rounded-2xl md:rounded-[36px] pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />

      {/* VHS Bottom Tracking Static Bar (Directly from video reference) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-4 md:h-6 overflow-hidden bg-black/60 pointer-events-none mix-blend-screen"
        style={{
          opacity: 0.8 * trackingIntensity,
          transform: `translateY(${randomOffset * 0.5}px)`,
        }}
      >
        <div className="w-full h-full flex flex-col justify-between opacity-80 animate-vhs-tracking">
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ff00a0]/60 via-[#00f0ff]/50 to-transparent" />
          <div className="h-1 w-full bg-repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 6px) opacity-40" />
          <div className="h-0.5 w-full bg-gradient-to-r from-[#ffe600]/40 via-white/80 to-[#ff0077]/50" />
        </div>
      </div>

      {/* Sudden Glitch Screen Flash */}
      {glitchActive && (
        <div className="absolute inset-0 bg-[#e66928]/25 mix-blend-difference pointer-events-none transition-opacity duration-100" />
      )}
    </div>
  );
};
