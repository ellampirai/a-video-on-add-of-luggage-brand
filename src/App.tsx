import { useState } from "react";
import { Scene } from "./types";
import { SOUNDTRACKS, DEFAULT_RECIPES } from "./data";
import ReelPlayer from "./components/ReelPlayer";

// Reference the photorealistic luggage images directly
import gallardoHeroImg from "./assets/images/gallardo_hero_1779443748487.png";
import gallardoDetailImg from "./assets/images/gallardo_detail_1779443766572.png";
import gallardoLifestyleImg from "./assets/images/gallardo_lifestyle_1779443784231.png";

export default function App() {
  // Use the high-fidelity pre-arranged luggage storyboard
  const [recipe] = useState(() => {
    const initial = JSON.parse(JSON.stringify(DEFAULT_RECIPES.stealth));
    initial.scenes[0].imagePath = gallardoHeroImg;
    initial.scenes[1].imagePath = gallardoDetailImg;
    initial.scenes[2].imagePath = gallardoLifestyleImg;
    initial.scenes[3].imagePath = gallardoHeroImg;
    return initial;
  });

  const activeSoundtrack = SOUNDTRACKS.find((s) => s.id === "electro_luxury") || SOUNDTRACKS[0];

  return (
    <div className="relative min-h-screen bg-[#070707] text-zinc-100 flex flex-col font-sans overflow-x-hidden antialiased" id="applet-primary-layout">
      {/* Background Soft Ambient Light */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-zinc-900 rounded-full blur-[140px]"></div>
      </div>

      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <h1 className="text-xs font-sans font-black uppercase text-white tracking-[0.25em]">
              LUGGAGE VIDEO SPECIFICATION
            </h1>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
            30S REAL-TIME PRESENTATION
          </span>
        </div>
      </header>

      {/* Responsive Workspace Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:py-12 flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center z-10">
        
        {/* Left column: Live Mobile Device Simulation with automated speech */}
        <div className="w-full max-w-[360px] flex-shrink-0" id="video-display-card">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl"></div>
            
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-black block">CINEMATIC VIDEO</span>
              <p className="text-[9px] font-mono text-zinc-400 uppercase mt-0.5 tracking-wide">Automated luxury narration speaks dynamically</p>
            </div>

            {/* Embedded Active Video slideshow */}
            <ReelPlayer
              scenes={recipe.scenes}
              activeSoundtrack={activeSoundtrack}
              themeColor="orange"
            />
          </div>
        </div>

        {/* Right column: Clean, focused, high-contrast Video Descriptions */}
        <div className="flex-1 max-w-xl w-full space-y-6" id="description-list-card">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-8 shadow-2xl">
            <div className="mb-8">
              <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-black block">STORYBOARD DIRECTIVE</span>
              <h2 className="text-xl font-sans font-black text-white uppercase mt-1 tracking-wider">GALLARDO TRAVEL LUGGAGE</h2>
              <p className="text-xs font-mono text-zinc-400 mt-2 uppercase leading-relaxed tracking-wide">
                A 30-Second cinematic storyboard highlighting premium aerospace aluminum ribbing, dual TSA compression latch locks, and silent dual spinner gliders.
              </p>
            </div>

            {/* Clean scene details breakdown with non-clogged content spacing */}
            <div className="space-y-4">
              {recipe.scenes.map((scene: Scene, idx: number) => (
                <div key={scene.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all text-xs font-mono uppercase tracking-wide">
                  <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-white/5">
                    <span className="font-extrabold text-orange-400 text-[10px] tracking-widest">SCENE {idx + 1} / 4</span>
                    <span className="text-[9px] text-zinc-500 font-bold tracking-wider">{scene.timeRange}</span>
                  </div>
                  
                  <div className="space-y-3 text-zinc-300">
                    <div>
                      <span className="text-[8px] text-zinc-500 font-black block mb-0.5">[CAMERA & VISUAL SCENARIO]</span>
                      <p className="text-[10.5px] leading-relaxed text-zinc-200">{scene.visualAction}</p>
                    </div>

                    <div>
                      <span className="text-[8px] text-zinc-500 font-black block mb-0.5">[ON-SCREEN TEXT overlays]</span>
                      <p className="text-[11px] font-sans font-black text-white tracking-tight">"{scene.caption}"</p>
                    </div>

                    <div>
                      <span className="text-[8px] text-zinc-500 font-black block mb-0.5">[SPOKEN AUDIO NARRATION]</span>
                      <p className="text-[10.5px] leading-relaxed text-zinc-400 italic font-mono uppercase">"{scene.voiceover}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md py-6 text-center px-6 mt-12 z-10">
        <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          LUGGAGE PRESENTATION SIMULATOR • SPEECHSYNTHESIS ACTIVE • DESIGNED IN FLUTTERFLOW ACCENT
        </p>
      </footer>
    </div>
  );
}
