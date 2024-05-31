import classnames from 'classnames';
import { ElementType, FunctionComponent, ReactNode } from 'react';

export interface LayoutHeaderProps {
    /**
     * An array of elements to be rendered inside the main page container
     */
    children: ReactNode;
    /**
     * If blocks sticks to the top/bottom of the screen when content is scrolled
     */
    position?: 'fixed' | 'sticky';
    /**
     * The tag to use to render the block
     */
    tag?: 'div' | 'header';
}

const defaultProps = {
    align: 'top',
    tag: 'div',
} as const;

export const LayoutHeader: FunctionComponent<LayoutHeaderProps> = ({ children, position, tag }) => {
    const Tag = tag as ElementType;

    const className = classnames({
        [`layout__header--${position}`]: position,
        layout__header: true,
    });

    if (children) {
        return <Tag className={className}>{children}</Tag>;
    } else {
        return null;
    }
};

LayoutHeader.defaultProps = defaultProps;
