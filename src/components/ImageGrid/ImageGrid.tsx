import { Button } from 'components/Button/Button';
import { ImageCard, ImageCardProps } from 'components/ImageCard/ImageCard';
import { ImageModal } from 'components/ImageModal/ImageModal';
import { Loader } from 'components/Loader/Loader';
import { FunctionComponent, useEffect, useState } from 'react';

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
    isLoading?: boolean;
    lastImageRef: (node: HTMLDivElement) => void;
    onClickMore: () => void;
}

const ImageGrid: FunctionComponent<ImageGridProps> = ({ images, isLoading, lastImageRef, onClickMore }) => {
    const [columns, setColumns] = useState<ImageGridItemProps[][]>([[], [], []]);
    const [, setHeights] = useState<number[]>([0, 0, 0]);
    const [selectedImage, setSelectedImage] = useState<ImageGridItemProps | null>(null);
    const [columnCount, setColumnCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setColumnCount(1);
            } else if (window.innerWidth < 800) {
                setColumnCount(2);
            } else {
                setColumnCount(3);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const newColumns: ImageGridItemProps[][] = Array.from({ length: columnCount }, () => []);
        const newHeights = Array.from({ length: columnCount }, () => 0);

        images.forEach((image) => {
            const minHeightIndex = newHeights.indexOf(Math.min(...newHeights));
            newColumns[minHeightIndex].push(image);
            newHeights[minHeightIndex] += 1 / image.aspectRatio;
        });

        setColumns(newColumns);
        setHeights(newHeights);
    }, [images, columnCount]);

    const openModal = (image: ImageGridItemProps) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

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

            {isLoading ? (
                <div className="image-grid__loader">
                    <Loader />
                </div>
            ) : (
                <div className="image-grid__action">
                    <Button onClick={onClickMore} text="Load more" />
                </div>
            )}
        </div>
    );
};

export { ImageGrid };
