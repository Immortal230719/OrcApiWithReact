import * as R from "ramda";

import {
  FETCH_PRODUCTS_PAGE_SUCCESS,
  DELETE_FROM_PRODUCTS_STORE,
} from "actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS_PAGE_SUCCESS:
      return R.merge(state, payload);
    case DELETE_FROM_PRODUCTS_STORE:
      return R.filter((product) => product.id !== payload, state.data);
    default:
      return state;
  }
};
