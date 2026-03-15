// Dynamic Sitemap – FileFlyr (Changelog)
const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'fileflyr';
const BASE    = 'https://fileflyr.pages.dev';

const STATIC_URLS = `
  <url><loc>${BASE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${BASE}/changelog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/about.html</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>${BASE}/impressum.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
  <url><loc>${BASE}/datenschutz.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
  <url><loc>${BASE}/convert/png-to-jpg</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/jpg-to-png</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/webp-to-jpg</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/webp-to-png</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/heic-to-jpg</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/image-compress</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/image-resize</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/img-to-pdf</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/jpg-to-pdf</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/png-to-pdf</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/pdf-to-jpg</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/pdf-to-png</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/pdf-merge</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/pdf-split</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/mp3-to-wav</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/wav-to-mp3</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/mp4-to-webm</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/gif-to-mp4</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/mp4-to-gif</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/txt-to-pdf</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`;

export async function onRequestGet() {
  let entries = [];
  try {
    const res = await fetch(`${API}/api/changelog/published?site_id=${SITE_ID}`);
    if (res.ok) entries = await res.json();
  } catch(_) {}

  const today = new Date().toISOString().slice(0, 10);

  const changelogUrls = entries.map(e => {
    const slug = e.slug || e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `  <url>
    <loc>${BASE}/changelog/${slug}</loc>
    <lastmod>${(e.published_at || e.created_at || today).slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_URLS}
${changelogUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
