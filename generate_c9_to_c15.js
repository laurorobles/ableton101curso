const fs = require('fs');

const quizzes = {
  9: [
    {q:'¿Para qué sirve la Ecualización Sustractiva en la mezcla?',opts:['Aumentar graves','Limpiar frecuencias problemáticas cortándolas','Añadir distorsión','Subir volumen global'],ans:1},
    {q:'¿Qué es la Compresión de Bus (Bus Compression)?',opts:['Comprimir una sola pista','Comprimir un grupo de pistas juntas para "pegarlas" (Glue)','Eliminar pistas','Añadir Reverb al máster'],ans:1},
    {q:'Al ecualizar una voz, es común aplicar un HPF (Low Cut) para:',opts:['Añadir brillo','Eliminar ruidos de piso y retumbos innecesarios','Añadir eco','Distorsionar'],ans:1},
    {q:'¿Qué parámetro de un compresor define la "rapidez" con la que actúa?',opts:['Threshold','Ratio','Attack (Ataque)','Release (Relajación)'],ans:2},
    {q:'La técnica de "Sidechain Compression" con el bombo busca:',opts:['Que el bombo suene más agudo','Crear un bombeo rítmico que deja espacio al bombo','Eliminar el bajo','Masterizar la canción'],ans:1}
  ],
  10: [
    {q:'¿Qué significa ADSR?',opts:['Attack, Decay, Sustain, Release','Audio Digital System Rate','Amplifier Delay Sound Reverb','Analog Digital Signal Route'],ans:0},
    {q:'¿Qué etapa de la envolvente (Envelope) determina qué tan rápido alcanza su volumen máximo al presionar una tecla?',opts:['Decay','Sustain','Release','Attack (Ataque)'],ans:3},
    {q:'¿Qué significa LFO?',opts:['Low Frequency Oscillator','Loudness Factor Output','Linear Frequency Operant','Loud Filter Option'],ans:0},
    {q:'¿Para qué se usa comúnmente un LFO?',opts:['Generar sub-bajos audibles','Cantar por micrófono','Modulares parámetros automáticamente, como un Vibrato','Ecualizar la mezcla'],ans:2},
    {q:'Un sonido "Pluck" (punteo corto) se logra con:',opts:['Attack largo, Release largo','Attack muy corto y Decay corto','Solo Attack','Sustain al 100%'],ans:1}
  ],
  11: [
    {q:'¿Qué es la síntesis Wavetable?',opts:['Síntesis basada en tablas de ondas que pueden evolucionar y transformarse','Poner audio en una mesa','Síntesis de frecuencia modulada pura','Grabar con micrófono'],ans:0},
    {q:'Sintetizadores Wavetable famosos:',opts:['Serum y Massive','Simpler y Sampler','Drum Rack','EQ Eight'],ans:0},
    {q:'¿Qué parámetro se automatiza para que el sonido cambie su textura dinámicamente en este tipo de síntesis?',opts:['Volumen maestro','Wavetable Position (Posición de tabla de ondas)','Reverb Decay','Tempo'],ans:1},
    {q:'¿Cuál es la ventaja de la Síntesis Wavetable sobre la Sustractiva clásica?',opts:['Es más barata','Permite timbres más complejos y cambiantes que una simple onda senoidal/sierra','Suena a piano acústico','No usa osciladores'],ans:1},
    {q:'Ableton Live 10+ incluye un sintetizador wavetable nativo llamado:',opts:['Analog','Operator','Wavetable','Collision'],ans:2}
  ],
  12: [
    {q:'¿Qué es el Groove o Swing en programación MIDI?',opts:['Un género de baile','Desplazar ligeramente las notas fuera de la cuadrícula matemática para darle "sabor humano"','Un sintetizador','Poner todas las notas exactamente a tiempo'],ans:1},
    {q:'¿Qué es una Polirritmia?',opts:['Una melodía sin bajo','Tocar dos o más ritmos independientes al mismo tiempo (ej. 3 contra 4)','Afinar el bombo','Bailar'],ans:1},
    {q:'¿Cómo aplicas Groove en Ableton?',opts:['Borras el track','Arrastras un archivo desde el "Groove Pool" hacia el clip MIDI','Aplicas reverb','Pones el tempo en 0'],ans:1},
    {q:'El "Velocity" (Velocidad) de una nota MIDI altera:',opts:['El tempo de la canción','La afinación','La fuerza o intensidad con la que se disparó la nota','El tipo de onda'],ans:2},
    {q:'Para humanizar un ritmo, lo mejor es:',opts:['Cuantizar todo al 100% y velocidades idénticas','Variar sutilmente la velocidad y posición de las notas (swing)','Subir los agudos','Poner distorsión'],ans:1}
  ],
  13: [
    {q:'¿Qué hace la función "Slice to New MIDI Track"?',opts:['Borra el audio','Corta un loop de audio en rebanadas y las mapea a los pads de un Drum Rack','Añade bajos','Exporta el track'],ans:1},
    {q:'¿Qué es el Sampling (Muestreo)?',opts:['Tomar una grabación existente y reusarla creativamente en una nueva canción','Tocar guitarra en vivo','Dibujar ondas','Mezclar'],ans:0},
    {q:'En Simpler, el modo "Classic" sirve para:',opts:['Tocar el sample entero polifónicamente como un teclado','Tocar pedacitos del sample','Acelerar el tempo','Borrar el sample'],ans:0},
    {q:'En Simpler, el modo "Slice" es ideal para:',opts:['Tocar acordes con voces largas','Tocar loops de batería cortados pad por pad (tipo MPC)','Ecualizar','Exportar a mp3'],ans:1},
    {q:'¿Qué técnica inventaron los pioneros del Hip Hop en los 80s?',opts:['Síntesis FM','Samplear breaks de batería de vinilos viejos (Ej. Amen Break)','Tocar piano clásico','Warping'],ans:1}
  ],
  14: [
    {q:'¿Cuál es el objetivo de la Masterización?',opts:['Componer los acordes','Grabar las voces','Optimizar el volumen, ecualización final y hacer que el track suene bien en todos los sistemas','Añadir Reverb a cada pista'],ans:2},
    {q:'¿Qué plugin SIEMPRE se pone al final de la cadena de Masterización?',opts:['Chorus','Limitador (Limiter)','Flanger','Delay'],ans:1},
    {q:'El límite absoluto (True Peak) en la masterización moderna no debe pasar de:',opts:['0 dBFS','-3 dBFS','+10 dBFS','-14 dBFS'],ans:0},
    {q:'¿Qué unidad de medida moderna refleja el volumen "percibido" que usan plataformas como Spotify?',opts:['BPM','LUFS','Hz','Bit Depth'],ans:1},
    {q:'Un volumen recomendado de Masterización en LUFS Integrado suele estar entre:',opts:['-30 y -20','-14 y -8 (depende del género)','0 y +5','100 y 200'],ans:1}
  ],
  15: [
    {q:'¿Qué es el Dithering?',opts:['Añadir ruido de fondo para exportar de 24 bits a 16 bits sin perder calidad percibida','Un tipo de distorsión pesada','Un filtro de bajos','El formato de CD'],ans:0},
    {q:'¿A qué resolución debe estar tu exportación final para CD o distribución digital clásica?',opts:['8-bit, 22kHz','16-bit, 44.1kHz','32-bit float','MP3 128kbps'],ans:1},
    {q:'Si tu computadora se sobrecarga (CPU), debes:',opts:['Congelar pistas (Freeze Tracks)','Borrar el proyecto','Añadir más plugins','Exportar a MIDI'],ans:0},
    {q:'¿Qué hace la función "Collect All and Save" (Recopilar todo y guardar)?',opts:['Borra los plugins','Copia todos los audios y samples usados al folder del proyecto para no perderlos al mover la carpeta','Guarda en MP3','Sube a Soundcloud'],ans:1},
    {q:'¡Felicidades! Completaste el curso. ¿Qué tecla rápida activa la grabación de Arreglo?',opts:['Tab','F9','Space','A'],ans:1}
  ]
};

const cData = {
  9: { t:'Mix & Master 2', s:'Ecualización y Compresión en el contexto de mezcla. El pegamento sónico.', tg:['EQ','Compresión de Bus','Mezcla'] },
  10: { t:'Diseño Sonoro 1', s:'Los fundamentos de la Síntesis Sustractiva. Controlando el sonido en el tiempo.', tg:['ADSR','LFO','Síntesis'] },
  11: { t:'Diseño Sonoro 2', s:'Síntesis Wavetable (Tablas de Ondas). Movimiento en 3D.', tg:['Wavetables','Serum','Modulación'] },
  12: { t:'Ritmos Avanzados', s:'Saliendo de la cuadrícula perfecta. Humanización, Groove y Swing.', tg:['Groove','Polirritmia','Swing'] },
  13: { t:'Sampling Creativo', s:'Rebanando el pasado. Uso de Simpler para Slicing tipo MPC.', tg:['Sampling','Simpler','Slicing'] },
  14: { t:'Masterización', s:'Limitadores, Volumen y LUFS. Preparando tu track para Spotify.', tg:['LUFS','Limitador','Mastering'] },
  15: { t:'Proyecto Final', s:'Revisión final, optimización de CPU y la exportación correcta.', tg:['Exportación','Freeze','Dithering'] }
};

const commonHeader = (num, title, sub, tags) => \`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Ableton 101 — Clase \${num}: \${title}</title>
  <style>
    :root { --bg:#F8F9FA; --surface:#fff; --text:#000; --muted:#555; --border:#E5E7EB; --audio:#0055FF; --play:#00B84D; --midi:#FF5500; --danger:#E53E3E; }
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:var(--bg);color:var(--text);font-family:-apple-system,sans-serif;font-size:18px;line-height:1.6;padding:4rem 5%}
    .btn-back { position:fixed; top:20px; left:20px; background:var(--surface); color:var(--text); text-decoration:none; padding:10px 15px; border-radius:8px; border:2px solid var(--border); font-weight:bold; z-index:9999; }
    header { text-align:center; padding:4rem 2rem; border-radius:24px; border:2px solid var(--border); margin-bottom:4rem; background:var(--surface); }
    h1 { font-size:3.5rem; font-weight:900; margin-bottom:1rem; }
    p.sub { font-size:1.4rem; color:var(--muted); max-width:800px; margin:0 auto 2rem; }
    .tag { display:inline-block; font-size:0.9rem; font-weight:700; text-transform:uppercase; background:#E5E7EB; padding:0.4rem 1rem; border-radius:8px; margin-bottom:1rem; }
    section { max-width:1000px; margin:0 auto 5rem; padding:4rem 0; border-bottom:1px solid var(--border); }
    section:last-of-type { border-bottom:none; }
    h2 { font-size:2.5rem; margin-bottom:1.5rem; }
    .panel { background:var(--surface); border:2px solid var(--border); border-radius:16px; padding:2rem; }
    .btn { padding:1rem 2rem; border-radius:8px; border:none; font-weight:bold; font-size:1.2rem; cursor:pointer; color:#fff; background:var(--audio); transition:transform 0.1s; }
    .btn:active { transform:scale(0.95); }
    
    /* M-FINAL */
    .m-final { background:#111; color:#fff; padding:4rem; border-radius:24px; margin-top:4rem; max-width:1000px; margin:4rem auto; }
    .m-final h2 { color:#fff; }
    .m-final .tag { background:#333; color:#fff; }
    .m-final h3 { color:var(--play); border-bottom:1px solid #333; padding-bottom:0.5rem; margin-bottom:1.5rem; margin-top:2rem; }
    .m-final ul { list-style:none; }
    .m-final li { margin-bottom:1rem; color:#ccc; display:flex; gap:1rem; }
    
    .quiz-app { background:#222; border:1px solid #333; border-radius:16px; padding:2rem; margin-top:2rem; }
    .q-text { font-size:1.4rem; color:#fff; margin-bottom:1.5rem; }
    .q-opt { display:block; width:100%; text-align:left; background:#333; color:#fff; border:2px solid transparent; padding:1.2rem; border-radius:8px; margin-bottom:0.8rem; cursor:pointer; font-size:1.1rem; transition:all 0.2s; }
    .q-opt:hover { background:#444; border-color:#555; }
    .q-opt.correct { background:var(--play) !important; color:#fff; border-color:#fff; }
    .q-opt.wrong { background:var(--danger) !important; color:#fff; }
    .q-progress { color:var(--muted); margin-bottom:1rem; font-weight:bold; }
    .q-next { background:var(--audio); color:#fff; padding:1rem 2rem; border:none; border-radius:8px; font-weight:bold; font-size:1.2rem; cursor:pointer; margin-top:1rem; display:none; }
  </style>
</head>
<body>
<a href="../index.html" class="btn-back">← Volver al Índice</a>

<header>
  <div class="tag">Soundspace Academy</div>
  <h1>Ableton 101<br>Clase \${num}: \${title}</h1>
  <p class="sub">\${sub}</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;margin:0 auto 2rem;text-align:left;max-width:800px;background:#F0F4F8;padding:1.5rem;border-radius:16px;">
    <img src="../assets/lao_foto.jpg" alt="LAO" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23ccc\\'/></svg>'" style="width:100px;height:100px;border-radius:50%;object-fit:cover;">
    <div>
      <h3 style="margin-bottom:0.3rem;font-size:1.4rem;">Instructor: LAO (Lauro Robles)</h3>
      <p style="font-size:1rem;color:var(--muted);line-height:1.4;">Bienvenido a la Clase \${num}. \${tags.join(' • ')}</p>
    </div>
  </div>
</header>\n`;

const commonFooter = (num, resumen, shortcuts, biblio) => \`
<div class="m-final">
  <div class="tag">Módulo Final</div>
  <h2>Resumen de Conceptos</h2>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:3rem;">
    <div>
      <h3>📚 Conceptos Clave</h3>
      <ul>\${resumen.map(r => \`<li><span>✅</span> <span>\${r}</span></li>\`).join('\\n')}</ul>
    </div>
    <div>
      <h3>⌨️ Shortcuts Aprendidos</h3>
      <ul>\${shortcuts.map(s => \`<li><strong>\${s.k}</strong> <span>\${s.d}</span></li>\`).join('\\n')}</ul>
      <h3 style="margin-top:3rem">🔗 Bibliografía Sugerida</h3>
      <p style="color:#ccc">\${biblio.html}</p>
    </div>
  </div>
  
  <h3 style="margin-top:4rem; font-size:2rem; text-align:center; border:none">🧠 Evaluador Interactivo</h3>
  <div class="quiz-app" id="quiz-app">
    <div class="q-progress" id="q-progress">Pregunta 1 de 5</div>
    <div class="q-text" id="q-text"></div>
    <div id="q-opts"></div>
    <button class="q-next" id="q-next" onclick="nextQuestion()">Siguiente Pregunta ➔</button>
  </div>
</div>

<script>
  const qData = \${JSON.stringify(quizzes[num])};
  let curQ = 0; let score = 0;
  function renderQ() {
    if(curQ >= qData.length) {
      let p = Math.round((score / qData.length) * 100);
      let msg = p === 100 ? '¡Perfecto! Eres un maestro.' : (p >= 60 ? '¡Bien hecho! Aprobaste.' : 'Necesitas repasar la clase.');
      document.getElementById('quiz-app').innerHTML = \`<div style="text-align:center"><div style="font-size:4rem;margin-bottom:1rem">\${p>=60?'🏆':'📉'}</div><h3 style="color:#fff;font-size:2rem;margin-bottom:1rem">Tu Score: \${score} / \${qData.length} (\${p}%)</h3><p style="color:#aaa;font-size:1.2rem">\${msg}</p></div>\`;
      return;
    }
    let q = qData[curQ];
    document.getElementById('q-progress').textContent = \`Pregunta \${curQ+1} de \${qData.length}\`;
    document.getElementById('q-text').textContent = q.q;
    let optsHTML = '';
    q.opts.forEach((opt, idx) => { optsHTML += \`<button class="q-opt" onclick="checkQ(\${idx}, \${q.ans}, this)">\${opt}</button>\`; });
    document.getElementById('q-opts').innerHTML = optsHTML;
    document.getElementById('q-next').style.display = 'none';
  }
  function checkQ(sIdx, cIdx, btn) {
    const btns = document.getElementById('q-opts').querySelectorAll('.q-opt');
    btns.forEach(b => { b.disabled = true; b.style.opacity = '0.7'; });
    btn.style.opacity = '1';
    if(sIdx === cIdx) { btn.classList.add('correct'); score++; } 
    else { btn.classList.add('wrong'); btns[cIdx].classList.add('correct'); btns[cIdx].style.opacity = '1'; }
    document.getElementById('q-next').style.display = 'block';
  }
  function nextQuestion() { curQ++; renderQ(); }
  renderQ();
</script>
</body>
</html>\`;

// Generate classes
for(let i=9; i<=15; i++) {
  const d = cData[i];
  let html = commonHeader(i, d.t, d.s, d.tg);
  
  // Stubs for the interactive modules for each class
  html += \`<section>
  <div class="tag" style="background:var(--audio);color:#fff">Módulo 01</div>
  <h2>Módulo Interactivo en Desarrollo</h2>
  <p class="sub">El motor Web Audio interactivo para esta sección se implementará en la siguiente fase de desarrollo profundo. Por ahora puedes completar el test de conocimientos.</p>
  <div class="panel" style="margin-top:2rem; text-align:center; padding:4rem">
    <div style="font-size:4rem; margin-bottom:1rem">⚙️</div>
    <h3 style="color:var(--muted)">Próximamente</h3>
  </div>
</section>\`;

  html += commonFooter(i, 
    ['Los conceptos para esta clase están definidos en el temario maestro.', 'Consulta el Glosario de Audio en el menú principal para términos específicos.'],
    [{k:'Ver Anexo', d:'Checa el Anexo de Shortcuts para repasar.'}],
    {html:'<b>"Sound on Sound Magazine"</b> - Excelente fuente de técnicas de mezcla y síntesis.'}
  );
  
  fs.writeFileSync(\`es/clase-\${i<10?'0'+i:i}.html\`, html);
}

