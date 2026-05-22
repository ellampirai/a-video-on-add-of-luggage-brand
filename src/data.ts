import { Soundtrack, ReelRecipe } from "./types";
import gallardoHeroImg from "./assets/images/gallardo_hero_1779443748487.png";
import gallardoDetailImg from "./assets/images/gallardo_detail_1779443766572.png";
import gallardoLifestyleImg from "./assets/images/gallardo_lifestyle_1779443784231.png";

// Dynamic soundtracks that users can play. We will write a custom Audio Synth
// in the Reels player matching these styles, tempos, and visual waveform heights.
export const SOUNDTRACKS: Soundtrack[] = [
  {
    id: "dark_synth",
    name: "Midnight Runway (Cyber Techno-Noir)",
    genre: "Techno Noir",
    bpm: 125,
    style: "Heavy kick, fast metallic accents, bass drop at 5s, immersive low-frequency pads.",
    color: "from-purple-900 to-indigo-900",
    frequencyWaveform: [25, 45, 80, 70, 95, 30, 15, 60, 40, 75, 90, 85, 35, 20, 50, 85, 90, 40, 25, 60, 75],
    tempoHz: 125 / 60,
  },
  {
    id: "electro_luxury",
    name: "Stealth Wealth Beat (Deep House)",
    genre: "Minimal House",
    bpm: 118,
    style: "Sub-bass pulse, chic snare, clicking audio cues mimicking Gallardo latches snapping open.",
    color: "from-zinc-900 to-slate-905",
    frequencyWaveform: [30, 50, 45, 65, 80, 40, 60, 75, 35, 55, 75, 45, 50, 85, 30, 40, 65, 55, 40, 60, 50],
    tempoHz: 118 / 60,
  },
  {
    id: "orchestral_power",
    name: "The Power Statement (Orchestral Hybrid)",
    genre: "Cinematic Trap",
    bpm: 140,
    style: "Sub drops, massive brass crescendos, fast double-time hi-hats, theatrical suspense.",
    color: "from-amber-950 to-stone-900",
    frequencyWaveform: [40, 70, 90, 95, 80, 50, 30, 25, 65, 85, 95, 40, 60, 90, 100, 50, 35, 70, 85, 90, 80],
    tempoHz: 140 / 60,
  },
  {
    id: "lofi_lounge",
    name: "Vagabond Lounge (Lofi Hype Hip-Hop)",
    genre: "Chilled Hype",
    bpm: 92,
    style: "Relaxed vintage vinyl crackles, slick acoustic snare crack, ultimate executive leisure.",
    color: "from-rose-950 to-neutral-900",
    frequencyWaveform: [15, 30, 40, 35, 50, 25, 45, 30, 20, 35, 45, 30, 25, 40, 35, 20, 30, 45, 30, 25, 35],
    tempoHz: 92 / 60,
  }
];

export const VIBES = [
  { id: "stealth", name: "Stealth Wealth", desc: "For those who speak in whispers, but are heard in capitals. Clean, elegant, dark silver." },
  { id: "avant_garde", name: "Tokyo Cyber High-Fashion", desc: "Fast cuts, glitched typography, heavy focus on industrial textures and raw neon backdrops." },
  { id: "power_flex", name: "C-Suite Jetsetter", desc: "Aspirational luxury, high-definition sun rays, private jet aesthetic, heavy brass soundtrack." },
  { id: "street_modern", name: "Metropolitan Nomad", desc: "Gritty yet polished, street walk speed-ramps, bold oversized captions, rhythm-heavy loop." }
];

export const AUDIENCES = [
  "Tech Founders & Solopreneurs",
  "Aesthetic Fashion Bloggers & Stylists",
  "Elite C-Suite Executives & Nomads",
  "Gen-Z Luxury Hypebeasts"
];

// Helper to provide prebuilt gorgeous copy and storyboard scenes for instant responsiveness on startup.
// Uses the actual image asset paths so everything renders beautifully with absolute zero mock placeholders.
export const DEFAULT_RECIPES: Record<string, ReelRecipe> = {
  stealth: {
    viralityScore: 98,
    viralityReason: "Showing emotional and relatable family travel moments combined with high-performance luggage features increases viral retention by 58%. The packing mini-hook captures high parental and lifestyle engagement.",
    editingHacks: [
      "Keep a warm, soft-golden filter on the packing scenes to enhance the cozy family vacation mood.",
      "Sync the little girl's laughter with the gentle, friendly pentatonic plucks on the custom melody soundtrack.",
      "Speed-ramp the luggage gliding down the airport runway to make the rotation feel extremely smooth and automated."
    ],
    scenes: [
      {
        id: 1,
        timeRange: "0s - 5s",
        title: "Happy Packing Adventure",
        visualAction: "A warm, sunlit bedroom. A happy little girl is laughing while packing her favorite teddy bear and pastel outfits inside the pristine, spacious compartments of the Gallardo suitcase.",
        caption: "A STORY OF JOY. SMALL HANDS, UNLIMITED SPACE.",
        voiceover: "The perfect trip begins at home. Watch her pack her favorite toys in a spacious case so light, even she can carry it with absolute ease.",
        soundEffect: "Deep sweet chime transitioning into a warm pentatonic melody pluck.",
        imagePath: gallardoHeroImg
      },
      {
        id: 2,
        timeRange: "5s - 15s",
        title: "Strong Armour, Zero Stress",
        visualAction: "The family closes the suitcase together. The child easily snaps shut the dual-combination locks, showing that security is incredibly friendly and simple with premium zipperless levers.",
        caption: "SUPER STRONG ARMOR. FRIENDLY ZIPPERLESS CLOSURE.",
        voiceover: "Unbreakable protection, built with stress-free safety. Friendly dual combination locks snap shut instantly with no zipper friction or snagging.",
        soundEffect: "Satisfying crisp mechanical sound followed by a celestial harmonic swell.",
        imagePath: gallardoDetailImg
      },
      {
        id: 3,
        timeRange: "15s - 25s",
        title: "The Zero-Gravity Glide",
        visualAction: "The family walk together down the polished flight terminal. The little girl guides the majestic silver case using just one hand, gliding effortlessly on whisper-quiet 360 spinner wheels.",
        caption: "WHISPER QUIET GLIDERS. COMPLETELY FREE TO CARRY.",
        voiceover: "Say goodbye to travel exhaustion. Experience silent, frictionless wheels that make walking through terminal lanes completely smooth and stress-free.",
        soundEffect: "Subtly resonant sub-bass pad with melodic bells chime.",
        imagePath: gallardoLifestyleImg
      },
      {
        id: 4,
        timeRange: "25s - 30s",
        title: "Elevate Your Family Flight",
        visualAction: "The family arrives happily at the boarding gate. A beautiful close up of the Gallardo luggage shimmering under airport lights, standing as the ultimate companion of unforgettable life memories.",
        caption: "GALLARDO BY RARE RABBIT. JOYFUL JOURNEYS.",
        voiceover: "Strong. Light. Effortlessly smooth. Grab your Gallardo from Rare Rabbit and enjoy the flight of a lifetime, entirely happy and worry-free.",
        soundEffect: "Bright celestial synthetic chord decaying into peaceful silence.",
        imagePath: gallardoHeroImg
      }
    ]
  },
  avant_garde: {
    viralityScore: 97,
    viralityReason: "Raw street glitches and high-speed shutter effects create high visual novelty, holding high-engagement audiences (Gen Z & creators) looking for aesthetic excellence.",
    editingHacks: [
      "Add a fast glitch strobe filter over the text transition at second 5 to align with the sound click.",
      "Crop in on the metal ribs at 200% zoom and alternate styling scales on every 4th beat.",
      "End the Reel with the exact same visual frames as the starting frame to create a seamless infinite loop recipe!"
    ],
    scenes: [
      {
        id: 1,
        timeRange: "0s - 5s",
        title: "The Industrial Cyber Hook",
        visualAction: "Fast stutter shutter cuts showing extreme closeups of metallic rivets, metallic dust, and the signature Gallardo logo shining under a cool-toned neon bar.",
        caption: "IT'S NOT TRAVEL LUGGAGE. IT'S METROPOLITAN ARMOR.",
        voiceover: "Standard suitcases break. The Gallardo endures, commandingly designed with unyielding aluminum.",
        soundEffect: "Digital glitch chirp, mechanical latch clank.",
        imagePath: gallardoDetailImg
      },
      {
        id: 2,
        timeRange: "5s - 15s",
        title: "Tactile Tech Features",
        visualAction: "High angle shot tracking down the ribbed aerospace aluminum structure. Speed changes from ultra fast to super slow motion detail.",
        caption: "RIBBED METALLIC SHELL. DUAL COMBINATION LOCK.",
        voiceover: "Dual security buckles. No zippers, no compromises. Double-reinforced design, pure armor.",
        soundEffect: "Heavy bass compressor pump, pneumatic air release.",
        imagePath: gallardoHeroImg
      },
      {
        id: 3,
        timeRange: "15s - 25s",
        title: "Tokyo Shinjuku Drift Walk",
        visualAction: "Slick model in a high-collar trench coat pacing with the suitcase. Neon lights create beautiful streaks across the high grade alloy shell.",
        caption: "DRESSED IN METROPOLIS INTENSITY.",
        voiceover: "Walk through the neon storm. The wheels don't make a sound. You whisper, they listen.",
        soundEffect: "Fast synth hi-hats, echoing cyberpunk sirens.",
        imagePath: gallardoLifestyleImg
      },
      {
        id: 4,
        timeRange: "25s - 30s",
        title: "Bold Sign-off Loop",
        visualAction: "The suitcase snaps shut towards the camera. Sudden pitch-black screen. Only the signature brand logo remains.",
        caption: "GALLARDO BY RARE RABBIT. UPGRADE YOUR STATUS.",
        voiceover: "Ready to walk the premium standard? Secure yours now.",
        soundEffect: "Heavy latch snap shutting directly onto the microphone.",
        imagePath: gallardoDetailImg
      }
    ]
  },
  power_flex: {
    viralityScore: 91,
    viralityReason: "The aspiration of high-altitude business luxury and clean sun glares drives premium completion rates. It triggers deep status motivation symbols.",
    editingHacks: [
      "Maintain a slow, ultra-smooth frame rate to convey the unhurried nature of premium status.",
      "Add a gold highlight flare over the aluminum handle as the model extends the pull-bar.",
      "Sync the soundtrack volume down to 15% right as the voiceover pronounces the name of the brand."
    ],
    scenes: [
      {
        id: 1,
        timeRange: "0s - 5s",
        title: "The Elite Welcome Room",
        visualAction: "Slow luxurious panning down from an airport window showing a runway, onto the shiny aluminum travel case standing proud on an elegant marble floor.",
        caption: "FIRST CLASS IS AN ATTITUDE, NOT A SEAT.",
        voiceover: "You paid for the view. Now show them you know what to pack. Elevate every step.",
        soundEffect: "Subtle wind hum, expensive lounge piano echo.",
        imagePath: gallardoHeroImg
      },
      {
        id: 2,
        timeRange: "5s - 15s",
        title: "The Mechanical Snap",
        visualAction: "A hand grips the hand-stitched premium handle, lifting the retractable bar. Close up of the dual levers popping open with satisfying mechanical click.",
        caption: "AIRCRAFT GRADE TOUGHNESS. PRECISION WHEELS.",
        voiceover: "Silent glider wheels that handle smooth tarmac and heavy terminal stone with effortless ease.",
        soundEffect: "Loud premium clicking latch snap.",
        imagePath: gallardoDetailImg
      },
      {
        id: 3,
        timeRange: "15s - 25s",
        title: "The Architectural Arrival",
        visualAction: "Model walking towards a modern architectural terminal building, effortless glide with the silver luggage casing catching the golden morning sun.",
        caption: "CATCH THE SUNLIGHT. CAPTURE THE C-SUITE.",
        voiceover: "An arrival statement that doesn't demand attention, it commands it. Masterfully built.",
        soundEffect: "Elegant cello crescendo.",
        imagePath: gallardoLifestyleImg
      },
      {
        id: 4,
        timeRange: "25s - 30s",
        title: "Closing Call to Power",
        visualAction: "Tight close up on the embossed metal branding badge, light reflection shining across.",
        caption: "GALLARDO IS HERE. TRAVEL PREFERS RARE.",
        voiceover: "The House of Rare Gallardo Luggage. Your ultimate companion in luxury travel.",
        soundEffect: "Warm cello chord fading with a soft premium ding.",
        imagePath: gallardoHeroImg
      }
    ]
  },
  street_modern: {
    viralityScore: 92,
    viralityReason: "High-paced streetwalk content converts well with urban nomadic audiences. Upward angles and rhythmic sync feel native, scroll-friendly, and candid.",
    editingHacks: [
      "Use extremely close-up macro shots on the spinning wheels during each bass beat.",
      "Ramp the speed up during the visual transitions to make each cut feel like a dramatic whip pan.",
      "Add bold contrast and saturation filters to highlight the metallic silver curves against gritty grey concrete streets."
    ],
    scenes: [
      {
        id: 1,
        timeRange: "0s - 5s",
        title: "The Concrete Walk-by",
        visualAction: "Camera tracking right alongside the wheels spinning seamlessly over neon street puddles. Dynamic, street-authentic framing.",
        caption: "THE METROPOLIS HAS A NEW STRIDE.",
        voiceover: "Ditch the dull nylon bags. The street belongs to those who travel in metallic silver armor.",
        soundEffect: "Fast ticking analog click, street traffic atmosphere.",
        imagePath: gallardoLifestyleImg
      },
      {
        id: 2,
        timeRange: "5s - 15s",
        title: "Dual Latch Open",
        visualAction: "Suits of clothing being packed smoothly inside the pristine dual compartment organized with rich grey lining. Case snap-shuts tight.",
        caption: "PACK BOLD. SNAP SECURE.",
        voiceover: "Dual security latches snap in. Structured compression compartments to fit all your premium streetwear.",
        soundEffect: "Heavy mechanical latch clamping and echo.",
        imagePath: gallardoDetailImg
      },
      {
        id: 3,
        timeRange: "15s - 25s",
        title: "Nomadic Acceleration",
        visualAction: "Low angle tracking model's boots walking with the Gallardo suitcase in a high speed ramp, motion blur on urban architecture.",
        caption: "UNCOMPROMISING SPEED. UNIFIED RHYTHM.",
        voiceover: "Whisper quiet dual wheels. Zero rattling. Glide through terminal gates like a luxury nomad.",
        soundEffect: "Dull heavy drum beats rhythm.",
        imagePath: gallardoHeroImg
      },
      {
        id: 4,
        timeRange: "25s - 30s",
        title: "Infinite Loop Flex",
        visualAction: "Hand releases the retractable handle of the suitcase. Quick cut of suitcase standing against a premium concrete background.",
        caption: "CHOOSE PERFORMANCE. GALLARDO BY RARE RABBIT.",
        voiceover: "The street standard has officially changed. Upgrade your travel.",
        soundEffect: "Bass drop echo decaying into city sound atmosphere.",
        imagePath: gallardoLifestyleImg
      }
    ]
  }
};
