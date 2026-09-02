const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

const regex = /async function initTone\(\) \{[\s\S]*?return !!player;\n  \}/m;

const newInitTone = `  function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async function initTone() {
    await Tone.start();
    if (!player && window.amenBase64) {
      return new Promise((resolve) => {
        try {
          const arrayBuf = base64ToArrayBuffer(window.amenBase64.replace(/^data:audio\\/wav;base64,/, ''));
          Tone.context.decodeAudioData(arrayBuf).then(buffer => {
            player = new Tone.Player(buffer);
            player.loop = true;
            
            pitchShift = new Tone.PitchShift(0);
            tremolo = new Tone.Tremolo(9, 0).start();
            tremolo.depth.value = 0; // Initialize at 0
            
            player.chain(tremolo, pitchShift, Tone.Destination);
            document.getElementById('audio-status').style.display = 'none';
            resolve(true);
          }).catch(e => {
            console.error("Decode error", e);
            resolve(false);
          });
        } catch (e) {
          console.error("Base64 error", e);
          resolve(false);
        }
      });
    }
    return !!player;
  }`;

html = html.replace(regex, newInitTone);
fs.writeFileSync('es/clase-02.html', html);
