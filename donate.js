// donate.js

// List of valid donation methods
const validMethods = ['paypal', 'applepay', 'eft', 'creditcard'];

// Function to handle donation
async function donate(method) {
    // Check if the method is valid
    if (!validMethods.includes(method)) {
        alert('Invalid donation method selected. Please try again.');
        return;
    }

    try {
        // Simulate secure handling of the donation process
        const response = await fetch('/api/donate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method }),
        });

        if (!response.ok) {
            throw new Error('Failed to process the donation. Please try again later.');
        }

        const result = await response.json();
        alert(`Donation successful via ${method}. Thank you for your generosity!`);
        console.log('Donation result:', result);
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Donation error:', error);
    }
}

// Basic protection against DDoS or malicious activity
let requestCount = 0;
const maxRequests = 10; // Maximum allowed requests per minute
const resetInterval = 60000; // 1 minute in milliseconds

setInterval(() => {
    requestCount = 0; // Reset request count every minute
}, resetInterval);

document.body.addEventListener('click', () => {
    requestCount++;
    if (requestCount > maxRequests) {
        alert('Too many requests. Please try again later.');
        throw new Error('Potential DDoS attack detected.');
    }
});

// Additional security measures
document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click to prevent basic content theft
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable certain key combinations (e.g., F12, Ctrl+Shift+I)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
            alert('Developer tools are disabled for security reasons.');
        }
    });
});