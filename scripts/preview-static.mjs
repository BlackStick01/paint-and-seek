import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] || 'out');
const port = Number(process.argv[3] || 3006);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0] || '/');
  const safePath = normalize(cleanPath).replace(/^(\.\.[/\\])+/, '');
  const direct = resolve(root, `.${safePath}`);
  if (!direct.startsWith(root)) return null;

  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  if (existsSync(direct) && statSync(direct).isDirectory()) {
    const indexFile = join(direct, 'index.html');
    if (existsSync(indexFile)) return indexFile;
  }

  const htmlFile = `${direct}.html`;
  if (existsSync(htmlFile)) return htmlFile;
  return null;
}

createServer((request, response) => {
  const file = resolveFile(request.url || '/');
  if (!file) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});
