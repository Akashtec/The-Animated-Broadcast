import React, { useState, useEffect } from 'react';
import { sound } from '../audio/soundEngine';

interface Scene04EscalationProps {
  onProceed: () => void;
  reducedMotion: boolean;
}

export const Scene04Escalation: React.FC<Scene04EscalationProps> = ({ onProceed, reducedMotion }) => {
  const [slitPos, setSlitPos] = useState({ x: 0, y: 0 });
  const [strobeIntensity, setStrobeIntensity] = useState(0);
  const [fastCutIndex, setFastCutIndex] = useState(0);
  const [isRapidCutMode, setIsRapidCutMode] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setSlitPos({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Rapid cut reel loop if enabled
  useEffect(() => {
    if (!isRapidCutMode || reducedMotion) return;
    const interval = setInterval(() => {
      setFastCutIndex((i) => (i + 1) % 3);
      sound.playStaticBurst(0.3);
    }, 240);
    return () => clearInterval(interval);
  }, [isRapidCutMode, reducedMotion]);

  const handleSlitClick = () => {
    sound.playStaticBurst(0.8);
    sound.playHeartbeat();
    setStrobeIntensity(1);
    setTimeout(() => setStrobeIntensity(0), 160);
  };

  const toggleRapidCut = () => {
    sound.playTapeChop();
    setIsRapidCutMode(!isRapidCutMode);
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-2 sm:p-4 select-none bg-black overflow-hidden">
      {/* Title */}
      <div className="relative z-10 flex flex-col items-center mb-4 text-center">
        <span className="font-tape text-lg sm:text-2xl text-red-500 tracking-wider uppercase">
          SCENE 04 • THE NARROWED APERTURE
        </span>
        <p className="font-caption text-xs sm:text-sm text-white/60">
          The tape begins to jump. Framing narrows into an inescapable gaze.
        </p>
      </div>

      {/* Extreme Letterbox Slit (Directly replicating Frames 00:06 & 00:07) */}
      <div
        className="relative z-10 w-full max-w-4xl h-[240px] sm:h-[300px] md:h-[340px] bg-black border-y-4 border-[#ea580c]/60 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={handleSlitClick}
        data-interactive="true"
        title="Click to startle gaze"
      >
        {/* Pitch Black Letterbox Bounds with Glowing Center Aperture */}
        <div
          className="relative w-full h-[160px] sm:h-[200px] bg-[#e66928] overflow-hidden flex items-center justify-center transition-all duration-100"
          style={{
            transform: `translateY(${slitPos.y * 12}px)`,
            filter: strobeIntensity ? 'invert(100%)' : 'none',
          }}
        >
          {/* Black Static Bars Top & Bottom within the slit (From 00:06) */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black/90 z-20 flex flex-col justify-around">
            <div className="h-0.5 bg-white/40 w-3/4 mx-auto animate-pulse" />
            <div className="h-0.5 bg-red-500/50 w-1/2 ml-4" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-black/90 z-20 flex flex-col justify-around">
            <div className="h-0.5 bg-white/40 w-2/3 ml-auto animate-pulse" />
            <div className="h-0.5 bg-yellow-500/50 w-1/3 mr-8" />
          </div>

          {/* SVG Artwork: Unblinking staring eyes behind hair strands (Reference 00:06 - 00:07) */}
          <svg
            viewBox="0 0 600 200"
            className="w-full h-full object-cover scale-110 sm:scale-125"
            style={{ filter: 'url(#sketch-edge)' }}
          >
            {/* Orange background flesh tone */}
            <rect width="600" height="200" fill="#f97316" />

            {/* Jagged Stringy Black Hair Framing Eyes (From 00:06) */}
            {/* Left hair curtain */}
            <path
              d="M 0,0 L 160,0 L 175,90 L 155,140 L 180,200 L 0,200 Z"
              fill="#090503"
            />
            {/* Right hair curtain */}
            <path
              d="M 440,0 L 600,0 L 600,200 L 420,200 L 445,130 L 425,80 Z"
              fill="#090503"
            />
            {/* Center bangs strands hanging over forehead */}
            <polygon points="260,0 280,0 270,75 258,0" fill="#090503" />
            <polygon points="320,0 340,0 332,85 318,0" fill="#090503" />
            <polygon points="190,0 210,0 200,95 185,0" fill="#090503" />
            <polygon points="390,0 410,0 400,90 385,0" fill="#090503" />

            {/* Left Eye: Massive, wide, uncanny cartoon/realistic hybrid */}
            <g id="slit-left-eye">
              {/* Eye White with rough black rim */}
              <ellipse cx="230" cy="105" rx="42" ry="32" fill="#fff7ed" stroke="#090503" strokeWidth="6" />
              {/* Heavy black eye contour shadow */}
              <path
                d="M 188,105 Q 230,70 272,105 Q 230,140 188,105 Z"
                fill="none"
                stroke="#090503"
                strokeWidth="5"
              />
              {/* Pupil tracking cursor */}
              <circle
                cx={230 + slitPos.x * 12}
                cy={105 + slitPos.y * 6}
                r="18"
                fill="#090503"
              />
              {/* Iris red ring / stipple */}
              <circle
                cx={230 + slitPos.x * 12}
                cy={105 + slitPos.y * 6}
                r="14"
                fill="#b91c1c"
              />
              <circle
                cx={230 + slitPos.x * 12}
                cy={105 + slitPos.y * 6}
                r="7"
                fill="#000000"
              />
              {/* White Glint */}
              <circle
                cx={226 + slitPos.x * 12}
                cy={100 + slitPos.y * 6}
                r="3.5"
                fill="#ffffff"
              />
            </g>

            {/* Right Eye */}
            <g id="slit-right-eye">
              <ellipse cx="370" cy="105" rx="42" ry="32" fill="#fff7ed" stroke="#090503" strokeWidth="6" />
              <path
                d="M 328,105 Q 370,70 412,105 Q 370,140 328,105 Z"
                fill="none"
                stroke="#090503"
                strokeWidth="5"
              />
              <circle
                cx={370 + slitPos.x * 12}
                cy={105 + slitPos.y * 6}
                r="18"
                fill="#090503"
              />
              <circle
                cx={370 + slitPos.x * 12}
                cy={105 + slitPos.y * 6}
                r="14"
                fill="#b91c1c"
              />
              <circle
                cx={370 + slitPos.x * 12}
                cy={105 + slitPos.y * 6}
                r="7"
                fill="#000000"
              />
              <circle
                cx={366 + slitPos.x * 12}
                cy={100 + slitPos.y * 6}
                r="3.5"
                fill="#ffffff"
              />
            </g>

            {/* Nose Bridge Dot from Video (Frame 00:07) */}
            <circle cx="300" cy="120" r="3.5" fill="#090503" />

            {/* Eyebrows */}
            <path d="M 195,68 Q 230,55 265,68" stroke="#090503" strokeWidth="5.5" fill="none" />
            <path d="M 335,68 Q 370,55 405,68" stroke="#090503" strokeWidth="5.5" fill="none" />
          </svg>
        </div>

        {/* Scanline Jitter across the slit */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 6px)" />
      </div>

      {/* Subtitle / Interaction Note */}
      <p className="font-caption text-xs text-[#fed7aa]/80 tracking-widest uppercase mt-4 text-center">
        [ MOVE CURSOR TO SHIFT APERTURE • CLICK TO DISRUPT GAZE ]
      </p>

      {/* Controls */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          id="btn-toggle-rapid-cut"
          data-interactive="true"
          onClick={toggleRapidCut}
          className={`px-4 py-2 rounded text-xs font-caption tracking-wider border transition-colors ${
            isRapidCutMode
              ? 'bg-red-800 border-red-500 text-white font-bold animate-pulse'
              : 'bg-black/60 border-white/20 text-white/80 hover:text-white'
          }`}
        >
          {isRapidCutMode ? 'STOP RAPID CUTS ◼' : '▶ ENABLE RAPID CUT REEL'}
        </button>

        <button
          id="btn-proceed-scene-5"
          data-interactive="true"
          onClick={() => {
            sound.playTapeChop();
            onProceed();
          }}
          className="px-6 py-2 rounded-sm bg-[#ea580c] hover:bg-[#f97316] text-black font-caption font-bold text-sm tracking-wider uppercase border border-black shadow-[0_0_15px_rgba(234,88,12,0.6)] transition-all duration-150"
        >
          ADVANCE TAPE • SCENE 05 THE REVEAL →
        </button>
      </div>
    </div>
  );
};
