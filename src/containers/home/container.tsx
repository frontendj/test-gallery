import { ImageList } from 'components/ImageList/ImageList';
import { LayoutBlock } from 'components/Layout/LayoutBlock';
import { Loader } from 'components/Loader/Loader';
import ErrorBoundary from 'src/ErrorBoundary';
import { FetchedImage } from 'types/types';

import { useImageLoader } from './useImageLoader';

// Technically fetched images have their own aspect ratio, but for illustration of gallery layout
// we artificially change the aspect ratio of previews
const ASPECT_RATIOS = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2];
function getRandomValueFromArray() {
    const randomIndex = Math.floor(Math.random() * ASPECT_RATIOS.length);
    return ASPECT_RATIOS[randomIndex];
}

// TODO: useQuery
const HomeContainer = () => {
    console.log('HomeContainer');
    const { images, lastImageRef, loading } = useImageLoader();

    const mapToImageCardProps = (image: FetchedImage) => {
        const randomAspectRatio = getRandomValueFromArray();
        const width = 100;
        const height = width / randomAspectRatio;
        return {
            aspectRatio: randomAspectRatio,
            authorName: `${image.author} - ${image.id}`,
            id: image.id,
            imageAlt: `Image by ${image.author}`,
            imageSrc: `https://picsum.photos/id/${image.id}/${width}/${height}`,
            //imageSrc: `https://picsum.photos/id/870/200/300?grayscale&blur=2`,
            title: `Image by ${image.author}`,
        };
    };

    const imageCardPropsArray = images.map(mapToImageCardProps);

    return (
        <LayoutBlock align="stretch">
            <ImageList images={[...new Set(imageCardPropsArray)]} lastImageRef={lastImageRef} />
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
