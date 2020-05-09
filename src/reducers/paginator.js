import { LOAD_PRODUCTS_PAGE } from 'actionTypes';

const initialState = {
  page: 1,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS_PAGE:
      return {
        ...state,
        page: payload,
      };
    default:
      return state;
  }
};
