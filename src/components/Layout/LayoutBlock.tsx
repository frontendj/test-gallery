import classnames from 'classnames';
import { ElementType, FunctionComponent, ReactNode } from 'react';

export interface LayoutBlockProps {
    /**
     * Vertical alignment of the block, based on the margin top/bottom values applied (it's used to differentiate header/footer/content sub-component)
     */
    align?: 'bottom' | 'center' | 'stretch' | 'top';
    /**
     * An array of elements to be rendered inside the main page container
     */
    children: ReactNode;
    isScrollable?: boolean;
    /**
     * The tag to use to render the block
     */
    tag?: 'div' | 'footer' | 'section';
}

export const LayoutBlock: FunctionComponent<LayoutBlockProps> = ({ align, children, isScrollable, tag = 'div' }) => {
    const Tag = tag as ElementType;

    const className = classnames({
        [`layout__block--align-${align}`]: align,
        [`layout__block--scrollable`]: isScrollable,
        layout__block: true,
    });

    if (children) {
        return <Tag className={className}>{children}</Tag>;
    } else {
        return null;
    }
};
