// Dynamic Sitemap – FileFlyr
// Statische URLs + dynamische Changelog-Einträge von der API
const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'fileflyr';
const BASE    = 'https://fileflyr.pages.dev';

const STATIC_URLS = `
  <!-- Homepage -->
  <url><loc>${BASE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>

  <!-- Info Pages -->
  <url><loc>${BASE}/changelog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/about.html</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>${BASE}/impressum.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
  <url><loc>${BASE}/datenschutz.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
  <url><loc>${BASE}/licenses.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>

  <!-- Image Converters -->
  <url><loc>${BASE}/convert/png-to-jpg/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/jpg-to-png/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/heic-to-jpg/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/webp-to-jpg/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/webp-to-png/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/avif-to-jpg/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/bmp-to-png/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/ico-to-png/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/svg-to-png/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/tiff-to-jpg/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/image-compress/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/image-resize/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/image-crop/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/image-rotate/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/image-grayscale/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/remove-bg/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>

  <!-- PDF Converters -->
  <url><loc>${BASE}/convert/img-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/jpg-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/png-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/pdf-to-jpg/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/convert/pdf-to-png/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/pdf-merge/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/pdf-split/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/pdf-compress/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>

  <!-- Document Converters -->
  <url><loc>${BASE}/convert/txt-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/convert/html-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/convert/markdown-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/convert/csv-to-pdf/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- Audio Converters -->
  <url><loc>${BASE}/convert/mp3-to-wav/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/wav-to-mp3/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/audio-trim/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/convert/audio-normalize/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- Video Converters -->
  <url><loc>${BASE}/convert/mov-to-mp4/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/mp4-to-webm/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/gif-to-mp4/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/convert/mp4-to-gif/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/convert/video-trim/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/convert/video-to-audio/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;

export async function onRequestGet() {
  const today = new Date().toISOString().slice(0, 10);

  let entries = [];
  try {
    const res = await fetch(`${API}/api/changelog/published?site_id=${SITE_ID}`);
    if (res.ok) entries = await res.json();
  } catch(_) {}

  const changelogUrls = entries.map(e => {
    const slug = (e.slug && e.slug.trim())
      ? e.slug
      : String(e.title || '').toLowerCase()
          .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
          .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
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

  <!-- Changelog Entries (dynamic) -->
${changelogUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
