import {
  SET_CREATED_TO_FALSE,
  RESET_DELETED_PRODUCT,
  DELETE_FROM_PRODUCTS_STORE,
  SET_SUBMIT_SUCCESSED,
} from "actionTypes";

export const setCreatedToFalse = () => {
  return {
    type: SET_CREATED_TO_FALSE,
  };
};

export const setSubmitSuccessed = () => {
  return {
    type: SET_SUBMIT_SUCCESSED,
  };
};

export const resetDeletedProduct = () => {
  return {
    type: RESET_DELETED_PRODUCT,
  };
};

export const deleteFromProductsStore = (productId) => {
  return {
    type: DELETE_FROM_PRODUCTS_STORE,
    payload: productId,
  };
};
