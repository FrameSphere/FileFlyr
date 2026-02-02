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
    },

    'jpg-to-png': {
        sections: [
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) ist ein weit verbreitetes Bildformat, das vor allem für Fotos genutzt wird. Es verwendet eine verlustbehaftete Komprimierung, um die Dateigröße möglichst klein zu halten. Dadurch eignet sich JPG hervorragend für Websites, Social Media, Kamerafotos und E-Mails.</p>
                    
                    <p>Ein Nachteil von JPG ist, dass bei jedem Speichern Bildinformationen verloren gehen können. Außerdem unterstützt JPG keine Transparenz.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) ist ein verlustfreies Bildformat, das Bilder ohne Qualitätsverlust speichert. PNG unterstützt Transparenz (Alpha-Kanal) und eignet sich besonders gut für Grafiken, Logos, Icons, Screenshots und Bilder mit scharfen Kanten oder Text.</p>
                    
                    <p>PNG-Dateien sind in der Regel größer als JPG-Dateien, bieten dafür aber eine höhere und stabile Bildqualität.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert JPG to PNG?',
                content: `
                    <p>Die Konvertierung von JPG zu PNG ist sinnvoll, wenn:</p>
                    <ul>
                        <li>eine höhere Bildqualität benötigt wird</li>
                        <li>Bilder weiterbearbeitet werden sollen</li>
                        <li>Grafiken oder Text klar dargestellt werden müssen</li>
                        <li>ein transparenter Hintergrund vorbereitet werden soll</li>
                        <li>wiederholtes Speichern ohne weiteren Qualitätsverlust wichtig ist</li>
                    </ul>
                    <p class="info-note">Auch wenn die ursprüngliche JPG-Qualität nicht verbessert werden kann, verhindert PNG weiteren Verlust bei der Bearbeitung.</p>
                `
            },
            {
                id: 'comparison',
                title: 'JPG vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>JPG:</strong> Verlustbehaftet, kleine Dateigröße, keine Transparenz
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Verlustfrei, größere Dateien, unterstützt Transparenz
                        </div>
                        <div class="comparison-item">
                            <strong>JPG ideal für:</strong> Fotos
                        </div>
                        <div class="comparison-item">
                            <strong>PNG ideal für:</strong> Grafiken, Logos und Screenshots
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does JPG to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your JPG image</li>
                        <li>The image is converted to PNG format</li>
                        <li>No additional compression is applied</li>
                        <li>Download the PNG file instantly</li>
                    </ol>
                    <p>Der Konvertierungsprozess ist schnell und erfolgt ohne manuelle Einstellungen.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>JPG-Bilder für Design-Projekte vorbereiten</li>
                        <li>Screenshots in verlustfreies Format umwandeln</li>
                        <li>Bilder für Logos oder Overlays nutzen</li>
                        <li>Weiterbearbeitung ohne Qualitätsverlust</li>
                        <li>Vorbereitung für Transparenz oder Masken</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Die Konvertierung von JPG zu PNG stellt keine verlorenen Bilddaten wieder her. Sie sorgt jedoch dafür, dass bei weiterer Bearbeitung keine zusätzliche Qualitätsminderung entsteht.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Verbessert die Konvertierung zu PNG die Bildqualität?',
                answer: 'Nein, die Konvertierung kann keine bereits verlorenen JPG-Daten wiederherstellen. Sie verhindert aber weiteren Qualitätsverlust bei zukünftiger Bearbeitung.'
            },
            {
                question: 'Kann ich nach der Konvertierung einen transparenten Hintergrund hinzufügen?',
                answer: 'Die Konvertierung selbst macht den Hintergrund nicht transparent. Sie erstellt aber ein PNG-Format, das Sie anschließend mit Bildbearbeitungssoftware bearbeiten können, um Bereiche transparent zu machen.'
            },
            {
                question: 'Werden meine Dateien auf einen Server hochgeladen?',
                answer: 'Nein. Alle Konvertierungen erfolgen 100% lokal in Ihrem Browser. Ihre Dateien verlassen niemals Ihren Computer.'
            },
            {
                question: 'Warum ist die PNG-Datei größer als das Original-JPG?',
                answer: 'PNG ist ein verlustfreies Format und speichert alle Bildinformationen ohne Komprimierung. Dadurch entstehen größere Dateien, die aber für Weiterbearbeitung besser geeignet sind.'
            }
        ]
    },

    'webp-to-jpg': {
        sections: [
            {
                id: 'what-is-webp',
                title: 'What is a WEBP file?',
                content: `
                    <p>WEBP ist ein modernes Bildformat, das von Google entwickelt wurde, um Bilder effizienter für das Web zu komprimieren. Es unterstützt sowohl verlustbehaftete als auch verlustfreie Komprimierung und kann zusätzlich Transparenz bieten. WEBP-Dateien sind in der Regel deutlich kleiner als JPG- oder PNG-Dateien bei vergleichbarer Bildqualität.</p>
                    
                    <p>Der Nachteil: Nicht alle Programme, ältere Geräte oder Workflows unterstützen WEBP vollständig, insbesondere außerhalb von Webbrowsern.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) ist eines der am weitesten verbreiteten Bildformate. Es verwendet eine verlustbehaftete Komprimierung, um die Dateigröße zu reduzieren, und ist nahezu überall kompatibel – von Betriebssystemen über Bildbearbeitungssoftware bis hin zu Social-Media-Plattformen.</p>
                    
                    <p>JPG unterstützt keine Transparenz, bietet aber ein sehr gutes Verhältnis zwischen Qualität und Dateigröße für Fotos.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert WEBP to JPG?',
                content: `
                    <p>Die Konvertierung von WEBP zu JPG ist sinnvoll, wenn:</p>
                    <ul>
                        <li>maximale Kompatibilität benötigt wird</li>
                        <li>Bilder in Programmen ohne WEBP-Support genutzt werden sollen</li>
                        <li>Dateien per E-Mail oder Messenger verschickt werden</li>
                        <li>Uploads auf Plattformen erfolgen, die kein WEBP akzeptieren</li>
                        <li>Bilder offline weiterverarbeitet werden</li>
                    </ul>
                    <p class="info-note">Bei der Konvertierung wird eine eventuell vorhandene Transparenz automatisch durch einen Hintergrund ersetzt.</p>
                `
            },
            {
                id: 'comparison',
                title: 'WEBP vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>WEBP:</strong> Modern, sehr effiziente Komprimierung, eingeschränkte Unterstützung
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Klassisch, überall unterstützt, keine Transparenz
                        </div>
                        <div class="comparison-item">
                            <strong>WEBP ideal für:</strong> Websites
                        </div>
                        <div class="comparison-item">
                            <strong>JPG ideal für:</strong> Maximale Kompatibilität
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does WEBP to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your WEBP image</li>
                        <li>The image is decoded and converted to JPG format</li>
                        <li>Compression is applied to balance quality and file size</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>Der gesamte Prozess dauert nur wenige Sekunden.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>WEBP-Bilder für ältere Software nutzbar machen</li>
                        <li>Fotos für Social Media oder E-Mail vorbereiten</li>
                        <li>Bilder in Präsentationen oder Dokumenten verwenden</li>
                        <li>Plattform-Kompatibilität sicherstellen</li>
                        <li>Offline-Bearbeitung ermöglichen</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Beim Konvertieren von WEBP zu JPG kann ein geringer Qualitätsverlust auftreten, abhängig von der ursprünglichen WEBP-Komprimierung. Für die meisten Fotos ist dieser Unterschied jedoch kaum sichtbar.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Warum wird WEBP nicht überall unterstützt?',
                answer: 'WEBP ist ein relativ neues Format (2010). Während moderne Browser und Apps es unterstützen, haben ältere Programme und Betriebssysteme oft keine native WEBP-Unterstützung.'
            },
            {
                question: 'Geht Bildqualität bei der Konvertierung verloren?',
                answer: 'Minimal. Beide Formate nutzen verlustbehaftete Komprimierung. Bei der Konvertierung kann ein geringer zusätzlicher Qualitätsverlust auftreten, der bei Fotos meist nicht sichtbar ist.'
            },
            {
                question: 'Was passiert mit transparenten Bereichen im WEBP?',
                answer: 'Da JPG keine Transparenz unterstützt, werden transparente Bereiche durch eine einfarbige Fläche (meist weiß) ersetzt. Sie können die Hintergrundfarbe vor der Konvertierung wählen.'
            },
            {
                question: 'Sind meine Dateien während der Konvertierung sicher?',
                answer: 'Ja, absolut! Alle Konvertierungen erfolgen 100% lokal in Ihrem Browser. Ihre Bilder werden niemals auf einen Server hochgeladen.'
            }
        ]
    },

    'webp-to-png': {
        sections: [
            {
                id: 'what-is-webp',
                title: 'What is a WEBP file?',
                content: `
                    <p>WEBP ist ein modernes Bildformat von Google, das speziell für den Einsatz im Web entwickelt wurde. Es unterstützt sowohl verlustbehaftete als auch verlustfreie Komprimierung und kann Transparenz (Alpha-Kanal) enthalten. Dadurch lassen sich Bilder mit hoher Qualität bei vergleichsweise kleiner Dateigröße darstellen.</p>
                    
                    <p>Ein Nachteil von WEBP ist die eingeschränkte Unterstützung in älterer Software, Desktop-Programmen und bestimmten Workflows.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) ist ein weit verbreitetes, verlustfreies Bildformat. Es speichert Bilddaten ohne Qualitätsverlust und unterstützt Transparenz. PNG eignet sich besonders gut für Grafiken, Logos, Icons, Screenshots und Bilder mit Text oder scharfen Kanten.</p>
                    
                    <p>PNG-Dateien sind in der Regel größer als WEBP-Dateien, bieten dafür aber maximale Kompatibilität und stabile Qualität.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert WEBP to PNG?',
                content: `
                    <p>Die Konvertierung von WEBP zu PNG ist sinnvoll, wenn:</p>
                    <ul>
                        <li>verlustfreie Qualität benötigt wird</li>
                        <li>Transparenz erhalten bleiben soll</li>
                        <li>Bilder weiterbearbeitet werden</li>
                        <li>ältere Software oder Design-Tools genutzt werden</li>
                        <li>Screenshots oder Grafiken exportiert werden</li>
                    </ul>
                    <p class="info-note">PNG ist oft die bessere Wahl für Bearbeitung und Archivierung.</p>
                `
            },
            {
                id: 'comparison',
                title: 'WEBP vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>WEBP:</strong> Moderne Web-Optimierung, kleinere Dateien, eingeschränkte Unterstützung
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Verlustfrei, transparent, weit verbreitet
                        </div>
                        <div class="comparison-item">
                            <strong>WEBP ideal für:</strong> Websites
                        </div>
                        <div class="comparison-item">
                            <strong>PNG ideal für:</strong> Design, Bearbeitung und Archivierung
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does WEBP to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your WEBP image</li>
                        <li>The image is decoded and converted to PNG format</li>
                        <li>Transparency is preserved if present</li>
                        <li>Download the PNG file instantly</li>
                    </ol>
                    <p>Der Konvertierungsprozess erfolgt automatisch und dauert nur wenige Sekunden.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>WEBP-Grafiken in Design-Software öffnen</li>
                        <li>Bilder verlustfrei weiterbearbeiten</li>
                        <li>Transparente Hintergründe behalten</li>
                        <li>Screenshots oder UI-Elemente speichern</li>
                        <li>Kompatibilität mit älteren Programmen sicherstellen</li>
                    </ul>
                `
            },
            {
                id: 'filesize-note',
                title: 'Important note about file size',
                content: `
                    <p>PNG-Dateien sind meist größer als WEBP-Dateien, da PNG keine verlustbehaftete Komprimierung verwendet. Dafür bleibt die Bildqualität vollständig erhalten.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Bleibt die Transparenz bei der Konvertierung erhalten?',
                answer: 'Ja! Sowohl WEBP als auch PNG unterstützen Transparenz (Alpha-Kanal). Transparente Bereiche bleiben bei der Konvertierung vollständig erhalten.'
            },
            {
                question: 'Warum ist die PNG-Datei größer als das WEBP-Original?',
                answer: 'PNG ist ein verlustfreies Format ohne Komprimierung. WEBP hingegen nutzt hocheffiziente Komprimierung. Die größere PNG-Datei bietet aber maximale Qualität und Kompatibilität.'
            },
            {
                question: 'Kann ich mehrere WEBP-Dateien gleichzeitig konvertieren?',
                answer: 'Ja! Unser Converter unterstützt Batch-Konvertierung. Sie können mehrere WEBP-Dateien auf einmal hochladen und in PNG umwandeln.'
            },
            {
                question: 'Werden meine Bilder während der Konvertierung hochgeladen?',
                answer: 'Nein. Alle Konvertierungen erfolgen 100% lokal in Ihrem Browser. Ihre Dateien verlassen niemals Ihren Computer - absolute Privatsphäre garantiert.'
            }
        ]
    },

    'heic-to-jpg': {
        sections: [
            {
                id: 'what-is-heic',
                title: 'What is a HEIC file?',
                content: `
                    <p>HEIC (High Efficiency Image Container) ist ein modernes Bildformat, das von Apple eingeführt wurde und auf dem HEIF-Standard basiert. Es wird vor allem auf iPhones und iPads verwendet, um Fotos in hoher Qualität bei gleichzeitig kleiner Dateigröße zu speichern. HEIC nutzt fortschrittliche Komprimierungstechniken, die bessere Ergebnisse als klassische JPG-Dateien liefern können.</p>
                    
                    <p>Der Nachteil von HEIC ist die eingeschränkte Unterstützung außerhalb des Apple-Ökosystems. Viele Windows-Programme, ältere Geräte und Online-Plattformen können HEIC-Dateien nicht direkt öffnen.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) ist eines der am weitesten verbreiteten Bildformate weltweit. Es bietet eine sehr hohe Kompatibilität mit nahezu allen Betriebssystemen, Programmen, Websites und Social-Media-Plattformen. JPG verwendet eine verlustbehaftete Komprimierung, um ein gutes Gleichgewicht zwischen Bildqualität und Dateigröße zu erreichen.</p>
                    
                    <p>JPG unterstützt keine Transparenz, ist aber ideal für Fotos und den alltäglichen Einsatz.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert HEIC to JPG?',
                content: `
                    <p>Die Konvertierung von HEIC zu JPG ist sinnvoll, wenn:</p>
                    <ul>
                        <li>Fotos auf Windows-PCs oder älteren Geräten genutzt werden sollen</li>
                        <li>Bilder auf Websites oder Social Media hochgeladen werden</li>
                        <li>Dateien per E-Mail oder Messenger verschickt werden</li>
                        <li>maximale Kompatibilität erforderlich ist</li>
                        <li>HEIC von Programmen oder Plattformen nicht unterstützt wird</li>
                    </ul>
                    <p class="info-note">Durch die Umwandlung werden iPhone-Fotos universell nutzbar.</p>
                `
            },
            {
                id: 'comparison',
                title: 'HEIC vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>HEIC:</strong> Moderne Komprimierung, hohe Qualität, eingeschränkte Unterstützung
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Hohe Kompatibilität, kleinere Dateien, keine Transparenz
                        </div>
                        <div class="comparison-item">
                            <strong>HEIC ideal für:</strong> Apple-Geräte
                        </div>
                        <div class="comparison-item">
                            <strong>JPG ideal für:</strong> Plattformübergreifende Nutzung
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does HEIC to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your HEIC image</li>
                        <li>The image is decoded and converted to JPG format</li>
                        <li>Compression is applied to ensure compatibility</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>Der gesamte Prozess ist automatisiert und dauert nur wenige Sekunden.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>iPhone-Fotos auf Windows oder Android verwenden</li>
                        <li>Bilder für Social Media oder Websites vorbereiten</li>
                        <li>HEIC-Dateien in Präsentationen oder Dokumenten einfügen</li>
                        <li>Fotos per E-Mail versenden</li>
                        <li>Kompatibilitätsprobleme vermeiden</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Beim Konvertieren von HEIC zu JPG kann ein geringer Qualitätsverlust auftreten, da JPG eine verlustbehaftete Komprimierung nutzt. Für die meisten Fotos ist dieser Unterschied jedoch kaum sichtbar.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Warum verwendet Apple HEIC statt JPG?',
                answer: 'HEIC bietet eine bessere Komprimierung als JPG bei gleicher oder höherer Bildqualität. Dadurch sparen iPhones Speicherplatz, während die Fotoqualität erhalten bleibt.'
            },
            {
                question: 'Kann ich HEIC-Dateien direkt auf Windows öffnen?',
                answer: 'Windows 10/11 kann HEIC öffnen, wenn die "HEIF-Bilderweiterung" aus dem Microsoft Store installiert ist. Alternativ können Sie HEIC einfach zu JPG konvertieren für sofortige Kompatibilität.'
            },
            {
                question: 'Geht Qualität bei der Konvertierung verloren?',
                answer: 'Minimal. Beide Formate nutzen Komprimierung. Bei typischen iPhone-Fotos ist der Qualitätsunterschi nach der Konvertierung für das menschliche Auge nicht wahrnehmbar.'
            },
            {
                question: 'Werden meine iPhone-Fotos während der Konvertierung hochgeladen?',
                answer: 'Nein! Alle Konvertierungen erfolgen 100% lokal in Ihrem Browser. Ihre persönlichen Fotos verlassen niemals Ihr Gerät - maximale Privatsphäre garantiert.'
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
