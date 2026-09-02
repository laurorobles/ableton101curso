const fs = require('fs');
let html = fs.readFileSync('es/clase-02.html', 'utf8');
if (html.includes('player.playbackRate = ratio;')) {
  console.log("Using player.playbackRate = ratio");
}
