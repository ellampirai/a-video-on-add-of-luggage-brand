import { useState } from "react";
import { Edit2, Save, Video, Music, Megaphone, Subtitles, Layers, Sparkles } from "lucide-react";
import { Scene } from "../types";

interface TimelineControlsProps {
  scenes: Scene[];
  onUpdateScene: (index: number, updatedScene: Scene) => void;
}

export default function TimelineControls({ scenes, onUpdateScene }: TimelineControlsProps) {
  const [editingSceneId, setEditingSceneId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftVisual, setDraftVisual] = useState("");
  const [draftCaption, setDraftCaption] = useState("");
  const [draftVoiceover, setDraftVoiceover] = useState("");
  const [draftSFX, setDraftSFX] = useState("");

  const startEditing = (idx: number) => {
    const s = scenes[idx];
    setEditingSceneId(s.id);
    setDraftTitle(s.title);
    setDraftVisual(s.visualAction);
    setDraftCaption(s.caption);
    setDraftVoiceover(s.voiceover);
    setDraftSFX(s.soundEffect);
  };

  const saveEditing = (idx: number) => {
    const s = scenes[idx];
    const updated: Scene = {
      ...s,
      title: draftTitle,
      visualAction: draftVisual,
      caption: draftCaption,
      voiceover: draftVoiceover,
      soundEffect: draftSFX
    };
    onUpdateScene(idx, updated);
    setEditingSceneId(null);
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-[32px] p-6 shadow-2xl text-zinc-200 relative overflow-hidden" id="timeline-storyboard-editor">
      
      {/* Upper header decoration with quick tip */}
      <div className="flex items-center justify-between mb-5" id="timeline-header">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-500 animate-pulse" />
          <div>
            <h3 className="text-sm font-sans font-black uppercase text-white tracking-widest">30s Storyboard Timeline</h3>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide mt-0.5">Edit real-time on-screen copy & camera actions</p>
          </div>
        </div>
        <span className="text-[9px] font-mono text-orange-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
          4 timeframes
        </span>
      </div>

      {/* Sequential Scene Timeline Nodes */}
      <div className="space-y-4" id="timeline-cards-pacing">
        {scenes.map((scene, idx) => {
          const isEditing = editingSceneId === scene.id;

          return (
            <div
              key={scene.id}
              className={`rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isEditing
                  ? "bg-black/60 border-orange-500/50 shadow-xl shadow-orange-500/5"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
              id={`storyboard-scene-node-${scene.id}`}
            >
              
              {/* Scene top HUD status details */}
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-white/15 border border-white/10 flex items-center justify-center text-[10px] font-mono font-black text-orange-400">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-sans font-black text-white uppercase tracking-widest block">
                      {isEditing ? (
                        <input
                          type="text"
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          className="bg-black/40 border border-white/10 px-2 py-0.5 rounded text-[11px] font-sans font-black text-white uppercase focus:outline-none focus:border-orange-500"
                        />
                      ) : (
                        scene.title
                      )}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase font-black block mt-0.5">
                      SEGMENT PASSED: {scene.timeRange}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button
                      onClick={() => saveEditing(idx)}
                      className="px-2.5 py-1.5 text-[9px] font-mono font-black tracking-widest text-black bg-white rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-1 uppercase cursor-pointer"
                    >
                      <Save className="w-3 h-3" /> SAVE CUT
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(idx)}
                      className="px-2.5 py-1.5 text-[9px] font-mono font-black tracking-widest text-zinc-300 bg-white/5 border border-white/10 rounded-lg hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 uppercase cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-orange-400" /> EDIT SCENE
                    </button>
                  )}
                </div>
              </div>

              {/* Readonly View or Editing Input Field Canvas */}
              <div className="p-4 space-y-3">
                {isEditing ? (
                  <div className="space-y-4 text-xs">
                    {/* Caption overlays */}
                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase block mb-1.5 flex items-center gap-1 font-bold">
                        <Subtitles className="w-3 h-3 text-orange-400" /> ON-SCREEN CAPTION COPY
                      </label>
                      <input
                        type="text"
                        value={draftCaption}
                        onChange={(e) => setDraftCaption(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 p-2.5 rounded-xl text-white font-sans font-black uppercase text-xs focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                      />
                    </div>

                    {/* Camera angle descriptors */}
                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase block mb-1.5 flex items-center gap-1 font-bold">
                        <Video className="w-3 h-3 text-orange-400" /> Cinematic Camera Angle Direction
                      </label>
                      <textarea
                        value={draftVisual}
                        onChange={(e) => setDraftVisual(e.target.value)}
                        rows={2}
                        className="w-full bg-black/30 border border-white/10 p-2.5 rounded-xl text-zinc-200 font-mono text-xs focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 leading-relaxed uppercase resize-none"
                      />
                    </div>

                    {/* Voiceover nars */}
                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase block mb-1.5 flex items-center gap-1 font-bold">
                        <Megaphone className="w-3 h-3 text-orange-400" /> Simulated Voiceover Narration Text
                      </label>
                      <textarea
                        value={draftVoiceover}
                        onChange={(e) => setDraftVoiceover(e.target.value)}
                        rows={2}
                        className="w-full bg-black/30 border border-white/10 p-2.5 rounded-xl text-zinc-200 font-mono text-xs italic focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 leading-relaxed resize-none"
                      />
                    </div>

                    {/* Sfx cue */}
                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase block mb-1.5 flex items-center gap-1 font-bold">
                        <Music className="w-3 h-3 text-orange-400" /> Audio SFX Triggers
                      </label>
                      <input
                        type="text"
                        value={draftSFX}
                        onChange={(e) => setDraftSFX(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 p-2.5 rounded-xl text-zinc-100 font-mono text-xs focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 uppercase"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 font-mono text-[10.5px] leading-relaxed">
                    
                    {/* Camera */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-16 flex-shrink-0 text-[8px] text-zinc-500 uppercase tracking-widest font-black pt-0.5">
                        [CAMERA]
                      </div>
                      <div className="text-zinc-300 uppercase leading-normal">
                        {scene.visualAction}
                      </div>
                    </div>

                    {/* Subtitle text */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-16 flex-shrink-0 text-[8px] text-orange-400 uppercase tracking-widest font-black pt-0.5 flex items-center gap-0.5">
                        <Subtitles className="w-2.5 h-2.5" /> CAPTION
                      </div>
                      <div className="text-white font-sans font-black uppercase tracking-tight text-[11.5px] leading-normal">
                        "{scene.caption}"
                      </div>
                    </div>

                    {/* Voiceover script */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-16 flex-shrink-0 text-[8px] text-zinc-500 uppercase tracking-widest font-black pt-0.5">
                        [VOICE]
                      </div>
                      <div className="text-zinc-400 italic">
                        "{scene.voiceover}"
                      </div>
                    </div>

                    {/* Audio cues */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-16 flex-shrink-0 text-[8px] text-zinc-500 uppercase tracking-widest font-black pt-0.5 flex items-center gap-0.5">
                        <Music className="w-2.5 h-2.5 text-orange-400" /> SFX
                      </div>
                      <div className="text-orange-400 text-[10px] uppercase font-bold">
                        {scene.soundEffect}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
