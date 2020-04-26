import * as R from "ramda";
import { createSelector } from "reselect";

export const getProducts = (state) => {
  return R.prop("products", state);
};

export const memoProducts = createSelector(getProducts, (products) => products);

export const getProduct = (state) => {
  return R.prop("product", state);
};

export const getBackdrop = (state) => {
  return R.prop("backdrop", state);
};

export const getError = (state) => {
  return R.prop("error", state);
};

export const getOwner = (state) => {
  return R.prop("id", state);
};

export const getUrl = (state) => {
  return R.prop("pathname", state.router.location);
};

export const getPage = (state) => {
  return R.prop("page", state.paginator);
};

export const getSignUpValues = (state) => {
  return R.prop("values", state.form.signUp);
};

export const getLoginValues = (state) => {
  return R.prop("values", state.form.login);
};

export const getLoggedIn = (state) => {
  return R.prop("loggedIn", state.user);
};

export const getToken = (state) => {
  return R.prop("access_token", state.user);
};

export const getUser = (state) => {
  return R.prop("user", state);
};

export const getExpires = (state) => {
  return R.prop("expires_in", state.user);
};

export const getCreateProductForm = (state) => {
  return R.prop("values", state.form.createP);
};

export const getPatchProductForm = (state) => {
  return R.prop("values", state.form.patchP);
};
