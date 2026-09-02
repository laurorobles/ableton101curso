const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

html = html.replace('let player = null;', `let isPlaying = false;
  let baseTempo = 120;
  let player = null;`);

fs.writeFileSync('es/clase-02.html', html);
