function liveAnnouncement(text: string, politeness = 'polite', delay = 5000) {
    // Create a new div element
    const liveRegion = document.createElement('div');

    // Set the aria-live attribute
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('role', politeness === 'polite' ? 'status' : 'alert');

    // Set styles to visually hide the element
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.margin = '-1px';
    liveRegion.style.padding = '0';
    liveRegion.style.border = '0';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';

    // Append the element to the body
    document.body.appendChild(liveRegion);

    setTimeout(() => {
        liveRegion.appendChild(document.createTextNode(text));
    }, 100);

    // Remove the element after the specified delay
    setTimeout(() => {
        document.body.removeChild(liveRegion);
    }, delay);
}

export { liveAnnouncement };
