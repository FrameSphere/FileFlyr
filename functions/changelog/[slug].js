// Cloudflare Pages Function
// Route: /changelog/[slug]

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
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderHTML(entry, slug) {
  const cfg         = TYPE_CONFIG[entry.type] || TYPE_CONFIG.feature;
  const dateStr     = fmtDate(entry.published_at || entry.created_at);
  const description = entry.description || entry.title;
  const plain       = description.replace(/<[^>]*>/g, '').slice(0, 160);
  const canonical   = 'https://fileflyr.pages.dev/changelog/' + (entry.slug || slug);

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>' + esc(entry.title) + ' \u2013 FileFlyr Changelog</title>\n' +
'  <meta name="description" content="' + esc(plain) + '">\n' +
'  <meta name="robots" content="index, follow">\n' +
'  <link rel="canonical" href="' + canonical + '">\n' +
'  <meta property="og:type" content="article">\n' +
'  <meta property="og:title" content="' + esc(entry.title) + ' \u2013 FileFlyr Changelog">\n' +
'  <meta property="og:description" content="' + esc(plain) + '">\n' +
'  <meta property="og:url" content="' + canonical + '">\n' +
'  <meta property="og:site_name" content="FileFlyr">\n' +
'  <meta property="og:image" content="https://fileflyr.pages.dev/assets/favicon.svg">\n' +
'  <meta property="article:published_time\" content=\"' + (entry.published_at || entry.created_at) + '\">' +
'  <meta name="twitter:card" content="summary_large_image">\n' +
'  <meta name="twitter:title" content="' + esc(entry.title) + ' \u2013 FileFlyr Changelog">\n' +
'  <meta name="twitter:description" content="' + esc(plain) + '">\n' +
'  <script type="application/ld+json">\n' +
'  {\n' +
'    "@context": "https://schema.org",\n' +
'    "@type": "Article",\n' +
'    "headline": ' + JSON.stringify(entry.title) + ',\n' +
'    "description": ' + JSON.stringify(plain) + ',\n' +
'    "datePublished": "' + entry.created_at + '",\n' +
'    "dateModified": "' + entry.created_at + '",\n' +
'    "author": { "@type": "Organization", "name": "FileFlyr" },\n' +
'    "publisher": { "@type": "Organization", "name": "FileFlyr", "url": "https://fileflyr.pages.dev" },\n' +
'    "url": "' + canonical + '",\n' +
'    "inLanguage": "en",\n' +
'    "image": "https://fileflyr.pages.dev/assets/favicon.svg",\n' +
'    "mainEntityOfPage": { "@type": "WebPage", "@id": "' + canonical + '" }\n' +
'  }\n' +
'  </script>\n' +
'  <script type="application/ld+json">\n' +
'  {\n' +
'    "@context": "https://schema.org",\n' +
'    "@type": "BreadcrumbList",\n' +
'    "itemListElement": [\n' +
'      { "@type": "ListItem", "position": 1, "name": "FileFlyr", "item": "https://fileflyr.pages.dev/" },\n' +
'      { "@type": "ListItem", "position": 2, "name": "Changelog", "item": "https://fileflyr.pages.dev/changelog" },\n' +
'      { "@type": "ListItem", "position": 3, "name": ' + JSON.stringify(entry.title) + ', "item": "' + canonical + '" }\n' +
'    ]\n' +
'  }\n' +
'  </script>\n' +
'  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">\n' +
'  <link rel="stylesheet" href="/css/style.css">\n' +
'  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3654554314003005" crossorigin="anonymous"></script>\n' +
'  <style>\n' +
'    .entry-page { max-width:820px; margin:0 auto; padding:48px 24px 80px; }\n' +
'    .entry-breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:32px; font-size:14px; color:var(--text-tertiary); flex-wrap:wrap; }\n' +
'    .entry-breadcrumb a { color:var(--text-secondary); text-decoration:none; transition:color 0.2s; }\n' +
'    .entry-breadcrumb a:hover { color:var(--primary); }\n' +
'    .entry-breadcrumb .sep { color:var(--text-tertiary); }\n' +
'    .entry-meta { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:20px; }\n' +
'    .entry-type { display:inline-flex; align-items:center; gap:7px; padding:6px 14px; border-radius:8px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }\n' +
'    .entry-date { font-size:14px; color:var(--text-tertiary); font-weight:500; }\n' +
'    .entry-version { padding:4px 12px; background:var(--bg-elevated); border:1px solid var(--border); border-radius:6px; font-size:12px; font-weight:500; color:var(--text-secondary); }\n' +
'    .entry-title { font-size:clamp(1.8rem,4vw,2.4rem); font-weight:800; line-height:1.2; letter-spacing:-0.8px; color:var(--text-primary); margin:0 0 28px; }\n' +
'    .entry-divider { border:none; border-top:1px solid var(--border); margin:28px 0; }\n' +
'    .entry-body { font-size:1rem; line-height:1.85; color:var(--text-secondary); }\n' +
'    .entry-body h2 { font-size:1.35rem; font-weight:700; color:var(--text-primary); margin:2rem 0 0.7rem; }\n' +
'    .entry-body h3 { font-size:1.1rem; font-weight:600; color:var(--text-primary); margin:1.5rem 0 0.5rem; }\n' +
'    .entry-body p { margin-bottom:1rem; }\n' +
'    .entry-body ul, .entry-body ol { padding-left:1.4rem; margin-bottom:1rem; }\n' +
'    .entry-body li { margin-bottom:0.4rem; }\n' +
'    .entry-body li::marker { color:var(--primary); }\n' +
'    .entry-body strong { color:var(--text-primary); }\n' +
'    .entry-body a { color:var(--primary); text-decoration:none; }\n' +
'    .entry-body a:hover { text-decoration:underline; }\n' +
'    .entry-body code { background:var(--bg-elevated); border:1px solid var(--border); border-radius:4px; padding:2px 6px; font-size:0.9em; color:var(--primary); }\n' +
'    .entry-nav { display:flex; gap:12px; flex-wrap:wrap; margin-top:40px; }\n' +
'    .entry-nav-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:10px; font-weight:600; font-size:14px; text-decoration:none; transition:all 0.25s ease; }\n' +
'    .btn-changelog { background:var(--bg-card); border:1px solid var(--border); color:var(--text-secondary); }\n' +
'    .btn-changelog:hover { background:var(--bg-hover); border-color:var(--border-hover); color:var(--text-primary); }\n' +
'    .btn-home { background:var(--primary-light); border:1px solid rgba(99,102,241,0.35); color:var(--primary); }\n' +
'    .btn-home:hover { background:rgba(99,102,241,0.2); border-color:rgba(99,102,241,0.6); }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'\n' +
'<header>\n' +
'  <div class="header-content">\n' +
'    <a href="/" class="logo">FileFlyr</a>\n' +
'    <nav>\n' +
'      <a href="/changelog">\u2190 Changelog</a>\n' +
'      <a href="/">Home</a>\n' +
'    </nav>\n' +
'  </div>\n' +
'</header>\n' +
'\n' +
'<article class="entry-page" itemscope itemtype="https://schema.org/Article">\n' +
'\n' +
'  <nav class="entry-breadcrumb" aria-label="Breadcrumb">\n' +
'    <a href="/">FileFlyr</a>\n' +
'    <span class="sep">/</span>\n' +
'    <a href="/changelog">Changelog</a>\n' +
'    <span class="sep">/</span>\n' +
'    <span>' + esc(entry.title) + '</span>\n' +
'  </nav>\n' +
'\n' +
'  <div class="entry-meta">\n' +
'    <span class="entry-type" style="background:' + cfg.color + '20;color:' + cfg.color + ';">\n' +
'      <span>' + cfg.icon + '</span>\n' +
'      <span>' + cfg.label + '</span>\n' +
'    </span>\n' +
'    <time class="entry-date" itemprop="datePublished" datetime="' + entry.created_at + '">' + dateStr + '</time>\n' +
(entry.version ? '    <span class="entry-version">v' + esc(entry.version) + '</span>\n' : '') +
'  </div>\n' +
'\n' +
'  <h1 class="entry-title" itemprop="headline">' + esc(entry.title) + '</h1>\n' +
'\n' +
'  <hr class="entry-divider">\n' +
'\n' +
'  <div class="entry-body" itemprop="articleBody">\n' +
'    ' + (entry.description || '<p style="color:var(--text-tertiary);">No detailed description available.</p>') + '\n' +
'  </div>\n' +
'\n' +
'  <hr class="entry-divider">\n' +
'\n' +
'  <nav class="entry-nav" aria-label="Page navigation">\n' +
'    <a href="/changelog" class="entry-nav-btn btn-changelog">\n' +
'      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>\n' +
'      All Updates\n' +
'    </a>\n' +
'    <a href="/" class="entry-nav-btn btn-home">\n' +
'      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>\n' +
'      Start Converting\n' +
'    </a>\n' +
'  </nav>\n' +
'\n' +
'</article>\n' +
'  <!-- Reaction Widget – anonymous (no counts shown to users) -->\n' +
'  <div id="reaction-widget" style="max-width:820px;margin:0 auto;padding:0 24px 48px">\n' +
'    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:20px 24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">\n' +
'      <span style="font-size:13px;font-weight:600;color:var(--text-secondary);flex-shrink:0">React to this update:</span>\n' +
'      <div id="reaction-btns" style="display:flex;gap:8px;flex-wrap:wrap">\n' +
'        <button id="rb-fire"   onclick="react(\'fire\'  )" class="rbtn" data-r="fire"   style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:transparent;cursor:pointer;font-size:22px;font-family:inherit;transition:all .2s" title="Fire">\uD83D\uDD25</button>\n' +
'        <button id="rb-rocket" onclick="react(\'rocket\')" class="rbtn" data-r="rocket" style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:transparent;cursor:pointer;font-size:22px;font-family:inherit;transition:all .2s" title="Rocket">\uD83D\uDE80</button>\n' +
'        <button id="rb-love"   onclick="react(\'love\'  )" class="rbtn" data-r="love"   style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:transparent;cursor:pointer;font-size:22px;font-family:inherit;transition:all .2s" title="Love">\u2764\uFE0F</button>\n' +
'        <button id="rb-clap"   onclick="react(\'clap\'  )" class="rbtn" data-r="clap"   style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:transparent;cursor:pointer;font-size:22px;font-family:inherit;transition:all .2s" title="Clap">\uD83D\uDC4F</button>\n' +
'      </div>\n' +
'      <span id="reaction-msg" style="font-size:12px;color:var(--text-tertiary);margin-left:auto"></span>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'<footer>\n' +
'  <div class="footer-content">\n' +
'    <div class="footer-main">\n' +
'      <div class="footer-brand">\n' +
'        <div class="logo">FileFlyr</div>\n' +
'        <p>Professional file conversion tools.<br>100% free, 100% private.</p>\n' +
'      </div>\n' +
'      <div class="footer-links">\n' +
'        <div class="footer-column">\n' +
'          <h4>Popular Tools</h4>\n' +
'          <a href="/convert/png-to-jpg">PNG to JPG</a>\n' +
'          <a href="/convert/jpg-to-png">JPG to PNG</a>\n' +
'          <a href="/convert/heic-to-jpg">HEIC to JPG</a>\n' +
'          <a href="/convert/img-to-pdf">Image to PDF</a>\n' +
'        </div>\n' +
'        <div class="footer-column">\n' +
'          <h4>Resources</h4>\n' +
'          <a href="/#how">How it works</a>\n' +
'          <a href="/#privacy">Privacy</a>\n' +
'          <a href="/changelog">Changelog</a>\n' +
'          <a href="/about.html">About</a>\n' +
'        </div>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="footer-bottom">\n' +
'      <nav style="margin-bottom:16px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">\n' +
'        <a href="/impressum.html" style="color:var(--text-secondary);text-decoration:none;font-size:14px;">Impressum</a>\n' +
'        <span style="color:var(--text-tertiary);">\u00b7</span>\n' +
'        <a href="/datenschutz.html" style="color:var(--text-secondary);text-decoration:none;font-size:14px;">Datenschutz</a>\n' +
'        <span style="color:var(--text-tertiary);">\u00b7</span>\n' +
'        <a href="/licenses.html" style="color:var(--text-secondary);text-decoration:none;font-size:14px;">Lizenzen</a>\n' +
'        <span style="color:var(--text-tertiary);">\u00b7</span>\n' +
'        <a href="/about.html" style="color:var(--text-secondary);text-decoration:none;font-size:14px;">About</a>\n' +
'        <span style="color:var(--text-tertiary);">\u00b7</span>\n' +
'        <a href="/changelog" style="color:var(--text-secondary);text-decoration:none;font-size:14px;">Changelog</a>\n' +
'      </nav>\n' +
'      <p>&copy; 2026 FileFlyr powered by <a href="https://frame-sphere.vercel.app/" class="footer-bottom-framesphere">FrameSphere</a></p>\n' +
'    </div>\n' +
'  </div>\n' +
'</footer>\n' +
'\n' +
'  <script>\n' +
'  (function(){\n' +
'    var API="https://webcontrol-hq-api.karol-paschek.workers.dev";\n' +
'    var SLUG="' + (entry.slug || slug) + '";\n' +
'    var SID=localStorage.getItem("_ba_sid");\n' +
'    if(!SID){SID=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem("_ba_sid",SID);}\n' +
'    var KEY="react_" + SLUG;\n' +
'    var voted=localStorage.getItem(KEY);\n' +
'\n' +
'    // Restore voted state (no count fetch – fully anonymous)\n' +
'    if(voted){\n' +
'      var prevBtn=document.getElementById("rb-"+voted);\n' +
'      if(prevBtn)activateBtn(prevBtn,voted);\n' +
'      document.querySelectorAll(".rbtn").forEach(function(b){b.disabled=true;});\n' +
'      document.getElementById("reaction-msg").textContent="You already reacted \u2714";\n' +
'    }\n' +
'\n' +
'    window.react=function(r){\n' +
'      if(localStorage.getItem(KEY))return;\n' +
'      localStorage.setItem(KEY,r);\n' +
'      voted=r;\n' +
'      activateBtn(document.getElementById("rb-"+r),r);\n' +
'      document.querySelectorAll(".rbtn").forEach(function(b){b.disabled=true;});\n' +
'      document.getElementById("reaction-msg").textContent="Thanks! \uD83C\uDF89";\n' +
'      // Send to Manager analytics (stored server-side, not shown to users)\n' +
'      fetch(API+"/api/changelog/reactions",{method:"POST",headers:{"Content-Type":"application/json"},\n' +
'        body:JSON.stringify({site_id:"fileflyr",entry_slug:SLUG,reaction:r,session_id:SID})}).catch(function(){});\n' +
'    };\n' +
'\n' +
'    function activateBtn(btn,r){\n' +
'      if(!btn)return;\n' +
'      var colors={fire:"rgba(239,68,68,.18)",rocket:"rgba(99,102,241,.18)",love:"rgba(239,68,68,.18)",clap:"rgba(245,158,11,.18)"};\n' +
'      var borders={fire:"rgba(239,68,68,.5)",rocket:"rgba(99,102,241,.5)",love:"rgba(239,68,68,.5)",clap:"rgba(245,158,11,.5)"};\n' +
'      btn.style.background=colors[r]||"rgba(99,102,241,.18)";\n' +
'      btn.style.borderColor=borders[r]||"rgba(99,102,241,.5)";\n' +
'      btn.style.transform="scale(1.12)";\n' +
'      btn.style.boxShadow="0 0 0 2px "+(borders[r]||"rgba(99,102,241,.5)");\n' +
'    }\n' +
'  })();\n' +
'  </script>\n' +
'  <!-- Analytics Tracking -->\n' +
'  <script>\n' +
'  (function(){\n' +
'    var ANA="https://webcontrol-hq-api.karol-paschek.workers.dev/api/blog/analytics";\n' +
'    var SID=localStorage.getItem("_ba_sid")||Math.random().toString(36).slice(2)+Date.now().toString(36);\n' +
'    localStorage.setItem("_ba_sid",SID);\n' +
'    var DEV=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?"mobile":"desktop";\n' +
'    var START=Date.now();var sent=false;\n' +
'    fetch(ANA,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({\n' +
'      site_id:"fileflyr",post_slug:"' + (entry.slug || slug) + '",lang:"en",\n' +
'      event:"pageview",referrer:document.referrer||""  ,device:DEV,session_id:SID\n' +
'    })}).catch(function(){});\n' +
'    var maxScroll=0;var ms={25:false,50:false,75:false,100:false};\n' +
'    function onScroll(){var el=document.querySelector(".entry-body");if(!el)return;\n' +
'      var r=el.getBoundingClientRect();var p=Math.min(100,Math.round((window.innerHeight-r.top)/(r.height||1)*100));\n' +
'      if(p>maxScroll)maxScroll=p;\n' +
'      [25,50,75,100].forEach(function(m){if(!ms[m]&&maxScroll>=m){ms[m]=true;\n' +
'        fetch(ANA,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({\n' +
'          site_id:"fileflyr",post_slug:"' + (entry.slug || slug) + '",lang:"en",\n' +
'          event:"scroll",scroll_depth:m,session_id:SID\n' +
'        })}).catch(function(){});}});\n' +
'    }\n' +
'    window.addEventListener("scroll",onScroll,{passive:true});\n' +
'    function sendTime(){if(sent)return;sent=true;var sec=Math.round((Date.now()-START)/1000);if(sec<2)return;\n' +
'      navigator.sendBeacon(ANA,JSON.stringify({site_id:"fileflyr",post_slug:"' + (entry.slug || slug) + '",lang:"en",\n' +
'        event:"leave",time_on_page:sec,scroll_depth:maxScroll,session_id:SID}));\n' +
'    }\n' +
'    window.addEventListener("pagehide",sendTime);window.addEventListener("beforeunload",sendTime);\n' +
'    document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")sendTime();});\n' +
'  })();\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

function render404() {
  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>404 \u2013 FileFlyr Changelog</title>\n' +
'  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">\n' +
'  <link rel="stylesheet" href="/css/style.css">\n' +
'  <style>\n' +
'    .not-found { max-width:560px; margin:80px auto; padding:0 24px; text-align:center; }\n' +
'    .not-found-icon { font-size:3.5rem; margin-bottom:20px; }\n' +
'    .not-found h1 { font-size:1.8rem; font-weight:800; color:var(--primary); margin-bottom:12px; }\n' +
'    .not-found p { color:var(--text-secondary); font-size:0.95rem; margin-bottom:28px; }\n' +
'    .back-link { display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:10px; background:var(--primary-light); border:1px solid rgba(99,102,241,0.35); color:var(--primary); font-weight:600; font-size:14px; text-decoration:none; }\n' +
'    .back-link:hover { background:rgba(99,102,241,0.2); }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <header>\n' +
'    <div class="header-content">\n' +
'      <a href="/" class="logo">FileFlyr</a>\n' +
'      <nav><a href="/changelog">\u2190 Changelog</a></nav>\n' +
'    </div>\n' +
'  </header>\n' +
'  <div class="not-found">\n' +
'    <div class="not-found-icon">&#128680;</div>\n' +
'    <h1>404 \u2013 Entry Not Found</h1>\n' +
'    <p>This changelog entry doesn\u2019t exist or has been removed.</p>\n' +
'    <a href="/changelog" class="back-link">\u2190 View All Updates</a>\n' +
'  </div>\n' +
'</body>\n' +
'</html>';
}

export async function onRequestGet({ params }) {
  const { slug } = params;
  if (!slug) return new Response('Not Found', { status: 404 });

  let entry;
  try {
    const res = await fetch(
      API + '/api/changelog/entry?site_id=' + SITE_ID + '&slug=' + encodeURIComponent(slug)
    );
    if (res.status === 404) {
      return new Response(render404(), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    if (!res.ok) throw new Error('API ' + res.status);
    entry = await res.json();
  } catch (e) {
    return new Response(render404(), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  return new Response(renderHTML(entry, slug), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600',
    },
  });
}
