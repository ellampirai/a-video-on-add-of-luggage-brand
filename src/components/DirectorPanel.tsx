import { useState } from "react";
import { Sparkles, Play, Square, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import { CampaignSettings, Soundtrack } from "../types";
import { SOUNDTRACKS, VIBES, AUDIENCES } from "../data";
import { startSoundtrackSynth, stopSoundtrackSynth } from "../utils/audioSynth";

interface DirectorPanelProps {
  settings: CampaignSettings;
  onChangeSettings: (settings: CampaignSettings) => void;
  onGenerateAI: (customParams: any) => Promise<void>;
  isGeneratingAI: boolean;
  selectedSoundtrack: Soundtrack;
}

export default function DirectorPanel({
  settings,
  onChangeSettings,
  onGenerateAI,
  isGeneratingAI,
  selectedSoundtrack
}: DirectorPanelProps) {
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [customAngle, setCustomAngle] = useState("");
  const [targetAudience, setTargetAudience] = useState(AUDIENCES[0]);

  const handleVibeChange = (vibeId: string) => {
    const updatedSettings = {
      ...settings,
      vibe: vibeId
    };
    onChangeSettings(updatedSettings);

    // Stop current beat so they can sample the vibe cleanly
    if (isPlayingSynth) {
      stopSoundtrackSynth();
      setIsPlayingSynth(false);
    }
  };

  const handleSoundtrackChange = (soundtrackId: string) => {
    const updatedSettings = {
      ...settings,
      soundtrackId
    };
    onChangeSettings(updatedSettings);

    const song = SOUNDTRACKS.find((s) => s.id === soundtrackId);
    if (song) {
      // Instantly start playing the new synthesizer beat to immerse the user
      startSoundtrackSynth(song.id, song.bpm);
      setIsPlayingSynth(true);
    }
  };

  const toggleSynthPlayback = () => {
    if (isPlayingSynth) {
      stopSoundtrackSynth();
      setIsPlayingSynth(false);
    } else {
      startSoundtrackSynth(selectedSoundtrack.id, selectedSoundtrack.bpm);
      setIsPlayingSynth(true);
    }
  };

  const handleTriggerAIGeneration = () => {
    onGenerateAI({
      vibe: settings.vibe,
      targetAudience: targetAudience,
      soundtrackName: selectedSoundtrack.name,
      customAngle: customAngle
    });
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-[32px] p-6 shadow-2xl relative overflow-hidden" id="director-ai-panel">
      
      {/* Upper header with branding accent */}
      <div className="flex items-center justify-between mb-6" id="panel-vibe-header">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-xl text-black">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-sm font-sans font-black uppercase text-white tracking-widest">AI Cinematic Director</h2>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">Target premium engagement & virality curves</p>
          </div>
        </div>
      </div>

      {/* Target Audiences selector */}
      <div className="mb-5" id="target-audience-picker">
        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">
          Target Luxury Audience
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {AUDIENCES.map((aud) => (
            <button
              key={aud}
              onClick={() => setTargetAudience(aud)}
              className={`p-3 rounded-xl border text-left font-mono transition-all uppercase tracking-wider text-[10px] cursor-pointer ${
                targetAudience === aud
                  ? "bg-white text-black border-white font-black shadow-lg"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              • {aud}
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic Vibes (Aesthetic Presets) */}
      <div className="mb-5" id="campaign-vibe-picker">
        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">
          Creative Campaign Vibe
        </label>
        <div className="space-y-2">
          {VIBES.map((v) => (
            <button
              key={v.id}
              onClick={() => handleVibeChange(v.id)}
              className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                settings.vibe === v.id
                  ? "bg-white/10 border-orange-500/60 shadow-lg text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <div className={`mt-0.5 w-3 h-3 rounded-full flex-shrink-0 ${
                settings.vibe === v.id ? "bg-orange-500 animate-pulse" : "bg-white/20"
              }`}></div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-sans font-black tracking-widest uppercase text-white">
                    {v.name}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed uppercase">
                  {v.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Soundtrack / Music Sync Studio */}
      <div className="mb-5 bg-white/5 border border-white/10 rounded-2xl p-4" id="audio-tempo-selector">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
            Soundtrack & Tempo Sync
          </label>
          <button
            onClick={toggleSynthPlayback}
            className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest transition-all uppercase flex items-center gap-1.5 cursor-pointer ${
              isPlayingSynth
                ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                : "bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
            }`}
          >
            {isPlayingSynth ? (
              <>
                <Square className="w-2.5 h-2.5 fill-current" /> STOP BEAT
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 fill-current" /> AUDIO PREVIEW
              </>
            )}
          </button>
        </div>

        {/* List of track buttons */}
        <div className="space-y-2">
          {SOUNDTRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => handleSoundtrackChange(track.id)}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                settings.soundtrackId === track.id
                  ? "bg-white/10 border-orange-500/40"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-6 rounded bg-gradient-to-b ${track.color}`}></span>
                <div>
                  <p className="text-[11px] font-sans font-extrabold text-zinc-200 uppercase truncate max-w-[210px] tracking-wide">
                    {track.name}
                  </p>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">
                    {track.genre} • {track.bpm} BPM
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-mono text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {track.bpm} BPM
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic visualizers when synth is playing */}
        {isPlayingSynth && (
          <div className="mt-3.5 pt-3.5 border-t border-white/10 flex items-end justify-between h-8 px-2" id="sound-bar-visualizer">
            {selectedSoundtrack.frequencyWaveform.map((ht, index) => (
              <div
                key={index}
                className="w-[3px] rounded-full bg-gradient-to-t from-orange-500 to-amber-400 transition-all duration-300"
                style={{
                  height: `${Math.max(10, ht * (0.4 + Math.random() * 0.6))}%`,
                  animation: `bounce 1.${(index % 5) + 1}s ease-in-out infinite alternate`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Travel Angle constraints input */}
      <div className="mb-6" id="custom-brand-angle">
        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">
          Custom Brand Angle / Travel Context
        </label>
        <textarea
          value={customAngle}
          onChange={(e) => setCustomAngle(e.target.value)}
          placeholder="e.g., Focus on silent gliders walking through premium hotel lobbies, highlight key durability of the latch locks under heavy stress, tropical resort backdrop..."
          className="w-full h-18 text-xs font-mono p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors uppercase leading-relaxed resize-none"
        ></textarea>
      </div>

      {/* Primary Action Call with pulsing premium borders */}
      <button
        onClick={handleTriggerAIGeneration}
        disabled={isGeneratingAI}
        className={`w-full py-3.5 px-4 rounded-xl text-[11px] font-sans font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 cursor-pointer ${
          isGeneratingAI
            ? "bg-white/10 text-white/40 border border-white/10 pointer-events-none"
            : "bg-white hover:bg-zinc-200 text-black border border-white hover:scale-[1.01] active:scale-95 shadow-orange-500/10"
        }`}
        id="trigger-ai-script"
      >
        <Sparkles className="w-4 h-4 text-black animate-spin" />
        {isGeneratingAI ? "AI DIALING CREATIVE RECIPE..." : "GENERATE CINEMATIC AI SCRIPT"}
      </button>

      {/* Feedback / notification if AI is compiling */}
      {isGeneratingAI && (
        <div className="mt-3.5 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[9px] font-mono text-orange-400 leading-normal flex items-start gap-2 animate-pulse uppercase">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold block mb-0.5">GEMINI STRATEGIST ACTIVE</span>
            Constructing retention storyboards, matching custom narrative copy, and predicting scroll-stopping indices based on chosen guidelines. Please wait...
          </div>
        </div>
      )}
    </div>
  );
}
