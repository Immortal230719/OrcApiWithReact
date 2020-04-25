import {
  SET_CREATED_TO_FALSE,
  RESET_DELETED_PRODUCT,
  DELETE_FROM_PRODUCTS_STORE,
} from "actionTypes";

export const setCreatedToFalse = () => {
  return {
    type: SET_CREATED_TO_FALSE,
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
