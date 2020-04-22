import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";

import Main from "containers/Main";
import CastomBackdrop from "components/Backdrop";
import MyAlert from "components/Alert";
import ErrorBoundary from "components/ErrorBoundary";
import LoginForm from "containers/Forms/Login";
import SignUpForm from "containers/Forms/SignUp";
import Profile from "containers/Profile";

const Owner = lazy(() => import("containers/Owner"));
const SingleProduct = lazy(() => import("containers/SingleProduct"));

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
