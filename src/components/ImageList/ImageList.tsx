import { ImageCard, ImageCardProps } from 'components/ImageCard/ImageCard';
import { FunctionComponent, useEffect, useState } from 'react';

import './ImageList.scss';

export interface ImageListProps {
    /**
     * A list of items to be rendered.
     */
    images: ImageCardProps[];
    lastImageRef: (node: HTMLDivElement) => void;
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, lastImageRef }) => {
    return (
        <div className="image-list">
            {images.map((image, index) => {
                return (
                    <div
                        className="image-list__item"
                        key={image.id}
                        ref={images.length === index + 1 ? lastImageRef : undefined}
                    >
                        <ImageCard
                            aspectRatio={image.aspectRatio}
                            authorName={image.authorName}
                            id={image.id}
                            imageSrc={`https://picsum.photos/id/${image.id}/300/200`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const ImageGallery: FunctionComponent<ImageListProps> = ({ images, lastImageRef }) => {
    const [columns, setColumns] = useState([[], [], []]);
    const [heights, setHeights] = useState([0, 0, 0]);

    useEffect(() => {
        const newColumns = [...columns];
        const newHeights = [...heights];

        images.slice(columns[0].length + columns[1].length + columns[2].length).forEach((image) => {
            // Find the column with the least height
            // Add the image to that column
            // Update the height of that column
            const minHeightIndex = newHeights.indexOf(Math.min(...newHeights));

            newColumns[minHeightIndex].push(image);
            newHeights[minHeightIndex] += 1 / image.aspectRatio;
        });

        setColumns(newColumns);
        setHeights(newHeights);
    }, [images]);

    return (
        <div className="image-grid">
            {columns.map((column, index) => (
                <div className="image-grid__column" key={index}>
                    {column.map((image) => (
                        <div key={image.id} ref={images[images.length - 1].id === image.id ? lastImageRef : undefined}>
                            <ImageCard
                                aspectRatio={image.aspectRatio}
                                authorName={image.authorName}
                                id={image.id}
                                imageSrc={`https://picsum.photos/id/${image.id}/300/200`}
                            />
                        </div>
                    ))}
                    === {heights[index]} ===
                </div>
            ))}
        </div>
    );
};

export { ImageGallery, ImageList };
