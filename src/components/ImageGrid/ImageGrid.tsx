import { ImageCard, ImageCardProps } from 'components/ImageCard/ImageCard';
import { ImageModal } from 'components/ImageModal/ImageModal';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';

import './ImageGrid.scss';

export interface ImageGridItemProps extends Omit<ImageCardProps, 'onClick'> {
    height: number;
    id: string;
    width: number;
}

export interface ImageGridProps {
    /**
     * A list of items to be rendered.
     */
    images: ImageGridItemProps[];
    lastImageRef: (node: HTMLDivElement) => void;
    isLoading?: boolean;
}

const ImageGrid: FunctionComponent<ImageGridProps> = ({ images, lastImageRef, isLoading }) => {
    const [columns, setColumns] = useState<ImageGridItemProps[][]>([[], [], []]);
    const [, setHeights] = useState<number[]>([0, 0, 0]);
    const [selectedImage, setSelectedImage] = useState<ImageGridItemProps | null>(null);

    useEffect(() => {
        const newColumns: ImageGridItemProps[][] = [[], [], []];
        const newHeights = [0, 0, 0];

        images.forEach((image) => {
            const minHeightIndex = newHeights.indexOf(Math.min(...newHeights));
            newColumns[minHeightIndex].push(image);
            newHeights[minHeightIndex] += 1 / image.aspectRatio;
        });

        setColumns(newColumns);
        setHeights(newHeights);
    }, [images]);

    const openModal = (image: ImageGridItemProps) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        console.log('xxx', selectedImage);
    }, [selectedImage]);

    return (
        <div className="image-grid">
            {columns.map((column, index) => (
                <div className="image-grid__column" key={index}>
                    {column.map((image) => (
                        <ImageCard
                            a11yLabel={image.a11yLabel}
                            aspectRatio={image.aspectRatio}
                            authorName={image.authorName}
                            downloadUrl={image.downloadUrl}
                            elementRef={images[images.length - 1].id === image.id ? lastImageRef : undefined}
                            imageSrc={`https://picsum.photos/id/${image.id}/300/200`}
                            key={image.id}
                            onClick={() => openModal(image)}
                        />
                    ))}
                </div>
            ))}
            {selectedImage ? (
                <ImageModal
                    a11yLabel={selectedImage.a11yLabel}
                    authorName={selectedImage.authorName}
                    downloadUrl={selectedImage.downloadUrl}
                    imageSrc={`https://picsum.photos/id/${selectedImage.id}/${selectedImage.width}/${selectedImage.height}`}
                    isOpen={Boolean(selectedImage)}
                    onClose={closeModal}
                />
            ) : null}
            {isLoading ? (<Loader />) : null}
        </div>
    );
};

export { ImageGrid };
