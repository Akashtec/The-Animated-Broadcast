import React, { useState, useEffect } from 'react';
import { sound } from '../audio/soundEngine';

interface Scene02DiscoveryProps {
  onProceed: () => void;
  reducedMotion: boolean;
}

export const Scene02Discovery: React.FC<Scene02DiscoveryProps> = ({ onProceed, reducedMotion }) => {
  const [activeTab, setActiveTab] = useState<'portrait' | 'mother'>('portrait');
  const [portraitZoom, setPortraitZoom] = useState(false);
  const [pieSliceTaken, setPieSliceTaken] = useState(false);
  const [jitterFrame, setJitterFrame] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setJitterFrame((f) => (f + 1) % 4);
    }, 130);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const togglePortrait = () => {
    sound.playCreepyLullabyNote(523.25, -20);
    sound.playTapeChop();
    setPortraitZoom(!portraitZoom);
  };

  const handlePieClick = () => {
    sound.playCreepyLullabyNote(392, 10);
    sound.playStaticBurst(0.3);
    setPieSliceTaken(true);
    setTimeout(() => setPieSliceTaken(false), 2000);
  };

  const jitterY = reducedMotion ? 0 : [0, 1, -1, 0.5][jitterFrame];

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-4 select-none">
      {/* Warm domestic orange background circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[340px] h-[340px] sm:w-[600px] sm:h-[500px] rounded-full blur-3xl opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #ea580c 0%, #9a3412 50%, #451a03 75%, transparent 95%)',
          }}
        />
      </div>

      {/* Scene Header & Mode Switcher */}
      <div className="relative z-10 flex flex-col items-center mb-6">
        <span className="font-tape text-lg sm:text-2xl text-[#f97316] tracking-wider uppercase">
          SCENE 02 • THE DOMESTIC ARCHIVE
        </span>
        <div className="flex items-center gap-2 mt-2">
          <button
            id="tab-portrait"
            data-interactive="true"
            onClick={() => {
              sound.playClick();
              setActiveTab('portrait');
            }}
            className={`px-3 py-1 text-xs font-caption tracking-wider rounded border transition-colors ${
              activeTab === 'portrait'
                ? 'bg-[#d85622] text-black font-bold border-[#d85622]'
                : 'bg-black/50 text-white/70 border-white/20 hover:text-white'
            }`}
          >
            [ FRAMED PORTRAIT (00:08) ]
          </button>
          <button
            id="tab-mother"
            data-interactive="true"
            onClick={() => {
              sound.playClick();
              setActiveTab('mother');
            }}
            className={`px-3 py-1 text-xs font-caption tracking-wider rounded border transition-colors ${
              activeTab === 'mother'
                ? 'bg-[#d85622] text-black font-bold border-[#d85622]'
                : 'bg-black/50 text-white/70 border-white/20 hover:text-white'
            }`}
          >
            [ MOTHER'S OFFERING (00:20) ]
          </button>
        </div>
      </div>

      {/* Main Visual Stage */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ transform: `translateY(${jitterY}px)` }}
      >
        {activeTab === 'portrait' ? (
          /* Scene 02A: Framed Photograph on Wooden Table (Reference 00:08 - 00:10) */
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300"
            onClick={togglePortrait}
            data-interactive="true"
            title="Click to inspect closer"
          >
            <svg
              viewBox="0 0 460 360"
              className={`w-[320px] sm:w-[440px] md:w-[500px] transition-all duration-300 drop-shadow-[0_0_25px_rgba(234,88,12,0.4)] ${
                portraitZoom ? 'scale-110 sm:scale-125' : 'scale-100'
              }`}
              style={{ filter: 'url(#sketch-edge)' }}
            >
              <defs>
                <linearGradient id="woodTable" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Table Top Base */}
              <path
                d="M 20,290 L 440,290 L 420,350 L 40,350 Z"
                fill="url(#woodTable)"
                stroke="#090503"
                strokeWidth="4"
              />
              <line x1="20" y1="290" x2="440" y2="290" stroke="#090503" strokeWidth="5" />

              {/* Birthday Cake with Lit Candle (Left side in Frame 00:08) */}
              <g id="cake-with-candle">
                {/* Plate */}
                <ellipse cx="75" cy="305" rx="35" ry="10" fill="#fef3c7" stroke="#090503" strokeWidth="3" />
                {/* Cake slice / mini cake */}
                <path
                  d="M 50,295 L 100,295 L 100,280 Q 75,275 50,280 Z"
                  fill="#fb923c"
                  stroke="#090503"
                  strokeWidth="3.5"
                />
                <path d="M 50,285 Q 75,290 100,285" stroke="#fff7ed" strokeWidth="2.5" fill="none" />
                {/* Candle */}
                <rect x="72" y="260" width="6" height="20" fill="#fef08a" stroke="#090503" strokeWidth="2" />
                {/* Candle Glow */}
                <circle cx="75" cy="250" r="16" fill="url(#candleGlow)" className="animate-pulse" />
                {/* Flame */}
                <path
                  d="M 75,244 Q 78,252 75,258 Q 72,252 75,244 Z"
                  fill="#facc15"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                />
              </g>

              {/* Pencil / Knife on right table */}
              <g id="table-utensil">
                <line x1="380" y1="310" x2="430" y2="330" stroke="#090503" strokeWidth="4.5" strokeLinecap="round" />
                <polygon points="430,330 425,325 435,332" fill="#090503" />
              </g>

              {/* Picture Frame (Warm Crayon/Rough Wooden Stand) */}
              <g id="family-portrait-frame">
                {/* Frame Shadow */}
                <polygon points="125,50 335,50 345,285 115,285" fill="#1c0f0a" opacity="0.6" />
                {/* Outer Wooden Frame */}
                <polygon
                  points="130,55 330,55 340,280 120,280"
                  fill="#fed7aa"
                  stroke="#090503"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
                {/* Inner Border */}
                <polygon
                  points="148,72 312,72 320,262 138,262"
                  fill="#f97316"
                  stroke="#090503"
                  strokeWidth="4"
                />

                {/* Photo Interior Background (Warm Orange CRT Tone) */}
                <rect x="152" y="76" width="164" height="182" fill="#fb923c" />

                {/* --- PORTRAIT CHARACTERS --- */}
                {/* 1. Mother (Left) */}
                <g id="photo-mother">
                  <circle cx="190" cy="130" r="22" fill="#ffedd5" stroke="#090503" strokeWidth="3" />
                  {/* Mother's wavy hair */}
                  <path
                    d="M 166,132 Q 164,110 190,110 Q 216,110 214,132 Q 200,122 190,124 Q 180,122 166,132 Z"
                    fill="#fed7aa"
                    stroke="#090503"
                    strokeWidth="3"
                  />
                  {/* Mother's smiling eyes */}
                  <path d="M 179,128 Q 184,124 189,128" fill="none" stroke="#090503" strokeWidth="2.5" />
                  <path d="M 193,128 Q 198,124 203,128" fill="none" stroke="#090503" strokeWidth="2.5" />
                  {/* Mother's smile */}
                  <path d="M 183,138 Q 191,145 199,138" fill="none" stroke="#090503" strokeWidth="2" />
                  {/* Mother's dress */}
                  <path d="M 170,152 Q 190,158 210,152 L 214,200 L 166,200 Z" fill="#fdba74" stroke="#090503" strokeWidth="3" />
                </g>

                {/* 2. Father (Right) */}
                <g id="photo-father">
                  <circle cx="270" cy="125" r="24" fill="#ffedd5" stroke="#090503" strokeWidth="3" />
                  {/* Balding hair sides */}
                  <path d="M 246,128 Q 244,115 250,110" fill="none" stroke="#090503" strokeWidth="3" />
                  <path d="M 294,128 Q 296,115 290,110" fill="none" stroke="#090503" strokeWidth="3" />
                  {/* Father's eyes */}
                  <circle cx="261" cy="122" r="2.5" fill="#090503" />
                  <circle cx="279" cy="122" r="2.5" fill="#090503" />
                  {/* Father's smile */}
                  <path d="M 262,135 Q 270,142 278,135" fill="none" stroke="#090503" strokeWidth="2.5" />
                  {/* Father's shirt */}
                  <path d="M 248,149 Q 270,155 292,149 L 298,200 L 242,200 Z" fill="#fed7aa" stroke="#090503" strokeWidth="3" />
                </g>

                {/* 3. Daughter in Foreground Center (The ominous staring focal point) */}
                <g id="photo-daughter">
                  {/* Long dark black hair falling around face */}
                  <path
                    d="M 205,170 Q 230,160 255,170 L 260,255 L 200,255 Z"
                    fill="#180e0a"
                    stroke="#090503"
                    strokeWidth="3.5"
                  />
                  {/* Face */}
                  <circle cx="230" cy="195" r="20" fill="#fed7aa" stroke="#090503" strokeWidth="3" />
                  {/* Hair bangs and side curtains */}
                  <path
                    d="M 210,185 Q 230,178 250,185 L 253,240 L 244,240 L 245,202 Q 230,192 215,202 L 216,240 L 207,240 Z"
                    fill="#180e0a"
                    stroke="#090503"
                    strokeWidth="2.5"
                  />
                  {/* Staring dark eyes */}
                  <circle cx="222" cy="195" r={portraitZoom ? '4.5' : '3.5'} fill="#090503" />
                  <circle cx="238" cy="195" r={portraitZoom ? '4.5' : '3.5'} fill="#090503" />
                  {/* Red pupil glint on zoom */}
                  {portraitZoom && (
                    <>
                      <circle cx="222" cy="195" r="1.5" fill="#ff2a2a" />
                      <circle cx="238" cy="195" r="1.5" fill="#ff2a2a" />
                    </>
                  )}
                  {/* Flat straight mouth line */}
                  <line x1="224" y1="207" x2="236" y2="207" stroke="#090503" strokeWidth="2.5" />
                </g>
              </g>
            </svg>
            <p className="mt-3 font-caption text-xs text-[#fed7aa]/80 tracking-widest uppercase">
              {portraitZoom ? '[ CLICK TO STEP BACK ]' : '[ CLICK TO INSPECT PORTRAIT CLOSELY ]'}
            </p>
          </div>
        ) : (
          /* Scene 02B: Mother Offering Warm Pie (Reference 00:20 - 00:21) */
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={handlePieClick}
            data-interactive="true"
            title="Click mother's pie"
          >
            <svg
              viewBox="0 0 460 420"
              className="w-[320px] sm:w-[420px] md:w-[480px] drop-shadow-[0_0_25px_rgba(234,88,12,0.4)]"
              style={{ filter: 'url(#sketch-edge)' }}
            >
              {/* Mother Character */}
              <g stroke="#090503" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Body & Apron/Dress */}
                <path
                  d="M 175,270 Q 150,330 170,390 L 290,390 Q 310,330 285,270 Z"
                  fill="#fed7aa"
                />
                <path d="M 195,290 Q 230,305 265,290" fill="none" stroke="#090503" strokeWidth="3.5" />

                {/* Left Arm holding the pie plate out (to the right) */}
                <path
                  d="M 275,275 Q 320,290 350,270"
                  fill="none"
                  stroke="#090503"
                  strokeWidth="6"
                />
                {/* Hand fingers */}
                <ellipse cx="355" cy="272" rx="10" ry="7" fill="#fed7aa" stroke="#090503" strokeWidth="3" />

                {/* Right Arm on hip */}
                <path d="M 185,275 Q 155,305 180,340" fill="none" stroke="#090503" strokeWidth="5.5" />

                {/* Steaming Fresh Pie (Right side of screen, 00:21) */}
                <g id="steaming-pie">
                  {/* Plate */}
                  <ellipse cx="395" cy="275" rx="42" ry="14" fill="#fef3c7" stroke="#090503" strokeWidth="4" />
                  {/* Pie Crust */}
                  <ellipse cx="395" cy="270" rx="38" ry="11" fill="#ea580c" stroke="#090503" strokeWidth="3.5" />
                  {/* Pie lattice / filling */}
                  <ellipse cx="395" cy="269" rx="30" ry="7" fill="#dc2626" stroke="#090503" strokeWidth="2.5" />

                  {/* Wavy Steam lines rising up */}
                  <path
                    d="M 380,250 Q 375,235 385,220 Q 395,205 385,190"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="3.5"
                    strokeDasharray="2 3"
                    className="animate-pulse"
                  />
                  <path
                    d="M 398,245 Q 405,230 395,215 Q 388,200 398,185"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="3.5"
                    strokeDasharray="2 3"
                    className="animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                  <path
                    d="M 415,250 Q 420,235 412,220 Q 405,205 415,190"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="3.5"
                    strokeDasharray="2 3"
                    className="animate-pulse"
                    style={{ animationDelay: '0.8s' }}
                  />
                </g>

                {/* Head */}
                <circle cx="230" cy="190" r="44" fill="#fed7aa" />

                {/* Mother's Hairstyle (Flared bob with bangs) */}
                <path
                  d="M 180,130 L 280,130 L 305,200 Q 300,215 288,215 Q 278,215 274,195 Q 230,200 186,195 Q 182,215 172,215 Q 158,215 155,200 Z"
                  fill="#fed7aa"
                  stroke="#090503"
                  strokeWidth="5"
                />

                {/* Bangs curve */}
                <path d="M 180,162 Q 230,172 280,162" fill="none" stroke="#090503" strokeWidth="4" />

                {/* Squinted Happy Eyes from video (Frame 00:20) */}
                <path d="M 205,180 Q 214,172 223,180" fill="none" stroke="#090503" strokeWidth="4" />
                <path d="M 237,180 Q 246,172 255,180" fill="none" stroke="#090503" strokeWidth="4" />

                {/* Nose */}
                <circle cx="230" cy="190" r="3" fill="#090503" />

                {/* Smiling Open Mouth with Lipstick */}
                <path
                  d="M 215,205 Q 230,225 245,205 Q 230,200 215,205 Z"
                  fill="#ef4444"
                  stroke="#090503"
                  strokeWidth="3.5"
                />
              </g>
            </svg>
            <p className="mt-3 font-caption text-xs text-[#fed7aa]/80 tracking-widest uppercase">
              {pieSliceTaken ? 'SHE SMILES AS YOU TASTE IT' : '[ CLICK TO ACCEPT HER OFFERING ]'}
            </p>
          </div>
        )}
      </div>

      {/* Advance Scene Button */}
      <div className="relative z-10 mt-8 flex flex-col items-center">
        <button
          id="btn-proceed-scene-3"
          data-interactive="true"
          onClick={() => {
            sound.playTapeChop();
            onProceed();
          }}
          className="px-6 py-2.5 rounded-sm bg-[#ea580c] hover:bg-[#f97316] text-black font-caption font-bold text-sm tracking-wider uppercase border border-black shadow-[0_0_15px_rgba(234,88,12,0.6)] transition-all duration-150 hover:translate-y-[-2px]"
        >
          ADVANCE TAPE • SCENE 03 DISTURBANCE →
        </button>
      </div>
    </div>
  );
};
