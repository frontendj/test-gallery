import { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error', error, info);
    }
    render() {
        if (this.state.hasError) {
            return <h2>There was an error :( Please go to the main page</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
