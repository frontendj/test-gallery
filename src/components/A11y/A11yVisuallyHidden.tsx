import { ElementType, FunctionComponent, ReactNode } from 'react';

export interface A11yVisuallyHiddenProps {
    /**
     * The accessibility properties object. Used to add more a11y control over the component
     */
    a11y?: {
        /**
         * Hides the content from screen readers
         */
        ariaHidden?: boolean;
        /**
         * Announces changed text
         */
        ariaLive?: 'assertive' | 'polite';
    };
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

const A11yVisuallyHidden: FunctionComponent<A11yVisuallyHiddenProps> = ({
    a11y,
    children,
    dangerous,
    id,
    tag = 'span',
}) => {
    const TextTag = tag as ElementType;

    if (children) {
        if (dangerous) {
            return (
                <TextTag
                    aria-hidden={Boolean(a11y?.ariaHidden) || undefined}
                    aria-live={a11y?.ariaLive}
                    className="a11y-visually-hidden"
                    dangerouslySetInnerHTML={{ __html: children }}
                    id={id}
                />
            );
        } else {
            return (
                <TextTag
                    aria-hidden={Boolean(a11y?.ariaHidden) || undefined}
                    aria-live={a11y?.ariaLive}
                    className="a11y-visually-hidden"
                    id={id}
                >
                    {children}
                </TextTag>
            );
        }
    }

    return null;
};

export { A11yVisuallyHidden };
