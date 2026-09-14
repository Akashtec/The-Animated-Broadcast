import React from 'react';
import { Volume2, VolumeX, Eye, Radio, Sparkles, Rewind, FastForward } from 'lucide-react';
import { SceneId, TapeState } from '../types';
import { sound } from '../audio/soundEngine';

interface TapeHeaderProps {
  tapeState: TapeState;
  onSceneChange: (scene: SceneId) => void;
  onToggleAudio: () => void;
  onToggleAutoPlay: () => void;
  onToggleReducedMotion: () => void;
  onTriggerGlitch: () => void;
}

const SCENE_NAMES: Record<SceneId, string> = {
  1: '01 ARRIVAL',
  2: '02 DISCOVERY',
  3: '03 DISTURBANCE',
  4: '04 ESCALATION',
  5: '05 REVEAL',
  6: '06 FINAL STATE',
};

export const TapeHeader: React.FC<TapeHeaderProps> = ({
  tapeState,
  onSceneChange,
  onToggleAudio,
  onToggleAutoPlay,
  onToggleReducedMotion,
  onTriggerGlitch,
}) => {
  const formatTime = (scene: SceneId) => {
    const mins = '00';
    const secs = (scene * 4 + 8).toString().padStart(2, '0');
    return `${mins}:${secs}:12`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex flex-wrap items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto select-none border-b border-white/5">
      {/* Tape & VCR Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/40 border border-red-800/40 text-red-400 font-tape text-base sm:text-lg tracking-widest">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span>PLAY</span>
          <span className="text-white/60 text-xs ml-1 hidden sm:inline">SP</span>
        </div>

        <div className="font-tape text-lg sm:text-xl text-[#f28538] tracking-wider">
          {formatTime(tapeState.currentScene)}
        </div>

        <div className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-black/50 border border-white/10 text-xs font-caption text-white/70">
          <Radio className="w-3 h-3 text-[#d85622]" />
          <span>BROADCAST ARCHIVE #417</span>
        </div>
      </div>

      {/* Storyboard Scene Selector Pills */}
      <nav aria-label="Storyboard Scenes" className="flex items-center gap-1 sm:gap-1.5 order-3 sm:order-2 w-full sm:w-auto mt-2 sm:mt-0 justify-center">
        {([1, 2, 3, 4, 5, 6] as SceneId[]).map((sceneId) => {
          const isActive = tapeState.currentScene === sceneId;
          return (
            <button
              key={sceneId}
              id={`scene-nav-btn-${sceneId}`}
              data-interactive="true"
              onClick={() => {
                sound.playTapeChop();
                onSceneChange(sceneId);
              }}
              title={SCENE_NAMES[sceneId]}
              className={`px-2 sm:px-2.5 py-1 rounded text-xs font-caption tracking-wider transition-all duration-150 flex items-center gap-1 ${
                isActive
                  ? 'bg-[#d85622] text-black font-bold shadow-[0_0_12px_rgba(216,86,34,0.7)]'
                  : 'bg-black/60 text-[#ffefe0]/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{sceneId}</span>
              <span className="hidden lg:inline text-[10px] opacity-90">
                {SCENE_NAMES[sceneId].split(' ')[1]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Interactive Controls & Audio */}
      <div className="flex items-center gap-1.5 sm:gap-2 order-2 sm:order-3">
        {/* Distort/Glitch Tape Button */}
        <button
          id="btn-trigger-glitch"
          data-interactive="true"
          onClick={() => {
            sound.playStaticBurst(0.8);
            onTriggerGlitch();
          }}
          title="Manual Tracking Glitch"
          className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-black/60 hover:bg-[#d85622]/20 border border-white/15 text-white/80 hover:text-[#f89e58] text-xs font-caption flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f28538]" />
          <span className="hidden md:inline">GLITCH</span>
        </button>

        {/* Auto Storyboard Play/Pause */}
        <button
          id="btn-toggle-autoplay"
          data-interactive="true"
          onClick={() => {
            sound.playClick();
            onToggleAutoPlay();
          }}
          title={tapeState.autoPlayStoryboard ? 'Pause auto progression' : 'Auto play scenes'}
          className={`p-1.5 sm:px-2 sm:py-1 rounded border text-xs font-caption flex items-center gap-1 transition-colors ${
            tapeState.autoPlayStoryboard
              ? 'bg-[#f28538]/20 border-[#f28538] text-[#f28538]'
              : 'bg-black/60 border-white/15 text-white/70 hover:text-white'
          }`}
        >
          {tapeState.autoPlayStoryboard ? (
            <>
              <FastForward className="w-3.5 h-3.5" />
              <span className="hidden md:inline">AUTO</span>
            </>
          ) : (
            <>
              <Rewind className="w-3.5 h-3.5 opacity-60" />
              <span className="hidden md:inline">MANUAL</span>
            </>
          )}
        </button>

        {/* Audio Toggle (Essential per prompt) */}
        <button
          id="btn-toggle-audio"
          data-interactive="true"
          onClick={() => {
            onToggleAudio();
          }}
          aria-label={tapeState.isMuted ? 'Turn on vintage audio' : 'Mute audio'}
          title={tapeState.isMuted ? 'Turn on audio' : 'Mute audio'}
          className={`p-1.5 sm:px-2.5 sm:py-1 rounded text-xs font-caption flex items-center gap-1.5 transition-all ${
            tapeState.isMuted
              ? 'bg-amber-950/60 border border-amber-600/50 text-amber-300 hover:bg-amber-900/60'
              : 'bg-[#d85622]/30 border border-[#d85622] text-[#f89e58] shadow-[0_0_10px_rgba(216,86,34,0.4)]'
          }`}
        >
          {tapeState.isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SOUND OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#f89e58]" />
              <span className="hidden sm:inline">AUDIO ON</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
