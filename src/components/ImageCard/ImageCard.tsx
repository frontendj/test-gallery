import { A11yVisuallyHidden } from 'components/A11y/A11yVisuallyHidden';
import { Icon } from 'components/Icon/Icon';
import { CSSProperties, forwardRef } from 'react';

import './ImageCard.scss';

export interface ImageCardProps {
    /**
     * The alternative text for the image, used for accessibility
     */
    a11yLabel: string;
    /**
     * Image aspect ratio (width / height)
     */
    aspectRatio: number;
    /**
     * Author name
     */
    authorName: string;
    /**
     * The URL to be used for downloading the image.
     */
    downloadUrl: string;
    /**
     * Image src
     */
    imageSrc: string;
    /**
     * "onClick" handler attached to the element
     * Function to be called when the image card is clicked.
     */
    onClick: () => void;
    /**
     * Supported sizes for srcset
     */
    sizes?: string;
    /**
     * Srcset for image
     */
    srcSet?: string;
}

const ImageCard = forwardRef<HTMLDivElement, ImageCardProps>(
    ({ a11yLabel, aspectRatio = 1.5, authorName, downloadUrl, imageSrc, onClick, sizes, srcSet }, ref) => {
        return (
            <div className="image-card" ref={ref} style={{ '--aspect-ratio': aspectRatio } as CSSProperties}>
                <button className="image-card__media" onClick={onClick}>
                    <img
                        alt={a11yLabel}
                        className="image-card__image"
                        loading="lazy"
                        sizes={sizes}
                        src={imageSrc}
                        srcSet={srcSet}
                    />
                    <A11yVisuallyHidden>Open in full screen</A11yVisuallyHidden>
                </button>
                <div className="image-card__content" data-testid="image-card-content">
                    <div className="image-card__author">{authorName}</div>
                    <a className="image-card__action" download href={downloadUrl} rel="noreferrer" target="_blank">
                        <Icon a11yLabel={`Download ${a11yLabel}`} name="icon-download" />
                        <A11yVisuallyHidden>(Opens in new window)</A11yVisuallyHidden>
                    </a>
                </div>
            </div>
        );
    },
);

ImageCard.displayName = 'ImageCard';

export { ImageCard };
