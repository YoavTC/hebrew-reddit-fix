// Regex to detect Hebrew characters
const hebrewRegex = /[\u0590-\u05FF]/;

// Function to apply RTL direction to Hebrew text
function applyHebrewRTL(container = document) {
    container.querySelectorAll('p, h1, h2, h3, a, span, div[data-testid*="post"], div[data-testid*="comment"]').forEach(element => {
        // Skip if already processed to avoid redundant checks
        if (element.hasAttribute('data-hebrew-processed')) {
            return;
        }
        
        if (hebrewRegex.test(element.textContent)) {
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
        }
        
        // Mark as processed
        element.setAttribute('data-hebrew-processed', 'true');
    });
}

// Apply RTL to existing content on page load
applyHebrewRTL();

// Create a MutationObserver to watch for new content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Check if new nodes were added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
                // Only process element nodes (not text nodes)
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Apply Hebrew RTL to the new content
                    applyHebrewRTL(node);
                }
            });
        }
    });
});

// Start observing changes to the document body and its descendants
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also listen for Reddit's specific events if available
document.addEventListener('DOMContentLoaded', () => {
    applyHebrewRTL();
});

// Additional check for single-page app navigation
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        // Small delay to allow content to load after navigation
        setTimeout(() => applyHebrewRTL(), 500);
    }
}).observe(document, { subtree: true, childList: true });
