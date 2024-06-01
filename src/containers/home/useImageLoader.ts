import { useCallback, useEffect, useRef, useState } from 'react';
import { FetchedImage } from 'types/types';
import { fetchImages } from 'utils/api-service';

interface UseImageLoaderResult {
    images: FetchedImage[];
    lastImageRef: (node: Element) => void;
    loading: boolean;
}

const useImageLoader = (): UseImageLoaderResult => {
    console.log('useImageLoader');
    const [images, setImages] = useState<FetchedImage[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const requestedPages = useRef<Set<number>>(new Set());
    const loadedImageIds = useRef<Set<string>>(new Set());

    const loadImages = useCallback(async () => {
        console.log('loadImages');
        if (requestedPages.current.has(page)) return;
        setLoading(true);
        requestedPages.current.add(page);

        try {
            const newImages = await fetchImages(page, 30);
            const uniqueImages = newImages.filter((image) => !loadedImageIds.current.has(image.id));
            uniqueImages.forEach((image) => loadedImageIds.current.add(image.id));
            setImages((prevImages) => [...prevImages, ...uniqueImages]);
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
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading],
    );

    return { images, lastImageRef, loading };
};

export { useImageLoader };
