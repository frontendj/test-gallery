import { useStore } from '@nanostores/react';
import { Button } from 'components/Button/Button';
import { LayoutBlock } from 'components/Layout/LayoutBlock';
import ErrorBoundary from 'src/ErrorBoundary';
import { $global, updateGlobal } from 'store/global';
import { Global } from 'types/types';

const HomeContainer = () => {
    const global = useStore($global);

    const handleClick = () => {
        const obj = {
            ...global,
            isSomethingGoingOn: !global.isSomethingGoingOn,
        } as Global;

        updateGlobal(obj);
    };

    return (
        <LayoutBlock align="stretch" isScrollable={true}>
            <p>hello world</p>
            <Button onClick={handleClick} text="Click me" />
            <p>
                Is something going on?
                {global.isSomethingGoingOn ? 'Yes!' : 'No :('}
            </p>
        </LayoutBlock>
    );
};

export function HomeContainerErrorBoundary(props: any) {
    return (
        <ErrorBoundary>
            <HomeContainer {...props} />
        </ErrorBoundary>
    );
}
