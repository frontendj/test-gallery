import { FunctionComponent, ReactNode } from 'react';

import './Layout.scss';

export interface LayoutProps {
    /**
     * An array of <LayoutHeader/Content/Footer> nodes to be rendered.
     */
    children: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    return <div className="layout">{children}</div>;
};
