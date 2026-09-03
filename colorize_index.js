const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const colors = [
  '#607D8B', // C1
  '#FFBC00', // C2 Yellow
  '#0055FF', // C3 Blue
  '#9C27B0', // C4 Purple
  '#009688', // C5 Teal
  '#FF9800', // C6 Orange
  '#F44336', // C7 Red
  '#4CAF50', // C8 Green
  '#E91E63', // C9 Pink
  '#3F51B5', // C10 Indigo
  '#00BCD4', // C11 Cyan
  '#CDDC39', // C12 Lime (text black)
  '#FFC107', // C13 Amber (text black)
  '#FF5722', // C14 DeepOrange
  '#D4AF37'  // C15 Gold (text black)
];

for(let i=1; i<=15; i++) {
  const c = colors[i-1];
  const textColor = (c === '#FFBC00' || c === '#CDDC39' || c === '#FFC107') ? '#000' : '#fff';
  const tagRegex = new RegExp(\`<div class="tag"(\[^>\]*)>Clase \${i}</div>\`);
  
  html = html.replace(tagRegex, \`<div class="tag" style="background:\${c}; color:\${textColor}">Clase \${i}</div>\`);
}

fs.writeFileSync('index.html', html);
