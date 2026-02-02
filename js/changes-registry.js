/**
 * Fileflyr - Changes/Updates Registry
 * Simple system to add changelog entries
 */

export const CHANGES = [
    {
        date: '2025-02-02',
        title: 'Educational Content for All 44 Converters',
        type: 'content', // content, feature, converter, improvement
        description: `
            <p>We've added comprehensive educational content to all 44 converters! Each converter now includes:</p>
            <ul>
                <li>Detailed format explanations</li>
                <li>Conversion guides and best practices</li>
                <li>Comparison tables</li>
                <li>Frequently asked questions</li>
            </ul>
            <p>This makes FileFlyr not just a tool, but also a knowledge resource for file formats.</p>
        `,
        tags: ['Content', 'SEO', 'Education']
    },
    {
        date: '2025-01-15',
        title: 'FileFlyr Launch - 44 Free Converters',
        type: 'feature',
        description: `
            <p>FileFlyr is now live! We've launched with 44 professional file converters, all running 100% in your browser:</p>
            <ul>
                <li>16 Image Converters (PNG, JPG, WEBP, HEIC, and more)</li>
                <li>12 PDF Tools (Convert, Merge, Split, Compress)</li>
                <li>4 Audio Converters (MP3, WAV, Trim, Normalize)</li>
                <li>6 Video Converters (MOV, MP4, GIF, Extract Audio)</li>
                <li>6 Document Converters (TXT, HTML, Markdown, CSV to PDF)</li>
            </ul>
            <p>All conversions are 100% private - your files never leave your device!</p>
        `,
        tags: ['Launch', 'Converters', 'Privacy']
    }
    // Add more entries here following the same pattern
];

/**
 * Get all changes
 */
export function getAllChanges() {
    return CHANGES.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get changes by type
 */
export function getChangesByType(type) {
    return CHANGES.filter(change => change.type === type)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}
