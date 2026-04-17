import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-4 text-xl font-semibold text-red-600">レンダリングエラー</h2>
          <pre className="overflow-auto rounded-lg bg-neutral-100 p-4 text-sm text-red-800 dark:bg-neutral-900 dark:text-red-400">
            {this.state.error.message}
            {'\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
