const fs = require('fs');

const audioScript = `
<script>
  let gAc, gInterval, gStep = 0, gNextTime = 0, gCurrentPattern = null;

  function initAudio() {
    if(!gAc) gAc = new (window.AudioContext || window.webkitAudioContext)();
    if(gAc.state === 'suspended') gAc.resume();
  }

  function playKick(time) {
    const osc = gAc.createOscillator(), g = gAc.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
    g.gain.setValueAtTime(1, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    osc.connect(g); g.connect(gAc.destination);
    osc.start(time); osc.stop(time + 0.4);
  }

  function playSnare(time) {
    // Noise
    const bufSize = gAc.sampleRate * 0.2; // 200ms
    const buf = gAc.createBuffer(1, bufSize, gAc.sampleRate);
    const output = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) output[i] = Math.random() * 2 - 1;
    const noise = gAc.createBufferSource(); noise.buffer = buf;
    
    // Filter noise
    const f = gAc.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2000;
    const g = gAc.createGain();
    g.gain.setValueAtTime(1, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    noise.connect(f); f.connect(g); g.connect(gAc.destination);
    noise.start(time);

    // Body (Tone)
    const osc = gAc.createOscillator(), g2 = gAc.createGain();
    osc.frequency.setValueAtTime(250, time);
    g2.gain.setValueAtTime(0.7, time);
    g2.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(g2); g2.connect(gAc.destination);
    osc.start(time); osc.stop(time + 0.2);
  }

  function playHat(time) {
    const bufSize = gAc.sampleRate * 0.05; 
    const buf = gAc.createBuffer(1, bufSize, gAc.sampleRate);
    const output = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) output[i] = Math.random() * 2 - 1;
    const noise = gAc.createBufferSource(); noise.buffer = buf;
    
    const f = gAc.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000;
    const g = gAc.createGain();
    g.gain.setValueAtTime(0.3, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    noise.connect(f); f.connect(g); g.connect(gAc.destination);
    noise.start(time);
  }

  function scheduler() {
    while(gNextTime < gAc.currentTime + 0.1) {
      if(gCurrentPattern) {
        if(gCurrentPattern.k[gStep]) playKick(gNextTime);
        if(gCurrentPattern.s[gStep]) playSnare(gNextTime);
        if(gCurrentPattern.hh[gStep]) playHat(gNextTime);
      }
      gStep = (gStep + 1) % 16;
      let beatDur = 60 / gCurrentPattern.bpm;
      let stepDur = beatDur / 4;
      gNextTime += stepDur;
    }
  }

  function toggleGenrePlay(btn, bpm, kStr, sStr, hhStr) {
    if(gInterval) {
      clearInterval(gInterval); gInterval = null; gCurrentPattern = null;
      document.querySelectorAll('.btn-play-genre').forEach(b => { b.innerHTML = '▶ Escuchar'; b.style.background = 'var(--play)'; });
      if(btn.innerHTML.includes('Detener')) return; // Just stop
    }
    
    initAudio();
    document.querySelectorAll('.btn-play-genre').forEach(b => { b.innerHTML = '▶ Escuchar'; b.style.background = 'var(--play)'; });
    btn.innerHTML = '⏹ Detener'; btn.style.background = 'var(--danger)';
    
    gCurrentPattern = {
      bpm: parseInt(bpm),
      k: kStr.split(',').map(Number),
      s: sStr.split(',').map(Number),
      hh: hhStr.split(',').map(Number)
    };
    
    gStep = 0;
    gNextTime = gAc.currentTime + 0.05;
    scheduler();
    gInterval = setInterval(scheduler, 25);
  }
</script>
`;

let html = fs.readFileSync('es/anexo-generos.html', 'utf8');

// The pattern data from the previous generation
const generos = [
  { n: "House", bpm: "120", k: "1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0", s: "0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0", hh: "0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0" },
  { n: "Techno", bpm: "130", k: "1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0", s: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0", hh: "0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0" },
  { n: "Hip Hop (Boom Bap)", bpm: "90", k: "1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0", s: "0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0", hh: "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0" },
  { n: "Reggaeton / Dembow", bpm: "95", k: "1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0", s: "0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0", hh: "1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0" },
  { n: "Drum and Bass", bpm: "170", k: "1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0", s: "0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0", hh: "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0" },
  { n: "Trap", bpm: "140", k: "1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0", s: "0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0", hh: "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1" },
  { n: "Afrobeats", bpm: "105", k: "1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0", s: "0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0", hh: "1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0" },
  { n: "Cumbia", bpm: "95", k: "1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0", s: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0", hh: "0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1" }
];

// Inject the button into the genre cards
generos.forEach(g => {
  const findStr = `<h2>${g.n.split(' ')[0]}`; // match House, Techno, etc
  const splitIndex = html.indexOf(findStr);
  if (splitIndex !== -1) {
    const btnHTML = `<button class="btn btn-play-genre" style="background:#00B84D; color:#fff; border:none; padding:0.5rem 1rem; border-radius:6px; cursor:pointer; font-weight:bold; font-size:1rem" onclick="toggleGenrePlay(this, '${g.bpm}', '${g.k}', '${g.s}', '${g.hh}')">▶ Escuchar</button>`;
    
    // We insert the button right after the bpm span
    html = html.replace(new RegExp(`(<h2>${g.n.replace(/\\(/g,'\\\\(').replace(/\\)/g,'\\\\)')}.*?</span>)`), `$1 ${btnHTML}`);
  }
});

// Append script
if (!html.includes('function playKick')) {
  html = html.replace('</body>', audioScript + '\n</body>');
  fs.writeFileSync('es/anexo-generos.html', html);
}
