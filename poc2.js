// Immediately clear the current page content when script loads
document.documentElement.innerHTML = "";

// Function to fetch and inject index2.html content
async function injectContent() {
    try {
        // Fetch the content of index2.html
        const response = await fetch('index2.html');
        const content = await response.text();
        
        // Create a temporary div to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        // Extract and inject head content first, but filter out scripts
        const headContent = doc.head.innerHTML;
        document.head.innerHTML = headContent;
        
        // Extract and inject body content
        const bodyContent = doc.body.innerHTML;
        document.body.innerHTML = bodyContent;
        
        // Carefully re-execute only safe scripts
        const scripts = document.getElementsByTagName('script');
        Array.from(scripts).forEach(script => {
            if (!script.src && script.textContent && 
                !script.hasAttribute('data-iub-purposes') && // Skip iubenda scripts
                !script.type.includes('application/ld+json') && // Skip JSON-LD scripts
                !script.textContent.includes('_iub') && // Skip iubenda related code
                !script.textContent.includes('dataLayer') // Skip analytics code
            ) {
                try {
                    // Create a new script element instead of using eval
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                } catch (e) {
                    console.error('Error executing script:', e);
                }
            }
        });
        
    } catch (error) {
        console.error('Error injecting content:', error);
    }
}

// Execute the injection
injectContent();
