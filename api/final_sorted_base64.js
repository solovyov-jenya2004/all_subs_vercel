export default async function handler(req, res) {
  const BASE64_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted_base64';

  try {
    const response = await fetch(BASE64_URL);
    if (!response.ok) {
      return res.status(502).send(`GitHub error: ${response.status}`);
    }

    const body = await response.text();

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Subscription-Userinfo', 'upload=0; download=0; total=0');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');   // <-- без кэша
    res.setHeader('Content-Disposition',
      "inline; filename=\"all_subs\"; filename*=UTF-8''%F0%9F%9A%80%20all_subs"
    );

    res.status(200).send(body);
  } catch (error) {
    res.status(500).send(`Worker error: ${error.message}`);
  }
}
