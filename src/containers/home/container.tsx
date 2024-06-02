import { ImageGrid, ImageGridItemProps } from 'components/ImageGrid/ImageGrid';
import ErrorBoundary from 'src/ErrorBoundary';
import { FetchedImage } from 'types/types';
import { useScrollbarWidth } from 'utils/use-scrollbar-width';

import { useImageLoader } from './useImageLoader';

// TODO: useQuery
const HomeContainer = () => {
    const { images, lastImageRef, isLoading } = useImageLoader();

    useScrollbarWidth();

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

    const imageCardPropsArray: ImageGridItemProps[] = images.map(mapToImageCardProps);

    return (
         <ImageGrid images={imageCardPropsArray} lastImageRef={lastImageRef} isLoading={isLoading} />
    );
};

export function HomeContainerErrorBoundary(props: any) {
    return (
        <ErrorBoundary>
            <HomeContainer {...props} />
        </ErrorBoundary>
    );
}
