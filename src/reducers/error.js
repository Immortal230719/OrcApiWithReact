import * as R from "ramda";

import { ERROR, ERROR_RESET } from "actionTypes";

const initialState = {
  error: false,
  message: "",
  submitSucceeded: false,
};

//error actions

export const resetError = () => {
  return {
    type: ERROR_RESET,
  };
};

export const errorAction = (error) => {
  return {
    type: ERROR,
    payload: error,
    error: true,
  };
};

//reducer

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case ERROR:
      return R.merge(state, {
        error: error,
        message: payload.message,
      });
    case ERROR_RESET:
      return R.merge(state, initialState);
    default:
      return state;
  }
};
