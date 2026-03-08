// Fileflyr Main JavaScript
// Search and Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const converterGrid = document.getElementById('converterGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');
    const converterCards = document.querySelectorAll('.converter-card');

    let currentCategory = 'all';

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterConverters(searchTerm, currentCategory);
        });
    }

    // Category filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get category
            currentCategory = this.getAttribute('data-category');
            
            // Filter
            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
            filterConverters(searchTerm, currentCategory);
        });
    });

    // Filter converters based on search and category
    function filterConverters(searchTerm, category) {
        let visibleCount = 0;

        converterCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            
            // Check category match
            const categoryMatch = category === 'all' || cardCategory === category;
            
            // Check search match
            const searchMatch = !searchTerm || 
                                cardTitle.includes(searchTerm) || 
                                cardDescription.includes(searchTerm);
            
            // Show or hide card
            if (categoryMatch && searchMatch) {
                card.style.display = '';
                visibleCount++;
                
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for actual anchor links (not empty #)
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add CSS for fade-in animation
    if (!document.getElementById('dynamicStyles')) {
        const style = document.createElement('style');
        style.id = 'dynamicStyles';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Console info
    console.log('Fileflyr loaded successfully');
    console.log(`${converterCards.length} converters available`);
});

// ── WebControl HQ Integration ────────────────────────────────────
(function () {
    const HQ_API = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
    const HQ_SITE_ID = 'fileflyr';

    // ── Error Tracking ──────────────────────────────────────────
    async function reportError(type, message, stack) {
        try {
            await fetch(HQ_API + '/api/errors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    site_id: HQ_SITE_ID,
                    error_type: type,
                    message: String(message).slice(0, 500),
                    stack: stack ? String(stack).slice(0, 2000) : undefined,
                    path: location.pathname,
                }),
            });
        } catch (_) { /* never throw */ }
    }

    window.addEventListener('error', function (e) {
        reportError('JS Error', e.message || 'Unknown error', e.error ? e.error.stack : null);
    });

    window.addEventListener('unhandledrejection', function (e) {
        const msg = e.reason instanceof Error ? e.reason.message : String(e.reason);
        const stack = e.reason instanceof Error ? e.reason.stack : null;
        reportError('Unhandled Promise Rejection', msg, stack);
    });

    // ── Vorschläge-Modal ────────────────────────────────────────
    const SUGG_LS_KEY = 'hq_sugg_ts_fileflyr';
    const SUGG_LIMIT  = 3;
    const SUGG_WINDOW = 60 * 60 * 1000; // 1 Stunde

    function getSuggTimestamps() {
        try { return JSON.parse(localStorage.getItem(SUGG_LS_KEY) || '[]'); }
        catch (_) { return []; }
    }
    function saveSuggTimestamps(arr) {
        try { localStorage.setItem(SUGG_LS_KEY, JSON.stringify(arr)); } catch (_) {}
    }
    function cooldownMinutesLeft() {
        const now = Date.now();
        const recent = getSuggTimestamps().filter(t => now - t < SUGG_WINDOW);
        if (recent.length < SUGG_LIMIT) return 0;
        const oldest = Math.min(...recent);
        return Math.ceil((SUGG_WINDOW - (now - oldest)) / 60000);
    }

    const style = document.createElement('style');
    style.textContent = `
        #hq-sugg-btn {
            position:fixed; bottom:24px; right:24px; z-index:9999;
            width:48px; height:48px; border-radius:50%;
            background:#7c3aed; border:none; cursor:pointer;
            box-shadow:0 4px 16px rgba(124,58,237,.4);
            display:flex; align-items:center; justify-content:center;
            font-size:20px; transition:transform .15s;
        }
        #hq-sugg-btn:hover { transform:scale(1.1); }
        #hq-sugg-overlay {
            display:none; position:fixed; inset:0; z-index:10000;
            background:rgba(0,0,0,.5); align-items:center; justify-content:center;
        }
        #hq-sugg-overlay.open { display:flex; }
        #hq-sugg-modal {
            background:#1e1e2e; border-radius:12px; padding:28px;
            width:min(420px,90vw); box-shadow:0 20px 60px rgba(0,0,0,.5);
            color:#e2e8f0;
        }
        #hq-sugg-modal h3 { margin:0 0 6px; font-size:17px; }
        #hq-sugg-modal p  { margin:0 0 18px; font-size:13px; color:#94a3b8; }
        #hq-sugg-modal textarea, #hq-sugg-modal input {
            width:100%; box-sizing:border-box; border-radius:8px;
            border:1px solid #374151; background:#111827;
            color:#e2e8f0; padding:10px 12px; font-size:14px;
            font-family:inherit; resize:vertical; outline:none;
        }
        #hq-sugg-modal textarea:focus, #hq-sugg-modal input:focus {
            border-color:#7c3aed;
        }
        #hq-sugg-modal textarea { min-height:100px; margin-bottom:10px; }
        #hq-sugg-modal input   { margin-bottom:16px; }
        #hq-sugg-actions { display:flex; gap:10px; justify-content:flex-end; }
        #hq-sugg-cancel {
            padding:9px 18px; border-radius:8px; border:1px solid #374151;
            background:transparent; color:#94a3b8; cursor:pointer; font-size:14px;
        }
        #hq-sugg-submit {
            padding:9px 18px; border-radius:8px; border:none;
            background:#7c3aed; color:#fff; cursor:pointer; font-size:14px;
            font-weight:600;
        }
        #hq-sugg-submit:disabled { opacity:.5; cursor:not-allowed; }
        #hq-sugg-status { font-size:13px; margin-top:10px; min-height:18px; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'hq-sugg-btn';
    btn.title = 'Feedback / Vorschlag einreichen';
    btn.textContent = '💡';
    document.body.appendChild(btn);

    const overlay = document.createElement('div');
    overlay.id = 'hq-sugg-overlay';
    overlay.innerHTML = `
        <div id="hq-sugg-modal">
            <h3>💡 Vorschlag einreichen</h3>
            <p>Ideen, Wünsche oder Fehler? Schreib uns anonym!</p>
            <textarea id="hq-sugg-text" placeholder="z.B. Bitte füge PNG zu PDF hinzu…" maxlength="500"></textarea>
            <input id="hq-sugg-cat" type="text" placeholder="Kategorie (optional, z.B. Converter, Bug…)" maxlength="50">
            <div id="hq-sugg-actions">
                <button id="hq-sugg-cancel">Abbrechen</button>
                <button id="hq-sugg-submit">Absenden</button>
            </div>
            <div id="hq-sugg-status"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const textarea  = document.getElementById('hq-sugg-text');
    const catInput  = document.getElementById('hq-sugg-cat');
    const submitBtn = document.getElementById('hq-sugg-submit');
    const statusEl  = document.getElementById('hq-sugg-status');

    function openModal() {
        statusEl.textContent = '';
        textarea.value = '';
        catInput.value = '';
        submitBtn.disabled = false;
        const mins = cooldownMinutesLeft();
        if (mins > 0) {
            submitBtn.disabled = true;
            statusEl.style.color = '#f59e0b';
            statusEl.textContent = `⏳ Noch ${mins} Min. warten (Max. 3 Vorschläge/Stunde)`;
        }
        overlay.classList.add('open');
        textarea.focus();
    }
    function closeModal() { overlay.classList.remove('open'); }

    btn.addEventListener('click', openModal);
    document.getElementById('hq-sugg-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    submitBtn.addEventListener('click', async function () {
        const suggestion = textarea.value.trim();
        const category   = catInput.value.trim();
        if (suggestion.length < 5) {
            statusEl.style.color = '#ef4444';
            statusEl.textContent = 'Bitte mindestens 5 Zeichen eingeben.';
            return;
        }
        const mins = cooldownMinutesLeft();
        if (mins > 0) {
            statusEl.style.color = '#f59e0b';
            statusEl.textContent = `⏳ Noch ${mins} Min. warten.`;
            return;
        }
        submitBtn.disabled = true;
        statusEl.style.color = '#94a3b8';
        statusEl.textContent = 'Wird gesendet…';
        try {
            const res = await fetch(HQ_API + '/api/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ site_id: HQ_SITE_ID, suggestion, category }),
            });
            if (res.status === 429) {
                statusEl.style.color = '#f59e0b';
                statusEl.textContent = '⏳ Zu viele Vorschläge. Bitte eine Stunde warten.';
                submitBtn.disabled = true;
                return;
            }
            if (!res.ok) throw new Error('HTTP ' + res.status);
            // Speichere Zeitstempel
            const now = Date.now();
            const recent = getSuggTimestamps().filter(t => now - t < SUGG_WINDOW);
            recent.push(now);
            saveSuggTimestamps(recent);
            statusEl.style.color = '#22c55e';
            statusEl.textContent = '✓ Danke für deinen Vorschlag!';
            setTimeout(closeModal, 1800);
        } catch (err) {
            reportError('Suggestion Submit Error', err.message, null);
            statusEl.style.color = '#ef4444';
            statusEl.textContent = 'Fehler beim Senden. Bitte versuche es später.';
            submitBtn.disabled = false;
        }
    });
})();