/**
 * Fileflyr - Converter Content Registry
 * Educational content for each converter page
 */

export const CONVERTER_CONTENT = {
    'png-to-jpg': {
        sections: [
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) ist ein verlustfreies Bildformat, das vor allem für Grafiken, Logos und Bilder mit transparentem Hintergrund verwendet wird. PNG-Dateien speichern jedes Pixel exakt, ohne Qualitätsverlust beim Speichern.</p>
                    
                    <p>Ein großer Vorteil von PNG ist die Unterstützung von Transparenz (Alpha-Kanal), wodurch sich das Format ideal für Webdesign, Icons und UI-Elemente eignet.</p>
                    
                    <p>Der Nachteil von PNG-Dateien ist ihre vergleichsweise große Dateigröße, insbesondere bei Fotos oder komplexen Bildern.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (oder JPEG – Joint Photographic Experts Group) ist eines der am häufigsten genutzten Bildformate weltweit. Es verwendet eine verlustbehaftete Komprimierung, um die Dateigröße deutlich zu reduzieren. Dadurch sind JPG-Dateien ideal für Fotos, Social Media, Websites und E-Mails.</p>
                    
                    <p>JPG unterstützt keine Transparenz, bietet aber ein sehr gutes Verhältnis zwischen Bildqualität und Dateigröße.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert PNG to JPG?',
                content: `
                    <p>Die Konvertierung von PNG zu JPG ist sinnvoll, wenn:</p>
                    <ul>
                        <li>die Dateigröße reduziert werden soll</li>
                        <li>Bilder schneller geladen werden müssen (z. B. Websites)</li>
                        <li>Fotos per E-Mail oder Messenger verschickt werden</li>
                        <li>PNG-Transparenz nicht benötigt wird</li>
                        <li>Speicherplatz gespart werden soll</li>
                    </ul>
                    <p class="info-note">Beim Konvertieren wird ein transparenter Hintergrund automatisch in eine einfarbige Fläche umgewandelt.</p>
                `
            },
            {
                id: 'comparison',
                title: 'PNG vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>PNG:</strong> Verlustfrei, unterstützt Transparenz, größere Dateien
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Verlustbehaftet, keine Transparenz, kleinere Dateien
                        </div>
                        <div class="comparison-item">
                            <strong>PNG eignet sich für:</strong> Grafiken & Logos
                        </div>
                        <div class="comparison-item">
                            <strong>JPG eignet sich für:</strong> Fotos & Web-Inhalte
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PNG to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your PNG image</li>
                        <li>The image is processed and converted to JPG format</li>
                        <li>Compression is applied to reduce file size</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>Der gesamte Prozess dauert nur wenige Sekunden, abhängig von der Dateigröße.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Website-Bilder optimieren</li>
                        <li>Fotos für Social Media vorbereiten</li>
                        <li>Bilder schneller teilen oder hochladen</li>
                        <li>Speicherplatz sparen</li>
                        <li>PNG-Fotos in kompatible Formate umwandeln</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Da JPG eine verlustbehaftete Komprimierung verwendet, kann es zu einem leichten Qualitätsverlust kommen. Für Fotos ist dieser Unterschied meist kaum sichtbar, für Grafiken mit Text oder scharfen Kanten ist PNG oft die bessere Wahl.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Kann ich mehrere PNG-Dateien gleichzeitig konvertieren?',
                answer: 'Ja! Unser Converter unterstützt Batch-Konvertierung. Sie können mehrere PNG-Dateien auf einmal hochladen und in JPG umwandeln.'
            },
            {
                question: 'Werden meine Bilder auf einen Server hochgeladen?',
                answer: 'Nein. Alle Konvertierungen erfolgen 100% lokal in Ihrem Browser. Ihre Dateien verlassen niemals Ihren Computer.'
            },
            {
                question: 'Welche Qualität sollte ich wählen?',
                answer: 'Für die meisten Fotos empfehlen wir 85-90% Qualität. Das bietet ein gutes Gleichgewicht zwischen Dateigröße und Bildqualität.'
            },
            {
                question: 'Was passiert mit transparenten Hintergründen?',
                answer: 'Da JPG keine Transparenz unterstützt, wird der transparente Hintergrund durch eine einfarbige Fläche ersetzt. Sie können die Hintergrundfarbe vor der Konvertierung wählen.'
            }
        ]
    }
};

/**
 * Get content for a specific converter
 */
export function getConverterContent(slug) {
    return CONVERTER_CONTENT[slug] || null;
}

/**
 * Check if converter has content
 */
export function hasContent(slug) {
    return slug in CONVERTER_CONTENT;
}
