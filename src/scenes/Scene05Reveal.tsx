import React, { useState, useEffect } from 'react';
import { sound } from '../audio/soundEngine';

interface Scene05RevealProps {
  onProceed: () => void;
  reducedMotion: boolean;
}

export const Scene05Reveal: React.FC<Scene05RevealProps> = ({ onProceed, reducedMotion }) => {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [pulseActive, setPulseActive] = useState(false);
  const [childInteracted, setChildInteracted] = useState(false);
  const [jitterFrame, setJitterFrame] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPupilPos({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setJitterFrame((f) => (f + 1) % 4);
    }, 125);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Trigger reveal drone on initial scene entry
  useEffect(() => {
    const timer = setTimeout(() => {
      sound.playRevealDrone();
      sound.playHeartbeat();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleEyeClick = () => {
    sound.playRevealDrone();
    sound.playHeartbeat();
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1400);
  };

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playHeartbeat();
    sound.playCreepyLullabyNote(587.33, -30);
    setChildInteracted(true);
    setTimeout(() => setChildInteracted(false), 1500);
  };

  return (
    <div
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-between p-4 select-none bg-black overflow-hidden cursor-pointer"
      onClick={handleEyeClick}
      data-interactive="true"
      title="Click abyss to provoke resonance"
    >
      {/* Film Dust & Scratch Particles in the Abyss */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/5 w-1 h-3 bg-white/50 rotate-45" />
        <div className="absolute top-3/5 right-1/4 w-0.5 h-6 bg-white/40 rotate-12" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>

      {/* Red Ambient Bloom from the Giant Eyes (Frames 00:03 - 00:05) */}
      <div
        className={`absolute top-0 left-0 right-0 h-3/5 pointer-events-none transition-all duration-700 ${
          pulseActive ? 'opacity-90' : 'opacity-60'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(220, 38, 38, 0.45) 0%, rgba(153, 27, 27, 0.25) 45%, transparent 75%)',
        }}
      />

      {/* Top Header / Counter */}
      <div className="relative z-10 text-center mt-2 pointer-events-none">
        <span className="font-tape text-xl sm:text-2xl text-red-500 tracking-widest animate-pulse">
          SCENE 05 • THE AWAKENED OBSERVER
        </span>
      </div>

      {/* Giant Crimson Eyes in Pitch Black (Exact match of Frames 00:03 - 00:05) */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-center my-auto py-6">
        <svg
          viewBox="0 0 700 240"
          className={`w-full max-w-[620px] transition-transform duration-300 drop-shadow-[0_0_40px_rgba(239,68,68,0.8)] ${
            reducedMotion ? '' : 'animate-evil-pulse'
          }`}
          style={{ filter: 'url(#sketch-edge)' }}
        >
          <defs>
            <radialGradient id="redEyeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="55%" stopColor="#dc2626" />
              <stop offset="90%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#250606" />
            </radialGradient>
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#991b1b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Left Colossal Crimson Eye */}
          <g id="giant-left-eye">
            {/* Outer red radiance glow */}
            <ellipse cx="210" cy="120" rx="140" ry="85" fill="url(#eyeGlow)" />
            {/* Dark fleshy socket rim */}
            <path
              d="M 80,120 Q 210,35 340,120 Q 210,205 80,120 Z"
              fill="#1a0404"
              stroke="#050101"
              strokeWidth="7"
            />
            {/* Fiery Red Sclera/Iris */}
            <ellipse
              cx="210"
              cy="120"
              rx="105"
              ry="65"
              fill="url(#redEyeGradient)"
              stroke="#450a0a"
              strokeWidth="4"
            />
            {/* Inner striated ring / texture */}
            <ellipse cx="210" cy="120" rx="75" ry="50" fill="none" stroke="#7f1d1d" strokeWidth="3" strokeDasharray="5 7" />

            {/* Sharp Vertical Slit Pupil `(0)` from reference video */}
            <g transform={`translate(${pupilPos.x * 16}, ${pupilPos.y * 10})`}>
              {/* Outer slit border */}
              <path
                d="M 210,70 Q 198,120 210,170 Q 222,120 210,70 Z"
                fill="#000000"
                stroke="#450a0a"
                strokeWidth="2.5"
              />
              {/* Center intense dark core */}
              <ellipse cx="210" cy="120" rx="3.5" ry="42" fill="#000000" />
              {/* Highlight glimmer */}
              <circle cx="212" cy="100" r="2.5" fill="#ffffff" opacity="0.75" />
            </g>
          </g>

          {/* Right Colossal Crimson Eye */}
          <g id="giant-right-eye">
            {/* Outer red radiance glow */}
            <ellipse cx="490" cy="120" rx="140" ry="85" fill="url(#eyeGlow)" />
            {/* Dark socket rim */}
            <path
              d="M 360,120 Q 490,35 620,120 Q 490,205 360,120 Z"
              fill="#1a0404"
              stroke="#050101"
              strokeWidth="7"
            />
            {/* Fiery Red Sclera */}
            <ellipse
              cx="490"
              cy="120"
              rx="105"
              ry="65"
              fill="url(#redEyeGradient)"
              stroke="#450a0a"
              strokeWidth="4"
            />
            <ellipse cx="490" cy="120" rx="75" ry="50" fill="none" stroke="#7f1d1d" strokeWidth="3" strokeDasharray="5 7" />

            {/* Sharp Vertical Slit Pupil */}
            <g transform={`translate(${pupilPos.x * 16}, ${pupilPos.y * 10})`}>
              <path
                d="M 490,70 Q 478,120 490,170 Q 502,120 490,70 Z"
                fill="#000000"
                stroke="#450a0a"
                strokeWidth="2.5"
              />
              <ellipse cx="490" cy="120" rx="3.5" ry="42" fill="#000000" />
              <circle cx="492" cy="100" r="2.5" fill="#ffffff" opacity="0.75" />
            </g>
          </g>
        </svg>
      </div>

      {/* Solitary Dim Blue Spotlight & Small Child Below (Reference 00:03 - 00:05) */}
      <div className="relative z-20 flex flex-col items-center mb-6">
        {/* Blue/Pale Spotlight on Floor */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-[180px] h-[40px] sm:w-[240px] h-[55px] rounded-full blur-sm opacity-80"
            style={{
              background: 'radial-gradient(ellipse, #bae6fd 0%, #38bdf8 45%, #0284c7 70%, transparent 95%)',
            }}
          />

          {/* Miniature Child in Light */}
          <div
            className="absolute bottom-2 cursor-pointer transition-transform duration-100 hover:scale-110"
            onClick={handleChildClick}
            data-interactive="true"
            title="Click child"
          >
            <svg
              viewBox="0 0 100 120"
              className="w-14 sm:w-20"
              style={{
                filter: 'url(#sketch-edge)',
                transform: `translate(${jitterFrame % 2 === 0 ? 0 : 1}px, 0)`,
              }}
            >
              {/* Cold blue/white wash on child */}
              <g stroke="#031527" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Legs */}
                <line x1="45" y1="90" x2="45" y2="108" />
                <line x1="55" y1="90" x2="55" y2="108" />

                {/* Body / Skirt */}
                <path d="M 38,72 L 62,72 L 66,92 L 34,92 Z" fill="#e0f2fe" />
                {/* Torso & Folded Hands */}
                <path d="M 40,55 L 60,55 L 62,74 L 38,74 Z" fill="#bae6fd" />
                {/* Head */}
                <circle cx="50" cy="40" r="14" fill="#e0f2fe" />
                {/* Bob hair */}
                <path d="M 36,28 L 64,28 L 68,44 L 62,44 L 38,44 L 32,44 Z" fill="#93c5fd" />
                {/* Dot eyes looking up towards giant eyes */}
                <circle cx="46" cy="38" r="1.8" fill="#031527" />
                <circle cx="54" cy="38" r="1.8" fill="#031527" />
                {/* Tiny terrified mouth */}
                <circle cx="50" cy="45" r="1.5" fill="#031527" />
              </g>
            </svg>
          </div>
        </div>

        {/* Caption */}
        <p className="font-caption text-xs text-[#bae6fd]/70 tracking-widest uppercase mt-3">
          {childInteracted ? 'SHE TREMBLES IN THE SPOTLIGHT' : '[ CLICK GIANT EYES TO PROVOKE • CLICK CHILD ]'}
        </p>

        {/* Advance Scene Button */}
        <div className="mt-4">
          <button
            id="btn-proceed-scene-6"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              sound.playTapeChop();
              onProceed();
            }}
            className="px-6 py-2 rounded-sm bg-red-600 hover:bg-red-500 text-white font-caption font-bold text-sm tracking-wider uppercase border border-black shadow-[0_0_20px_rgba(220,38,38,0.7)] transition-all duration-150"
          >
            ADVANCE TAPE • SCENE 06 FINAL STATE →
          </button>
        </div>
      </div>
    </div>
  );
};
