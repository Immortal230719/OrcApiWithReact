import {
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM
} from "actionTypes";

export const loadProducts = () => {
  return {
    type: LOAD_PRODUCTS
  };
};

export const loadSingleProduct = () => {
  return {
    type: LOAD_SINGLE_PRODUCT
  };
};

export const loadProductsPage = page => {
  return {
    type: LOAD_PRODUCTS_PAGE,
    payload: page
  };
};

export const loadSignUpForm = () => {
  return {
    type: LOAD_SIGN_UP_FORM
  };
};
