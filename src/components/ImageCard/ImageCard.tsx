import { A11yVisuallyHidden } from 'components/A11y/A11yVisuallyHidden';
import { Icon } from 'components/Icon/Icon';
import { CSSProperties, FunctionComponent, Ref } from 'react';

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
     * Ref for the root element
     */
    elementRef?: Ref<HTMLDivElement>;
    /**
     * Image src
     */
    imageSrc: string;
    /**
     * "onClick" handler attached to the element
     * Function to be called when the image card is clicked.
     */
    onClick: () => void;
}

const ImageCard: FunctionComponent<ImageCardProps> = ({
    a11yLabel,
    aspectRatio = 1.5,
    authorName,
    downloadUrl,
    elementRef,
    imageSrc,
    onClick,
}) => {
    return (
        <div className="image-card" ref={elementRef} style={{ '--aspect-ratio': aspectRatio } as CSSProperties}>
            <button className="image-card__media" onClick={onClick}>
                <img alt={a11yLabel} className="image-card__image" loading="lazy" src={imageSrc} />
                <A11yVisuallyHidden>Open in full screen</A11yVisuallyHidden>
            </button>
            <div className="image-card__content">
                <div className="image-card__author">{authorName}</div>
                <a className="image-card__action" href={downloadUrl}>
                    <Icon a11yLabel={`Download ${a11yLabel}`} name="icon-download" />
                </a>
            </div>
        </div>
    );
};

export { ImageCard };
