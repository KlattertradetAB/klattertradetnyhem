import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: 'white', backgroundColor: '#111', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                    <h1 style={{ color: '#ff4444' }}>Something went wrong</h1>
                    <p>The application crashed. Please report the following error:</p>
                    <pre style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '8px', overflow: 'auto', border: '1px solid #444' }}>
                        {this.state.error?.toString()}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'white', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
