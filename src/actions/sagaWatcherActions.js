import {
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM,
  LOAD_LOGIN_FORM,
  LOAD_AUTH_ME,
  LOGOUT,
  REFRESH_TOKEN,
  REQUEST_UPLOAD_AVATAR,
  DELETE_AVATAR,
  LOAD_CREATE_PRODUCT,
  DELETE_PRODUCT,
} from "actionTypes";

export const loadProducts = () => {
  return {
    type: LOAD_PRODUCTS,
  };
};

export const loadSingleProduct = () => {
  return {
    type: LOAD_SINGLE_PRODUCT,
  };
};

export const loadProductsPage = (page) => {
  return {
    type: LOAD_PRODUCTS_PAGE,
    payload: page,
  };
};

export const loadSignUpForm = () => {
  return {
    type: LOAD_SIGN_UP_FORM,
  };
};

export const loadLoginForm = () => {
  return {
    type: LOAD_LOGIN_FORM,
  };
};

export const loadAuthMe = () => {
  return {
    type: LOAD_AUTH_ME,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const refreshToken = () => {
  return {
    type: REFRESH_TOKEN,
  };
};

export const requestUploadAvatar = (file) => {
  return {
    type: REQUEST_UPLOAD_AVATAR,
    payload: file,
  };
};

export const deleteAvatar = () => {
  return {
    type: DELETE_AVATAR,
  };
};

export const loadCreateProductForm = () => {
  return {
    type: LOAD_CREATE_PRODUCT,
  };
};

export const deleteProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};
