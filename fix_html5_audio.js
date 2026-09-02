const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

const regex = /let amenBuffer = null;[\s\S]*?<\/script>/m;

const newLogic = `
  let amenBuffer = null; // Para la wave
  
  // Usaremos un elemento HTML5 Audio para tener preservesPitch nativo
  let htmlAudio = null;
  let audioGain = null;
  
  let osc = null;
  let vca = null;
  let stutterInterval = null;
  let noiseNode = null;
  let noiseVca = null;

  const descriptions = {
    beats: "<strong>Beats:</strong> El modo por defecto. Especializado en percusión. Mantiene el tono original y usa un algoritmo rítmico para ajustar el tiempo (simulado aquí con tartamudeo).",
    tones: "<strong>Tones:</strong> Para voces, bajos o sintes solistas. Intenta mantener el tono original estirando fragmentos vocales (simulado con trémolo).",
    texture: "<strong>Texture:</strong> Para sintes atmosféricos, pads o ruido. Genera una sensación 'arenosa' o reverberante al bajar la velocidad agregando ruido.",
    repitch: "<strong>Re-Pitch:</strong> Como una tornamesa de DJ. Al bajar el tempo, el tono/frecuencia del sonido cae inmediatamente de forma proporcional.",
    complex: "<strong>Complex:</strong> El algoritmo más avanzado. Identifica características rítmicas y tonales para estirar audios manteniendo perfectamente el tono original."
  };

  function getAC() {
    if(!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if(ac.state === 'suspended') ac.resume();
    return ac;
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

  async function loadAmen() {
    return new Promise((resolve) => {
      if (window.amenBase64) {
        // Inicializar HTML5 Audio con Data URI
        htmlAudio = new Audio("data:audio/wav;base64," + window.amenBase64);
        htmlAudio.loop = true;
        
        // También guardamos el Buffer para efectos si es necesario, pero usaremos htmlAudio
        document.getElementById('audio-status').style.display = 'none';
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async function toggleAudio() {
    const btn = document.getElementById('btn-play');
    if (isPlaying) {
      stopWarpAudio();
      btn.textContent = "▶ Reproducir (Amen Break)";
      btn.style.background = "var(--play)";
      isPlaying = false;
    } else {
      if (!htmlAudio && !document.getElementById('audio-status').dataset.failed) {
        btn.textContent = "⏳ Cargando...";
        const success = await loadAmen();
        if(!success) {
          document.getElementById('audio-status').style.display = 'block';
          document.getElementById('audio-status').dataset.failed = "true";
        }
      }
      startWarpAudio();
      btn.textContent = "⏹ Detener Audio";
      btn.style.background = "var(--danger)";
      isPlaying = true;
    }
  }

  function startWarpAudio() {
    const ctx = getAC();
    if (htmlAudio) {
      htmlAudio.currentTime = 0;
      htmlAudio.play();
      
      // Conectar HTML5 Audio a Web Audio API para los efectos (noise, stutter)
      if (!audioGain) {
        const source = ctx.createMediaElementSource(htmlAudio);
        audioGain = ctx.createGain();
        source.connect(audioGain).connect(ctx.destination);
      }
      
      noiseNode = ctx.createBufferSource();
      noiseNode.buffer = createNoiseBuffer(ctx);
      noiseNode.loop = true;
      noiseVca = ctx.createGain();
      noiseVca.gain.value = 0;
      noiseNode.connect(noiseVca).connect(ctx.destination);
      noiseNode.start();

    } else {
      osc = ctx.createOscillator();
      osc.type = 'sawtooth'; osc.frequency.value = 220;
      vca = ctx.createGain(); vca.gain.value = 0.3;
      
      noiseNode = ctx.createBufferSource();
      noiseNode.buffer = createNoiseBuffer(ctx);
      noiseNode.loop = true;
      noiseVca = ctx.createGain(); noiseVca.gain.value = 0;
      noiseNode.connect(noiseVca).connect(ctx.destination);
      noiseNode.start();

      osc.connect(vca).connect(ctx.destination);
      osc.start();
    }
    applyWarpAlgorithm();
  }

  function stopWarpAudio() {
    if(htmlAudio) { htmlAudio.pause(); }
    if(osc) { try { osc.stop(); } catch(e){} osc = null; }
    if(noiseNode) { try { noiseNode.stop(); } catch(e){} noiseNode = null; }
    if(stutterInterval) { clearInterval(stutterInterval); stutterInterval = null; }
  }

  function createNoiseBuffer(ctx) {
    const s = ctx.sampleRate * 2;
    const b = ctx.createBuffer(1, s, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i=0; i<s; i++) d[i] = Math.random()*2-1;
    return b;
  }

  function applyWarpAlgorithm() {
    if(!isPlaying) return;
    const ctx = getAC();
    const mode = document.getElementById('warp-mode').value;
    const currentTempo = parseFloat(document.getElementById('tempo-slider').value);
    const ratio = currentTempo / baseTempo;
    
    if(stutterInterval) { clearInterval(stutterInterval); stutterInterval = null; }
    if (audioGain) audioGain.gain.setValueAtTime(1.0, ctx.currentTime);
    if (vca) vca.gain.setValueAtTime(0.3, ctx.currentTime);
    if (osc) osc.frequency.setValueAtTime(220, ctx.currentTime);
    if (noiseVca) noiseVca.gain.setValueAtTime(0, ctx.currentTime);
    
    if (htmlAudio) {
      // Ajustar velocidad
      htmlAudio.playbackRate = ratio;
      
      // Magia de HTML5: preservesPitch (nativo del navegador)
      if (mode === 'repitch') {
        htmlAudio.preservesPitch = false;
      } else {
        htmlAudio.preservesPitch = true;
      }
      
      if (mode === 'beats') {
        const beatDur = (60 / currentTempo) * 1000;
        stutterInterval = setInterval(() => {
          audioGain.gain.setValueAtTime(1.0, ctx.currentTime);
          const hold = beatDur * (ratio > 1 ? 1 : ratio);
          setTimeout(() => { if(isPlaying && audioGain) audioGain.gain.setValueAtTime(0, ctx.currentTime); }, hold);
        }, beatDur);
      } else if (mode === 'texture' && ratio < 1.0) {
        noiseVca.gain.setValueAtTime(0.2 * (1 - ratio), ctx.currentTime);
      } else if (mode === 'tones' && ratio < 1.0) {
        const grainSpeed = 100 * ratio;
        stutterInterval = setInterval(() => {
          audioGain.gain.setValueAtTime(1.0, ctx.currentTime);
          setTimeout(() => { if(isPlaying && audioGain) audioGain.gain.setValueAtTime(0.4, ctx.currentTime); }, grainSpeed / 2);
        }, grainSpeed);
      }
    } else {
      if (mode === 'repitch') osc.frequency.setValueAtTime(220 * ratio, ctx.currentTime);
      if (mode === 'beats') {
        const beatDur = (60 / currentTempo) * 1000;
        stutterInterval = setInterval(() => {
          vca.gain.setValueAtTime(0.4, ctx.currentTime);
          const hold = beatDur * (ratio > 1 ? 1 : ratio);
          setTimeout(() => { if(isPlaying && vca) vca.gain.setValueAtTime(0, ctx.currentTime); }, hold);
        }, beatDur);
      } else if (mode === 'texture' && ratio < 1.0) {
        noiseVca.gain.setValueAtTime(0.15 * (1 - ratio), ctx.currentTime);
      } else if (mode === 'tones' && ratio < 1.0) {
        const grainSpeed = 100 * ratio;
        stutterInterval = setInterval(() => {
          vca.gain.setValueAtTime(0.3, ctx.currentTime);
          setTimeout(() => { if(isPlaying && vca) vca.gain.setValueAtTime(0.1, ctx.currentTime); }, grainSpeed / 2);
        }, grainSpeed);
      }
    }
  }
</script>
`;

html = html.replace(regex, newLogic);
fs.writeFileSync('es/clase-02.html', html);
