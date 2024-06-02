import { FunctionComponent, ReactNode } from 'react';

import './Layout.scss';

export interface LayoutProps {
    children: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    return <main className="layout">{children}</main>;
};
