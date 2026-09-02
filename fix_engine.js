const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

const regex = /function applyWarpAlgorithm\(\) \{[\s\S]*?\}[\s]*<\/script>/m;

const newLogic = `function applyWarpAlgorithm() {
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
    
    if (audioSource) {
      // In Web Audio, we change playbackRate to stretch time.
      // This will naturally pitch down (Re-Pitch behavior).
      audioSource.playbackRate.setValueAtTime(ratio, ctx.currentTime);
      
      if (mode === 'beats') {
        // Tartamudeo encima del audio lento
        const beatDur = (60 / currentTempo) * 1000;
        stutterInterval = setInterval(() => {
          audioGain.gain.setValueAtTime(1.0, ctx.currentTime);
          const hold = beatDur * (ratio > 1 ? 1 : ratio);
          setTimeout(() => { if(isPlaying && audioGain) audioGain.gain.setValueAtTime(0, ctx.currentTime); }, hold);
        }, beatDur);
      } else if (mode === 'texture' && ratio < 1.0) {
        noiseVca.gain.setValueAtTime(0.5 * (1 - ratio), ctx.currentTime);
      } else if (mode === 'tones' && ratio < 1.0) {
        const grainSpeed = 100 * ratio;
        stutterInterval = setInterval(() => {
          audioGain.gain.setValueAtTime(1.0, ctx.currentTime);
          setTimeout(() => { if(isPlaying && audioGain) audioGain.gain.setValueAtTime(0.2, ctx.currentTime); }, grainSpeed / 2);
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
</script>`;

html = html.replace(regex, newLogic);
fs.writeFileSync('es/clase-02.html', html);
