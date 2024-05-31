import { FunctionComponent } from 'react';

import './Loader.scss';

export interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
    return <div className="loader">Loading...</div>;
};

export { Loader };
