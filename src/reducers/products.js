import * as R from 'ramda';

import {
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_PAGE_SUCCESS
} from 'actionTypes';

const initialState = []

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PRODUCTS_SUCCESS: 
      return R.merge(state, payload)
    case FETCH_PRODUCTS_PAGE_SUCCESS:
      return R.merge(state, payload)
    default:
      return state
  }
}