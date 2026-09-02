const fs = require('fs');
let html = fs.readFileSync('/Users/babyonk1/Desktop/CLASE/index.html', 'utf8');

// 1. Add Bio to Hero
const heroStart = html.indexOf('<p class="sub" style="font-size:1.8rem;text-align:center;margin:0 auto 2.5rem">Manual interactivo para aprender en el salón.</p>');
if (heroStart !== -1) {
  const replacement = `<p class="sub" style="font-size:1.8rem;text-align:center;margin:0 auto 1.5rem">Manual interactivo para aprender en el salón.</p>

  <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-bottom:2.5rem;text-align:left;max-width:800px;background:#F0F4F8;padding:1.5rem;border-radius:16px;">
    <img src="lao_foto.jpg" alt="LAO" style="width:100px;height:100px;border-radius:50%;object-fit:cover;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div>
      <h3 style="margin-bottom:0.3rem;font-size:1.4rem;">Creado por LAO (Lauro Robles)</h3>
      <p style="font-size:1rem;color:var(--muted);line-height:1.4;">Productor, DJ y cofundador de NAAFI. Figura clave de la música electrónica experimental latinoamericana con presentaciones en Sónar, Mutek y Panorama Bar.</p>
    </div>
  </div>`;
  html = html.replace('<p class="sub" style="font-size:1.8rem;text-align:center;margin:0 auto 2.5rem">Manual interactivo para aprender en el salón.</p>', replacement);
}

// 2. Add M5 (Synth vs Drum Machine) and shift M5 to M6
const m5Start = html.indexOf('<!-- M5: CONTROLADORES MIDI ──────────────── -->');
if (m5Start !== -1) {
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
        <div style="font-size:3rem;margin-bottom:0.5rem;letter-spacing:10px;">〰️∿◿</div>
        <div style="font-size:0.9rem;color:#aaa">Osciladores generando formas de onda continuas</div>
      </div>
      <p style="font-size:1.1rem">Están diseñados para tocar <strong>notas musicales</strong> a diferentes alturas (Do, Re, Mi...). Usan osciladores para crear y esculpir el sonido desde cero.</p>
      <div class="analogy" style="border-left-color:#FF0055">
        <strong>Ejemplos Clave:</strong><br>
        • Moog Minimoog (Bajos clásicos)<br>
        • Roland Juno-106 (Acordes / Pads)<br>
        • Wavetable / Analog (En Ableton)
      </div>
    </div>

    <div class="panel">
      <h3 style="color:#0055FF">🥁 Cajas de Ritmos (Drum Machines)</h3>
      <p style="color:var(--muted);margin-bottom:1rem">Generan percusiones y beats.</p>
      <div style="background:#111;border-radius:10px;padding:1.5rem;color:#fff;text-align:center;margin-bottom:1.5rem;display:flex;flex-direction:column;align-items:center;gap:10px;">
        <div style="display:flex;gap:10px;">
          <div style="width:50px;height:50px;background:var(--audio);border-radius:5px;box-shadow:inset 0 0 0 2px #fff"></div>
          <div style="width:50px;height:50px;background:var(--midi);border-radius:5px;"></div>
          <div style="width:50px;height:50px;background:var(--play);border-radius:5px;"></div>
        </div>
        <div style="font-size:0.9rem;color:#aaa">Pads disparando golpes cortos (Kick, Snare, Hat)</div>
      </div>
      <p style="font-size:1.1rem">Están diseñadas para secuenciar <strong>golpes percusivos</strong>. Cada botón (Pad) dispara un sonido diferente, ya sea sintetizado o grabado (sample).</p>
      <div class="analogy" style="border-left-color:#0055FF">
        <strong>Ejemplos Clave:</strong><br>
        • Roland TR-808 (Trap / HipHop / Reggaeton)<br>
        • Roland TR-909 (Techno / House)<br>
        • Drum Rack (En Ableton)
      </div>
    </div>

  </div>
</section>

<!-- M6: CONTROLADORES MIDI ──────────────── -->
<section id="m6">
  <div class="tag t-cc">Módulo 06</div>`;
  
  html = html.replace('<!-- M5: CONTROLADORES MIDI ──────────────── -->\n<section id="m5">\n  <div class="tag t-cc">Módulo 05</div>', newM5);
}

fs.writeFileSync('/Users/babyonk1/Desktop/CLASE/index.html', html);
