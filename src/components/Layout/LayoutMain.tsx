import classnames from 'classnames';
import { ElementType, FunctionComponent, ReactNode } from 'react';

export interface LayoutMainProps {
    /**
     * Vertical alignment of the block, based on the margin top/bottom values applied (it's used to differentiate header/footer/content sub-component)
     */
    align?: 'bottom' | 'center' | 'stretch' | 'top';
    /**
     * An array of elements to be rendered inside the main page container
     */
    children: ReactNode;
    /**
     * The tag to use to render the block
     */
    tag?: 'div' | 'main';
}

const defaultProps = {
    align: 'top',
    tag: 'div',
} as const;

export const LayoutMain: FunctionComponent<LayoutMainProps> = ({ align, children, tag }) => {
    const Tag = tag as ElementType;

    const className = classnames({
        [`layout__main--align-${align}`]: align,
        layout__main: true,
    });

    if (children) {
        return (
            <Tag className={className} id="main">
                {children}
            </Tag>
        );
    } else {
        return null;
    }
};

LayoutMain.defaultProps = defaultProps;
