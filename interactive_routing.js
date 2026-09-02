const fs = require('fs');
let html = fs.readFileSync('es/clase-01.html', 'utf8');

// 1. Update HTML Grid
const htmlGridStart = html.indexOf('<div class="route-grid">');
const htmlGridEnd = html.indexOf('<svg id="routeSVG"></svg>');

const newGrid = `<div class="route-grid">
      <div class="route-col">
        <div class="col-hdr">Fuentes</div>
        <div class="r-node" id="n-mic" onclick="connectNode('mic')">🎤<span>Micrófono (XLR)</span></div>
        <div class="r-node" id="n-mic-int" onclick="connectNode('mic-int')">💻<span>Mic Integrado</span></div>
        <div class="r-node" id="n-guitar" onclick="connectNode('guitar')">🎸<span>Guitarra</span></div>
        <div class="r-node" id="n-kb" onclick="connectNode('kb')">🎹<span>Teclado MIDI</span></div>
      </div>
      <div class="route-col">
        <div class="col-hdr">Interfaz (Entrada)</div>
        <div class="r-node" id="n-ext" onclick="connectNode('ext')">🎛️<span>Interfaz Externa</span></div>
        <div class="r-node" id="n-int" onclick="connectNode('int')">🖥️<span>Tarjeta Interna</span></div>
      </div>
      <div class="route-col">
        <div class="col-hdr">DAW</div>
        <div class="r-node rcore" id="n-abl" onclick="connectNode('abl')" style="cursor:pointer">💻<span>Ableton Live</span></div>
      </div>
      <div class="route-col">
        <div class="col-hdr">Interfaz (Salida)</div>
        <div class="r-node" id="n-out-ext" onclick="connectNode('out-ext')">🎛️<span>Interfaz Externa</span></div>
        <div class="r-node" id="n-out-int" onclick="connectNode('out-int')">🖥️<span>Tarjeta Interna</span></div>
      </div>
      <div class="route-col">
        <div class="col-hdr">Salida</div>
        <div class="r-node" id="n-spk" onclick="connectNode('spk')">🔊<span>Bocinas</span></div>
        <div class="r-node" id="n-head" onclick="connectNode('head')">🎧<span>Audífonos</span></div>
      </div>
    </div>\n    `;

html = html.substring(0, htmlGridStart) + newGrid + html.substring(htmlGridEnd);

// 2. Update JS Logic
const jsStart = html.indexOf('const NODE_INFO = {');
const jsEnd = html.indexOf('function clearLine(id) {');

const newJs = `const NODE_INFO = {
  'mic':     { title:'🎤 Micrófono XLR', color:'ra', text:'Señal analógica profesional. Necesita preamplificador y conversión analógica-digital.' },
  'mic-int': { title:'💻 Mic Integrado', color:'ra', text:'El micrófono integrado de tu computadora. Ya está conectado directamente a la Tarjeta Interna.' },
  'guitar':  { title:'🎸 Guitarra',  color:'ra', text:'Señal de instrumento. Conecta a una entrada "INST" de una interfaz externa.' },
  'kb':      { title:'🎹 Teclado MIDI', color:'rm', text:'¡El MIDI no es audio! Solo son datos informáticos (Notas, Velocity). Va por USB.' },
  'ext':     { title:'🎛️ Interfaz Externa (In)', color:'ra', text:'Toma la señal analógica, la amplifica y la convierte a números (Digital) para la PC.' },
  'int':     { title:'🖥️ Tarjeta Interna (In)',  color:'ra', text:'El chip de audio de tu computadora. Solo recibe el Micrófono Integrado o un puerto de micrófono de consumidor.' },
  'abl':     { title:'💻 Ableton Live', color:'rcore', text:'El cerebro central. Aquí grabas, aplicas efectos y produces.' },
  'out-ext': { title:'🎛️ Interfaz Externa (Out)', color:'ro', text:'Ableton manda números, la interfaz los convierte de regreso a electricidad (Analógico) para las bocinas.' },
  'out-int': { title:'🖥️ Tarjeta Interna (Out)', color:'ro', text:'Salida de audífonos (minijack) de tu computadora.' },
  'spk':     { title:'🔊 Bocinas',    color:'ro', text:'Monitores de estudio. Si usas Interfaz Externa, van conectados por cables TRS/XLR.' },
  'head':    { title:'🎧 Audífonos', color:'ro', text:'Monitoreo directo a tus oídos.' },
};

let activeSrc = null, activeIfaceIn = null, activeDaw = null, activeIfaceOut = null;

function connectNode(key) {
  const ac = getAC();
  const inf = NODE_INFO[key];
  const el = document.getElementById('n-' + key);
  
  document.getElementById('rInfoTitle').textContent = inf.title;
  document.getElementById('rInfoText').textContent = inf.text;
  document.getElementById('rInfo').classList.add('show');

  // CLICK EN FUENTE
  if (['mic','mic-int','guitar','kb'].includes(key)) {
    resetRouting(); // Restart if user clicks a new source
    activeSrc = key;
    el.classList.add(key==='kb' ? 'rm' : 'ra');
    beep(ac, 440, key==='kb'?'square':'sine');
    
    if (key === 'kb') {
      msg('Teclado MIDI seleccionado. ¿A dónde se conecta físicamente? (Haz clic en el siguiente paso)', 'var(--midi)');
    } else {
      msg('Fuente de audio seleccionada. ¿A qué interfaz debe conectarse?', 'var(--audio)');
    }
  } 
  
  // CLICK EN INTERFAZ DE ENTRADA
  else if (['ext','int'].includes(key)) {
    if (!activeSrc) return msg('Primero selecciona una FUENTE (Columna 1).', 'var(--danger)');
    if (activeSrc === 'kb') {
      return msg('❌ ¡Incorrecto! El Teclado MIDI manda datos por USB, no necesita una interfaz de audio. Conéctalo directo al DAW.', 'var(--danger)');
    }
    if (key === 'int' && (activeSrc === 'mic' || activeSrc === 'guitar')) {
      return msg('❌ ¡Error! Un micrófono profesional XLR o Guitarra no caben en la tarjeta interna.', 'var(--danger)');
    }
    if (key === 'ext' && activeSrc === 'mic-int') {
      return msg('❌ ¡Error! El micrófono de tu laptop no se puede conectar a una interfaz externa.', 'var(--danger)');
    }
    
    ['n-ext','n-int'].forEach(id => document.getElementById(id).classList.remove('ra'));
    activeIfaceIn = key;
    el.classList.add('ra');
    drawLine('n-'+activeSrc, 'n-'+key, 'var(--audio)', 'l-src');
    beep(ac, 523, 'sine');
    msg('¡Correcto! Señal convertida a digital. ¿A dónde va ahora?', 'var(--audio)');
  }
  
  // CLICK EN DAW (ABLETON)
  else if (key === 'abl') {
    if (!activeSrc) return msg('Comienza seleccionando una Fuente.', 'var(--danger)');
    if (activeSrc === 'kb') {
      activeDaw = key;
      el.style.borderColor = 'var(--midi)';
      drawLine('n-kb', 'n-abl', 'var(--midi)', 'l-kb');
      beep(ac, 587, 'square');
      return msg('✅ ¡Correcto! El MIDI entra directo por USB. Ahora envía la señal a una Interfaz de Salida.', 'var(--midi)');
    }
    if (!activeIfaceIn) {
      return msg('❌ Falta un paso: El audio analógico debe pasar por una Interfaz primero.', 'var(--danger)');
    }
    activeDaw = key;
    el.style.borderColor = 'var(--audio)';
    drawLine('n-'+activeIfaceIn, 'n-abl', 'var(--audio)', 'l-in');
    beep(ac, 659, 'sine');
    msg('¡Audio procesándose en Ableton! Ahora envíalo a una Interfaz de Salida.', 'var(--play)');
  }
  
  // CLICK EN INTERFAZ DE SALIDA
  else if (['out-ext','out-int'].includes(key)) {
    if (!activeDaw) return msg('Primero haz que la señal llegue a Ableton Live.', 'var(--danger)');
    
    ['n-out-ext','n-out-int'].forEach(id => document.getElementById(id).classList.remove('ro'));
    activeIfaceOut = key;
    el.classList.add('ro');
    drawLine('n-abl', 'n-'+key, 'var(--play)', 'l-out');
    document.getElementById('n-abl').style.borderColor = 'var(--text)'; // restore
    beep(ac, 783, 'triangle');
    msg('¡Señal digital convertida de regreso a analógica! Finalmente, elige Bocinas o Audífonos.', 'var(--play)');
  }
  
  // CLICK EN SALIDA FINAL
  else if (['spk','head'].includes(key)) {
    if (!activeIfaceOut) return msg('Falta pasar por la Interfaz de Salida primero.', 'var(--danger)');
    
    ['n-spk','n-head'].forEach(id => document.getElementById(id).classList.remove('ro'));
    el.classList.add('ro');
    drawLine('n-'+activeIfaceOut, 'n-'+key, 'var(--play)', 'l-spk');
    beep(ac, 880, 'triangle');
    msg('✅ ¡Ruta completada con éxito! Has dominado el ruteo de señal.', 'var(--play)');
  }
}

function resetRouting() {
  ['n-mic','n-mic-int','n-guitar','n-kb','n-ext','n-int','n-abl','n-out-ext','n-out-int','n-spk','n-head'].forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.classList.remove('ra','rm','ro');
      if(id === 'n-abl') el.style.borderColor = '';
    }
  });
  ['l-src','l-in','l-kb','l-out','l-spk'].forEach(clearLine);
  activeSrc = null; activeIfaceIn = null; activeDaw = null; activeIfaceOut = null;
  document.getElementById('rInfo').classList.remove('show');
}
\n`;

html = html.substring(0, jsStart) + newJs + html.substring(jsEnd);
fs.writeFileSync('es/clase-01.html', html);

