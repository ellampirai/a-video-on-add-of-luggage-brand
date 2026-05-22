export interface Scene {
  id: number;
  timeRange: string; // e.g. "0s - 5s", "5s - 15s"
  title: string;
  visualAction: string;
  caption: string;
  voiceover: string;
  soundEffect: string;
  imagePath: string; // Resolved asset URL
}

export interface Soundtrack {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  style: string;
  color: string; // Tailwind class background
  frequencyWaveform: number[]; // Simulated visual heights
  tempoHz: number; // Synth beat frequency
}

export interface CampaignSettings {
  vibe: string;
  targetAudience: string;
  soundtrackId: string;
  customAngle: string;
}

export interface ReelRecipe {
  viralityScore: number;
  viralityReason: string;
  editingHacks: string[];
  scenes: Scene[];
}
