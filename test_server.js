const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath == './') filePath = './index.html';
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png' };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) { res.writeHead(500); res.end('Error: ' + error.code); }
    else { res.writeHead(200, { 'Content-Type': contentType }); res.end(content, 'utf-8'); }
  });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
