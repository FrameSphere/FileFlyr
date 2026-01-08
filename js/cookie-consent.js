/**
 * DSGVO-konformer Cookie-Banner für FileConvert
 * Mit Google Consent Mode v2 Integration
 * 
 * WICHTIG: Werbung wird IMMER angezeigt
 * - Bei Zustimmung: personalisierte Werbung
 * - Bei Ablehnung: nicht-personalisierte Werbung
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'fileconvert_cookie_consent';
    const CONSENT_DURATION = 365; // Tage

    // ===================================================================
    // Google Consent Mode v2 - PFLICHT seit 2024
    // ===================================================================
    
    // Initialisiere Consent Mode (wird nur bei Zustimmung aktiviert)
    function initConsentMode() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Default: Alles abgelehnt
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });
        
        // Consent Mode verfügbar machen
        window.gtag = gtag;
        
        console.log('✓ Google Consent Mode v2 initialisiert (default: denied)');
    }
    
    // Consent Mode aktualisieren basierend auf User-Entscheidung
    function updateConsentMode(marketing) {
        if (!window.gtag) {
            console.error('❌ gtag nicht verfügbar');
            return;
        }
        
        if (marketing) {
            // Marketing akzeptiert -> personalisierte Werbung
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
            console.log('✓ Consent Mode: Personalisierte Werbung aktiviert');
        } else {
            // Marketing abgelehnt -> nicht-personalisierte Werbung
            window.gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
            console.log('✓ Consent Mode: Nicht-personalisierte Werbung aktiviert');
        }
    }

    // CSS für Cookie-Banner
    const styles = `
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(19, 20, 26, 0.98);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px;
            z-index: 10000;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }

        .cookie-banner.show {
            transform: translateY(0);
        }

        .cookie-banner-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }

        .cookie-banner-text {
            flex: 1;
            min-width: 300px;
        }

        .cookie-banner-text p {
            margin: 0;
            color: #e5e7eb;
            font-size: 14px;
            line-height: 1.6;
        }

        .cookie-banner-text a {
            color: #6366f1;
            text-decoration: underline;
        }

        .cookie-banner-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .cookie-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            white-space: nowrap;
        }

        /* WICHTIG: Buttons gleichwertig gestalten (DSGVO) */
        .cookie-btn-accept,
        .cookie-btn-decline {
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
        }

        .cookie-btn-accept {
            background: #6366f1;
            color: white;
        }

        .cookie-btn-accept:hover {
            background: #4f46e5;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .cookie-btn-decline {
            background: #374151;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cookie-btn-decline:hover {
            background: #4b5563;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(75, 85, 99, 0.4);
        }

        .cookie-btn-settings {
            background: transparent;
            color: #9ca3af;
            padding: 12px 16px;
        }

        .cookie-btn-settings:hover {
            color: #e5e7eb;
        }

        @media (max-width: 768px) {
            .cookie-banner-content {
                flex-direction: column;
                align-items: stretch;
            }

            .cookie-banner-buttons {
                flex-direction: column;
            }

            .cookie-btn {
                width: 100%;
            }
        }

        /* Cookie Settings Modal */
        .cookie-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(4px);
            z-index: 10001;
            padding: 20px;
            overflow-y: auto;
        }

        .cookie-modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cookie-modal-content {
            background: #13141a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 32px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .cookie-modal-header {
            margin-bottom: 24px;
        }

        .cookie-modal-header h2 {
            margin: 0 0 8px 0;
            font-size: 24px;
            color: #ffffff;
        }

        .cookie-modal-header p {
            margin: 0;
            color: #9ca3af;
            font-size: 14px;
        }

        .cookie-option {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
        }

        .cookie-option-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .cookie-option-header h3 {
            margin: 0;
            font-size: 16px;
            color: #ffffff;
        }

        .cookie-toggle {
            position: relative;
            width: 48px;
            height: 24px;
        }

        .cookie-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .cookie-toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.1);
            transition: 0.3s;
            border-radius: 24px;
        }

        .cookie-toggle-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
        }

        .cookie-toggle input:checked + .cookie-toggle-slider {
            background-color: #6366f1;
        }

        .cookie-toggle input:checked + .cookie-toggle-slider:before {
            transform: translateX(24px);
        }

        .cookie-toggle input:disabled + .cookie-toggle-slider {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .cookie-option-description {
            color: #9ca3af;
            font-size: 13px;
            line-height: 1.5;
        }

        .cookie-modal-buttons {
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }

        .cookie-modal-buttons .cookie-btn {
            flex: 1;
        }

        /* Werbung-Info Box */
        .cookie-info-box {
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 8px;
            padding: 12px 16px;
            margin-top: 12px;
        }

        .cookie-info-box p {
            margin: 0;
            color: #a5b4fc;
            font-size: 13px;
            line-height: 1.5;
        }
    `;

    // CSS einfügen
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Cookie-Banner HTML erstellen (NEUER DSGVO-KONFORMER TEXT)
    function createBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <p>
                        <strong>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/></svg>
                            Wir verwenden Cookies
                        </strong><br>
                        Diese Website nutzt Marketing-Cookies von Google AdSense zur Finanzierung durch Werbung. 
                        <strong>Werbung wird nur angezeigt, wenn Sie Marketing-Cookies akzeptieren.</strong>
                        <a href="datenschutz.html">Mehr erfahren</a>
                    </p>
                </div>
                <div class="cookie-banner-buttons">
                    <button class="cookie-btn cookie-btn-settings" id="cookieSettings">
                        Einstellungen
                    </button>
                    <button class="cookie-btn cookie-btn-decline" id="cookieDecline">
                        Ablehnen
                    </button>
                    <button class="cookie-btn cookie-btn-accept" id="cookieAccept">
                        Akzeptieren
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        return banner;
    }

    // Cookie-Einstellungen Modal erstellen (VERBESSERTER TEXT)
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.id = 'cookieModal';
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2>Cookie-Einstellungen</h2>
                    <p>Wählen Sie, welche Cookies Sie zulassen möchten</p>
                </div>

                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <h3>Notwendige Cookies</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-option-description">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich 
                        und können nicht deaktiviert werden. Sie speichern beispielsweise 
                        Ihre Cookie-Einwilligung.
                    </p>
                </div>

                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <h3>Marketing-Cookies (Google AdSense)</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="marketingCookies">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-option-description">
                        Diese Cookies ermöglichen die Anzeige von Werbung durch Google AdSense. 
                        Ohne diese Cookies wird keine Werbung angezeigt.
                    </p>
                    <div class="cookie-info-box">
                        <p>
                            💡 <strong>Wichtig:</strong> Werbung wird nur bei Zustimmung angezeigt. 
                            Bei Ablehnung sehen Sie keine Werbung, die Website bleibt jedoch voll funktionsfähig.
                        </p>
                    </div>
                </div>

                <div class="cookie-modal-buttons">
                    <button class="cookie-btn cookie-btn-decline" id="modalDecline">
                        Alle ablehnen
                    </button>
                    <button class="cookie-btn cookie-btn-accept" id="modalSave">
                        Auswahl speichern
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Einwilligung speichern
    function saveConsent(marketing) {
        const consent = {
            necessary: true,
            marketing: marketing,
            timestamp: Date.now(),
            expires: Date.now() + (CONSENT_DURATION * 24 * 60 * 60 * 1000)
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        
        // AdSense und Consent Mode nur bei Zustimmung
        if (marketing) {
            initConsentMode();
            updateConsentMode(true);
            loadAdSense();
        }
        
        return consent;
    }

    // Einwilligung laden
    function loadConsent() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return null;
            
            const consent = JSON.parse(stored);
            
            // Prüfen ob abgelaufen
            if (Date.now() > consent.expires) {
                localStorage.removeItem(STORAGE_KEY);
                return null;
            }
            
            return consent;
        } catch (e) {
            return null;
        }
    }

    // AdSense laden - NUR bei Zustimmung (DSGVO/TTDSG konform)
    function loadAdSense() {
        console.log('✓ AdSense wird geladen (Marketing-Cookies akzeptiert)...');
        
        // AdSense-Script laden
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        // WICHTIG: Hier deine echte AdSense Publisher-ID eintragen
        // script.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXX');
        
        script.onload = () => {
            console.log('✓ AdSense erfolgreich geladen');
        };
        
        script.onerror = () => {
            console.error('❌ AdSense konnte nicht geladen werden');
        };
        
        document.head.appendChild(script);
        
        // Visuelle Markierung für Placeholder (Development)
        document.querySelectorAll('.ad-placeholder').forEach(ad => {
            ad.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            ad.style.background = 'rgba(34, 197, 94, 0.05)';
            
            // Info-Text hinzufügen
            const info = document.createElement('div');
            info.style.marginTop = '8px';
            info.style.fontSize = '11px';
            info.style.color = '#22c55e';
            info.textContent = '✓ AdSense aktiv';
            ad.appendChild(info);
        });
    }

    // Banner anzeigen
    function showBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            setTimeout(() => banner.classList.add('show'), 100);
        }
    }

    // Banner verstecken
    function hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // Modal anzeigen
    function showModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Modal verstecken
    function hideModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Initialisierung
    function init() {
        // SCHRITT 1: Prüfen ob bereits Einwilligung vorhanden
        const consent = loadConsent();
        
        if (consent) {
            // Einwilligung vorhanden
            console.log('✓ Cookie-Einwilligung gefunden:', consent);
            if (consent.marketing) {
                // Marketing akzeptiert -> AdSense laden
                initConsentMode();
                updateConsentMode(true);
                loadAdSense();
            }
            return;
        }

        // SCHRITT 2: Keine Einwilligung -> Banner anzeigen (kein AdSense)
        console.log('ℹ Cookie-Banner wird angezeigt (keine Werbung bis zur Zustimmung)');
        const banner = createBanner();
        const modal = createModal();

        // Event Listeners
        document.getElementById('cookieAccept').addEventListener('click', () => {
            saveConsent(true);
            hideBanner();
            hideModal();
        });

        document.getElementById('cookieDecline').addEventListener('click', () => {
            saveConsent(false);
            hideBanner();
            hideModal();
        });

        document.getElementById('cookieSettings').addEventListener('click', () => {
            showModal();
        });

        document.getElementById('modalSave').addEventListener('click', () => {
            const marketing = document.getElementById('marketingCookies').checked;
            saveConsent(marketing);
            hideBanner();
            hideModal();
        });

        document.getElementById('modalDecline').addEventListener('click', () => {
            document.getElementById('marketingCookies').checked = false;
            saveConsent(false);
            hideBanner();
            hideModal();
        });

        // Modal schließen bei Klick außerhalb
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Banner nach kurzem Delay anzeigen
        showBanner();
    }

    // Initialisieren wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Globale Funktion zum Zurücksetzen der Einwilligung (für Datenschutz-Seite)
    window.resetCookieConsent = function() {
        localStorage.removeItem(STORAGE_KEY);
        console.log('✓ Cookie-Einwilligung zurückgesetzt');
        location.reload();
    };

    // Debug-Funktion (kann später entfernt werden)
    window.checkCookieConsent = function() {
        const consent = loadConsent();
        console.log('Current consent:', consent);
        return consent;
    };

})();
