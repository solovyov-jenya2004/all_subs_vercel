const https = require('https');

const CONFIG_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted';

async function fetchConfigLines() {
  const data = await new Promise((resolve, reject) => {
    https.get(CONFIG_URL, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
  return data.split('\n').map(l => l.trim());
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default async function handler(req, res) {
  try {
    const lines = await fetchConfigLines();
    const headers = [];
    const proxies = [];
    for (const line of lines) {
      if (line.startsWith('#')) headers.push(line);
      else if (line.length > 0) proxies.push(line);
    }

    if (proxies.length === 0) {
      res.status(200).send(headers.join('\n') + '\n');
      return;
    }

    let n = parseInt(req.query.n, 10);
    if (isNaN(n) || n < 1) n = 100;
    n = Math.min(n, proxies.length);

    const shuffled = shuffle([...proxies]);
    const selected = shuffled.slice(0, n);

    const responseLines = [...headers, '', ...selected];
    const body = responseLines.join('\n');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Disposition', 'inline; filename="random_sub.txt"');
    res.setHeader('profile-title', 'all_subs (random)');
    res.setHeader('announce', 'Random subscription from the pool');
    res.setHeader('profile-web-page-url', 'https://github.com/solovyov-jenya2004/all_subs');
    res.setHeader('support-url', 'https://github.com/solovyov-jenya2004/all_subs/issues');
    res.setHeader('profile-update-interval', '1');
    res.setHeader('subscription-userinfo', 'upload=0; download=0; total=0');

    res.status(200).send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send('# Server error\n');
  }
}
