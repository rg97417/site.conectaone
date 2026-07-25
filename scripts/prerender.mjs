import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const dataFile = path.resolve(rootDir, 'src/data/blogPosts.ts');
const tempDir = path.resolve(__dirname, 'temp');

async function run() {
  console.log('Starting Native SSG Prerendering process...');
  
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Please run npm run build first.');
    process.exit(1);
  }

  // 1. Compile blogPosts.ts to JS so we can import it
  console.log('Extracting blog data...');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  execSync(`npx tsc ${dataFile} --outDir ${tempDir} --esModuleInterop --module Node16`);
  
  // Import the compiled JS file
  const compiledFile = path.join(tempDir, 'blogPosts.js');
  const { blogPosts } = await import(`file://${compiledFile}`);

  // 2. Read the base index.html
  const baseHtmlPath = path.resolve(distDir, 'index.html');
  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

  console.log(`Found ${blogPosts.length} posts to prerender.`);

  for (const post of blogPosts) {
    const route = `/blog/${post.slug}`;
    console.log(`Prerendering ${route} ...`);
    
    // Create SEO-friendly HTML string
    let html = baseHtml;
    
    // Replace Meta Tags
    html = html.replace(/<title>.*<\/title>/, `<title>${post.title} | Blog ConectaOne</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${post.excerpt}"`);
    
    // Inject JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": "https://conectaone.com/og-image.png",
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "ConectaOne",
        "logo": {
          "@type": "ImageObject",
          "url": "https://conectaone.com/conectaone_logo_principal_1200.png"
        }
      },
      "datePublished": post.date
    };
    
    const jsonLdScript = `\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    html = html.replace('</head>', `${jsonLdScript}\n  </head>`);
    
    // Inject Content into <div id="root">
    const seoContent = `
      <div id="root">
        <!-- SEO PRERENDERED CONTENT -->
        <article>
          <h1>${post.title}</h1>
          <p><strong>TL;DR:</strong> ${post.excerpt}</p>
          <div>
            ${post.content}
          </div>
        </article>
      </div>`;
    
    html = html.replace('<div id="root"></div>', seoContent);

    // Save HTML to dist folder
    const routeDir = path.join(distDir, 'blog', post.slug);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  }

  // 3. Auto-generate sitemap.xml
  console.log('Generating dynamic sitemap.xml...');
  const slugs = blogPosts.map(p => p.slug);
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
  fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemapContent);

  // Clean up
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('Native Prerendering and Sitemap complete! ✅');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
