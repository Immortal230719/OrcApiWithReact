import {
  FETCH_SINGLE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  RESET_DELETED_PRODUCT,
  PATCH_PRODUCT_SUCCESS,
} from "actionTypes";
import * as R from "ramda";
const initialState = {
  deleted: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return R.merge(state, payload.data);
    case DELETE_PRODUCT_SUCCESS:
      return R.merge(state, { deleted: true });
    case RESET_DELETED_PRODUCT:
      return R.merge(state, { deleted: false });
    case PATCH_PRODUCT_SUCCESS: {
      return R.merge(state, payload);
    }
    default:
      return state;
  }
};
