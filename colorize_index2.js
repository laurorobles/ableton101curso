const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const colors = [
  '#607D8B', '#FFBC00', '#0055FF', '#9C27B0', '#009688', 
  '#FF9800', '#F44336', '#4CAF50', '#E91E63', '#3F51B5', 
  '#00BCD4', '#CDDC39', '#FFC107', '#FF5722', '#D4AF37'
];

for(let i=1; i<=15; i++) {
  const c = colors[i-1];
  const tColor = (c === '#FFBC00' || c === '#CDDC39' || c === '#FFC107') ? '#000' : '#fff';
  
  // Find "<a href="es/clase-0X.html" ... > ... <div class="tag" ... >Clase X</div>"
  // Actually, let's just do a direct replace for each class tag.
  // The tags currently look like `<div class="tag">Clase X</div>` or with a style attribute.
  
  // A safer way: parse line by line
  let lines = html.split('\n');
  let inClass = false;
  let targetClass = 0;
  
  for(let j=0; j<lines.length; j++) {
    if(lines[j].includes('class-card') && lines[j].includes('es/clase-')) {
      const match = lines[j].match(/es\/clase-(\d+)\.html/);
      if(match) targetClass = parseInt(match[1]);
    }
    
    if(targetClass > 0 && lines[j].includes('Clase ' + targetClass)) {
      if(lines[j].includes('class="tag"')) {
        let replacement = \`<div class="tag" style="background:\${colors[targetClass-1]}; color:\${tColor}">Clase \${targetClass}</div>\`;
        lines[j] = lines[j].replace(/<div class="tag".*?>Clase \d+<\/div>/, replacement);
        targetClass = 0; // reset
      }
    }
  }
  html = lines.join('\n');
}

fs.writeFileSync('index.html', html);
