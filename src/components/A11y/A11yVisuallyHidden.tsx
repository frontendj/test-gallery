import { ElementType, FunctionComponent, ReactNode } from 'react';

import './A11yVisuallyHidden.scss';

export interface A11yVisuallyHiddenProps {
    /**
     * Child nodes to be rendered
     */
    children?: ReactNode;
    /**
     * If the string/node needs to be rendered as HTML
     */
    dangerous?: boolean;
    /**
     * The DOM "id" property for the "input" element
     */
    id?: string;
    /**
     * Which tag to use for the dynamic elements
     */
    tag?: 'div' | 'h1' | 'h2' | 'h3' | 'span';
}

const A11yVisuallyHidden: FunctionComponent<A11yVisuallyHiddenProps> = ({ children, dangerous, id, tag = 'span' }) => {
    const TextTag = tag as ElementType;

    if (children) {
        if (dangerous) {
            return <TextTag className="a11y-visually-hidden" dangerouslySetInnerHTML={{ __html: children }} id={id} />;
        } else {
            return (
                <TextTag className="a11y-visually-hidden" id={id}>
                    {children}
                </TextTag>
            );
        }
    }

    return null;
};

export { A11yVisuallyHidden };
