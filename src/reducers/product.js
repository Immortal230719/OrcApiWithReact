import { FETCH_SINGLE_PRODUCT_SUCCESS } from 'actionTypes';
import * as R from 'ramda';
const initialState = [];

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return R.merge(state, payload.data)
    default:
      return state
  }
}