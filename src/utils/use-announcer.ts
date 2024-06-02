import { useState } from 'react';

export const useAnnouncer = () => {
    const [announcement, setAnnouncement] = useState<string>('');

    const announce = (message: string) => {
        setAnnouncement(message);

        // Clear the announcement after some time to avoid repetitive announcements
        setTimeout(() => {
            setAnnouncement('');
        }, 500);
    };

    return { announce, announcement };
};
