import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Heart, MessageCircle, Share2, Music, Sparkles } from "lucide-react";
import { Scene, Soundtrack } from "../types";
import { playLatchSnapSFX, playBassDropSFX, playChimeSFX } from "../utils/audioSynth";

interface ReelPlayerProps {
  scenes: Scene[];
  activeSoundtrack: Soundtrack;
  themeColor: string;
}

export default function ReelPlayer({ scenes, activeSoundtrack, themeColor }: ReelPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 30 seconds
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1482);
  const [isMuted, setIsMuted] = useState(false);
  const [onlyVideoDisplay, setOnlyVideoDisplay] = useState(true);
  const [speakTrigger, setSpeakTrigger] = useState(0);
  
  const timerRef = useRef<any>(null);
  const totalDuration = 30; // 30 seconds

  // Match the current timestamp to one of the 4 scenes
  // Scene 1: 0-5s, Scene 2: 5-15s, Scene 3: 15-25s, Scene 4: 25-30s
  const getCurrentSceneIndex = (time: number): number => {
    if (time < 5) return 0;
    if (time < 15) return 1;
    if (time < 25) return 2;
    return 3;
  };

  const activeSceneIndex = getCurrentSceneIndex(currentTime);
  const activeScene = scenes[activeSceneIndex] || scenes[0];

  // Side-effect to play sound-design triggers when scenes change!
  const prevSceneIndexRef = useRef<number | null>(null);
  useEffect(() => {
    if (prevSceneIndexRef.current !== activeSceneIndex && isPlaying) {
      prevSceneIndexRef.current = activeSceneIndex;
      setSpeakTrigger((prev) => prev + 1);
      
      // Play organic synth drops and latch clicks synced to active visual cut
      if (activeSceneIndex === 0) {
        playBassDropSFX();
      } else if (activeSceneIndex === 1) {
        playLatchSnapSFX();
      } else if (activeSceneIndex === 2) {
        playChimeSFX();
      } else if (activeSceneIndex === 3) {
        playLatchSnapSFX();
      }
    }
  }, [activeSceneIndex, isPlaying]);

  // Web Speech API for voiceover narration
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isPlaying && !isMuted) {
        window.speechSynthesis.cancel();
        
        const textToSpeak = activeScene.voiceover;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        const setVoiceAndSpeak = () => {
          const voices = window.speechSynthesis.getVoices();
          // Find classy english voices
          const preferredVoice = voices.find(
            v => v.lang.includes("en-US") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Wavenet"))
          ) || voices.find(v => v.lang.startsWith("en"));
          
          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }
          
          utterance.rate = 1.05; // Slightly faster premium narration
          utterance.pitch = 0.95; // Deep luxury brand preset tone
          
          window.speechSynthesis.speak(utterance);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
        } else {
          setVoiceAndSpeak();
        }
      } else {
        window.speechSynthesis.cancel();
      }
    }
    
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeSceneIndex, isPlaying, isMuted, speakTrigger, activeScene.voiceover]);

  // Handle ticker progression
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 100;
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration - 0.1) {
            // Infinite seamless loop transition
            return 0;
          }
          return Math.min(totalDuration, prev + intervalMs / 1000);
        });
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    prevSceneIndexRef.current = null;
    setSpeakTrigger((prev) => prev + 1);
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      playBassDropSFX();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickedTime = (clickX / width) * totalDuration;
    setCurrentTime(clickedTime);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      playChimeSFX();
    }
  };

  // Convert fractional seconds into dynamic cinematic displays
  const formatTime = (time: number) => {
    const s = Math.floor(time);
    const ms = Math.floor((time - s) * 10);
    return `${s.toString().padStart(2, "0")}:${ms}s`;
  };

  return (
    <div className="flex flex-col items-center select-none" id="reel-player-container">
      {/* Phone-style 9:16 Aspect Container (Matching the Design HTML borders) */}
      <div 
        className="relative w-full max-w-[360px] aspect-[9/16] bg-[#0c0c0c] rounded-[44px] overflow-hidden shadow-2xl border-[10px] border-white/10 group transition-all duration-500"
        id="phone-view-frame"
      >
        {/* Notch details for luxurious sensory realism */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-black/60 backdrop-blur-md rounded-b-xl z-50 flex items-center justify-center border-b border-x border-white/5">
          <div className="w-16 h-1 bg-white/20 rounded-full mb-1"></div>
        </div>

        {/* Dynamic Image Canvas background - Ken Burns pan animates during playing */}
        <div className="absolute inset-0 overflow-hidden" id="reel-canvas-viewport">
          {scenes.map((scene, idx) => (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === activeSceneIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={scene.imagePath}
                alt={scene.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover select-none pointer-events-none transition-transform duration-[12000ms] ease-out ${
                  isPlaying && idx === activeSceneIndex ? "scale-115 translate-y-1" : "scale-100"
                }`}
              />
              {/* Subtle cinematic Vignette gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/95 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Current Active Scene Status Metadata pill */}
        {!onlyVideoDisplay && (
          <div className="absolute top-8 left-4 z-30 flex items-center gap-2" id="scene-tag-hud">
            <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-[9px] font-mono text-stone-200 uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              SCENE {activeSceneIndex + 1}/4
            </span>
            <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-[9px] font-mono text-zinc-300 border border-white/10">
              {formatTime(currentTime)} / 30.0s
            </span>
          </div>
        )}

        {/* Mute and Voice HUD */}
        <div className="absolute top-8 right-4 z-30 flex items-center gap-2" id="controls-tag-hud">
          <button 
            onClick={() => setOnlyVideoDisplay(!onlyVideoDisplay)} 
            className={`px-2.5 py-1 rounded-full text-[8.5px] font-mono font-bold tracking-widest transition-all uppercase flex items-center gap-1 cursor-pointer border ${
              onlyVideoDisplay
                ? "bg-orange-500 border-orange-400 text-black font-black font-sans"
                : "bg-black/55 backdrop-blur-md text-zinc-300 border-white/10 hover:bg-white/10"
            }`}
            title="Toggle Clean Video Only Display Mode"
          >
            <span>🎬 {onlyVideoDisplay ? "PURE VIDEO" : "SHOW Overlays"}</span>
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="p-1.5 bg-black/55 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-all border border-white/10"
            title={isMuted ? "Unmute simulated voice" : "Mute simulated voice"}
          >
            <Volume2 className={`w-3.5 h-3.5 ${isMuted ? "opacity-40" : "opacity-100 animate-pulse text-orange-400"}`} />
          </button>
        </div>

        {/* Massive Center Play Indicator when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlayback}
            className="absolute inset-0 z-30 flex items-center justify-center focus:outline-none"
            id="center-play-trigger"
          >
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-full text-white border border-white/20 shadow-2xl scale-110 hover:scale-120 hover:bg-white/15 transition-all duration-300 shadow-orange-500/10">
              <Play className="w-8 h-8 fill-white ml-0.5" />
            </div>
          </button>
        )}

        {/* Vertical Social Action Indicators (Likes, Comments, Shares) on Right rail */}
        {!onlyVideoDisplay && (
          <div className="absolute right-3.5 bottom-24 z-30 flex flex-col items-center gap-5 text-white animate-fade-in" id="social-sidebar-actions">
            {/* Like */}
            <button onClick={handleLike} className="flex flex-col items-center group cursor-pointer focus:outline-none">
              <div className={`w-11 h-11 backdrop-blur-xl border rounded-full flex items-center justify-center mb-0.5 transition-all duration-300 ${
                liked 
                  ? "bg-red-500/20 border-red-500/50 text-red-500 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                  : "bg-white/10 border-white/15 text-white hover:bg-white/20 hover:scale-110"
              }`}>
                <Heart className={`w-4.5 h-4.5 ${liked ? "fill-red-500" : "group-hover:scale-110 transition-transform"}`} />
              </div>
              <span className="text-[10px] font-sans font-black tracking-tight drop-shadow-md">
                {likeCount}
              </span>
            </button>

            {/* Comment Mock */}
            <button className="flex flex-col items-center group cursor-pointer focus:outline-none" onClick={() => playLatchSnapSFX()}>
              <div className="w-11 h-11 backdrop-blur-xl bg-white/10 border border-white/15 rounded-full flex items-center justify-center mb-0.5 hover:bg-white/20 hover:scale-110 transition-all">
                <MessageCircle className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-sans font-black tracking-tight drop-shadow-md">119</span>
            </button>

            {/* Share Mock */}
            <button className="flex flex-col items-center group cursor-pointer focus:outline-none" onClick={() => playChimeSFX()}>
              <div className="w-11 h-11 backdrop-blur-xl bg-white/10 border border-white/15 rounded-full flex items-center justify-center mb-0.5 hover:bg-white/20 hover:scale-110 transition-all">
                <Share2 className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-sans font-black tracking-tight drop-shadow-md">842</span>
            </button>
            
            {/* Circular disc logo spin */}
            <div className="w-9 h-9 rounded-full border-2 border-dashed border-white/30 p-0.5 animate-[spin_8s_linear_infinite] mt-1 bg-black/40 backdrop-blur-md">
              <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-[7px] font-sans font-black text-white uppercase tracking-tighter">
                RR
              </div>
            </div>
          </div>
        )}

        {/* Real-time Cinematic Dynamic Caption Overlay & Storyboard narrative - STYLED EXACTLY TO MATCH FROSTED THEME */}
        {!onlyVideoDisplay && (
          <div className="absolute left-4 right-18 bottom-16 z-20 flex flex-col gap-2 text-white" id="caption-overlay-section">
            
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl shadow-xl transition-all duration-300">
              {/* Account identifier row */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-4.5 h-4.5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-[7.5px] font-sans font-black text-white">RR</span>
                  </div>
                </div>
                <span className="font-extrabold text-[11px] tracking-tight text-white">rare_rabbit_official</span>
                <span className="bg-white/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ml-auto scale-90">
                  FOLLOW
                </span>
              </div>

              {/* Subtitles caption text (High impact bold minimalist UPPERCASE) */}
              <p className="text-[11.5px] text-white leading-normal font-sans font-black uppercase tracking-normal mb-2">
                "{activeScene.caption}" <span className="text-orange-400 font-bold ml-1">#RareRabbit #Gallardo</span>
              </p>

              {/* Narrations Voice script */}
              {!isMuted && (
                <p className="text-[9.5px] leading-relaxed text-zinc-200 italic font-mono border-t border-white/10 pt-2 mb-1.5 opacity-90">
                  "{activeScene.voiceover}"
                </p>
              )}

              {/* Soundtrack record music bar */}
              <div className="flex items-center gap-1.5 text-[8.5px] text-white/90">
                <div className="w-3.5 h-3.5 border border-white/40 rounded-full flex items-center justify-center text-[8px]">♪</div>
                <span className="font-mono truncate uppercase flex-1 text-[8px] tracking-wide text-zinc-300">
                  {activeSoundtrack.name} • original audio
                </span>
              </div>
            </div>

            {/* Trigger Alert visual marker */}
            <div className="text-[7.5px] font-mono text-orange-400 font-bold tracking-widest flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/5 w-fit">
              <span className="inline-block w-1 h-1 rounded-full bg-orange-500 animate-ping"></span>
              SFX CUE: {activeScene.soundEffect}
            </div>
          </div>
        )}

        {/* Floating audio status bar */}
        {!onlyVideoDisplay && (
          <div className="absolute left-4 right-4 bottom-11 z-20 flex items-center justify-between text-white" id="soundtrack-ticker">
            <div className="flex items-center gap-1 bg-black/45 px-1.5 py-0.5 rounded border border-white/5 scale-90 origin-left">
              <Music className="w-2.5 h-2.5 text-orange-400 animate-[bounce_1.5s_infinite]" />
              <span className="text-[8px] font-mono text-zinc-300 max-w-[150px] truncate uppercase font-bold">
                {activeSoundtrack.name}
              </span>
            </div>

            <span className="text-[8px] font-mono text-zinc-400 bg-black/45 px-1.5 py-0.5 rounded">
              LOOP {formatTime(currentTime)}
            </span>
          </div>
        )}

        {/* Dynamic Progress Timeline bar & Scrubber controller */}
        <div 
          className="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent z-30 flex flex-col justify-end pb-3 cursor-pointer select-none group"
          onClick={handleProgressClick}
          id="scrubber-track-hitbox"
        >
          {/* Mini time intervals */}
          <div className="flex justify-between px-3 text-[7px] font-mono text-zinc-500 mb-1 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>0s (Hook)</span>
            <span>5s (Detail)</span>
            <span>15s (Life)</span>
            <span>25s (CTA)</span>
            <span>30s</span>
          </div>

          {/* Actual slider with brand accent colors */}
          <div className="mx-3 h-1 bg-white/10 rounded-full overflow-hidden relative" id="scrubber-bar">
            {/* Played timeline progress */}
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-75 relative"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            >
              {/* Pulsing indicator needle */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Play Controls Row (Below video frame) */}
      <div className="flex items-center gap-3 mt-4" id="under-player-huds">
        <button
          onClick={togglePlayback}
          className={`px-5 py-2.5 rounded-full text-[10px] font-mono font-black tracking-widest flex items-center gap-2 border shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
            isPlaying 
              ? "bg-gradient-to-r from-orange-400 to-amber-500 text-black border-orange-400" 
              : "bg-white text-black border-white hover:bg-zinc-200"
          }`}
          id="main-playback-toggle"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          {isPlaying ? "PAUSE PREVIEW" : "PLAY 30S REEL"}
        </button>

        <button
          onClick={handleReset}
          className="p-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-zinc-200 hover:text-white hover:bg-white/10 transition-all text-[10px] font-mono font-bold uppercase flex items-center gap-1 cursor-pointer"
          id="rollback-playback-trigger"
          title="Restart from beginning to trigger intro hook bass drop"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          RESTART
        </button>
      </div>

      {/* Soundtrack style and synthesized audio message HUD */}
      <div className="mt-4 text-center px-4 max-w-[340px]" id="audio-synthesizer-hud-disclaimer">
        <p className="text-[9px] font-mono text-zinc-500 leading-normal flex items-center justify-center gap-1.5 uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-ping"></span>
          Beat Synthesizer online. Hits and clicks sync in real-time.
        </p>
      </div>
    </div>
  );
}
