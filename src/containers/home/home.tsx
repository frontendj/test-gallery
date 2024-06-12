import { ImageGrid, ImageGridItemProps } from 'components/ImageGrid/ImageGrid';
import { useEffect, useRef, useState } from 'react';
import ErrorBoundary from 'src/ErrorBoundary';
import { FetchedImage } from 'types/types';

import { useImageLoader } from './useImageLoader';

const mapToImageCardProps = (image: FetchedImage): ImageGridItemProps => {
    const aspectRatio = image.width / image.height;
    const previewWidth = 100;
    const previewHeight = Math.round(previewWidth / aspectRatio);
    return {
        a11yLabel: `Image ${image.id} by ${image.author}`, // this label ideally should be more meaningful
        aspectRatio: aspectRatio,
        authorName: image.author,
        downloadUrl: image.download_url,
        height: image.height,
        id: image.id,
        imageSrc: `https://picsum.photos/id/${image.id}/${previewWidth}/${previewHeight}`,
        width: image.width,
    };
};

const HomeContainer = () => {
    const { error, images, isLoading, lastImageRef, updatePage } = useImageLoader();

    const [imageCards, setImageCards] = useState<ImageGridItemProps[]>([]);
    // Ref to keep track of the length of the mapped images
    const prevLengthRef = useRef(imageCards.length);

    // Updating the mapped images incrementally
    useEffect(() => {
        // Determine new images added since last update
        const newImages = images.slice(imageCards.length);

        // Map only the new images
        const newMappedImages = newImages.map(mapToImageCardProps);

        // Append the new mapped images to the existing ones
        setImageCards((prevProps) => [...prevProps, ...newMappedImages]);

        prevLengthRef.current = images.length;

        // Note: We're intentionally ignoring the dependency on 'imageCards.length' here.
        // This is because 'imageCards' is derived from 'images', and including its length as a dependency
        // would cause this effect to run unnecessarily on every render where 'imageCards' is updated.
        // By using 'prevLengthRef', we ensure that we only map the new images, which is the desired behavior.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    return (
        <>
            <ImageGrid images={imageCards} isLoading={isLoading} lastImageRef={lastImageRef} onClickMore={updatePage} />
            {error?.message ? <div>{error?.message}</div> : null}
        </>
    );
};

export function HomeContainerErrorBoundary(props: any) {
    return (
        <ErrorBoundary>
            <HomeContainer {...props} />
        </ErrorBoundary>
    );
}
