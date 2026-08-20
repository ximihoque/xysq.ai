// Zero-dependency static server with live-reload (SSE).
// Serves this folder, injects a reload snippet into HTML, watches for changes.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';

const ROOT = import.meta.dirname;
const PORT = process.env.PORT || 8000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const RELOAD_SNIPPET = `
<script>
  (function () {
    const es = new EventSource('/__livereload');
    es.onmessage = () => location.reload();
    es.onerror = () => { es.close(); setTimeout(() => location.reload(), 1000); };
  })();
</script>`;

const clients = new Set();

function broadcastReload() {
  for (const res of clients) res.write('data: reload\n\n');
}

// Debounce filesystem events so one save = one reload.
let timer = null;
watch(ROOT, { recursive: true }, (_event, filename) => {
  if (filename && filename.startsWith('.devserver')) return; // ignore self
  clearTimeout(timer);
  timer = setTimeout(broadcastReload, 80);
});

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);

  if (url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // Resolve path safely, default to directory index / listing.
  let relPath = normalize(url).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(ROOT, relPath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  try {
    let info = await stat(filePath);
    if (info.isDirectory()) {
      const indexPath = join(filePath, 'index.html');
      try {
        await stat(indexPath);
        filePath = indexPath;
        info = await stat(filePath);
      } catch {
        return sendListing(res, filePath, url);
      }
    }

    const ext = extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    if (ext === '.html') {
      let html = await readFile(filePath, 'utf8');
      html = html.includes('</body>')
        ? html.replace('</body>', RELOAD_SNIPPET + '\n</body>')
        : html + RELOAD_SNIPPET;
      res.writeHead(200, { 'Content-Type': type });
      return res.end(html);
    }

    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': type });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1>' + RELOAD_SNIPPET);
  }
});

async function sendListing(res, dirPath, urlPath) {
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir(dirPath, { withFileTypes: true });
  const base = urlPath.endsWith('/') ? urlPath : urlPath + '/';
  const links = entries
    .filter((e) => !e.name.startsWith('.'))
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name))
    .map((e) => {
      const name = e.name + (e.isDirectory() ? '/' : '');
      return `<li><a href="${base}${encodeURIComponent(e.name)}${e.isDirectory() ? '/' : ''}">${name}</a></li>`;
    })
    .join('\n');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><meta charset="utf-8"><title>Index of ${urlPath}</title>
<body style="font-family:system-ui;padding:32px"><h1>Index of ${urlPath}</h1><ul>${links}</ul>${RELOAD_SNIPPET}</body>`);
}

server.listen(PORT, () => {
  console.log(`Live-reload server running at http://localhost:${PORT}/`);
  console.log(`Watching ${ROOT} for changes.`);
});
