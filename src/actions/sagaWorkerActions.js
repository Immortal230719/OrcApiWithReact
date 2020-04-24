import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_SINGLE_PRODUCT_START,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE,
  FETCH_PRODUCTS_PAGE_START,
  FETCH_PRODUCTS_PAGE_SUCCESS,
  FETCH_PRODUCTS_PAGE_FAILURE,
  SUBMIT_SIGN_UP_FORM_START,
  SUBMIT_SIGN_UP_FORM_SUCCESS,
  SUBMIT_SIGN_UP_FORM_FAILURE,
  SUBMIT_LOGIN_FORM_START,
  SUBMIT_LOGIN_FORM_SUCCESS,
  SUBMIT_LOGIN_FORM_FAILURE,
  BACKDROP_TOGGLE,
  AUTH_ME_SUCCESS,
  LOGOUT_SUCCESS,
  UPLOAD_AVATAR_SUCCESS,
  DELETE_AVATAR_SUCCESS,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
} from "actionTypes";

export const createProductStart = () => {
  return {
    type: CREATE_PRODUCT_START,
  };
};

export const createProductSuccess = (data) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const createProductFailure = (error) => {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: error,
    error: true,
  };
};

export const uploadAvatar = (img) => {
  return {
    type: UPLOAD_AVATAR_SUCCESS,
    payload: img,
  };
};

export const deleteAvatarSuccess = (payload) => {
  return {
    type: DELETE_AVATAR_SUCCESS,
    payload: payload,
  };
};

export const backdropToggle = () => {
  return {
    type: BACKDROP_TOGGLE,
  };
};

export const fetchProductsStart = () => {
  return {
    type: FETCH_PRODUCTS_START,
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products.data,
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
    error: true,
  };
};

export const fetchSingleProductStart = () => {
  return {
    type: FETCH_SINGLE_PRODUCT_START,
  };
};

export const fetchSingleProductSuccess = (product) => {
  return {
    type: FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: product.data,
  };
};

export const fetchSingleProductFailure = (error) => {
  return {
    type: FETCH_SINGLE_PRODUCT_FAILURE,
    payload: error,
    error: true,
  };
};

export const fetchProductsPageStart = () => {
  return {
    type: FETCH_PRODUCTS_PAGE_START,
  };
};

export const fetchProductsPageSuccess = (product) => {
  return {
    type: FETCH_PRODUCTS_PAGE_SUCCESS,
    payload: product.data,
  };
};

export const fetchProductsPageFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_PAGE_FAILURE,
    payload: error,
    error: true,
  };
};

export const submitSignUpFormSuccess = (response) => {
  return {
    type: SUBMIT_SIGN_UP_FORM_SUCCESS,
    payload: response,
  };
};

export const submitSignUpFormStart = () => {
  return {
    type: SUBMIT_SIGN_UP_FORM_START,
  };
};

export const submitSignUpFormFailure = (error) => {
  return {
    type: SUBMIT_SIGN_UP_FORM_FAILURE,
    payload: error,
    error: true,
  };
};

export const submitLoginFormSuccess = (response) => {
  return {
    type: SUBMIT_LOGIN_FORM_SUCCESS,
    payload: response,
  };
};

export const submitLoginFormStart = () => {
  return {
    type: SUBMIT_LOGIN_FORM_START,
  };
};

export const submitLoginFormFailure = (error) => {
  return {
    type: SUBMIT_LOGIN_FORM_FAILURE,
    payload: error,
    error: true,
  };
};

export const authMeSuccess = (data) => {
  return {
    type: AUTH_ME_SUCCESS,
    payload: data,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
