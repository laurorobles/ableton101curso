const fs = require('fs');
let html = fs.readFileSync('/Users/babyonk1/Desktop/CLASE/index.html', 'utf8');

// 1. Panorama Bar -> Boiler Room
html = html.replace('Panorama Bar.', 'Boiler Room.');

// 2. Add Button to Audio section
const audioBtnRow = `<button class="btn btn-audio" id="btnAudio" onclick="toggleAudio()">▶ Play Audio</button>
        <button class="btn btn-outline" onclick="cycleEQ()" id="btnEQ">🎨 EQ: Original</button>
        <button class="btn btn-outline" onclick="failAudioChange()" style="border-color:var(--danger); color:var(--danger);">🚫 Cambiar Notas</button>`;
html = html.replace(`<button class="btn btn-audio" id="btnAudio" onclick="toggleAudio()">▶ Play Audio</button>
        <button class="btn btn-outline" onclick="cycleEQ()" id="btnEQ">🎨 EQ: Original</button>`, audioBtnRow);

// 3. Replace M5 entirely
const m5Start = html.indexOf('<!-- M5: SYNTH VS DRUM MACHINE');
const m6Start = html.indexOf('<!-- M6: CONTROLADORES MIDI');
const newM5 = `<!-- M5: SYNTH VS DRUM MACHINE ──────────────── -->
<section id="m5">
  <div class="tag" style="color:#00B84D">Módulo 05</div>
  <h2>Sintetizadores vs. Cajas de Ritmos</h2>
  <p class="sub">Las dos herramientas más icónicas de la producción electrónica. ¿En qué se diferencian?</p>
  <div class="split">

    <div class="panel">
      <h3 style="color:#FF0055">🎹 Sintetizadores</h3>
      <p style="color:var(--muted);margin-bottom:1rem">Generan melodías, acordes y bajos.</p>
      <div style="background:#111;border-radius:10px;padding:1.5rem;color:#fff;text-align:center;margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:center; gap:30px; font-size:3rem; margin-bottom:0.5rem; user-select:none;">
           <div onclick="playSynth('sine')" style="cursor:pointer; transition:transform 0.1s" onmousedown="popPad(this)" title="Onda Senoidal (Sine)">∿</div>
           <div onclick="playSynth('square')" style="cursor:pointer; transition:transform 0.1s" onmousedown="popPad(this)" title="Onda Cuadrada (Square)">⎍</div>
           <div onclick="playSynth('sawtooth')" style="cursor:pointer; transition:transform 0.1s" onmousedown="popPad(this)" title="Onda Sierra (Sawtooth)">◿</div>
        </div>
        <div style="font-size:0.9rem;color:#aaa">Haz clic en las ondas para escuchar los osciladores</div>
      </div>
      <p style="font-size:1.1rem">Están diseñados para tocar <strong>notas musicales</strong> a diferentes alturas. Usan osciladores (ondas) para crear y esculpir el sonido desde cero.</p>
      <div class="analogy" style="border-left-color:#FF0055">
        <strong style="color:#FF0055">Ejemplos Clave (Haz clic):</strong><br><br>
        <a href="javascript:void(0)" onclick="showImg('moog')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Moog Minimoog (Bajos clásicos)</a>
        <div id="imgMoog" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Minimoog_Model_D.jpg" style="width:100%;border-radius:8px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('juno')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland Juno-106 (Acordes / Pads)</a>
        <div id="imgJuno" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Roland_Juno-106_synthesizer.jpg/800px-Roland_Juno-106_synthesizer.jpg" style="width:100%;border-radius:8px;"></div>
      </div>
    </div>

    <div class="panel">
      <h3 style="color:#0055FF">🥁 Cajas de Ritmos (Drum Machines)</h3>
      <p style="color:var(--muted);margin-bottom:1rem">Generan percusiones y beats.</p>
      <div style="background:#111;border-radius:10px;padding:1.5rem;color:#fff;text-align:center;margin-bottom:1.5rem;display:flex;flex-direction:column;align-items:center;gap:10px;">
        <div style="display:flex;gap:15px; user-select:none;">
          <div onclick="drumHit('kick')" onmousedown="popPad(this)" style="width:60px;height:60px;background:var(--audio);border-radius:8px;box-shadow:inset 0 0 0 2px #fff; display:flex; align-items:center; justify-content:center; font-size:2rem; transition:transform 0.1s; cursor:pointer;">🥁</div>
          <div onclick="drumHit('snare')" onmousedown="popPad(this)" style="width:60px;height:60px;background:var(--midi);border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:2rem; transition:transform 0.1s; cursor:pointer;">🪘</div>
          <div onclick="drumHit('hat')" onmousedown="popPad(this)" style="width:60px;height:60px;background:var(--play);border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:2rem; transition:transform 0.1s; cursor:pointer;">🔔</div>
        </div>
        <div style="font-size:0.9rem;color:#aaa">Toca los pads para disparar golpes cortos (Kick, Snare, Hat)</div>
      </div>
      <p style="font-size:1.1rem">Están diseñadas para secuenciar <strong>golpes percusivos</strong>. Cada botón (Pad) dispara un sonido diferente, ya sea sintetizado o sampleado.</p>
      <div class="analogy" style="border-left-color:#0055FF">
        <strong style="color:#0055FF">Ejemplos Clave (Haz clic):</strong><br><br>
        <a href="javascript:void(0)" onclick="showImg('tr808')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland TR-808 (Trap / HipHop)</a>
        <div id="img808" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Roland_TR-808.png/800px-Roland_TR-808.png" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('tr909')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland TR-909 (Techno / House)</a>
        <div id="img909" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Roland_TR-909_drum_machine.jpg/800px-Roland_TR-909_drum_machine.jpg" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>
      </div>
    </div>

  </div>
</section>

`;
html = html.substring(0, m5Start) + newM5 + html.substring(m6Start);

// 4. Add JS functions
const jsInsert = `function failAudioChange() {
  msg('❌ ¡Error! El audio es un bloque grabado (fotografía). Para cambiar las notas, tendrías que volver a grabarlo.', 'var(--danger)');
}

let synthBusy = false;
function playSynth(type) {
  if (synthBusy) return;
  synthBusy = true;
  const ac = getAC();
  const notes = [261.63, 311.13, 392.00, 523.25];
  const dur = 0.15;
  const t0 = ac.currentTime + 0.05;
  notes.forEach((freq, i) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t0 + i * dur);
    g.gain.linearRampToValueAtTime(0.2, t0 + i * dur + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + i * dur + dur * 0.9);
    o.connect(g); g.connect(ac.destination);
    o.start(t0 + i * dur); o.stop(t0 + i * dur + dur);
  });
  let name = type === 'sine' ? 'Senoidal' : type === 'square' ? 'Cuadrada' : 'Sierra';
  msg('〰️ Oscilador: Onda ' + name, '#FF0055');
  setTimeout(() => { synthBusy = false; }, (notes.length * dur + 0.2) * 1000);
}

function popPad(el) {
  el.style.transform = 'scale(0.85)';
  setTimeout(() => el.style.transform = 'scale(1)', 100);
}

function showImg(id) {
  const map = {moog: 'imgMoog', juno: 'imgJuno', tr808: 'img808', tr909: 'img909'};
  for (let k in map) {
    const el = document.getElementById(map[k]);
    if(el) {
      el.style.display = (k === id && el.style.display === 'none') ? 'block' : 'none';
    }
  }
}

`;
html = html.replace(`window.addEventListener('DOMContentLoaded', () => {`, jsInsert + `window.addEventListener('DOMContentLoaded', () => {`);

fs.writeFileSync('/Users/babyonk1/Desktop/CLASE/index.html', html);
