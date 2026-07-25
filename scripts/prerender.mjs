import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const dataFile = path.resolve(rootDir, 'src/data/blogPosts.ts');

async function run() {
  console.log('Starting Prerendering process...');
  
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Please run npm run build first.');
    process.exit(1);
  }

  // 1. Extract slugs from blogPosts.ts using regex to avoid ts-node
  const dataContent = fs.readFileSync(dataFile, 'utf-8');
  const slugRegex = /slug:\s*'([^']+)'/g;
  let match;
  const slugs = [];
  while ((match = slugRegex.exec(dataContent)) !== null) {
    slugs.push(match[1]);
  }

  const routes = ['/', '/blog', ...slugs.map(slug => `/blog/${slug}`)];
  console.log(`Found ${routes.length} routes to prerender.`);

  // 2. Start Express server to serve the dist folder
  const app = express();
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });

  const server = app.listen(3001, async () => {
    console.log('Express server listening on port 3001');

    // 3. Launch Puppeteer
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (const route of routes) {
      console.log(`Prerendering ${route} ...`);
      await page.goto(`http://localhost:3001${route}`, { waitUntil: 'networkidle0' });
      
      // Get the full HTML
      let html = await page.evaluate(() => document.documentElement.outerHTML);
      html = `<!DOCTYPE html>\n<html lang="pt-BR">\n${html}\n</html>`;

      // 4. Save HTML to dist folder
      const routeDir = path.join(distDir, route);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    }

    console.log('Closing browser and server...');
    await browser.close();
    server.close();

    // 5. Auto-generate sitemap.xml
    console.log('Generating dynamic sitemap.xml...');
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://conectaone.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://conectaone.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${slugs.map(slug => `  <url>
    <loc>https://conectaone.com/blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;
    
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    // Also update the public folder so it's kept in source control
    fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemapContent);

    console.log('Prerendering and Sitemap complete! ✅');
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
