import { Icon } from 'components/Icon/Icon';
import { FunctionComponent, useEffect, useRef } from 'react';
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
}

const ImageModal: FunctionComponent<ImageModalProps> = ({
    a11yLabel,
    authorName,
    downloadUrl,
    imageSrc,
    isOpen,
    onClose,
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialogNode = dialogRef.current;

        if (dialogNode) {
            if (isOpen) {
                dialogNode.showModal();
            } else {
                dialogNode.close();
            }
        }

        return () => {
            if (dialogNode) {
                dialogNode.close();
            }
        };
    }, [isOpen]);

    const modalRoot = document.getElementById('modal');
    if (!modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <dialog className="modal-dialog" onClose={onClose} ref={dialogRef}>
            <button className="modal-close" onClick={onClose}>
                <Icon a11yLabel="Close" name="icon-close" />
            </button>
            <div className="modal-image">
                <img alt={a11yLabel} src={imageSrc} />
            </div>

            <p className="modal-author">{authorName}</p>
            <a href={downloadUrl}>Download</a>
        </dialog>,
        modalRoot,
    );
};

export { ImageModal };
