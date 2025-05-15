// controllers/sitemapController.js
const baseUrl = "https://friendzone-k3i3.onrender.com";

const sitemapController = async (req, res) => {
  const urls = [
    "",
    "login",
    "signup",
    "inbox",
    "profile",
    "/posts",
    // Add dynamic routes or read from DB if needed
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}/${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemapXml);
};

module.exports = sitemapController;
