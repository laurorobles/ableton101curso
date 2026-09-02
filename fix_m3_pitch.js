const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

// Inject Tone.js script
if (!html.includes('tone.min.js')) {
    html = html.replace('</head>', '  <script src="../assets/tone.min.js"></script>\n</head>');
}

// Update HTML UI to add Pitch Slider
const tempoHtml = `<div class="control-group">
        <label for="tempo-slider" style="font-weight:bold; color:var(--muted)">Tempo: <span id="tempo-val" style="color:var(--play)">120</span> BPM</label>
        <input type="range" id="tempo-slider" min="50" max="150" value="120" oninput="updateTempo(this.value)" style="accent-color:var(--play)">
      </div>`;

const newTempoHtml = `<div class="control-group">
        <label for="tempo-slider" style="font-weight:bold; color:var(--muted)">Tempo: <span id="tempo-val" style="color:var(--play)">120</span> BPM</label>
        <input type="range" id="tempo-slider" min="50" max="150" value="120" oninput="updateTempo(this.value)" style="accent-color:var(--play)">
      </div>
      <div class="control-group">
        <label for="pitch-slider" style="font-weight:bold; color:var(--muted)">Pitch: <span id="pitch-val" style="color:var(--cc)">0</span> st</label>
        <input type="range" id="pitch-slider" min="-12" max="12" value="0" oninput="updatePitch(this.value)" style="accent-color:var(--cc)">
      </div>`;
html = html.replace(tempoHtml, newTempoHtml);

// Replace JavaScript logic for M3
const scriptRegex = /let amenBuffer = null;[\s\S]*?<\/script>/m;
const newScript = `
  let isPlaying = false;
  let baseTempo = 120;
  
  // Tone.js nodes
  let player = null;
  let pitchShift = null;
  let tremolo = null;
  let stutterLoop = null;

  const descriptions = {
    beats: "<strong>Beats:</strong> El modo por defecto. Especializado en percusión. Mantiene el tono original y usa un algoritmo rítmico para ajustar el tiempo (simulado aquí con tartamudeo).",
    tones: "<strong>Tones:</strong> Para voces, bajos o sintes solistas. Intenta mantener el tono original estirando fragmentos vocales (simulado con trémolo rápido).",
    texture: "<strong>Texture:</strong> Para sintes atmosféricos o ruido. Genera una sensación 'arenosa' o reverberante al bajar la velocidad agregando granulidad extrema.",
    repitch: "<strong>Re-Pitch:</strong> Como una tornamesa de DJ. El tiempo y el tono están enlazados. Si subes el tempo, el tono sube. El slider de Pitch añade transposición extra.",
    complex: "<strong>Complex:</strong> El algoritmo más avanzado. Identifica características rítmicas y tonales para estirar audios manteniendo el tono original. Ideal para pistas completas."
  };

  async function initTone() {
    await Tone.start();
    if (!player && window.amenBase64) {
      return new Promise((resolve) => {
        player = new Tone.Player({
          url: "data:audio/wav;base64," + window.amenBase64,
          loop: true,
          onload: () => {
            pitchShift = new Tone.PitchShift(0);
            tremolo = new Tone.Tremolo(9, 0).start(); // For Tones mode
            
            player.chain(tremolo, pitchShift, Tone.Destination);
            document.getElementById('audio-status').style.display = 'none';
            resolve(true);
          },
          onerror: () => resolve(false)
        });
      });
    }
    return !!player;
  }

  function updateMode() {
    const mode = document.getElementById('warp-mode').value;
    document.getElementById('m3-desc').innerHTML = descriptions[mode];
    applyWarpAlgorithm();
  }

  function updateTempo(val) {
    document.getElementById('tempo-val').innerText = val;
    applyWarpAlgorithm();
  }
  
  function updatePitch(val) {
    let sign = val > 0 ? "+" : "";
    document.getElementById('pitch-val').innerText = sign + val;
    applyWarpAlgorithm();
  }

  async function toggleAudio() {
    const btn = document.getElementById('btn-play');
    if (isPlaying) {
      if(player) player.stop();
      if(stutterLoop) { clearInterval(stutterLoop); stutterLoop = null; }
      btn.textContent = "▶ Reproducir (Amen Break)";
      btn.style.background = "var(--play)";
      isPlaying = false;
    } else {
      btn.textContent = "⏳ Cargando...";
      const success = await initTone();
      if(!success) {
        document.getElementById('audio-status').style.display = 'block';
        btn.textContent = "▶ Reproducir (Falló)";
        return;
      }
      player.start();
      btn.textContent = "⏹ Detener Audio";
      btn.style.background = "var(--danger)";
      isPlaying = true;
      applyWarpAlgorithm();
    }
  }

  function applyWarpAlgorithm() {
    if(!isPlaying || !player) return;
    
    const mode = document.getElementById('warp-mode').value;
    const currentTempo = parseFloat(document.getElementById('tempo-slider').value);
    const userPitch = parseFloat(document.getElementById('pitch-slider').value);
    const ratio = currentTempo / baseTempo;
    
    // Reset effects
    if(stutterLoop) { clearInterval(stutterLoop); stutterLoop = null; }
    tremolo.depth.value = 0;
    player.mute = false;

    // Time stretching in Tone.Player naturally changes pitch (like vinyl)
    player.playbackRate = ratio;
    
    // Calculate how many semitones the playbackRate shifted the audio
    const naturalPitchShift = 12 * Math.log2(ratio);

    if (mode === 'repitch') {
      // In Re-Pitch, we WANT the natural pitch shift, plus whatever the user added
      pitchShift.pitch = userPitch;
    } else {
      // In Complex/Beats/Tones/Texture, we MUST counteract the natural pitch shift
      // to keep the audio at its original pitch, then add the user's transposition.
      pitchShift.pitch = userPitch - naturalPitchShift;
      
      // Simulate artifacts of different modes
      if (mode === 'beats' && ratio < 1) {
        // Stutter effect for Beats mode when slowed down
        const beatDur = (60 / currentTempo) * 1000;
        stutterLoop = setInterval(() => {
          player.mute = false;
          const hold = beatDur * ratio;
          setTimeout(() => { if(isPlaying) player.mute = true; }, hold);
        }, beatDur);
      } else if (mode === 'texture' && ratio < 1) {
        // Texture creates a grainy/smudged sound. We use extreme pitch shift window size.
        pitchShift.windowSize = 0.01; // Grainy
      } else if (mode === 'tones' && ratio < 1) {
        // Tones stretches grains cleanly. We simulate with tremolo.
        pitchShift.windowSize = 0.05;
        tremolo.depth.value = 0.8;
        tremolo.frequency.value = 8 * ratio;
      }
      
      // Reset window size for non-texture modes
      if (mode !== 'texture' && mode !== 'tones') {
        pitchShift.windowSize = 0.1;
      }
    }
  }
</script>
`;

html = html.replace(scriptRegex, newScript);
fs.writeFileSync('es/clase-02.html', html);
