import { A11yVisuallyHidden } from 'components/A11y/A11yVisuallyHidden';
import { Button } from 'components/Button/Button';
import { CSSProperties, FunctionComponent } from 'react';

import './ImageCard.scss';

export interface ImageCardProps {
    aspectRatio?: number;
    /**
     * Author name
     */
    authorName: string;
    id: string;
    imageAlt?: string;
    imageSrc: string;
    /**
     * "onClick" handler attached to the element
     */
    onClick?: () => void;
    title?: string;
}

const ImageCard: FunctionComponent<ImageCardProps> = ({
    aspectRatio = 1.5,
    authorName,
    imageAlt = '',
    imageSrc,
    title,
}) => {
    return (
        <div className="image-card" style={{ '--aspect-ratio': aspectRatio } as CSSProperties}>
            <div className="image-card__media">
                <img alt={imageAlt} className="image-card__image" src={imageSrc} />
            </div>
            <div className="image-card__content">
                <div className="image-card__author">{authorName}</div>
                <div className="image-card__action">
                    <Button
                        text={
                            <>
                                Download
                                <A11yVisuallyHidden>{title}</A11yVisuallyHidden>
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export { ImageCard };
