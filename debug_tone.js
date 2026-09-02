const fs = require('fs');
// Let's just create a dummy decodeAudioData
const amen = fs.readFileSync('assets/amen.js', 'utf8');
eval(amen);
const base64 = window.amenBase64;
const binary_string = Buffer.from(base64, 'base64').toString('binary');
console.log("binary len:", binary_string.length);
