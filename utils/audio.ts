// Synth implementations of chess-like sounds using Web Audio API

let audioCtx: AudioContext | null = null;
let unlocked = false;

const initAudio = () => {
    if (!audioCtx && typeof window !== 'undefined') {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx?.state === 'suspended') {
        audioCtx.resume();
    }
};

const unlockAudio = () => {
    if (unlocked || typeof window === 'undefined') return;
    initAudio();
    if (audioCtx) {
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
        unlocked = true;
    }
};

if (typeof window !== 'undefined') {
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
}

export const playClack = () => {
    unlockAudio();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;

    // A sharp, woody "clack"
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);

    gain.gain.setValueAtTime(0, t);
    // Much louder
    gain.gain.linearRampToValueAtTime(1.5, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.1);

    // Noise burst
    const bufferSize = audioCtx.sampleRate * 0.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 800;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0, t);
    noiseGain.gain.linearRampToValueAtTime(0.5, t + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    noise.start(t);
};

export const playSlam = () => {
    unlockAudio();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;
    const isMobile = typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches;

    // Deep resonant boom
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    // Mobile speakers cannot reproduce 20-30Hz bass well, so we lift it to 300Hz -> 80Hz
    const startFreq = isMobile ? 350 : 200;
    const endFreq = isMobile ? 80 : 20;

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.5);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(isMobile ? 1.5 : 3, t + 0.02); // Less gain peaking on mobile
    gain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);

    const distortion = audioCtx.createWaveShaper();
    const curve = new Float32Array(400);
    for (let i = 0; i < 400; ++i) {
        const x = i * 2 / 400 - 1;
        // Softer distortion curve on mobile to prevent nasty clipping on cheap speakers
        const k = isMobile ? 15 : 20;
        curve[i] = (3 + 10) * x * k * (Math.PI / 180) / (Math.PI + 10 * Math.abs(x));
    }
    distortion.curve = curve;
    distortion.oversample = '4x';

    osc.connect(distortion);
    distortion.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(t);
    osc.stop(t + 1.5);

    // Also speak an epic quote!
    speakEpicQuote();
};

const speakEpicQuote = () => {
    // TODO: Integrate Premium ElevenLabs/OpenAI TTS API here in the future.
    // Example: fetch('/api/tts', {body: quote}).then(playAudio)

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        const quotes = [
            "Victory favors the bold.",
            "You must take your opponent into a deep dark forest.",
            "Checkmate requires sacrifice.",
            "Material is temporary. Initiative is forever.",
            "The hardest game to win is a won game."
        ];
        const randQuote = quotes[Math.floor(Math.random() * quotes.length)];

        const utterThis = new SpeechSynthesisUtterance(randQuote);
        utterThis.pitch = 0.5; // low, slightly demonic/epic voice
        utterThis.rate = 0.8;  // slow, dramatic pace
        utterThis.volume = 1;

        window.speechSynthesis.speak(utterThis);
    }
};
