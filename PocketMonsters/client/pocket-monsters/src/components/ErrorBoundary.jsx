import { Component } from "react";
const env = import.meta.env.VITE_ENV;

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    if (env === "dev" || env === "local") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return this.props.FallbackComponent ? (
        <this.props.FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      ) : (
        <div className="default-error-fallback">Something went wrong</div>
      );
    }

    return this.props.children;
  }
}
