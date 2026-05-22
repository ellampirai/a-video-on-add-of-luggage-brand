import { TrendingUp, Award, Eye, RefreshCw, Zap, Flame } from "lucide-react";
import { Soundtrack } from "../types";

interface AnalyticsPredictorProps {
  score: number;
  reason: string;
  hacks: string[];
  activeSoundtrack: Soundtrack;
  vibeName: string;
}

export default function AnalyticsPredictor({
  score,
  reason,
  hacks,
  activeSoundtrack,
  vibeName
}: AnalyticsPredictorProps) {
  // Compute some realistic predicted statistics based on score and soundtrack bpm
  const estHookRate = Math.min(99, Math.round(score * 1.02));
  const estWatchTime = (score * 0.28).toFixed(1); // average seconds watched out of 30s
  const estSharesMultiplier = (score > 92 ? "4.8x" : "2.4x");
  const estViralityIndex = score > 94 ? "CRITICAL BURST" : "STEADY TRACTION";

  // Coordinates for the simulated custom 30-sec retention curve SVG
  // Showing high dropoff originally, then leveling out on the details, and bumping up on the ending loop hook!
  const getRetentionCurvePoints = () => {
    const startY = 10; // 100%
    const hookY = 100 - estHookRate; // Drop corresponds to hook rate
    const featureY = hookY + 12; // Flat gradient detailed
    const lifestyleY = featureY + 14; 
    const endingY = Math.max(10, lifestyleY - 14); // Bumps back up due to the seamless loop edit!

    return `10,${startY} 80,${hookY} 160,${featureY} 240,${lifestyleY} 320,${endingY}`;
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-[32px] p-6 shadow-2xl text-zinc-100 relative overflow-hidden" id="analytics-predictor-board">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5" id="analytics-header">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500 animate-bounce" />
          <div>
            <h3 className="text-sm font-sans font-black uppercase text-white tracking-widest">Virality & Engagement Predictor</h3>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide mt-0.5">Estimated algorithm simulation data</p>
          </div>
        </div>
        <span className="text-[8px] font-mono px-2.5 py-1 bg-white/5 rounded-full border border-white/10 text-orange-400 font-bold flex items-center gap-1 uppercase tracking-wider">
          <Flame className="w-2.5 h-2.5 text-orange-500" /> ALGO EXP-V4
        </span>
      </div>

      {/* Hero statistics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" id="retention-grid">
        
        {/* Metric 1: Circular Gauge Score */}
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold mb-2">Virality Potential</span>
          
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Arc Progress Gauge */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="url(#purpleAmberGradient)"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - score / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              {/* Defs folder for gradients */}
              <defs>
                <linearGradient id="purpleAmberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-1">
              <span className="text-xl font-sans font-black text-orange-400 leading-none">
                {score}%
              </span>
              <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest mt-1 font-bold">
                VIRAL
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Key retention benchmarks */}
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3.5">
          <div>
            <div className="flex justify-between items-center text-[9px] font-mono mb-1">
              <span className="text-zinc-400 uppercase font-bold">Hook Stop Rate (0-5s)</span>
              <span className="text-orange-400 font-bold">{estHookRate}%</span>
            </div>
            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-1000"
                style={{ width: `${estHookRate}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-[9px] font-mono mb-1">
              <span className="text-zinc-400 uppercase font-bold">Est. Average View Time</span>
              <span className="text-amber-400 font-bold">{estWatchTime}s / 30s</span>
            </div>
            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-1000"
                style={{ width: `${(Number(estWatchTime) / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-[9px] font-mono mb-1">
              <span className="text-zinc-500 uppercase font-bold">Algorithm Class</span>
              <span className="text-white font-bold uppercase text-[8.5px] tracking-wide">{estViralityIndex}</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1 uppercase font-bold">
              <Zap className="w-3 h-3 text-emerald-400 fill-current animate-pulse" /> {estSharesMultiplier} organic sharing lift
            </div>
          </div>
        </div>

        {/* Metric 3: Vector Retention Curve graph (0-30s view survival) */}
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">30s Retention Curve</span>
            <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Loop Peak at 30s</span>
          </div>

          {/* Simple Vector Graph */}
          <div className="relative h-18 w-full mt-1 border-b border-l border-white/10 flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 340 100" preserveAspectRatio="none">
              {/* Grid guides */}
              <line x1="0" y1="50" x2="340" y2="50" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3,3" />
              <line x1="85" y1="0" x2="85" y2="100" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3,3" />
              <line x1="255" y1="0" x2="255" y2="100" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3,3" />
              
              {/* Curve Line */}
              <polyline
                fill="none"
                stroke="#f97316"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={getRetentionCurvePoints()}
                className="transition-all duration-1000"
              />

              {/* Area Under Curve gradient */}
              <path
                d={`M10,100 L${getRetentionCurvePoints()} L340,100 Z`}
                fill="url(#curveAreaGradient)"
                className="opacity-15 transition-all duration-1000"
              />

              <defs>
                <linearGradient id="curveAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timemark Labels overlay */}
            <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none flex justify-between text-[7px] text-zinc-500 font-mono pt-1 uppercase">
              <span className="origin-left">0s (Hook)</span>
              <span>10s</span>
              <span>20s</span>
              <span className="origin-right text-orange-400 font-bold">30s (Loop)</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Professional Evaluation Review */}
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs mb-5 animate-fade-in" id="ai-strategic-review">
        <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold block mb-1.5 flex items-center gap-1.5 label-brand">
          <Award className="w-3.5 h-3.5 text-orange-500" /> Strategic Director's Assessment (Real-Time Generation)
        </span>
        <p className="text-zinc-200 font-mono leading-relaxed italic uppercase">
          "{reason}"
        </p>
      </div>

      {/* Editing Hacks / Retention optimization tasks list */}
      <div className="space-y-2.5" id="editing-hacks-to-execute">
        <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold block mb-2 tracking-widest">
          3 Crucial Editing Execution Hacks (Implement to Secure Win)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {hacks.slice(0, 3).map((hack, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[10.5px] leading-relaxed relative flex items-start gap-2.5"
            >
              <span className="w-4.5 h-4.5 bg-white/10 text-orange-400 rounded-full flex items-center justify-center text-[8.5px] font-mono border border-white/10 flex-shrink-0 mt-0.5 font-bold">
                {index + 1}
              </span>
              <p className="text-zinc-300 font-sans uppercase font-black tracking-tight leading-normal">
                {hack}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
