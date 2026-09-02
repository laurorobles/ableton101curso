const fs = require('fs');
let html = fs.readFileSync('/Users/babyonk1/Desktop/CLASE/index.html', 'utf8');

// Replace M2 CSS
const m2CssStart = html.indexOf('/* ── M2 TAB');
const m2CssEnd = html.indexOf('/* ── M3 Routing');
const newM2Css = `/* ── M2 TAB ── */
    #m2 { overflow: hidden; }
    .tab-outer { display: flex; flex-direction: column; align-items: center; gap: 2rem; width: 100%; max-width: 900px; margin: 0 auto; }
    .daw-window { width: 100%; background: #2c2c2e; border-radius: 12px; padding: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative; height: 350px; overflow: hidden; border: 2px solid var(--border); transition: all 0.5s ease; }
    
    .daw-header { display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 2px solid #444; padding-bottom: 0.5rem; }
    .daw-title { color: #aaa; font-weight: bold; font-size: 0.9rem; letter-spacing: 1px; }
    
    .track-headers { display: flex; gap: 10px; position: absolute; transition: all 0.5s ease; }
    .track-hdr { background: #444; color: #fff; border-radius: 4px; padding: 0.5rem; font-size: 0.8rem; font-weight: bold; display: flex; align-items: center; justify-content: center; }
    
    .clips-container { position: absolute; transition: all 0.5s ease; }
    .daw-clip { position: absolute; border-radius: 4px; display: flex; align-items: center; padding: 0.5rem; font-size: 0.85rem; font-weight: bold; color: #fff; transition: all 0.5s ease; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2); overflow: hidden; white-space: nowrap; }
    
    .daw-clip[data-track="1"] { background: #3B82F6; }
    .daw-clip[data-track="2"] { background: #EF4444; }
    .daw-clip[data-track="3"] { background: #10B981; }
    .daw-clip[data-track="4"] { background: #F59E0B; }

    /* ESTADO SESIÓN (Columnas Verticales) */
    .daw-window.state-session .track-headers { flex-direction: row; top: 3rem; left: 1rem; width: calc(100% - 2rem); height: 30px; }
    .daw-window.state-session .track-hdr { width: 22%; height: 100%; }
    .daw-window.state-session .clips-container { top: 6rem; left: 1rem; width: calc(100% - 2rem); height: calc(100% - 7rem); }
    
    .daw-window.state-session .daw-clip { width: 22%; height: 40px; }
    .daw-window.state-session .daw-clip[data-id="A"] { left: 0%; top: 0; }
    .daw-window.state-session .daw-clip[data-id="B"] { left: 0%; top: 50px; }
    .daw-window.state-session .daw-clip[data-id="C"] { left: 26%; top: 0; }
    .daw-window.state-session .daw-clip[data-id="D"] { left: 52%; top: 50px; }
    .daw-window.state-session .daw-clip[data-id="E"] { left: 78%; top: 0; }

    /* ESTADO ARREGLO (Filas Horizontales) */
    .daw-window.state-arrangement .track-headers { flex-direction: column; top: 3rem; left: 1rem; width: 100px; height: calc(100% - 4rem); }
    .daw-window.state-arrangement .track-hdr { width: 100%; height: 22%; }
    .daw-window.state-arrangement .clips-container { top: 3rem; left: 120px; width: calc(100% - 130px); height: calc(100% - 4rem); }
    
    .daw-window.state-arrangement .daw-clip { height: 22%; }
    .daw-window.state-arrangement .daw-clip[data-id="A"] { top: 0%; left: 0%; width: 30%; }
    .daw-window.state-arrangement .daw-clip[data-id="B"] { top: 0%; left: 35%; width: 40%; }
    .daw-window.state-arrangement .daw-clip[data-id="C"] { top: 26%; left: 10%; width: 50%; }
    .daw-window.state-arrangement .daw-clip[data-id="D"] { top: 52%; left: 30%; width: 60%; }
    .daw-window.state-arrangement .daw-clip[data-id="E"] { top: 78%; left: 0%; width: 20%; }

    #modeLabel{font-size:2rem;font-weight:800;color:var(--midi);transition:color .4s}
    `;
html = html.substring(0, m2CssStart) + newM2Css + html.substring(m2CssEnd);

// Replace M2 HTML
const m2HtmlStart = html.indexOf('<!-- M2: SESIÓN vs ARREGLO');
const m2HtmlEnd = html.indexOf('<!-- M3: RUTEO EXPANDIDO');
const newM2Html = `<!-- M2: SESIÓN vs ARREGLO ───────────────── -->
<section id="m2">
  <div class="tag t-midi">Módulo 02</div>
  <h2>Vista Sesión vs. Arreglo</h2>
  <p class="sub">Dos formas de organizar tus ideas en Ableton. Presiona TAB para cambiar.</p>

  <div class="tab-outer">

    <div class="daw-window state-session" id="dawWindow">
      <div class="daw-header">
        <span class="daw-title" id="dawTitle">VISTA SESIÓN</span>
        <div style="display:flex;gap:5px;">
          <div style="width:12px;height:12px;border-radius:50%;background:#FF5F56;"></div>
          <div style="width:12px;height:12px;border-radius:50%;background:#FFBD2E;"></div>
          <div style="width:12px;height:12px;border-radius:50%;background:#27C93F;"></div>
        </div>
      </div>
      
      <div class="track-headers">
        <div class="track-hdr">1 Drums</div>
        <div class="track-hdr">2 Bass</div>
        <div class="track-hdr">3 Synth</div>
        <div class="track-hdr">4 Vox</div>
      </div>

      <div class="clips-container">
        <div class="daw-clip" data-track="1" data-id="A">▶ Intro Beat</div>
        <div class="daw-clip" data-track="1" data-id="B">▶ Main Beat</div>
        <div class="daw-clip" data-track="2" data-id="C">▶ Sub Bass</div>
        <div class="daw-clip" data-track="3" data-id="D">▶ Arp</div>
        <div class="daw-clip" data-track="4" data-id="E">▶ "Yeah"</div>
      </div>
    </div>

    <div id="modeLabel">🟠 Vista de Sesión (Columnas)</div>

    <button class="btn btn-dark" id="tabBtn" onclick="pressTab()"
            style="font-size:1.8rem;padding:1.2rem 3.5rem">
      [ TAB ] Cambiar Vista
    </button>

    <div class="split" style="gap:1.5rem;max-width:900px">
      <div class="analogy" style="border-left-color:#9CA3AF">
        <strong>🟠 Sesión = Los Post-its.</strong><br>
        Lluvia de ideas. Las pistas son <strong>columnas</strong>. Pegas loops y pruebas combinaciones sin importar el orden temporal.
      </div>
      <div class="analogy" style="border-left-color:var(--play)">
        <strong>🟢 Arreglo = El Ensayo Final.</strong><br>
        Organizas en el tiempo (de izq a der). Las pistas son <strong>filas</strong>. Creas la estructura: Intro → Verso → Coro.
      </div>
    </div>

  </div>
</section>

`;
html = html.substring(0, m2HtmlStart) + newM2Html + html.substring(m2HtmlEnd);

// Replace JS for M2
const m2JsStart = html.indexOf('/* ── M2 — TAB');
const m2JsEnd = html.indexOf('/* ── M3 — RUTEO');
const newM2Js = `/* ═══════════════════════════════════════════════════
   M2 — TAB: Sesión vs Arreglo
═══════════════════════════════════════════════════ */
let tabMode = false;
function pressTab() {
  tabMode = !tabMode;
  const daw  = document.getElementById('dawWindow');
  const lbl  = document.getElementById('modeLabel');
  const btn  = document.getElementById('tabBtn');
  const tit  = document.getElementById('dawTitle');

  if (tabMode) {
    daw.classList.remove('state-session');
    daw.classList.add('state-arrangement');
    lbl.textContent = '🟢 Vista de Arreglo (Línea de tiempo)';
    lbl.style.color = 'var(--play)';
    btn.textContent = '[ TAB ] Volver a Sesión';
    tit.textContent = 'VISTA ARREGLO';
  } else {
    daw.classList.remove('state-arrangement');
    daw.classList.add('state-session');
    lbl.textContent = '🟠 Vista de Sesión (Columnas)';
    lbl.style.color = 'var(--midi)';
    btn.textContent = '[ TAB ] Cambiar Vista';
    tit.textContent = 'VISTA SESIÓN';
  }
}

`;
html = html.substring(0, m2JsStart) + newM2Js + html.substring(m2JsEnd);

fs.writeFileSync('/Users/babyonk1/Desktop/CLASE/index.html', html);
