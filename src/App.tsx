// import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageError, FullPageLoading } from "components/libs";
import { useAuth } from "context/auth-context";
import React, { Suspense } from "react";
// import { UnauthenticatedApp } from "screens/unauthenticated-app";
import "./App.css";
const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(
  () => import("screens/unauthenticated-app")
);
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
