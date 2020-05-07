import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router";

import CastomBackdrop from "components/Backdrop";
import MyAlert from "components/Alert";
import ErrorBoundary from "components/ErrorBoundary";
import BackgroundAnimation from "components/BackgroundAnimation";

import { routes } from "routes";

const Routes = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });
  const scrollHandler = (e) => {
    let scrollTop = window.pageYOffset;
    setScrollTop(scrollTop);
  };

  const renderRoutes = (routes) => {
    return (
      <Switch>
        {routes.map(({ path, exact, component }) => {
          return (
            <Route key={path} path={path} component={component} exact={exact} />
          );
        })}
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<CastomBackdrop />}>{renderRoutes(routes)}</Suspense>
      <CastomBackdrop />
      <MyAlert />
      <BackgroundAnimation scrollTop={scrollTop} />
    </ErrorBoundary>
  );
};

export default Routes;
