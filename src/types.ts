export type SceneId = 1 | 2 | 3 | 4 | 5 | 6;

export interface SceneMeta {
  id: SceneId;
  code: string;
  title: string;
  subtitle: string;
  timestamp: string;
  intensity: number; // 1 to 5
}

export interface TapeState {
  currentScene: SceneId;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  trackingStatic: number; // 0 to 1
  glitchTrigger: number;
  reducedMotion: boolean;
  crtFilterEnabled: boolean;
  autoPlayStoryboard: boolean;
}
