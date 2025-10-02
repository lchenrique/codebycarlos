export const goToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, section: string) => {
    if (e) {
        e.preventDefault();
    }

    // Function to perform the scroll
    const performScroll = (smootherInstance: any) => {
        if (smootherInstance && typeof smootherInstance.scrollTo === 'function') {
            // Try to get the element directly for more reliable targeting
            const targetElement = document.getElementById(section);
            if (targetElement) {
                smootherInstance.scrollTo(targetElement, true);
            } else {
                // Fallback to selector if element not found
                smootherInstance.scrollTo(section, true);
            }
        } else {
            // Final fallback using native browser scroll
            const targetElement = document.getElementById(section);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Check if ScrollSmoother is already available
    const smoother = typeof window !== 'undefined' ? (window as any).ScrollSmootherInstance : null;
    if (smoother) {
        performScroll(smoother);
    } else {
        // Wait for ScrollSmoother to be available (up to 2 seconds)
        let attempts = 0;
        const maxAttempts = 20;

        const checkForSmoother = () => {
            const retrySmoother = (window as any).ScrollSmootherInstance;
            if (retrySmoother) {
                performScroll(retrySmoother);
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(checkForSmoother, 100);
            } else {
                // Final fallback if smoother never becomes available
                const targetElement = document.getElementById(section);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Start checking for smoother
        checkForSmoother();
    }

    // Update the URL
    window.history.pushState(null, '', `#${section}`);
};