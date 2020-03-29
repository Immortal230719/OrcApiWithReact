import * as R from "ramda";

import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_PAGE_FAILURE,
  FETCH_SINGLE_PRODUCT_FAILURE,
  SUBMIT_SIGN_UP_FORM_FAILURE,
  SUBMIT_LOGIN_FORM_FAILURE,
  ERROR_RESET
} from "actionTypes";

const initialState = {
  error: false,
  message: ""
};

const errorPayloadSelector = (error, payload) => {
  return {
    error: error,
    message: payload.message
  };
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case FETCH_PRODUCTS_FAILURE:
      return R.merge(state, {
        error: error,
        message: payload.message
      });
    case FETCH_PRODUCTS_PAGE_FAILURE:
      return R.merge(state, {
        error: error,
        message: payload.message
      });
    case FETCH_SINGLE_PRODUCT_FAILURE:
      return R.merge(state, {
        error: error,
        message: payload.message
      });
    case SUBMIT_SIGN_UP_FORM_FAILURE:
      return R.merge(state, errorPayloadSelector(error, payload));
    case SUBMIT_LOGIN_FORM_FAILURE:
      return R.merge(state, errorPayloadSelector(error, payload));
    case ERROR_RESET:
      return R.merge(state, initialState);
    default:
      return state;
  }
};
