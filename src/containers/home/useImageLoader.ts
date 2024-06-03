import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FetchedImage } from 'types/types';
import { fetchImages } from 'utils/fetch-images';
import { liveAnnouncement } from 'utils/live-announcement';

const LIMIT = 30;

interface UseImageLoaderResult {
    error: Error | null;
    images: FetchedImage[];
    isLoading: boolean;
    lastImageRef: (node: Element) => void;
    updatePage: () => void;
}

const useImageLoader = (): UseImageLoaderResult => {
    const [images, setImages] = useState<FetchedImage[]>([]);
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadedImageIds = useRef<Set<string>>(new Set());

    // cached results of server request
    const results = useQuery({
        queryFn: fetchImages,
        queryKey: ['images', page, LIMIT],
    });
    const isLoading = results.isLoading;

    console.log(results);

    // setting / resetting observer function for the (last) image
    const lastImageRef = useCallback(
        (node: Element) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updatePage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading],
    );

    // loading new images on page / results change
    useEffect(() => {
        const newImages = results.data;

        if (newImages) {
            // we need to check for unique names in case of API response is changed while we are using it
            const uniqueImages = newImages.filter((image) => !loadedImageIds.current.has(image.id));
            uniqueImages.forEach((image) => loadedImageIds.current.add(image.id));
            setImages((prevImages) => [...prevImages, ...uniqueImages]);

            // screen reader experience requires feedback on data load
            liveAnnouncement(`${uniqueImages.length} new images loaded`);
        }
    }, [page, results.data]);

    const updatePage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return { error: results.error, images, isLoading, lastImageRef, updatePage };
};

export { useImageLoader };
