import {
  FETCH_SINGLE_PRODUCT_START,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_PAGE_START,
  FETCH_PRODUCTS_PAGE_SUCCESS,
  SUBMIT_SIGN_UP_FORM_START,
  SUBMIT_SIGN_UP_FORM_SUCCESS,
  SUBMIT_LOGIN_FORM_START,
  SUBMIT_LOGIN_FORM_SUCCESS,
  BACKDROP_TOGGLE,
  AUTH_ME_SUCCESS,
  LOGOUT_SUCCESS,
  UPLOAD_AVATAR_SUCCESS,
  DELETE_AVATAR_SUCCESS,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  PATCH_PRODUCT_START,
  PATCH_PRODUCT_SUCCESS,
  SET_SUBMIT_SUCCESSED,
} from "actionTypes";

//Products actions

export const patchProductStart = () => {
  return {
    type: PATCH_PRODUCT_START,
  };
};
export const patchProductSuccess = (product) => {
  return {
    type: PATCH_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const deleteProductStart = () => {
  return {
    type: DELETE_PRODUCT_START,
  };
};
export const deleteProductSuccess = () => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
  };
};

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

//Avatar actions

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

//Backdrop toggle action

export const backdropToggle = () => {
  return {
    type: BACKDROP_TOGGLE,
  };
};

//Auth actions

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
export const setSubmitSuccessed = () => {
  return {
    type: SET_SUBMIT_SUCCESSED,
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
