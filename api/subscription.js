// api/subscription.js
export default async function handler(req, res) {
  // Ваша ссылка на GitHub
  const GITHUB_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted';

  try {
    // Используем динамический импорт для node-fetch
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(GITHUB_URL);
    const body = await response.text();

    // Устанавливаем заголовки, как и в Workers
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Subscription-Userinfo', 'upload=0; download=0; total=0; expire=0');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Content-Disposition', 'attachment; filename="🚀 all_subs"');

    res.status(200).send(body);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).send(`Worker error: ${error.message}`);
  }
}