import React from "react";
import { Switch, Route } from "react-router";

import Main from "containers/Main";
import Header from "containers/Header";
import SingleProduct from "containers/SingleProduct";
import CastomBackdrop from "components/Backdrop";
import MyAlert from "components/Alert";

const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/products/:slug" component={SingleProduct} />
      </Switch>
      <CastomBackdrop />
      <MyAlert />
    </div>
  );
};

export default Routes;
