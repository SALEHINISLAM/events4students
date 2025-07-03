export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://www.event4student.com/';
  const pages = ['/', '/create-event','/update-event'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
}