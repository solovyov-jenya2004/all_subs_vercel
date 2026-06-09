export default async function handler(req, res) {
  const GITHUB_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted';
  try {
    const response = await fetch(GITHUB_URL);
    if (!response.ok) {
      res.status(502).send(`GitHub error: ${response.status}`);
      return;
    }
    const body = await response.text();

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Disposition', "inline; filename=\"all_subs\"; filename*=UTF-8''%F0%9F%9A%80%20all_subs");
    res.setHeader('profile-title', 'UTF-8''%F0%9F%9A%80%20all_subs"');
    res.setHeader('announce', `UTF-8''%E2%9A%A1%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B2%20%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F%D1%85%20%C2%AB%D0%B1%D0%B5%D0%BB%D1%8B%D1%85%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%C2%BB`);
    res.setHeader('profile-web-page-url', 'https://github.com/solovyov-jenya2004/all_subs');
    res.setHeader('support-url', 'https://github.com/solovyov-jenya2004/all_subs/issues');
    res.setHeader('profile-update-interval', '1');
    res.setHeader('subscription-userinfo', 'upload=0; download=0; total=0');

    res.status(200).send(body);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).send(`Worker error: ${error.message}`);
  }
}
