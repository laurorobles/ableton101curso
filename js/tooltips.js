
// Motor global de Tooltips (Actualizado)
const glossary = {
  "DAW": "Digital Audio Workstation. Software para grabar, editar y mezclar música (ej. Ableton Live).",
  "MIDI": "Musical Instrument Digital Interface. Protocolo de datos que transmite notas y control, no audio.",
  "BPM": "Beats Per Minute. Mide el tempo o velocidad de la canción.",
  "Warping": "Algoritmo de Ableton para estirar o comprimir audio en el tiempo sin cambiar su tono.",
  "Gain Staging": "Ajustar niveles de volumen en cada etapa para evitar distorsión y mantener claridad.",
  "Headroom": "Espacio de seguridad entre el pico más alto de tu audio y el límite de distorsión (0 dBFS).",
  "Clipping": "Distorsión digital que ocurre cuando el audio supera los 0 dBFS.",
  "EQ": "Ecualizador. Herramienta para subir o bajar frecuencias específicas (Graves, Medios, Agudos).",
  "Compresor": "Reduce el rango dinámico, bajando el volumen de los picos más altos automáticamente.",
  "Threshold": "Umbral. El nivel a partir del cual un compresor empieza a actuar.",
  "Ratio": "Proporción de compresión. Cuánto se reduce la señal que supera el Threshold.",
  "Sidechain": "Técnica donde el volumen de una pista es controlado por otra (ej. el bajo baja cuando suena el bombo).",
  "Reverb": "Efecto que simula el espacio acústico (eco de un cuarto o cueva).",
  "Delay": "Efecto de eco que repite la señal con un retardo de tiempo.",
  "ADSR": "Attack, Decay, Sustain, Release. Las 4 fases de la envolvente de un sonido.",
  "LFO": "Low Frequency Oscillator. Oscilador inaudible usado para mover parámetros (Vibrato, Tremolo).",
  "Filtro LP": "Low Pass Filter. Deja pasar los graves y corta los agudos.",
  "Filtro HP": "High Pass Filter. Deja pasar los agudos y corta los graves.",
  "Resonancia": "Énfasis o pico de volumen en la frecuencia de corte de un filtro.",
  "Wavetable": "Tabla de ondas. Síntesis que usa grabaciones tridimensionales interpolables.",
  "FM": "Frecuencia Modulada. Un oscilador altera la frecuencia de otro a alta velocidad creando timbres metálicos.",
  "LUFS": "Loudness Units relative to Full Scale. Mide el volumen percibido humano a lo largo del tiempo.",
  "True Peak": "El nivel máximo real que alcanzará la onda al convertirse a señal analógica.",
  "Dithering": "Ruido de bajo nivel añadido al exportar a menor resolución para evitar errores de cuantización."
};

document.addEventListener('DOMContentLoaded', () => {
    // Para no romper etiquetas HTML, solo procesamos nodos de texto.
    // Una implementación simple para este entorno:
    // Creamos el contenedor del tooltip
    const tooltipDiv = document.createElement('div');
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.background = '#111';
    tooltipDiv.style.color = '#fff';
    tooltipDiv.style.padding = '0.8rem 1rem';
    tooltipDiv.style.borderRadius = '8px';
    tooltipDiv.style.fontSize = '0.9rem';
    tooltipDiv.style.pointerEvents = 'none';
    tooltipDiv.style.opacity = '0';
    tooltipDiv.style.transition = 'opacity 0.2s';
    tooltipDiv.style.zIndex = '10000';
    tooltipDiv.style.maxWidth = '250px';
    tooltipDiv.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    tooltipDiv.style.border = '1px solid #333';
    document.body.appendChild(tooltipDiv);

    // Encuentra spans con clase 'tt' y les da vida
    document.querySelectorAll('.tt').forEach(el => {
        const term = el.getAttribute('data-term') || el.innerText;
        el.style.textDecoration = 'underline dotted var(--audio)';
        el.style.cursor = 'help';
        el.style.fontWeight = 'bold';
        
        el.addEventListener('mouseenter', (e) => {
            // Find matched term, case insensitive key search
            const matchKey = Object.keys(glossary).find(k => k.toLowerCase() === term.toLowerCase());
            if(matchKey) {
                tooltipDiv.innerHTML = '<strong>' + matchKey + '</strong><br>' + glossary[matchKey];
                const rect = el.getBoundingClientRect();
                tooltipDiv.style.left = (rect.left + window.scrollX) + 'px';
                tooltipDiv.style.top = (rect.bottom + window.scrollY + 10) + 'px';
                tooltipDiv.style.opacity = '1';
            }
        });
        el.addEventListener('mouseleave', () => {
            tooltipDiv.style.opacity = '0';
        });
    });
});
