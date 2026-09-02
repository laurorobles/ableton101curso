const fs = require('fs');
let html = fs.readFileSync('/Users/babyonk1/Desktop/CLASE/index.html', 'utf8');

const oldSynthHtml = `<strong style="color:#FF0055">Ejemplos Clave (Haz clic):</strong><br><br>
        <a href="javascript:void(0)" onclick="showImg('moog')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Moog Minimoog (Bajos clásicos)</a>
        <div id="imgMoog" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Minimoog_Model_D.jpg" style="width:100%;border-radius:8px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('juno')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland Juno-106 (Acordes / Pads)</a>
        <div id="imgJuno" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Roland_Juno-106_synthesizer.jpg/800px-Roland_Juno-106_synthesizer.jpg" style="width:100%;border-radius:8px;"></div>`;

const newSynthHtml = `<strong style="color:#FF0055">Ejemplos Clave (Haz clic):</strong><br><br>
        <a href="javascript:void(0)" onclick="showImg('moog')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Moog Minimoog (Bajos clásicos)</a>
        <div id="imgMoog" style="display:none;margin-top:10px"><img src="minimoog.jpg" style="width:100%;border-radius:8px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('ms20')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Korg MS-20 (Sonido agresivo y modular)</a>
        <div id="imgMs20" style="display:none;margin-top:10px"><img src="ms20.jpg" style="width:100%;border-radius:8px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('dx7')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Yamaha DX7 (Síntesis FM de los 80s)</a>
        <div id="imgDx7" style="display:none;margin-top:10px"><img src="dx7.jpg" style="width:100%;border-radius:8px;"></div>`;

const oldDrumHtml = `<strong style="color:#0055FF">Ejemplos Clave (Haz clic):</strong><br><br>
        <a href="javascript:void(0)" onclick="showImg('tr808')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland TR-808 (Trap / HipHop)</a>
        <div id="img808" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Roland_TR-808.png/800px-Roland_TR-808.png" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('tr909')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland TR-909 (Techno / House)</a>
        <div id="img909" style="display:none;margin-top:10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Roland_TR-909_drum_machine.jpg/800px-Roland_TR-909_drum_machine.jpg" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>`;

const newDrumHtml = `<strong style="color:#0055FF">Ejemplos Clave (Haz clic):</strong><br><br>
        <a href="javascript:void(0)" onclick="showImg('tr808')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Roland TR-808 (Trap / Reggaeton)</a>
        <div id="img808" style="display:none;margin-top:10px"><img src="tr808.jpg" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('mpc')" style="color:var(--text);font-weight:bold;text-decoration:none;">• Akai MPC2000 (Sampleo / Hip Hop Clásico)</a>
        <div id="imgMpc" style="display:none;margin-top:10px"><img src="mpc.jpg" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>
        <br><br>
        <a href="javascript:void(0)" onclick="showImg('linndrum')" style="color:var(--text);font-weight:bold;text-decoration:none;">• LinnDrum (Pop / Synthwave 80s)</a>
        <div id="imgLinndrum" style="display:none;margin-top:10px"><img src="linndrum.jpg" style="width:100%;border-radius:8px;background:#fff;padding:10px;"></div>`;

html = html.replace(oldSynthHtml, newSynthHtml);
html = html.replace(oldDrumHtml, newDrumHtml);

const oldShowImg = `const map = {moog: 'imgMoog', juno: 'imgJuno', tr808: 'img808', tr909: 'img909'};`;
const newShowImg = `const map = {moog: 'imgMoog', ms20: 'imgMs20', dx7: 'imgDx7', tr808: 'img808', mpc: 'imgMpc', linndrum: 'imgLinndrum'};`;
html = html.replace(oldShowImg, newShowImg);

fs.writeFileSync('/Users/babyonk1/Desktop/CLASE/index.html', html);
