import { useCallback, useEffect, useRef, useState } from 'react';
import { FetchedImage } from 'types/types';
import { fetchImages } from 'utils/fetch-images';
import { liveAnnouncement } from 'utils/live-announcement';

interface UseImageLoaderResult {
    images: FetchedImage[];
    isLoading: boolean;
    lastImageRef: (node: Element) => void;
    loadMoreImages: () => void;
}

const useImageLoader = (): UseImageLoaderResult => {
    const [images, setImages] = useState<FetchedImage[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const requestedPages = useRef<Set<number>>(new Set());
    const loadedImageIds = useRef<Set<string>>(new Set());

    const loadImages = useCallback(async () => {
        if (requestedPages.current.has(page)) return;
        setLoading(true);
        requestedPages.current.add(page);

        try {
            const newImages = await fetchImages(page, 10);
            const uniqueImages = newImages.filter((image) => !loadedImageIds.current.has(image.id));
            uniqueImages.forEach((image) => loadedImageIds.current.add(image.id));
            setImages((prevImages) => [...prevImages, ...uniqueImages]);
            liveAnnouncement(`${uniqueImages.length} new images loaded`);
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        loadImages();
    }, [page, loadImages]);

    const lastImageRef = useCallback(
        (node: Element) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading],
    );

    const loadMoreImages = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return { images, isLoading, lastImageRef, loadMoreImages };
};

export { useImageLoader };
