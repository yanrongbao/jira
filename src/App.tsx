import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import React from "react";
import { FullPageError } from "components/libs";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "screens/unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
