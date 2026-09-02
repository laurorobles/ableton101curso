const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

// Update M2 buttons to be more descriptive if needed
// Actually M2 already has msg() inside warpFromHere() and warpStraight()

// Update toggleAudio
const oldToggleAudio = `async function toggleAudio() {
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
  }`;

const newToggleAudio = `async function toggleAudio() {
    const btn = document.getElementById('btn-play');
    if (isPlaying) {
      if(player) player.stop();
      if(stutterLoop) { clearInterval(stutterLoop); stutterLoop = null; }
      btn.textContent = "▶ Reproducir (Amen Break)";
      btn.style.background = "var(--play)";
      isPlaying = false;
      msg("⏹ Audio detenido.", "var(--text)");
    } else {
      btn.textContent = "⏳ Cargando...";
      const success = await initTone();
      if(!success) {
        document.getElementById('audio-status').style.display = 'block';
        btn.textContent = "▶ Reproducir (Falló)";
        msg("❌ Error al cargar el audio.", "var(--danger)");
        return;
      }
      player.start();
      btn.textContent = "⏹ Detener Audio";
      btn.style.background = "var(--danger)";
      isPlaying = true;
      applyWarpAlgorithm();
      msg("▶ Reproduciendo Amen Break...", "var(--play)");
    }
  }`;
html = html.replace(oldToggleAudio, newToggleAudio);

// Update updateMode
const oldUpdateMode = `function updateMode() {
    const mode = document.getElementById('warp-mode').value;
    document.getElementById('m3-desc').innerHTML = descriptions[mode];
    applyWarpAlgorithm();
  }`;
  
const newUpdateMode = `function updateMode() {
    const mode = document.getElementById('warp-mode').value;
    document.getElementById('m3-desc').innerHTML = descriptions[mode];
    applyWarpAlgorithm();
    const modeNames = {beats:"Beats", tones:"Tones", texture:"Texture", repitch:"Re-Pitch", complex:"Complex"};
    msg("🎛 Modo Warp: " + modeNames[mode], "var(--audio)");
  }`;
html = html.replace(oldUpdateMode, newUpdateMode);

fs.writeFileSync('es/clase-02.html', html);
