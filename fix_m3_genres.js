const fs = require('fs');
let html = fs.readFileSync('es/clase-03.html', 'utf8');

const regex = /<div class="structure">[\s\S]*?<\/div>\s*<div class="analogy"/m;

const newM3 = `<div style="margin-bottom: 1.5rem;">
      <label for="genre-select" style="font-weight:bold; color:var(--muted); font-size:1.2rem;">Elige un Género Musical:</label>
      <select id="genre-select" onchange="changeGenre(this.value)" style="margin-left:1rem; padding:0.5rem; font-size:1.2rem; border-radius:8px; border:2px solid var(--border);">
        <option value="pop">Pop Clásico</option>
        <option value="edm">EDM / Mainstage</option>
        <option value="techno">Techno / Underground</option>
        <option value="hiphop">Hip-Hop / Trap</option>
      </select>
    </div>

    <div class="structure" id="structure-viz">
      <!-- Inyectado por JS -->
    </div>
    
    <div class="analogy"`;

html = html.replace(regex, newM3);

const jsRegex = /<\/script>/m;
const genreJS = `
  // M3: Estructuras por Género
  const genres = {
    pop: {
      blocks: [
        {name: "Intro", class: "b-intro", flex: 1, text: "Presenta la vibra, usualmente 4 u 8 compases."},
        {name: "Verso 1", class: "b-verso", flex: 2, text: "Desarrolla la historia, entra la voz."},
        {name: "Pre-Coro", class: "b-puente", flex: 1, text: "Crea tensión y prepara el terreno."},
        {name: "Coro", class: "b-coro", flex: 2, text: "El clímax pegadizo y memorable."},
        {name: "Verso 2", class: "b-verso", flex: 2, text: "Mantiene el ritmo pero baja la energía."},
        {name: "Coro", class: "b-coro", flex: 2, text: "Regresa la energía principal."},
        {name: "Puente", class: "b-puente", flex: 1, text: "Cambio total de acordes o ritmo para no aburrir."},
        {name: "Coro Final", class: "b-coro", flex: 3, text: "Explosión final, a veces con más elementos."}
      ]
    },
    edm: {
      blocks: [
        {name: "Intro (DJ)", class: "b-intro", flex: 2, text: "Intro rítmico para que el DJ mezcle (16 compases)."},
        {name: "Breakdown", class: "b-verso", flex: 2, text: "Se quitan los bajos, entran acordes épicos y voces."},
        {name: "Build-Up", class: "b-puente", flex: 1, text: "Risers, tarolas acelerando (snare roll), muchísima tensión."},
        {name: "DROP", class: "b-coro", flex: 2, text: "Estalla el bajo y el sintetizador principal."},
        {name: "Break 2", class: "b-verso", flex: 2, text: "Respiro antes del segundo asalto."},
        {name: "Build-Up", class: "b-puente", flex: 1, text: "Tensión de nuevo."},
        {name: "DROP 2", class: "b-coro", flex: 2, text: "Segundo clímax, a veces más intenso."},
        {name: "Outro", class: "b-intro", flex: 2, text: "Solo ritmo para que el DJ salga mezclando."}
      ]
    },
    techno: {
      blocks: [
        {name: "Intro / Groove", class: "b-intro", flex: 3, text: "Bombo, bajos y percusiones hipnóticas que evolucionan muy lento."},
        {name: "Desarrollo", class: "b-verso", flex: 3, text: "Se agregan elementos sutiles (hats, ruidos, texturas)."},
        {name: "Break", class: "b-puente", flex: 1, text: "Se quita el bombo abruptamente. Atmósferas tensas."},
        {name: "DROP", class: "b-coro", flex: 4, text: "Regresa el bombo con máxima intensidad (Peak time)."},
        {name: "Desvanecimiento", class: "b-intro", flex: 3, text: "Los elementos se apagan gradualmente."}
      ]
    },
    hiphop: {
      blocks: [
        {name: "Intro", class: "b-intro", flex: 1, text: "Establece el beat y el sample principal (4 compases)."},
        {name: "Coro (Hook)", class: "b-coro", flex: 2, text: "El estribillo pegadizo, a menudo vocal o un sample vocal."},
        {name: "Verso 1", class: "b-verso", flex: 3, text: "Barras del rapero. El beat se simplifica para dejar espacio a la voz."},
        {name: "Coro", class: "b-coro", flex: 2, text: "Regresa el estribillo con toda la percusión."},
        {name: "Verso 2", class: "b-verso", flex: 3, text: "Segunda intervención vocal."},
        {name: "Coro", class: "b-coro", flex: 2, text: "Gancho final."},
        {name: "Outro", class: "b-intro", flex: 1, text: "El beat se desvanece (Fade out)."}
      ]
    }
  };

  function changeGenre(genre) {
    const container = document.getElementById('structure-viz');
    container.innerHTML = '';
    genres[genre].blocks.forEach(b => {
      const el = document.createElement('div');
      el.className = 'block ' + b.class;
      el.style.flex = b.flex;
      el.style.cursor = 'pointer';
      el.textContent = b.name;
      // Add custom color overrides for better contrast based on style if needed
      if(b.class==='b-intro') el.style.background = '#64748B';
      if(b.class==='b-verso') el.style.background = '#3B82F6';
      if(b.class==='b-coro') el.style.background = '#EF4444';
      if(b.class==='b-puente') el.style.background = '#F59E0B';
      
      el.onclick = () => msg('<b>' + b.name + ':</b> ' + b.text, el.style.background, '#fff');
      container.appendChild(el);
    });
    msg('Estructura cambiada a: ' + document.getElementById('genre-select').options[document.getElementById('genre-select').selectedIndex].text, 'var(--cc)');
  }
  
  // Init genre
  window.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('genre-select')) changeGenre('pop');
  });
</script>`;

html = html.replace(jsRegex, genreJS);
fs.writeFileSync('es/clase-03.html', html);
