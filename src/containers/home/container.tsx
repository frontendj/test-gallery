import { useStore } from '@nanostores/react';
import { Button } from 'components/Button/Button';
import { ImageList } from 'components/ImageList/ImageList';
import { LayoutBlock } from 'components/Layout/LayoutBlock';
import { Loader } from 'components/Loader/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import ErrorBoundary from 'src/ErrorBoundary';
import { $global, updateGlobal } from 'store/global';
import { Global } from 'types/types';
import { FetchedImage } from 'types/types';
import { fetchImages } from 'utils/api-service';

const HomeContainer = () => {
    const global = useStore($global);

    const handleClick = () => {
        const obj = {
            ...global,
            isSomethingGoingOn: !global.isSomethingGoingOn,
        } as Global;

        updateGlobal(obj);
    };

    const [images, setImages] = useState<FetchedImage[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const requestedPages = useRef<Set<number>>(new Set());
    const loadedImageIds = useRef<Set<string>>(new Set());

    const loadImages = useCallback(async () => {
        console.log('loadImages', page, requestedPages.current, images);

        if (requestedPages.current.has(page)) return;
        setLoading(true);
        requestedPages.current.add(page);

        try {
            const newImages = await fetchImages(page);
            const uniqueImages = newImages.filter((image) => !loadedImageIds.current.has(image.id));
            console.log('uniqueImages', uniqueImages);
            uniqueImages.forEach((image) => loadedImageIds.current.add(image.id));
            setImages((prevImages) => [...prevImages, ...uniqueImages]);
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);

            console.log('finally', images);
        }
    }, [page, images]);

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

    const mapToImageCardProps = (image: FetchedImage) => ({
        aspectRatio: image.width / image.height,
        authorName: `${image.author} - ${image.id}`,
        id: image.id,
        imageAlt: `Image by ${image.author}`,
        imageSrc: `https://picsum.photos/id/${image.id}/300/200`,
        title: `Image by ${image.author}`,
    });

    const imageCardPropsArray = images.map(mapToImageCardProps);

    return (
        <LayoutBlock align="stretch">
            <p>hello world</p>
            <Button onClick={handleClick} text="Click me" />
            <p>
                Is something going on?
                {global.isSomethingGoingOn ? 'Yes!' : 'No :('}
            </p>
            <ImageList images={imageCardPropsArray} lastImageRef={lastImageRef} />
            {loading && <Loader />}
        </LayoutBlock>
    );
};

export function HomeContainerErrorBoundary(props: any) {
    return (
        <ErrorBoundary>
            <HomeContainer {...props} />
        </ErrorBoundary>
    );
}
