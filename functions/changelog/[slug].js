// ── Cloudflare Pages Function ─────────────────────────────────────
// Route: /changelog/[slug]
// Server-Side Rendered Changelog-Entry-Seite für SEO + AdSense
// ─────────────────────────────────────────────────────────────────

const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'fileflyr';

const TYPE_CONFIG = {
  feature:     { icon: '🚀', color: '#6366f1', label: 'New Feature' },
  converter:   { icon: '🔄', color: '#22c55e', label: 'New Converter' },
  improvement: { icon: '⚡', color: '#f59e0b', label: 'Improvement' },
  bugfix:      { icon: '🐛', color: '#ef4444', label: 'Bug Fix' },
  content:     { icon: '📝', color: '#8b5cf6', label: 'Content Update' },
};

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-US',
    { year: 'numeric', month: 'long', day: 'numeric' });
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
}

/* ── Haupt-HTML ── */
function renderHTML(entry, slug) {
  const cfg         = TYPE_CONFIG[entry.type] || TYPE_CONFIG.feature;
  const dateStr     = fmtDate(entry.created_at);
  const description = entry.description || entry.title;
  const canonical   = `https://fileflyr.com/changelog/${entry.slug || slug}`;

  return `<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
  <title>${esc(entry.title)} \\u2013 FileFlyr Changelog</title>
  <meta name=\"description\" content=\"${esc(description.replace(/<[^>]*>/g, '').slice(0, 160))}\">
  <meta name=\"robots\" content=\"index, follow\">
  <link rel=\"canonical\" href=\"${canonical}\">

  <meta property=\"og:type\"        content=\"article\">
  <meta property=\"og:title\"       content=\"${esc(entry.title)} \\u2013 FileFlyr Changelog\">
  <meta property=\"og:description\" content=\"${esc(description.replace(/<[^>]*>/g, '').slice(0, 160))}\">
  <meta property=\"og:url\"         content=\"${canonical}\">
  <meta property=\"og:site_name\"   content=\"FileFlyr\">
  <meta property=\"og:image\"       content=\"https://fileflyr.com/assets/favicon.svg\">
  <meta property=\"article:published_time\" content=\"${entry.created_at}\">

  <meta name=\"twitter:card\"        content=\"summary_large_image\">
  <meta name=\"twitter:title\"       content=\"${esc(entry.title)} \\u2013 FileFlyr Changelog\">
  <meta name=\"twitter:description\" content=\"${esc(description.replace(/<[^>]*>/g, '').slice(0, 160))}\">

  <script type=\"application/ld+json\">
  {
    \"@context\": \"https://schema.org\",
    \"@type\": \"Article\",
    \"headline\": ${JSON.stringify(entry.title)},
    \"description\": ${JSON.stringify(description.replace(/<[^>]*>/g, '').slice(0, 200))},
    \"datePublished\": \"${entry.created_at}\",
    \"dateModified\":  \"${entry.created_at}\",
    \"author\":    { \"@type\": \"Organization\", \"name\": \"FileFlyr\" },
    \"publisher\": { \"@type\": \"Organization\", \"name\": \"FileFlyr\", \"url\": \"https://fileflyr.com\" },
    \"url\": \"${canonical}\",
    \"inLanguage\": \"en\",
    \"image\": \"https://fileflyr.com/assets/favicon.svg\",
    \"mainEntityOfPage\": { \"@type\": \"WebPage\", \"@id\": \"${canonical}\" }
  }
  <\\/script>

  <script type=\"application/ld+json\">
  {
    \"@context\": \"https://schema.org\",
    \"@type\": \"BreadcrumbList\",
    \"itemListElement\": [
      { \"@type\": \"ListItem\", \"position\": 1, \"name\": \"FileFlyr\",  \"item\": \"https://fileflyr.com/\" },
      { \"@type\": \"ListItem\", \"position\": 2, \"name\": \"Changelog\", \"item\": \"https://fileflyr.com/changelog\" },
      { \"@type\": \"ListItem\", \"position\": 3, \"name\": ${JSON.stringify(entry.title)}, \"item\": \"${canonical}\" }
    ]
  }
  <\\/script>

  <link rel=\"icon\" type=\"image/svg+xml\" href=\"/assets/favicon.svg\">
  <link rel=\"stylesheet\" href=\"/css/style.css\">
  <script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3654554314003005\" crossorigin=\"anonymous\"><\\/script>

  <style>
    .entry-page {
      max-width: 820px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    .entry-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 32px;
      font-size: 14px;
      color: var(--text-tertiary);
      flex-wrap: wrap;
    }
    .entry-breadcrumb a { color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
    .entry-breadcrumb a:hover { color: var(--primary); }
    .entry-breadcrumb .sep { color: var(--text-tertiary); }

    .entry-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .entry-type {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .entry-date { font-size: 14px; color: var(--text-tertiary); font-weight: 500; }
    .entry-version {
      padding: 4px 12px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .entry-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: -0.8px;
      color: var(--text-primary);
      margin: 0 0 28px;
    }

    .entry-divider { border: none; border-top: 1px solid var(--border); margin: 28px 0; }

    .entry-body {
      font-size: 1rem;
      line-height: 1.85;
      color: var(--text-secondary);
    }
    .entry-body h2 { font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin: 2rem 0 0.7rem; letter-spacing: -0.3px; }
    .entry-body h3 { font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin: 1.5rem 0 0.5rem; }
    .entry-body p   { margin-bottom: 1rem; }
    .entry-body ul, .entry-body ol { padding-left: 1.4rem; margin-bottom: 1rem; }
    .entry-body li  { margin-bottom: 0.4rem; }
    .entry-body li::marker { color: var(--primary); }
    .entry-body strong { color: var(--text-primary); }
    .entry-body a { color: var(--primary); text-decoration: none; }
    .entry-body a:hover { text-decoration: underline; }
    .entry-body hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
    .entry-body code {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.9em;
      color: var(--primary);
    }

    .ad-slot { margin: 28px 0; }

    .entry-nav { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 40px; }
    .entry-nav-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 22px; border-radius: 10px;
      font-weight: 600; font-size: 14px; text-decoration: none;
      transition: all 0.25s ease;
    }
    .btn-changelog {
      background: var(--bg-card); border: 1px solid var(--border); color: var(--text-secondary);
    }
    .btn-changelog:hover { background: var(--bg-hover); border-color: var(--border-hover); color: var(--text-primary); }
    .btn-home {
      background: var(--primary-light); border: 1px solid rgba(99,102,241,0.35); color: var(--primary);
    }
    .btn-home:hover { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.6); }
  </style>
</head>
<body>

<header>
  <div class=\"header-content\">
    <a href=\"/\" class=\"logo\">FileFlyr</a>
    <nav>
      <a href=\"/changelog\">\\u2190 Changelog</a>
      <a href=\"/\">Home</a>
    </nav>
  </div>
</header>

<article class=\"entry-page\" itemscope itemtype=\"https://schema.org/Article\">

  <nav class=\"entry-breadcrumb\" aria-label=\"Breadcrumb\">
    <a href=\"/\">FileFlyr</a>
    <span class=\"sep\">/</span>
    <a href=\"/changelog\">Changelog</a>
    <span class=\"sep\">/</span>
    <span>${esc(entry.title)}</span>
  </nav>

  <div class=\"entry-meta\">
    <span class=\"entry-type\" style=\"background:${cfg.color}20;color:${cfg.color};\">
      <span>${cfg.icon}</span>
      <span>${cfg.label}</span>
    </span>
    <time class=\"entry-date\" itemprop=\"datePublished\" datetime=\"${entry.created_at}\">${dateStr}</time>
    ${entry.version ? `<span class=\"entry-version\">v${esc(entry.version)}</span>` : ''}
  </div>

  <h1 class=\"entry-title\" itemprop=\"headline\">${esc(entry.title)}</h1>

  <div class=\"ad-slot\">
    <ins class=\"adsbygoogle\" style=\"display:block\" data-ad-client=\"ca-pub-3654554314003005\"
         data-ad-slot=\"auto\" data-ad-format=\"auto\" data-full-width-responsive=\"true\"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});<\\/script>
  </div>

  <hr class=\"entry-divider\">

  <div class=\"entry-body\" itemprop=\"articleBody\">
    ${entry.description || '<p style=\"color:var(--text-tertiary);\">No detailed description available for this update.</p>'}
  </div>

  <hr class=\"entry-divider\">

  <div class=\"ad-slot\">
    <ins class=\"adsbygoogle\" style=\"display:block\" data-ad-client=\"ca-pub-3654554314003005\"
         data-ad-slot=\"auto\" data-ad-format=\"auto\" data-full-width-responsive=\"true\"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});<\\/script>
  </div>

  <nav class=\"entry-nav\" aria-label=\"Page navigation\">
    <a href=\"/changelog\" class=\"entry-nav-btn btn-changelog\">
      <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">
        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"></line><polyline points=\"12 19 5 12 12 5\"></polyline>
      </svg>
      All Updates
    </a>
    <a href=\"/\" class=\"entry-nav-btn btn-home\">
      <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">
        <path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>
        <polyline points=\"9 22 9 12 15 12 15 22\"></polyline>
      </svg>
      Start Converting
    </a>
  </nav>

</article>

<footer>
  <div class=\"footer-content\">
    <div class=\"footer-main\">
      <div class=\"footer-brand\">
        <div class=\"logo\">FileFlyr</div>
        <p>Professional file conversion tools.<br>100% free, 100% private.</p>
      </div>
      <div class=\"footer-links\">
        <div class=\"footer-column\">
          <h4>Popular Tools</h4>
          <a href=\"/convert/png-to-jpg\">PNG to JPG</a>
          <a href=\"/convert/jpg-to-png\">JPG to PNG</a>
          <a href=\"/convert/heic-to-jpg\">HEIC to JPG</a>
          <a href=\"/convert/img-to-pdf\">Image to PDF</a>
        </div>
        <div class=\"footer-column\">
          <h4>Resources</h4>
          <a href=\"/#how\">How it works</a>
          <a href=\"/#privacy\">Privacy</a>
          <a href=\"/changelog\">Changelog</a>
          <a href=\"/about.html\">About</a>
        </div>
      </div>
    </div>
    <div class=\"footer-bottom\">
      <nav style=\"margin-bottom:16px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;\">
        <a href=\"/impressum.html\"   style=\"color:var(--text-secondary);text-decoration:none;font-size:14px;\">Impressum</a>
        <span style=\"color:var(--text-tertiary);\">\\u00b7</span>
        <a href=\"/datenschutz.html\" style=\"color:var(--text-secondary);text-decoration:none;font-size:14px;\">Datenschutz</a>
        <span style=\"color:var(--text-tertiary);\">\\u00b7</span>
        <a href=\"/licenses.html\"    style=\"color:var(--text-secondary);text-decoration:none;font-size:14px;\">Lizenzen</a>
        <span style=\"color:var(--text-tertiary);\">\\u00b7</span>
        <a href=\"/about.html\"       style=\"color:var(--text-secondary);text-decoration:none;font-size:14px;\">About</a>
        <span style=\"color:var(--text-tertiary);\">\\u00b7</span>
        <a href=\"/changelog\"        style=\"color:var(--text-secondary);text-decoration:none;font-size:14px;\">Changelog</a>
      </nav>
      <p>&copy; 2026 FileFlyr powered by <a href=\"https://frame-sphere.vercel.app/\" class=\"footer-bottom-framesphere\">FrameSphere</a></p>
    </div>
  </div>
</footer>

</body>
</html>`;
}

/* ── 404-Seite ── */
function render404() {
  return `<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
  <title>404 \\u2013 FileFlyr Changelog</title>
  <link rel=\"icon\" type=\"image/svg+xml\" href=\"/assets/favicon.svg\">
  <link rel=\"stylesheet\" href=\"/css/style.css\">
  <style>
    .not-found { max-width:560px; margin:80px auto; padding:0 24px; text-align:center; }
    .not-found-icon { font-size:3.5rem; margin-bottom:20px; }
    .not-found h1 { font-size:1.8rem; font-weight:800; color:var(--primary); margin-bottom:12px; }
    .not-found p { color:var(--text-secondary); font-size:0.95rem; margin-bottom:28px; }
    .back-link {
      display:inline-flex; align-items:center; gap:8px;
      padding:11px 22px; border-radius:10px;
      background:var(--primary-light); border:1px solid rgba(99,102,241,0.35);
      color:var(--primary); font-weight:600; font-size:14px; text-decoration:none;
    }
    .back-link:hover { background:rgba(99,102,241,0.2); }
  </style>
</head>
<body>
  <header>
    <div class=\"header-content\">
      <a href=\"/\" class=\"logo\">FileFlyr</a>
      <nav><a href=\"/changelog\">\\u2190 Changelog</a></nav>
    </div>
  </header>
  <div class=\"not-found\">
    <div class=\"not-found-icon\">&#128680;</div>
    <h1>404 \\u2013 Entry Not Found</h1>
    <p>This changelog entry doesn\\u2019t exist or has been removed.</p>
    <a href=\"/changelog\" class=\"back-link\">
      <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">
        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"></line><polyline points=\"12 19 5 12 12 5\"></polyline>
      </svg>
      View All Updates
    </a>
  </div>
</body>
</html>`;
}

/* ── Request Handler ── */
export async function onRequestGet({ params }) {
  const { slug } = params;
  if (!slug) return new Response('Not Found', { status: 404 });

  let entry;
  try {
    const res = await fetch(
      `${API}/api/changelog/entry?site_id=${SITE_ID}&slug=${encodeURIComponent(slug)}`
    );
    if (res.status === 404) {
      return new Response(render404(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    if (!res.ok) throw new Error('API ' + res.status);
    entry = await res.json();
  } catch (e) {
    return new Response(render404(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new Response(renderHTML(entry, slug), {
    headers: {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}