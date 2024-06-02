import { FunctionComponent } from 'react';

import './Icon.scss';

// ideally icon name types should be picked dynamically from icons config
export type IconName = 'icon-close' | 'icon-download';

export interface IconProps {
    /**
     * An accessible label for the icon. This is important for screen readers.
     * If provided, it will be used as the `aria-label` attribute.
     * If not provided, ensure the context in which the icon is used is accessible.
     */
    a11yLabel?: string;
    /**
     * The name of the icon to be displayed
     */
    name: IconName;
}

const Icon: FunctionComponent<IconProps> = ({ a11yLabel, name }) => (
    <svg
        aria-hidden={!a11yLabel ? true : undefined}
        aria-label={a11yLabel}
        className="icon"
        role={a11yLabel ? 'img' : undefined}
        viewBox="0 0 24 24"
    >
        <use xlinkHref={`#${name}`} />
    </svg>
);

export { Icon };
