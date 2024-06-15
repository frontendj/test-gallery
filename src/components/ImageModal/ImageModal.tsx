import { A11yVisuallyHidden } from 'components/A11y/A11yVisuallyHidden';
import { Icon } from 'components/Icon/Icon';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import './ImageModal.scss';

export interface ImageModalProps {
    /**
     * The alternative text for the image, used for accessibility
     */
    a11yLabel: string;
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
     * Boolean indicating whether the modal is open or not
     */
    isOpen?: boolean;
    /**
     * Callback function to be called when the modal is requested to be closed.
     * This should be used to update the state controlling the `isOpen` prop.
     */
    onClose: () => void;
    /**
     * Image preview src
     */
    previewSrc: string;
}

const ImageModal: FunctionComponent<ImageModalProps> = ({
    a11yLabel,
    authorName,
    downloadUrl,
    imageSrc,
    isOpen,
    onClose,
    previewSrc,
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleImageLoaded = () => setIsLoaded(true);

    useEffect(() => {
        const dialogNode = dialogRef.current;

        if (dialogNode) {
            if (isOpen) {
                dialogNode.showModal();
                document.body.classList.add('modal-open');
            } else {
                dialogNode.close();
                document.body.classList.remove('modal-open');
            }
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const modalRoot = document.getElementById('modal');
    if (!modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <dialog aria-label={a11yLabel} className="image-modal" onClose={onClose} ref={dialogRef}>
            <button className="image-modal__close" onClick={onClose}>
                <Icon a11yLabel="Close" name="icon-close" />
            </button>

            <div className="image-modal__media">
                <div
                    className="image-modal__preview"
                    style={{
                        backgroundImage: `url("${previewSrc}")`,
                    }}
                />
                <img
                    alt={a11yLabel}
                    className="image-modal__img"
                    onLoad={handleImageLoaded}
                    src={imageSrc}
                    style={{
                        opacity: !isLoaded ? 0 : 1,
                    }}
                />
            </div>

            <div className="image-modal__info">
                <p className="image-modal__author">Author: {authorName}</p>
                <a className="image-modal__action" download href={downloadUrl} rel="noreferrer" target="_blank">
                    Download
                    <A11yVisuallyHidden>(Opens in new window)</A11yVisuallyHidden>
                </a>
            </div>
        </dialog>,
        modalRoot,
    );
};

export { ImageModal };
