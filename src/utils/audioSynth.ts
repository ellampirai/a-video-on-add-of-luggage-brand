// High-end Web Audio Synthesizer for immersive, real-time social audio simulation.
// Synthesizes realistic luxury beats and latch lock sound effects natively in the browser.

let audioCtx: AudioContext | null = null;
let backgroundNode: ScriptProcessorNode | OscillatorNode | null = null;
let currentTempoInterval: any = null;
let masterGain: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play premium latch lock snap sound
export function playLatchSnapSFX() {
  try {
    const ctx = getAudioContext();
    const dest = ctx.destination;

    // Fast decay noise burst to simulate premium mechanical contact
    const bufferSize = ctx.sampleRate * 0.05; // 50ms clip
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 8;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

    // Deep heavy mechanical metallic click
    const oscNode = ctx.createOscillator();
    oscNode.type = "triangle";
    oscNode.frequency.setValueAtTime(220, ctx.currentTime);
    oscNode.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.03);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.8, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    // Signal routing
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(dest);

    oscNode.connect(oscGain);
    oscGain.connect(dest);

    noiseNode.start();
    oscNode.start();
    oscNode.stop(ctx.currentTime + 0.06);
  } catch (err) {
    console.warn("Audio failure:", err);
  }
}

// Play a cinematic deep sub-bass impact drop (used for high engagement hooks and transitions)
export function playBassDropSFX() {
  try {
    const ctx = getAudioContext();
    const dest = ctx.destination;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.9, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 180;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start();
    osc.stop(ctx.currentTime + 1.6);
  } catch (err) {
    console.warn("Audio drop failure:", err);
  }
}

// Play premium fashion "bell / ring" ding
export function playChimeSFX() {
  try {
    const ctx = getAudioContext();
    const dest = ctx.destination;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, ctx.currentTime); // High A

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(dest);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.9);
    osc2.stop(ctx.currentTime + 0.9);
  } catch (err) {
    console.warn("Chime play error:", err);
  }
}

// Dynamic loop soundscape synthesizer based on soundtrack IDs
export function startSoundtrackSynth(soundtrackId: string, bpm: number) {
  try {
    stopSoundtrackSynth();
    const ctx = getAudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime); // Controlled background ambient volume
    masterGain.connect(ctx.destination);

    const beatIntervalSec = 60 / bpm;

    // Simple procedural rhythm synthesizer
    let stepCount = 0;
    currentTempoInterval = setInterval(() => {
      if (!audioCtx || audioCtx.state === "suspended") return;
      const t = audioCtx.currentTime;

      // Heavy luxury kicked bass on beats (downbeat)
      if (stepCount % 4 === 0) {
        const kickOsc = audioCtx.createOscillator();
        const kickGain = audioCtx.createGain();
        kickOsc.type = "sine";
        kickOsc.frequency.setValueAtTime(110, t);
        kickOsc.frequency.exponentialRampToValueAtTime(45, t + 0.15);

        kickGain.gain.setValueAtTime(0.6, t);
        kickGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

        kickOsc.connect(kickGain);
        kickGain.connect(masterGain!);
        kickOsc.start(t);
        kickOsc.stop(t + 0.25);
      }

      // Midnight techno noir synth chord sequences
      if (soundtrackId === "dark_synth" && stepCount % 2 === 0) {
        const notes = [110, 130, 165, 196, 220, 165];
        const pitch = notes[stepCount % notes.length];
        const synthOsc = audioCtx.createOscillator();
        const synthGain = audioCtx.createGain();

        synthOsc.type = "sawtooth";
        synthOsc.frequency.setValueAtTime(pitch, t);
        synthGain.gain.setValueAtTime(0.15, t);
        synthGain.gain.exponentialRampToValueAtTime(0.01, t + beatIntervalSec * 0.8);

        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 400 + Math.sin(t) * 150;

        synthOsc.connect(filter);
        filter.connect(synthGain);
        synthGain.connect(masterGain!);

        synthOsc.start(t);
        synthOsc.stop(t + beatIntervalSec);
      }

      // Elegant Minimal deep-house chords & STYLISH STRESS-FREE FRIENDLY MELODIES
      if (soundtrackId === "electro_luxury") {
        // Play a beautiful, friendly pentatonic melody sequence
        const melodyPattern = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C major pentatonic (Friendly & stress-free)
        const noteIndex = stepCount % melodyPattern.length;
        const currentFrequency = melodyPattern[noteIndex];

        // Soft, gorgeous, stylish melody pluck
        if (stepCount % 2 === 0) {
          const melodyOsc = audioCtx.createOscillator();
          const melodyGain = audioCtx.createGain();
          
          // Use triangle wave for a friendly, warm, premium vibe
          melodyOsc.type = "sine"; 
          melodyOsc.frequency.setValueAtTime(currentFrequency, t);
          
          melodyGain.gain.setValueAtTime(0.06, t);
          melodyGain.gain.exponentialRampToValueAtTime(0.001, t + beatIntervalSec * 1.8);

          const delayNode = audioCtx.createDelay();
          delayNode.delayTime.value = beatIntervalSec * 0.25;

          const delayGain = audioCtx.createGain();
          delayGain.gain.value = 0.3; // Sweet soft echoes

          const lowpass = audioCtx.createBiquadFilter();
          lowpass.type = "lowpass";
          lowpass.frequency.value = 1200;

          melodyOsc.connect(lowpass);
          lowpass.connect(melodyGain);
          
          // Route echoes to make it rich
          melodyGain.connect(delayNode);
          delayNode.connect(delayGain);
          delayGain.connect(masterGain!);
          
          melodyGain.connect(masterGain!);

          melodyOsc.start(t);
          melodyOsc.stop(t + beatIntervalSec * 2);
        }

        // Deep warm baseline pads on beat 2 & 6 to ground the strength of the luggage
        if (stepCount % 4 === 1) {
          const padOsc1 = audioCtx!.createOscillator();
          const padOsc2 = audioCtx!.createOscillator();
          const padGain = audioCtx!.createGain();

          padOsc1.type = "triangle";
          padOsc2.type = "sine";
          
          padOsc1.frequency.value = 130.81; // Low C3
          padOsc2.frequency.value = 196.00; // Low G3 (Perfect 5th, ultra stable/strong)

          padGain.gain.setValueAtTime(0.05, t);
          padGain.gain.exponentialRampToValueAtTime(0.001, t + beatIntervalSec * 3);

          const padFilter = audioCtx!.createBiquadFilter();
          padFilter.type = "lowpass";
          padFilter.frequency.value = 350;

          padOsc1.connect(padFilter);
          padOsc2.connect(padFilter);
          padFilter.connect(padGain);
          padGain.connect(masterGain!);

          padOsc1.start(t);
          padOsc2.start(t);
          padOsc1.stop(t + beatIntervalSec * 3.5);
          padOsc2.stop(t + beatIntervalSec * 3.5);
        }
      }

      // Orchestral power dramatic strings simulation
      if (soundtrackId === "orchestral_power" && stepCount % 8 === 0) {
        const pitch = stepCount % 16 === 0 ? 165 : 196; // G or E string notes
        const leadOsc = audioCtx.createOscillator();
        const leadGain = audioCtx.createGain();
        leadOsc.type = "sawtooth";
        leadOsc.frequency.setValueAtTime(pitch, t);

        leadGain.gain.setValueAtTime(0.12, t);
        leadGain.gain.linearRampToValueAtTime(0.05, t + beatIntervalSec * 4);
        leadGain.gain.exponentialRampToValueAtTime(0.001, t + beatIntervalSec * 7);

        const bandpass = audioCtx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.value = 800;

        leadOsc.connect(bandpass);
        bandpass.connect(leadGain);
        leadGain.connect(masterGain!);

        leadOsc.start(t);
        leadOsc.stop(t + beatIntervalSec * 7.5);
      }

      // Ambient chilled lofi crackles and gentle hum
      if (soundtrackId === "lofi_lounge" && stepCount % 4 === 2) {
        const loOsc = audioCtx.createOscillator();
        const loGain = audioCtx.createGain();
        loOsc.type = "sine";
        loOsc.frequency.setValueAtTime(174, t); // F3 notes

        loGain.gain.setValueAtTime(0.18, t);
        loGain.gain.exponentialRampToValueAtTime(0.001, t + beatIntervalSec * 1.5);

        loOsc.connect(loGain);
        loGain.connect(masterGain!);

        loOsc.start(t);
        loOsc.stop(t + beatIntervalSec * 2);
      }

      stepCount++;
    }, beatIntervalSec * 1000);

  } catch (err) {
    console.warn("Soundtrack initialization failed:", err);
  }
}

// Stop current soundtrack and deactivate loop timer
export function stopSoundtrackSynth() {
  if (currentTempoInterval) {
    clearInterval(currentTempoInterval);
    currentTempoInterval = null;
  }
  if (masterGain) {
    try {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx!.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx!.currentTime + 0.15);
    } catch (_) {}
    masterGain = null;
  }
}
