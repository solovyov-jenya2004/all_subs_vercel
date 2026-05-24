// api/random.js
// Возвращает случайные конфиги (по умолчанию 100, параметр ?n=...)
// Оригинальные #-заголовки сохраняются, конфиги не перемешиваются с ними.

const fs = require('fs');
const path = require('path');

// Перемешивание Фишера-Йетса
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default async function handler(req, res) {
  try {
    // final_sorted лежит в корне репозитория, на уровень выше api/
    const filePath = path.resolve(process.cwd(), 'final_sorted');
    if (!fs.existsSync(filePath)) {
      res.status(500).send('# final_sorted не найден\n');
      return;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const lines = raw.split('\n');

    // Отделяем заголовки (строки, начинающиеся с #) и прокси-строки
    const headers = [];
    const proxies = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        headers.push(trimmed);
      } else if (trimmed.length > 0) {
        proxies.push(trimmed);
      }
    }

    // Если вообще нет прокси – возвращаем только заголовки
    if (proxies.length === 0) {
      res.status(200).send(headers.join('\n') + '\n');
      return;
    }

    // Сколько конфигов запрошено (n >= 1, по умолчанию 100)
    let n = parseInt(req.query.n, 10);
    if (isNaN(n) || n < 1) n = 100;
    n = Math.min(n, proxies.length);

    // Случайная выборка
    const shuffled = shuffle([...proxies]);
    const selected = shuffled.slice(0, n);

    // Собираем ответ: сначала заголовки, потом пустая строка, потом выбранные конфиги
    const responseLines = [...headers, '', ...selected];
    const body = responseLines.join('\n');

    // HTTP-заголовки для клиентов, умеющих читать метаданные (Happ, Teapod Stream и др.)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Disposition', 'inline; filename="random_sub.txt"');
    // Без эмодзи для совместимости с RFC 7230
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
