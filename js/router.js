/**
 * Fileflyr - URL Router
 * Handles client-side routing for /convert/{slug} URLs
 */

import { getConverter } from './converter-registry.js';
import { getIcon } from './icons.js';

class Router {
    constructor() {
        this.currentConverter = null;
        this.currentModule = null;
    }

    /**
     * Initialize router - called on page load
     */
    async init() {
        const path = window.location.pathname;
        console.log('🔀 Router init:', path);

        // Check if we're on a /convert/ page
        if (path.startsWith('/convert/')) {
            const slug = path.replace('/convert/', '').replace(/\/$/, '');
            await this.loadConverter(slug);
        } else if (path === '/convert' || path === '/convert/') {
            // Show converter homepage/list
            this.showConverterList();
        } else {
            // Default: show homepage
            console.log('ℹ️  On homepage');
            this.showHomepage();
        }

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handlePopState();
        });
    }

    /**
     * Load a specific converter
     */
    async loadConverter(slug) {
        console.log(`📂 Loading converter: ${slug}`);

        // Get converter config
        const config = getConverter(slug);
        
        if (!config) {
            this.show404(slug);
            return;
        }

        this.currentConverter = { slug, config };

        // Switch to converter UI
        this.showConverterUI();

        // Update meta tags
        this.updateMetaTags(config);

        // Update page content
        this.updatePageContent(config);

        // Load converter module
        try {
            await this.loadConverterModule(config.module);
        } catch (error) {
            console.error('Failed to load converter module:', error);
            this.showError('Failed to load converter. Please refresh the page.');
        }

        // Load required libraries
        if (config.libraries) {
            await this.loadLibraries(config.libraries);
        }
    }

    /**
     * Show converter UI and hide homepage
     */
    showConverterUI() {
        const homepageContent = document.getElementById('homepageContent');
        const converterUI = document.getElementById('converterUI');
        
        if (homepageContent) homepageContent.style.display = 'none';
        if (converterUI) converterUI.style.display = 'block';
    }

    /**
     * Show homepage and hide converter UI
     */
    showHomepage() {
        const homepageContent = document.getElementById('homepageContent');
        const converterUI = document.getElementById('converterUI');
        
        if (homepageContent) homepageContent.style.display = 'block';
        if (converterUI) converterUI.style.display = 'none';
    }

    /**
     * Update meta tags for SEO
     */
    updateMetaTags(config) {
        // Title
        document.title = config.title;

        // Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = config.description;

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = window.location.href;

        // Open Graph tags
        this.updateOGTag('og:title', config.title);
        this.updateOGTag('og:description', config.description);
        this.updateOGTag('og:url', window.location.href);
        this.updateOGTag('og:type', 'website');

        console.log('✅ Meta tags updated');
    }

    updateOGTag(property, content) {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.content = content;
    }

    /**
     * Update page content (h1, subtitle, etc.)
     */
    updatePageContent(config) {
        // Update h1
        const h1 = document.querySelector('#converterTitle');
        if (h1) h1.textContent = config.h1;

        // Update subtitle
        const subtitle = document.querySelector('#converterSubtitle');
        if (subtitle) subtitle.textContent = config.subtitle;

        // Update icon
        const icon = document.querySelector('#converterIcon');
        if (icon) icon.innerHTML = getIcon(config.icon, 24);

        // Update file input accept
        const fileInput = document.querySelector('#fileInput');
        if (fileInput && config.acceptFormats) {
            fileInput.accept = config.acceptFormats.join(',');
        }

        console.log('✅ Page content updated');
    }

    /**
     * Load converter module dynamically
     */
    async loadConverterModule(moduleName) {
        console.log(`📦 Loading module: ${moduleName}`);

        try {
            const module = await import(`./converters/${moduleName}.js`);
            
            // Initialize converter
            if (module.init) {
                await module.init();
                this.currentModule = module;
                console.log('✅ Converter module loaded');
            } else {
                throw new Error('Module missing init() function');
            }
        } catch (error) {
            console.error('Module load error:', error);
            throw error;
        }
    }

    /**
     * Load external libraries
     */
    async loadLibraries(libraries) {
        const libraryURLs = {
            'jspdf': 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
            'pdf.js': 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
            'pdf-lib': 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js',
            'heic2any': 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js',
            'lamejs': 'https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js'
        };

        for (const lib of libraries) {
            if (window[lib]) continue; // Already loaded

            const url = libraryURLs[lib];
            if (!url) {
                console.warn(`Unknown library: ${lib}`);
                continue;
            }

            await this.loadScript(url);
            console.log(`✅ Loaded library: ${lib}`);
        }
    }

    /**
     * Load external script
     */
    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Show 404 error
     */
    show404(slug) {
        document.title = '404 - Converter Not Found | Fileflyr';
        
        // Show homepage but with error message
        this.showHomepage();
        
        // Create error message in homepage
        const convertersSection = document.getElementById('converters');
        if (convertersSection) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: 16px; margin: 20px auto; max-width: 600px;';
            errorDiv.innerHTML = `
                <div style="font-size: 72px; margin-bottom: 20px;">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <h2 style="font-size: 32px; margin-bottom: 16px;">Converter Not Found</h2>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">
                    The converter "${slug}" doesn't exist.
                </p>
                <a href="/" class="convert-btn" style="display: inline-block; text-decoration: none; padding: 16px 32px; background: var(--primary); color: white; border-radius: 12px;">
                    ← Back to Homepage
                </a>
            `;
            convertersSection.insertBefore(errorDiv, convertersSection.firstChild);
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        alert(message); // TODO: Better error UI
    }

    /**
     * Show converter list (homepage)
     */
    showConverterList() {
        this.showHomepage();
    }

    /**
     * Handle browser back/forward
     */
    async handlePopState() {
        const path = window.location.pathname;
        
        if (path.startsWith('/convert/')) {
            const slug = path.replace('/convert/', '').replace(/\/$/, '');
            await this.loadConverter(slug);
        } else {
            this.showConverterList();
        }
    }

    /**
     * Navigate to converter programmatically
     */
    async navigateTo(slug) {
        const url = `/convert/${slug}`;
        window.history.pushState({}, '', url);
        await this.loadConverter(slug);
    }
}

// Create global router instance
export const router = new Router();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => router.init());
} else {
    router.init();
}
