import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SceneId, TapeState } from './types';
import { sound } from './audio/soundEngine';
import { TapeHeader } from './components/TapeHeader';
import { CrtOverlay } from './components/CrtOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Scene01Arrival } from './scenes/Scene01Arrival';
import { Scene02Discovery } from './scenes/Scene02Discovery';
import { Scene03Disturbance } from './scenes/Scene03Disturbance';
import { Scene04Escalation } from './scenes/Scene04Escalation';
import { Scene05Reveal } from './scenes/Scene05Reveal';
import { Scene06FinalState } from './scenes/Scene06FinalState';
import { Volume2, ChevronDown } from 'lucide-react';

export default function App() {
  const [tapeState, setTapeState] = useState<TapeState>({
    currentScene: 1,
    isPlaying: true,
    isMuted: true,
    volume: 0.5,
    trackingStatic: 1,
    glitchTrigger: 0,
    reducedMotion: false,
    crtFilterEnabled: true,
    autoPlayStoryboard: false,
  });

  const [isGlitching, setIsGlitching] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const touchStartY = useRef<number>(0);
  const isTransitioning = useRef<boolean>(false);

  // Keyboard navigation & Shortcuts
  const handleSceneChange = useCallback((scene: SceneId) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Trigger transition effects
    sound.playTapeChop();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 180);

    setTapeState((prev) => ({
      ...prev,
      currentScene: scene,
    }));

    setTimeout(() => {
      isTransitioning.current = false;
    }, 350);
  }, []);

  const nextScene = useCallback(() => {
    setTapeState((prev) => {
      if (prev.currentScene < 6) {
        const next = (prev.currentScene + 1) as SceneId;
        handleSceneChange(next);
        return { ...prev, currentScene: next };
      }
      return prev;
    });
  }, [handleSceneChange]);

  const prevScene = useCallback(() => {
    setTapeState((prev) => {
      if (prev.currentScene > 1) {
        const p = (prev.currentScene - 1) as SceneId;
        handleSceneChange(p);
        return { ...prev, currentScene: p };
      }
      return prev;
    });
  }, [handleSceneChange]);

  // Audio Toggle
  const toggleAudio = useCallback(() => {
    setTapeState((prev) => {
      const nextMuted = !prev.isMuted;
      sound.setMuted(nextMuted);
      if (!nextMuted) {
        setShowAudioPrompt(false);
        sound.playCreepyLullabyNote(440, 0);
      }
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  // Trigger manual glitch
  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    sound.playStaticBurst(0.75);
    setTimeout(() => setIsGlitching(false), 220);
  }, []);

  // Auto Storyboard Timer
  useEffect(() => {
    if (!tapeState.autoPlayStoryboard) return;
    const timer = setInterval(() => {
      setTapeState((prev) => {
        const next = prev.currentScene >= 6 ? 1 : ((prev.currentScene + 1) as SceneId);
        sound.playTapeChop();
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
        return { ...prev, currentScene: next };
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [tapeState.autoPlayStoryboard]);

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextScene();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevScene();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          handleSceneChange(Number(e.key) as SceneId);
          break;
        case 'm':
        case 'M':
          toggleAudio();
          break;
        case 'g':
        case 'G':
          triggerGlitch();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene, handleSceneChange, toggleAudio, triggerGlitch]);

  // Wheel / Scroll progression with debounce
  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 600) return; // Debounce wheel
      if (Math.abs(e.deltaY) > 40) {
        lastWheelTime = now;
        if (e.deltaY > 0) {
          nextScene();
        } else {
          prevScene();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextScene, prevScene]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextScene();
      } else {
        prevScene();
      }
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#0c0806] text-[#ffefe0] flex flex-col justify-between overflow-hidden select-none font-caption"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Custom CRT Phosphor / Pupil Cursor */}
      <CustomCursor />

      {/* Retro CRT Overlay & VHS Tracking Noise */}
      <CrtOverlay glitchActive={isGlitching} trackingIntensity={tapeState.trackingStatic} />

      {/* Tape HUD Header */}
      <TapeHeader
        tapeState={tapeState}
        onSceneChange={handleSceneChange}
        onToggleAudio={toggleAudio}
        onToggleAutoPlay={() =>
          setTapeState((p) => ({ ...p, autoPlayStoryboard: !p.autoPlayStoryboard }))
        }
        onToggleReducedMotion={() =>
          setTapeState((p) => ({ ...p, reducedMotion: !p.reducedMotion }))
        }
        onTriggerGlitch={triggerGlitch}
      />

      {/* First-time Audio Enable Prompt (Compliant with browser autoplay policy) */}
      {showAudioPrompt && tapeState.isMuted && (
        <div className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-30 bg-amber-950/90 border border-amber-500/70 px-4 py-2 rounded shadow-2xl flex items-center gap-2.5 backdrop-blur-sm animate-bounce">
          <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-caption text-amber-200">
            Click to enable analogue audio (tape hiss, CRT hum, eerie chimes)
          </span>
          <button
            id="prompt-enable-audio-btn"
            data-interactive="true"
            onClick={toggleAudio}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded tracking-wider transition-colors ml-1"
          >
            ENABLE
          </button>
          <button
            onClick={() => setShowAudioPrompt(false)}
            className="text-white/40 hover:text-white text-xs px-1"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Storyboard Stage */}
      <main className="relative flex-1 w-full flex items-center justify-center pt-16 sm:pt-14 pb-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
          {tapeState.currentScene === 1 && (
            <Scene01Arrival
              onProceed={() => handleSceneChange(2)}
              reducedMotion={tapeState.reducedMotion}
            />
          )}
          {tapeState.currentScene === 2 && (
            <Scene02Discovery
              onProceed={() => handleSceneChange(3)}
              reducedMotion={tapeState.reducedMotion}
            />
          )}
          {tapeState.currentScene === 3 && (
            <Scene03Disturbance
              onProceed={() => handleSceneChange(4)}
              reducedMotion={tapeState.reducedMotion}
            />
          )}
          {tapeState.currentScene === 4 && (
            <Scene04Escalation
              onProceed={() => handleSceneChange(5)}
              reducedMotion={tapeState.reducedMotion}
            />
          )}
          {tapeState.currentScene === 5 && (
            <Scene05Reveal
              onProceed={() => handleSceneChange(6)}
              reducedMotion={tapeState.reducedMotion}
            />
          )}
          {tapeState.currentScene === 6 && (
            <Scene06FinalState
              onRestart={() => handleSceneChange(1)}
              onJumpToScene={handleSceneChange}
              reducedMotion={tapeState.reducedMotion}
            />
          )}
        </div>
      </main>

      {/* Subtle Bottom Scroll / Progress indicator */}
      <footer className="relative z-20 pb-4 pt-1 flex items-center justify-between px-4 sm:px-8 text-[11px] font-caption text-white/40 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#d85622]" />
          <span>BROADCAST 1982 • ANALOGUE HORROR ANIMATION</span>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <span>SCROLL OR USE ARROW KEYS TO NAVIGATE TAPE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-pulse text-[#ea580c]" />
        </div>

        <div className="font-tape text-xs text-white/60">
          FRAME {tapeState.currentScene * 240} / 1440
        </div>
      </footer>
    </div>
  );
}
