import React from "react";
import { Switch, Route } from "react-router";

import Main from "containers/Main";
import SingleProduct from "containers/SingleProduct";
import Owner from "containers/Owner";
import CastomBackdrop from "components/Backdrop";
import MyAlert from "components/Alert";
import SignUpForm from "containers/Forms/SignUp";
import LoginForm from "containers/Forms/Login";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/products/:slug" component={SingleProduct} />
        <Route path="/owners/:id" component={Owner} />
        <Route path="/sign-up/" component={SignUpForm} />
        <Route path="/login/" component={LoginForm} />
      </Switch>
      <CastomBackdrop />
      <MyAlert />
    </div>
  );
};

export default Routes;
