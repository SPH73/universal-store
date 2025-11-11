export default defineEventHandler(async (event) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    `Sitemap: ${getRequestURL(event)}/sitemap.xml`,
  ].join("\n");

  setHeader(event, "Content-Type", "text/plain");
  return robotsTxt;
});
