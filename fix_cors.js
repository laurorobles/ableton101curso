const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

// Insert the script tag
html = html.replace('</head>', '  <script src="../assets/amen.js" onerror="window.amenBase64 = null;"></script>\n</head>');

// Replace loadAmen
const oldLoadAmen = `  async function loadAmen() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '../assets/amen.wav', true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
        if(xhr.status === 200 || xhr.status === 0) {
          getAC().decodeAudioData(xhr.response, function(decoded) {
            amenBuffer = decoded;
            document.getElementById('audio-status').style.display = 'none';
            resolve(true);
          }, function() { resolve(false); });
        } else { resolve(false); }
      };
      xhr.onerror = function() { resolve(false); };
      xhr.send();
    });
  }`;

const newLoadAmen = `  function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async function loadAmen() {
    return new Promise((resolve) => {
      if (window.amenBase64) {
        // Fallback mágico: Base64 (ignora reglas CORS de Chrome local)
        const arrayBuf = base64ToArrayBuffer(window.amenBase64);
        getAC().decodeAudioData(arrayBuf, function(decoded) {
          amenBuffer = decoded;
          document.getElementById('audio-status').style.display = 'none';
          resolve(true);
        }, function() { resolve(false); });
      } else {
        // Intento XHR normal
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../assets/amen.wav', true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          if(xhr.status === 200 || xhr.status === 0) {
            getAC().decodeAudioData(xhr.response, function(decoded) {
              amenBuffer = decoded;
              document.getElementById('audio-status').style.display = 'none';
              resolve(true);
            }, function() { resolve(false); });
          } else { resolve(false); }
        };
        xhr.onerror = function() { resolve(false); };
        xhr.send();
      }
    });
  }`;

html = html.replace(oldLoadAmen, newLoadAmen);
fs.writeFileSync('es/clase-02.html', html);
