import React, { useState, useEffect } from 'react';
import { RotateCcw, Play, Film, AlertTriangle, MonitorPlay } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { SceneId } from '../types';

interface Scene06FinalStateProps {
  onRestart: () => void;
  onJumpToScene: (id: SceneId) => void;
  reducedMotion: boolean;
}

export const Scene06FinalState: React.FC<Scene06FinalStateProps> = ({
  onRestart,
  onJumpToScene,
  reducedMotion,
}) => {
  const [isInverted, setIsInverted] = useState(false);
  const [showTapeLog, setShowTapeLog] = useState(false);
  const [jitterFrame, setJitterFrame] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setJitterFrame((f) => (f + 1) % 4);
    }, 110);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const toggleInversion = () => {
    sound.playStaticBurst(0.7);
    sound.playCreepyLullabyNote(220, -50);
    setIsInverted(!isInverted);
  };

  const jitterX = reducedMotion ? 0 : [0, -1.5, 1, -0.5][jitterFrame];

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-between p-4 select-none bg-black overflow-hidden">
      {/* Background Deep Indigo Radiance (Matching Frame 00:18 - 00:19) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] rounded-full blur-3xl opacity-50 pointer-events-none transition-all duration-500"
          style={{
            background: isInverted
              ? 'radial-gradient(circle, #ea580c 0%, #7c2d12 45%, #000 80%)'
              : 'radial-gradient(circle, #2563eb 0%, #1e3a8a 45%, #0a0e1a 80%)',
          }}
        />
      </div>

      {/* Broadcast Archive Stamp */}
      <div className="relative z-10 flex flex-col items-center mt-2 text-center pointer-events-none">
        <span className="font-tape text-xl sm:text-2xl text-blue-400 tracking-widest">
          SCENE 06 • THE CORRUPTED SPOOL
        </span>
        <span className="font-caption text-xs text-white/50 tracking-wider mt-0.5">
          BROADCAST TRANSMISSION COMPLETE • 1982 ARCHIVE
        </span>
      </div>

      {/* Main Visual: Demonic Inverted Blue Visage (Reference 00:18 - 00:19) */}
      <div
        className="relative z-10 my-auto flex flex-col items-center cursor-pointer group"
        onClick={toggleInversion}
        data-interactive="true"
        title="Click to toggle spectral inversion"
        style={{ transform: `translateX(${jitterX}px)` }}
      >
        <svg
          viewBox="0 0 440 440"
          className="w-[280px] sm:w-[380px] md:w-[420px] drop-shadow-[0_0_35px_rgba(37,99,235,0.5)] transition-transform duration-200 group-hover:scale-[1.02]"
          style={{ filter: 'url(#sketch-edge)' }}
        >
          {/* Negative Inverted Indigo / Blue Face Palette */}
          <defs>
            <radialGradient id="corruptedSkin" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor={isInverted ? '#fed7aa' : '#1e3a8a'} />
              <stop offset="50%" stopColor={isInverted ? '#f97316' : '#172554'} />
              <stop offset="100%" stopColor={isInverted ? '#7c2d12' : '#030712'} />
            </radialGradient>
          </defs>

          {/* Hair framing face with ragged contour */}
          <path
            d="M 50,20 L 390,20 L 420,440 L 370,440 L 330,170 L 320,420 L 300,420 L 310,210 Q 220,180 130,210 L 140,420 L 120,420 L 110,170 L 70,440 L 20,440 Z"
            fill="#030712"
            stroke={isInverted ? '#090503' : '#60a5fa'}
            strokeWidth="3.5"
          />

          {/* Inverted Face Silhouette */}
          <path
            d="M 120,140 Q 105,250 135,330 Q 220,380 295,330 Q 325,250 310,140 Z"
            fill="url(#corruptedSkin)"
            stroke={isInverted ? '#090503' : '#93c5fd'}
            strokeWidth="5"
          />

          {/* Negative White Highlight Masks on Cheekbones and Forehead (00:18) */}
          <path
            d="M 150,170 Q 220,150 280,170 L 285,210 Q 220,195 145,210 Z"
            fill={isInverted ? '#7c2d12' : '#3b82f6'}
            opacity="0.6"
          />

          {/* Glowing Searing Eye Sockets & Slits */}
          {/* Left Eye */}
          <ellipse cx="175" cy="220" rx="32" ry="22" fill={isInverted ? '#090503' : '#020617'} />
          <ellipse
            cx="175"
            cy="220"
            rx="28"
            ry="18"
            fill={isInverted ? '#ef4444' : '#ffffff'}
            className="animate-pulse"
          />
          {/* Intense pupil slit */}
          <ellipse cx="175" cy="220" rx="4" ry="16" fill={isInverted ? '#ffffff' : '#000000'} />
          {/* White chalk contour */}
          <path
            d="M 145,220 Q 175,195 205,220 Q 175,245 145,220 Z"
            fill="none"
            stroke={isInverted ? '#000' : '#bfdbfe'}
            strokeWidth="4"
          />

          {/* Right Eye */}
          <ellipse cx="265" cy="220" rx="32" ry="22" fill={isInverted ? '#090503' : '#020617'} />
          <ellipse
            cx="265"
            cy="220"
            rx="28"
            ry="18"
            fill={isInverted ? '#ef4444' : '#ffffff'}
            className="animate-pulse"
          />
          <ellipse cx="265" cy="220" rx="4" ry="16" fill={isInverted ? '#ffffff' : '#000000'} />
          <path
            d="M 235,220 Q 265,195 295,220 Q 265,245 235,220 Z"
            fill="none"
            stroke={isInverted ? '#000' : '#bfdbfe'}
            strokeWidth="4"
          />

          {/* Nose Sharp White Edge (From 00:19) */}
          <path
            d="M 220,205 L 214,275 L 230,275"
            fill="none"
            stroke={isInverted ? '#000' : '#dbeafe'}
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Jagged Corrupted Mouth Smirk (From 00:18 - 00:19) */}
          <path
            d="M 160,315 Q 220,345 280,315"
            fill="none"
            stroke={isInverted ? '#000' : '#dbeafe'}
            strokeWidth="5"
          />
          {/* Inner dark grin */}
          <path
            d="M 165,315 Q 220,335 275,315 Q 220,350 165,315 Z"
            fill={isInverted ? '#380804' : '#030712'}
            stroke={isInverted ? '#000' : '#60a5fa'}
            strokeWidth="2.5"
          />
        </svg>

        <p className="font-caption text-xs text-blue-300/80 tracking-widest uppercase mt-3">
          [ CLICK VISAGE TO INVERT REALITY ]
        </p>
      </div>

      {/* Narrative Tape Deck Controls (Completes the experience without generic marketing slop) */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Rewind to Beginning */}
          <button
            id="btn-rewind-tape"
            data-interactive="true"
            onClick={() => {
              sound.playTapeChop();
              onRestart();
            }}
            className="px-5 py-2 rounded-sm bg-[#ea580c] hover:bg-[#f97316] text-black font-caption font-bold text-xs tracking-wider uppercase border border-black shadow-[0_0_15px_rgba(234,88,12,0.6)] flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REWIND TAPE (SCENE 01)</span>
          </button>

          {/* Inspect Archival Tape Log */}
          <button
            id="btn-toggle-tape-log"
            data-interactive="true"
            onClick={() => {
              sound.playClick();
              setShowTapeLog(!showTapeLog);
            }}
            className="px-4 py-2 rounded-sm bg-black/70 hover:bg-white/10 text-white/80 font-caption text-xs tracking-wider uppercase border border-white/20 flex items-center gap-1.5 transition-all"
          >
            <Film className="w-3.5 h-3.5 text-[#f28538]" />
            <span>{showTapeLog ? 'HIDE ARCHIVE LOG' : 'VIEW TAPE LOG'}</span>
          </button>
        </div>

        {/* Archival Log Drawer */}
        {showTapeLog && (
          <div className="w-full bg-[#120a07]/90 border border-white/15 p-3 sm:p-4 rounded text-xs font-caption text-white/80 space-y-2 mt-1 max-h-48 overflow-y-auto">
            <div className="text-[#f97316] font-bold tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>NTSC BROADCAST DEVIATION REPORT #0914-1982</span>
            </div>
            <p className="text-white/60">
              Recovered 1/2-inch magnetic tape cartridge. Contains standard public children's cartoon broadcast with inexplicable frame anomalies, anatomical shifts, and undocumented macro closeups.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
              {[
                { id: 1, label: '01 ARRIVAL', time: '00:00:12' },
                { id: 2, label: '02 DISCOVERY', time: '00:08:04' },
                { id: 3, label: '03 DISTURBANCE', time: '00:11:18' },
                { id: 4, label: '04 ESCALATION', time: '00:06:22' },
                { id: 5, label: '05 REVEAL', time: '00:03:50' },
                { id: 6, label: '06 FINAL STATE', time: '00:18:44' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playTapeChop();
                    onJumpToScene(item.id as SceneId);
                  }}
                  className="p-1.5 text-left rounded bg-black/60 hover:bg-[#ea580c]/30 border border-white/10 hover:border-[#ea580c]/60 flex flex-col"
                >
                  <span className="text-[#fed7aa] font-semibold">{item.label}</span>
                  <span className="text-[10px] font-tape text-white/50">{item.time}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
