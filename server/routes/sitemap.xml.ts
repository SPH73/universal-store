export default defineEventHandler(async (event) => {
  const baseUrl = getServerURL(event);

  const staticPages = ["/", "/inventory"];

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticPages.map((page) =>
      [
        "  <url>",
        `    <loc>${baseUrl}${page}</loc>`,
        `    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n")
    ),
    "</urlset>",
  ].join("\n");

  setHeader(event, "Content-Type", "application/xml");
  return sitemap;
});
