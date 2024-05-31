import { Children, FunctionComponent, ReactNode } from 'react';

export interface ImageListProps {
    /**
     * A list of ImageList items to be rendered.
     */
    children?: ReactNode;
}

const ImageList: FunctionComponent<ImageListProps> = ({ children }) => {
    return (
        <div className="image-list">
            {Children.toArray(children)
                .filter(Boolean)
                .map((child, index) => (
                    <div className="image-list__item" key={index}>
                        {child}
                    </div>
                ))}
        </div>
    );
};

export default ImageList;
