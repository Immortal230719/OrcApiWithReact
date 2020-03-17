import * as R from 'ramda';

import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_PAGE_FAILURE,
  FETCH_SINGLE_PRODUCT_FAILURE,
  ERROR_RESET
} from 'actionTypes';

const initialState = {
  error: false,
  message: ''
}

export default (state = initialState, {type, payload, error}) => {
  switch (type) {
    case FETCH_PRODUCTS_FAILURE:      
      return R.merge(state,{
        error: error,
        message: payload.message
      });
    case FETCH_PRODUCTS_PAGE_FAILURE:
      return R.merge(state,{
        error: error,
        message: payload.message
      });
    case FETCH_SINGLE_PRODUCT_FAILURE:
      return R.merge(state,{
        error: error,
        message: payload.message
      });
    case ERROR_RESET:
      return R.merge(state, initialState);
    default:
      return state;
  }
}