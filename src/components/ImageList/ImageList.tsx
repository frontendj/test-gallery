import { ImageCard, ImageCardProps } from 'components/ImageCard/ImageCard';
import { FunctionComponent } from 'react';

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
            {images.filter(Boolean).map((image) => (
                <div className="image-list__item" key={image.id}>
                    <ImageCard
                        authorName={image.authorName}
                        id={image.id}
                        imageSrc={`https://picsum.photos/id/${image.id}/300/200`}
                    />
                </div>
            ))}

            {images.map((image, index) => {
                return (
                    <div
                        className="image-list__item"
                        key={image.id}
                        ref={images.length === index + 1 ? lastImageRef : undefined}
                    >
                        <ImageCard
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

export { ImageList };
