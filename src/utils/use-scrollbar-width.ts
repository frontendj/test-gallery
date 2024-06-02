import { useEffect, useMemo, useState } from 'react';

const useScrollbarWidth = (withPx?: boolean) => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    const getScrollbarWidth = () => {
        // Create a dummy element with a scrollbar
        const scrollDiv = document.createElement('div');
        scrollDiv.style.width = '100px';
        scrollDiv.style.height = '100px';
        scrollDiv.style.overflow = 'scroll';
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        document.body.appendChild(scrollDiv);

        // Calculate the scrollbar width
        const calculatedScrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        // Remove the dummy element
        document.body.removeChild(scrollDiv);

        return calculatedScrollbarWidth;
    };

    useEffect(() => {
        const width = getScrollbarWidth();
        setScrollbarWidth(width);

        document.body.style.setProperty('--scrollbar-width', `${width}px`);
        return () => {
            document.body.style.removeProperty('--scrollbar-width');
        };
    }, []);

    return `${useMemo(() => scrollbarWidth, [scrollbarWidth])}${withPx ? 'px' : ''}`;
};

export { useScrollbarWidth };
