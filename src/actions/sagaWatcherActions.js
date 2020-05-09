import {
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM,
  LOAD_LOGIN_FORM,
  LOGOUT,
  REFRESH_TOKEN,
  REQUEST_UPLOAD_AVATAR,
  DELETE_AVATAR,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  PATCH_PRODUCT,
} from 'actionTypes';

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

export const loadSignUpForm = (values) => {
  return {
    type: LOAD_SIGN_UP_FORM,
    payload: values,
  };
};

export const loadLoginForm = (values) => {
  return {
    type: LOAD_LOGIN_FORM,
    payload: values,
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

export const loadCreateProductForm = (values) => {
  return {
    type: CREATE_PRODUCT,
    payload: values,
  };
};

export const loadPatchProductForm = (values) => {
  return {
    type: PATCH_PRODUCT,
    payload: values,
  };
};

export const deleteProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};
