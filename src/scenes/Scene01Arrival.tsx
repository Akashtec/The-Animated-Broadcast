import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio/soundEngine';

interface Scene01ArrivalProps {
  onProceed: () => void;
  reducedMotion: boolean;
}

export const Scene01Arrival: React.FC<Scene01ArrivalProps> = ({ onProceed, reducedMotion }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAlerted, setIsAlerted] = useState(false);
  const [jitterFrame, setJitterFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates relative to character center
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // 8fps limited animation stepping (vintage cartoon frame rate)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setJitterFrame((prev) => (prev + 1) % 4);
    }, 125); // 8fps
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleCharacterClick = () => {
    sound.playCreepyLullabyNote(440, -10);
    sound.playStaticBurst(0.4);
    setIsAlerted(true);
    setTimeout(() => setIsAlerted(false), 1200);
  };

  // Subtle pupil offsets
  const pupilOffsetX = mousePos.x * 3.5;
  const pupilOffsetY = mousePos.y * 3.5;

  // Frame jitter offsets
  const jitterX = reducedMotion ? 0 : [0, -1, 1, 0][jitterFrame];
  const jitterY = reducedMotion ? 0 : [0, 1, -0.5, 0.5][jitterFrame];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-4 select-none overflow-hidden"
    >
      {/* Background Radiating Aura Texture */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Deep orange halo exactly matching Frame 00:00 */}
        <div
          className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full blur-2xl opacity-70 transition-all duration-300 pointer-events-none"
          style={{
            background: isAlerted
              ? 'radial-gradient(circle, #f97316 0%, #c2410c 45%, #7c2d12 70%, transparent 95%)'
              : 'radial-gradient(circle, #ea580c 0%, #9a3412 40%, #431407 70%, transparent 90%)',
            transform: `scale(${1 + Math.sin(jitterFrame) * 0.03})`,
          }}
        />
        {/* Outer charcoal/grit texture */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0f0907]/70 to-[#0c0806] pointer-events-none" />
      </div>

      {/* Main Character Art Frame */}
      <div
        className="relative z-10 flex flex-col items-center cursor-pointer group"
        onClick={handleCharacterClick}
        data-interactive="true"
        style={{
          transform: `translate(${jitterX}px, ${jitterY}px)`,
        }}
      >
        <svg
          viewBox="0 0 400 520"
          className="w-[280px] sm:w-[380px] md:w-[440px] max-w-full drop-shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-transform duration-150 group-hover:scale-[1.01]"
          style={{ filter: 'url(#sketch-edge)' }}
        >
          <defs>
            <radialGradient id="characterSkinGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="60%" stopColor="#fba265" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
            <radialGradient id="auraGlow" cx="50%" cy="45%" r="48%">
              <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#9a3412" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Chalk / Crayon Rough Silhouette Halo */}
          <ellipse
            cx="200"
            cy="270"
            rx="145"
            ry="205"
            fill="url(#auraGlow)"
            className="animate-pulse duration-1000"
          />

          {/* White stippled inner rim aura around character */}
          <path
            d="M 125,185 Q 110,230 115,310 Q 120,385 160,420 L 240,420 Q 280,385 285,310 Q 290,230 275,185 Q 260,110 200,105 Q 140,110 125,185 Z"
            fill="none"
            stroke="#fff7ed"
            strokeWidth="8"
            strokeDasharray="4 6"
            opacity="0.55"
          />

          {/* Character Group */}
          <g id="character-body" stroke="#090503" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Legs */}
            <line x1="180" y1="400" x2="178" y2="475" stroke="#090503" strokeWidth="5.5" />
            <line x1="220" y1="400" x2="222" y2="475" stroke="#090503" strokeWidth="5.5" />
            {/* Feet */}
            <ellipse cx="172" cy="478" rx="14" ry="7" fill="#fed7aa" stroke="#090503" strokeWidth="4" />
            <ellipse cx="228" cy="478" rx="14" ry="7" fill="#fed7aa" stroke="#090503" strokeWidth="4" />

            {/* Skirt / Bottom */}
            <path
              d="M 152,360 Q 200,370 248,360 L 255,400 Q 200,412 145,400 Z"
              fill="#fdba74"
            />
            {/* Skirt wrinkle / center pleat */}
            <line x1="200" y1="368" x2="200" y2="405" stroke="#090503" strokeWidth="3" />

            {/* Blouse / Torso */}
            <path
              d="M 152,275 Q 140,320 152,360 Q 200,370 248,360 Q 260,320 248,275 Q 200,285 152,275 Z"
              fill="#fed7aa"
            />

            {/* Bust/Collar contour line */}
            <path d="M 165,305 Q 185,320 200,310 Q 215,320 235,305" fill="none" stroke="#090503" strokeWidth="3.5" />

            {/* Sharp V-neck collar */}
            <path d="M 184,250 L 200,278 L 216,250" fill="none" stroke="#090503" strokeWidth="4" />

            {/* Arms on Hips (bent elbows) */}
            <path
              d="M 152,275 Q 120,310 148,350"
              fill="none"
              stroke="#090503"
              strokeWidth="5"
            />
            <path
              d="M 248,275 Q 280,310 252,350"
              fill="none"
              stroke="#090503"
              strokeWidth="5"
            />

            {/* Head Contour */}
            <circle cx="200" cy="205" r="48" fill="#fed7aa" />

            {/* Bob Hairstyle (Directly matching video frames 00:00 - 00:02) */}
            <path
              d="M 150,140 L 250,140 L 278,215 Q 275,230 262,230 Q 252,230 248,210 Q 200,215 152,210 Q 148,230 138,230 Q 125,230 122,215 Z"
              fill="#fed7aa"
              stroke="#090503"
              strokeWidth="5"
            />

            {/* Straight Bangs line across forehead */}
            <path
              d="M 148,175 Q 200,185 252,175"
              fill="none"
              stroke="#090503"
              strokeWidth="4"
            />

            {/* Ears */}
            <circle cx="150" cy="205" r="7" fill="#fed7aa" stroke="#090503" strokeWidth="3.5" />
            <circle cx="250" cy="205" r="7" fill="#fed7aa" stroke="#090503" strokeWidth="3.5" />

            {/* Eyebrows */}
            <path d="M 174,188 Q 183,184 191,189" fill="none" stroke="#090503" strokeWidth="3" />
            <path d="M 209,189 Q 217,184 226,188" fill="none" stroke="#090503" strokeWidth="3" />

            {/* Eyes (Interactive Tracking Pupils) */}
            <circle cx="182" cy="198" r="5.5" fill="#090503" />
            <circle cx="218" cy="198" r="5.5" fill="#090503" />

            {/* Pupil Glint / Gaze Offset */}
            <circle
              cx={182 + pupilOffsetX}
              cy={198 + pupilOffsetY}
              r={isAlerted ? '3.5' : '2'}
              fill={isAlerted ? '#ff2a2a' : '#fff'}
            />
            <circle
              cx={218 + pupilOffsetX}
              cy={198 + pupilOffsetY}
              r={isAlerted ? '3.5' : '2'}
              fill={isAlerted ? '#ff2a2a' : '#fff'}
            />

            {/* Nose */}
            <circle cx="200" cy="208" r="2.5" fill="#090503" />

            {/* Mouth: Surprised round O-mouth from reference video */}
            {isAlerted ? (
              <ellipse cx="200" cy="226" rx="8" ry="12" fill="#380804" stroke="#090503" strokeWidth="3.5" />
            ) : (
              <ellipse cx="200" cy="224" rx="6" ry="8" fill="#581608" stroke="#090503" strokeWidth="3" />
            )}
          </g>
        </svg>

        {/* Caption & Interaction Indicator */}
        <div className="mt-4 text-center">
          <p className="font-caption text-xs sm:text-sm text-[#fed7aa]/80 tracking-widest uppercase">
            [ CLICK TO INTERACT WITH CHARACTER ]
          </p>
          <p className="font-tape text-lg sm:text-2xl text-[#f97316] tracking-wider mt-1 animate-pulse">
            SHE SEES YOUR CURSOR
          </p>
        </div>
      </div>

      {/* Storyboard Navigation Prompt */}
      <div className="relative z-10 mt-8 sm:mt-12 flex flex-col items-center">
        <button
          id="btn-proceed-scene-2"
          data-interactive="true"
          onClick={() => {
            sound.playTapeChop();
            onProceed();
          }}
          className="group px-6 py-2.5 rounded-sm bg-[#ea580c] hover:bg-[#f97316] text-black font-caption font-bold text-sm tracking-wider uppercase border border-black shadow-[0_0_15px_rgba(234,88,12,0.6)] transition-all duration-150 hover:translate-y-[-2px]"
        >
          <span className="flex items-center gap-2">
            ADVANCE TAPE • SCENE 02 DISCOVERY
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
        <span className="text-[11px] font-caption text-white/40 mt-2">
          or use keyboard [SPACE / RIGHT ARROW]
        </span>
      </div>
    </div>
  );
};
