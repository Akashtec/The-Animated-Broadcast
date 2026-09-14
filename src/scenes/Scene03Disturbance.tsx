import React, { useState, useEffect } from 'react';
import { sound } from '../audio/soundEngine';

interface Scene03DisturbanceProps {
  onProceed: () => void;
  reducedMotion: boolean;
}

export const Scene03Disturbance: React.FC<Scene03DisturbanceProps> = ({ onProceed, reducedMotion }) => {
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [frameHeld, setFrameHeld] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchFlicker, setGlitchFlicker] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Periodic unsettling micro-flicker
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGlitchFlicker(true);
        sound.playStaticBurst(0.2);
        setTimeout(() => setGlitchFlicker(false), 90);
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const toggleFaceGlitch = () => {
    sound.playStaticBurst(0.6);
    sound.playCreepyLullabyNote(330, -35);
    setIsCorrupted(!isCorrupted);
  };

  const handleHoldFrame = () => {
    sound.playTapeChop();
    setFrameHeld(!frameHeld);
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-4 select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[360px] h-[360px] sm:w-[580px] sm:h-[580px] rounded-full blur-3xl transition-all duration-500 pointer-events-none ${
            isCorrupted
              ? 'bg-[#7f1d1d]/40'
              : 'bg-[#ea580c]/30'
          }`}
        />
      </div>

      {/* Title */}
      <div className="relative z-10 flex flex-col items-center mb-6 text-center">
        <span className="font-tape text-lg sm:text-2xl text-[#f97316] tracking-wider uppercase">
          SCENE 03 • UNCANNY ABNORMALITY
        </span>
        <p className="font-caption text-xs sm:text-sm text-white/60 mt-1 max-w-md">
          {frameHeld
            ? 'TAPE PAUSED ON ILLEGITIMATE FRAME'
            : 'A frame holds too long. A face shifts beneath the ink.'}
        </p>
      </div>

      {/* Main Visual Display (Macro Shot & Glitch Face) */}
      <div
        className="relative z-10 flex flex-col items-center cursor-pointer"
        onClick={toggleFaceGlitch}
        data-interactive="true"
        title="Click to trigger disturbance"
      >
        <div
          className={`relative p-2 sm:p-4 rounded-xl border transition-all duration-200 ${
            isCorrupted || glitchFlicker
              ? 'border-red-600/70 bg-black/80 shadow-[0_0_40px_rgba(220,38,38,0.5)]'
              : 'border-[#ea580c]/40 bg-[#1c0f0a]/60 shadow-[0_0_30px_rgba(234,88,12,0.3)]'
          }`}
        >
          {/* Frame 00:12 - 00:13: Macro Cartoon Lips OR Frame 00:11: Uncanny Realistic Gaunt Face */}
          {!isCorrupted && !glitchFlicker ? (
            <svg
              viewBox="0 0 400 400"
              className="w-[280px] sm:w-[380px] md:w-[420px] max-w-full"
              style={{ filter: 'url(#sketch-edge)' }}
            >
              {/* Vibrant Orange Round Face Canvas (Frame 00:12) */}
              <circle cx="200" cy="200" r="180" fill="#f97316" />

              {/* Stippled / rough border */}
              <circle
                cx="200"
                cy="200"
                r="176"
                fill="none"
                stroke="#090503"
                strokeWidth="7"
              />

              {/* Nostril / Upper facial mark (Frame 00:12) */}
              <circle cx="200" cy="70" r="22" fill="#090503" />
              <circle cx="200" cy="70" r="16" fill="#fed7aa" />

              {/* Iconic Vermillion Heart-Shaped Lips from Video */}
              <g id="heart-lips">
                {/* Outer shadow */}
                <path
                  d="M 200,185 C 170,120 100,130 100,195 C 100,240 180,285 200,305 C 220,285 300,240 300,195 C 300,130 230,120 200,185 Z"
                  fill="#dc2626"
                  stroke="#090503"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                {/* Lip Shine / High-contrast inner rim */}
                <path
                  d="M 200,195 C 180,145 130,145 130,195 C 130,225 180,260 200,280 C 220,260 270,225 270,195 C 270,145 220,145 200,195 Z"
                  fill="#ef4444"
                />
                {/* Center Dark Seam / Slit */}
                <ellipse cx="200" cy="225" rx="55" ry="12" fill="#090503" />
                <path d="M 140,225 Q 200,232 260,225" stroke="#090503" strokeWidth="4" fill="none" />
              </g>

              {/* Lower Chin Spot from Video (Frame 00:12) */}
              <ellipse cx="200" cy="345" rx="22" ry="10" fill="#090503" />

              {/* Macro Eye Brows & Glance */}
              <path d="M 80,45 Q 140,20 190,45" stroke="#090503" strokeWidth="6" fill="none" />
              <path d="M 210,45 Q 260,20 320,45" stroke="#090503" strokeWidth="6" fill="none" />
            </svg>
          ) : (
            /* Uncanny Realistic Gaunt Etched Face (Reference 00:11) */
            <svg
              viewBox="0 0 400 400"
              className="w-[280px] sm:w-[380px] md:w-[420px] max-w-full animate-sketch-jitter"
            >
              {/* Sepia / dark orange background */}
              <rect width="400" height="400" fill="#2a140d" />

              {/* Long Straight Black Hair framing the face */}
              <path
                d="M 60,0 L 340,0 L 370,400 L 320,400 L 290,140 L 280,380 L 260,380 L 265,170 Q 200,140 135,170 L 140,380 L 120,380 L 110,140 L 80,400 L 30,400 Z"
                fill="#0c0705"
                stroke="#000000"
                strokeWidth="4"
              />

              {/* Gaunt Face Shape */}
              <path
                d="M 130,140 Q 120,240 145,310 Q 200,360 255,310 Q 280,240 270,140 Z"
                fill="#d97706"
                stroke="#090503"
                strokeWidth="5"
              />

              {/* Deep Sunken Eye Sockets (00:11) */}
              <ellipse cx="170" cy="205" rx="28" ry="24" fill="#1c0a06" />
              <ellipse cx="230" cy="205" rx="28" ry="24" fill="#1c0a06" />

              {/* Chalk highlights on eyelids */}
              <path d="M 148,195 Q 170,185 192,198" stroke="#ffedd5" strokeWidth="3" fill="none" />
              <path d="M 208,198 Q 230,185 252,195" stroke="#ffedd5" strokeWidth="3" fill="none" />

              {/* Intense Dilated Eyes tracking cursor */}
              <circle cx={170 + mousePos.x * 6} cy={205 + mousePos.y * 6} r="10" fill="#000" />
              <circle cx={230 + mousePos.x * 6} cy={205 + mousePos.y * 6} r="10" fill="#000" />
              <circle cx={170 + mousePos.x * 6} cy={205 + mousePos.y * 6} r="3" fill="#ff453a" />
              <circle cx={230 + mousePos.x * 6} cy={205 + mousePos.y * 6} r="3" fill="#ff453a" />

              {/* Gaunt Nose Bridge & Creases */}
              <line x1="200" y1="190" x2="196" y2="255" stroke="#000" strokeWidth="4.5" />
              <path d="M 190,260 Q 200,265 210,260" stroke="#000" strokeWidth="4" fill="none" />

              {/* Cheekbone Shadow Hatching */}
              <path d="M 140,250 L 165,280" stroke="#7c2d12" strokeWidth="3" />
              <path d="M 135,260 L 160,290" stroke="#7c2d12" strokeWidth="3" />
              <path d="M 260,250 L 235,280" stroke="#7c2d12" strokeWidth="3" />
              <path d="M 265,260 L 240,290" stroke="#7c2d12" strokeWidth="3" />

              {/* Chilling Thin Mouth Smile */}
              <path
                d="M 160,295 Q 200,315 240,295"
                stroke="#000"
                strokeWidth="4"
                fill="none"
              />
              <line x1="165" y1="298" x2="235" y2="298" stroke="#7f1d1d" strokeWidth="2.5" />
            </svg>
          )}

          {/* VCR Tape Pause Jitter Overlay if held */}
          {frameHeld && (
            <div className="absolute inset-0 bg-red-950/20 pointer-events-none flex items-center justify-center">
              <span className="font-tape text-3xl sm:text-4xl text-red-500 tracking-widest animate-pulse px-4 py-1 bg-black/80 border border-red-500/80">
                ❚❚ PAUSED 00:03:18
              </span>
            </div>
          )}
        </div>

        {/* Interaction hint */}
        <p className="font-caption text-xs text-[#fed7aa]/80 tracking-widest uppercase mt-4">
          [ CLICK VISAGE TO FORCE ANOMALY ]
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          id="btn-hold-frame"
          data-interactive="true"
          onClick={handleHoldFrame}
          className={`px-4 py-2 rounded text-xs font-caption tracking-wider border transition-colors ${
            frameHeld
              ? 'bg-red-900/60 border-red-500 text-red-300'
              : 'bg-black/60 border-white/20 text-white/80 hover:text-white'
          }`}
        >
          {frameHeld ? 'RELEASE HELD FRAME ▶' : '❚❚ HOLD CURRENT FRAME'}
        </button>

        <button
          id="btn-proceed-scene-4"
          data-interactive="true"
          onClick={() => {
            sound.playTapeChop();
            onProceed();
          }}
          className="px-6 py-2 rounded-sm bg-[#ea580c] hover:bg-[#f97316] text-black font-caption font-bold text-sm tracking-wider uppercase border border-black shadow-[0_0_15px_rgba(234,88,12,0.6)] transition-all duration-150"
        >
          ADVANCE TAPE • SCENE 04 ESCALATION →
        </button>
      </div>
    </div>
  );
};
