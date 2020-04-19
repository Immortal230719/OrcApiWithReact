import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";

import Main from "containers/Main";
import CastomBackdrop from "components/Backdrop";
import MyAlert from "components/Alert";
import ErrorBoundary from "components/ErrorBoundary";

const Owner = lazy(() => import("containers/Owner"));
const SignUpForm = lazy(() => import("containers/Forms/SignUp"));
const LoginForm = lazy(() => import("containers/Forms/Login"));
const SingleProduct = lazy(() => import("containers/SingleProduct"));
const Profile = lazy(() => import("containers/Profile"));

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CastomBackdrop />}>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/products/:slug" component={SingleProduct} />
          <Route path="/owners/:id" component={Owner} />
          <Route path="/sign-up/" component={SignUpForm} />
          <Route path="/login/" component={LoginForm} />
          <Route path="/profile/" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
      <CastomBackdrop />
      <MyAlert />
    </ErrorBoundary>
  );
};

export default Routes;
