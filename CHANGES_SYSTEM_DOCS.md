# Changes/Changelog System - Dokumentation

## Übersicht

Das Changes-System ermöglicht es dir, einfach neue Updates, Features und Changelog-Einträge zu deiner FileFlyr-Seite hinzuzufügen. Die Einträge werden automatisch auf `/changes.html` angezeigt.

## Neue Einträge hinzufügen

### 1. Öffne `/js/changes-registry.js`

### 2. Füge einen neuen Eintrag zum `CHANGES` Array hinzu:

```javascript
export const CHANGES = [
    {
        date: '2025-02-15',              // Datum im Format YYYY-MM-DD
        title: 'Neuer PDF-Komprimierer',  // Titel des Updates
        type: 'converter',                // Typ: feature, converter, content, improvement
        description: `                    // Beschreibung mit HTML
            <p>Wir haben einen neuen PDF-Komprimierer hinzugefügt!</p>
            <ul>
                <li>Reduziert PDF-Größe um bis zu 70%</li>
                <li>Behält Bildqualität bei</li>
                <li>Funktioniert offline im Browser</li>
            </ul>
        `,
        tags: ['PDF', 'Compression', 'New']  // Tags für Kategorisierung
    },
    
    // Weitere Einträge hier...
];
```

## Update-Typen

Verwende einen dieser Typen für jeden Eintrag:

| Typ | Icon | Farbe | Verwendung |
|-----|------|-------|------------|
| `feature` | 🚀 | Blau | Neue Features oder größere Funktionen |
| `converter` | 🔄 | Grün | Neue Converter hinzugefügt |
| `content` | 📝 | Lila | Content-Updates, neue Artikel, Dokumentation |
| `improvement` | ⚡ | Orange | Verbesserungen, Bugfixes, Optimierungen |

## Beispiele

### Neuer Converter
```javascript
{
    date: '2025-02-10',
    title: 'AVIF to WebP Converter',
    type: 'converter',
    description: `
        <p>Konvertiere moderne AVIF-Bilder zu WebP-Format.</p>
        <ul>
            <li>Schnelle Browser-Konvertierung</li>
            <li>Qualitätseinstellungen</li>
            <li>Batch-Konvertierung unterstützt</li>
        </ul>
    `,
    tags: ['Image', 'AVIF', 'WebP']
}
```

### Content-Update
```javascript
{
    date: '2025-02-08',
    title: '10 neue Converter-Beschreibungen',
    type: 'content',
    description: `
        <p>Wir haben ausführliche Beschreibungen für 10 weitere Converter hinzugefügt:</p>
        <ul>
            <li>Image Compress</li>
            <li>PDF Merge</li>
            <li>Video to Audio</li>
        </ul>
        <p>Jeder Converter hat jetzt detaillierte Anleitungen und FAQs.</p>
    `,
    tags: ['Content', 'Documentation', 'SEO']
}
```

### Feature-Update
```javascript
{
    date: '2025-02-05',
    title: 'Batch-Konvertierung für alle Image-Converter',
    type: 'feature',
    description: `
        <p>Alle Image-Converter unterstützen jetzt Batch-Konvertierung!</p>
        <ul>
            <li>Konvertiere bis zu 50 Bilder gleichzeitig</li>
            <li>Download als ZIP-Archiv</li>
            <li>Fortschrittsanzeige</li>
        </ul>
    `,
    tags: ['Feature', 'Images', 'Batch Processing']
}
```

### Improvement
```javascript
{
    date: '2025-02-03',
    title: 'Performance-Verbesserungen',
    type: 'improvement',
    description: `
        <p>Wir haben die Performance aller Converter optimiert:</p>
        <ul>
            <li>30% schnellere Bildkonvertierung</li>
            <li>Reduzierter Speicherverbrauch</li>
            <li>Bessere Fehlerbehandlung</li>
        </ul>
    `,
    tags: ['Performance', 'Optimization']
}
```

## HTML in Beschreibungen

Du kannst folgende HTML-Elemente verwenden:

- `<p>` - Absätze
- `<ul>` / `<li>` - Listen
- `<strong>` - Fettdruck
- `<em>` - Kursiv
- `<a href="...">` - Links
- `<code>` - Code

**Beispiel mit verschiedenen Elementen:**
```javascript
description: `
    <p>Wir haben <strong>drei neue Features</strong> hinzugefügt:</p>
    <ul>
        <li>Feature A mit <em>verbesserter Performance</em></li>
        <li>Feature B - siehe <a href="/docs">Dokumentation</a></li>
        <li>Feature C mit <code>API-Support</code></li>
    </ul>
    <p>Probiere sie jetzt aus!</p>
`
```

## Reihenfolge

Die Einträge werden automatisch nach Datum sortiert (neueste zuerst). Du musst sie nicht manuell sortieren.

## Filter-Funktionalität

Auf der Changes-Seite können Benutzer nach Typ filtern:
- **All Updates** - Zeigt alle Einträge
- **Features** - Nur neue Features
- **Converters** - Nur neue Converter
- **Content** - Nur Content-Updates
- **Improvements** - Nur Verbesserungen

## Best Practices

1. **Datum**: Immer im Format `YYYY-MM-DD`
2. **Titel**: Kurz und beschreibend (max. 60 Zeichen)
3. **Beschreibung**: 
   - Erste Zeile: Zusammenfassung
   - Liste: Konkrete Punkte/Features
   - Optional: Abschluss-Satz
4. **Tags**: 2-4 relevante Tags
5. **Typ**: Wähle den passendsten Typ

## Deployment

Nach dem Hinzufügen neuer Einträge:
1. Speichere `/js/changes-registry.js`
2. Keine weiteren Änderungen nötig
3. Die Changes-Seite lädt die Einträge automatisch

## Beispiel-Workflow

```javascript
// 1. Öffne changes-registry.js
// 2. Füge neuen Eintrag am Anfang des Arrays ein:

export const CHANGES = [
    {
        date: '2025-02-16',
        title: 'Mein neues Feature',
        type: 'feature',
        description: `<p>Beschreibung...</p>`,
        tags: ['Tag1', 'Tag2']
    },
    
    // ... bestehende Einträge bleiben ...
];

// 3. Speichern - fertig! ✅
```

## Vorteile

✅ Einfaches Hinzufügen ohne HTML-Kenntnisse
✅ Automatische Sortierung und Filterung
✅ Konsistentes Design
✅ SEO-optimiert
✅ Responsiv
✅ Keine Datenbank nötig

---

**Viel Erfolg beim Dokumentieren deiner Updates! 🚀**
