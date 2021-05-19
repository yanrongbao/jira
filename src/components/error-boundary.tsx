import { Component, PropsWithChildren, ReactNode } from "react";

type FallbackCallback = (props: { error: Error | null }) => ReactNode;
// react-error-boundary
export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackCallback }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当自组件抛出异常的，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
