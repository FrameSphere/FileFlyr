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