import * as R from "ramda";

import { SUBMIT_LOGIN_FORM_SUCCESS } from "actionTypes";

const initialState = {
  name: "",
  email: "",
  access_token: "",
  loggedIn: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_LOGIN_FORM_SUCCESS:
      return R.mergeAll([state, payload, { loggedIn: true }]);
    default:
      return state;
  }
};
