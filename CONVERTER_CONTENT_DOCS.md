# Converter Content System - Dokumentation

## Übersicht

Das Converter Content System ermöglicht es, einheitliche informative Inhalte für alle Converter-Seiten zu erstellen. Die Inhalte werden automatisch vom Router geladen und unterhalb des Converters angezeigt.

## Struktur

### Dateien
- `/js/converter-content.js` - Registry mit allen Converter-Inhalten
- `/css/style.css` - Styles für Info-Sektionen (ab Zeile ~1290)
- `/js/router.js` - Router lädt die Inhalte automatisch
- `/index.html` - Container `#converterInfo` für Inhalte

## Neuen Converter-Inhalt hinzufügen

### 1. Content in `converter-content.js` eintragen

```javascript
export const CONVERTER_CONTENT = {
    'converter-slug': {  // Muss mit dem Slug aus converter-registry.js übereinstimmen
        sections: [
            {
                id: 'unique-section-id',
                title: 'Sektions-Titel',
                content: `
                    <p>Text mit HTML...</p>
                    <ul>
                        <li>Liste</li>
                    </ul>
                `
            }
        ],
        
        faq: [
            {
                question: 'Frage?',
                answer: 'Antwort...'
            }
        ]
    }
};
```

### 2. Verfügbare HTML-Elemente

#### Standard-Elemente
- `<p>` - Paragraphen
- `<ul>` / `<li>` - Listen (Marker automatisch in Primary-Color)
- `<ol>` / `<li>` - Nummerierte Listen
- `<strong>` - Fettdruck
- `<a>` - Links

#### Spezielle Klassen

**Info-Note** (hervorgehobene Box):
```html
<p class="info-note">Wichtiger Hinweis...</p>
```

**Comparison Grid** (Vergleichsraster):
```html
<div class="comparison-grid">
    <div class="comparison-item">
        <strong>Label</strong>
        Beschreibung...
    </div>
</div>
```

**Steps List** (nummerierte Schritte mit Kreisen):
```html
<ol class="steps-list">
    <li>Schritt 1</li>
    <li>Schritt 2</li>
</ol>
```

### 3. Best Practices

#### Content-Struktur
1. **What is Format A?** - Erklärung des Quellformats
2. **What is Format B?** - Erklärung des Zielformats
3. **Why convert?** - Gründe für die Konvertierung
4. **Comparison** - Vergleich der Formate
5. **How it works** - Funktionsweise
6. **Use cases** - Anwendungsfälle
7. **Quality/Notes** - Wichtige Hinweise

#### FAQ-Struktur
- 4-6 häufige Fragen
- Kurze, präzise Antworten
- Technische Fragen bevorzugen
- Privacy/Security-Fragen einbeziehen

### 4. Styling-Prinzipien

- Alle Sektionen haben konsistenten Abstand
- Headers haben einen farbigen Balken am linken Rand
- Listen verwenden Primary-Color für Marker
- FAQ-Items haben hover-Effekt
- Mobile-Responsive durch CSS-Grid

## Beispiel: PNG to JPG (vollständig)

Siehe `/js/converter-content.js` für ein vollständiges Beispiel mit allen Elementen.

## Deployment

Nach dem Hinzufügen neuer Inhalte:
1. Datei `converter-content.js` speichern
2. Keine weiteren Änderungen nötig - Router lädt automatisch
3. Testen auf `/convert/converter-slug`

## Vorteile

✅ Einheitliches Design für alle Converter
✅ SEO-optimiert durch strukturierte Inhalte
✅ Automatisches Laden durch Router
✅ Responsive Design
✅ Einfach erweiterbar
✅ Wartungsfreundlich
