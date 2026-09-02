const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');

// Remove the top duplicates by stripping everything from M3 start to Tone.js nodes
const replaceRegex = /let ac = null;[\s\S]*?let player = null;/m;
html = html.replace(replaceRegex, `let player = null;`);

fs.writeFileSync('es/clase-02.html', html);
