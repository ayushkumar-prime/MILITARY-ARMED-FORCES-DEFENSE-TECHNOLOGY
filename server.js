import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const allowed=new Set(['index.html','style.css','app.js','algorithms.js','sw.js','icon.svg','manifest.webmanifest']);
http.createServer(async(req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';if(!allowed.has(name)){res.writeHead(404);res.end('Not found');return;}const data=await readFile(path.join(root,name));res.writeHead(200,{'Content-Type':(mime[path.extname(name)]||'text/plain')+'; charset=utf-8','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(500);res.end('Unable to serve asset');}}).listen(4173,'127.0.0.1',()=>console.log('KAVACH preview: http://127.0.0.1:4173'));
