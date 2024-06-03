import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from 'components/Layout/Layout';
import { HomeContainerErrorBoundary } from 'containers/home/home';
import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { useScrollbarWidth } from 'utils/use-scrollbar-width';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

const Content = () => {
    return (
        <Layout>
            <h1>Demo gallery</h1>
            <HomeContainerErrorBoundary />
        </Layout>
    );
};
const App = () => {
    // defining scrollbar width in current browser environment
    // we'll need it for better experience when modal is opened
    useScrollbarWidth();

    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Content />
            </QueryClientProvider>
        </StrictMode>
    );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(createElement(App));
