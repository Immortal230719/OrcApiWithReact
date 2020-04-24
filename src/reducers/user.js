import * as R from "ramda";

import {
  AUTH_ME_SUCCESS,
  SUBMIT_LOGIN_FORM_SUCCESS,
  LOGOUT_SUCCESS,
  UPLOAD_AVATAR_SUCCESS,
  DELETE_AVATAR_SUCCESS,
} from "actionTypes";

const initialState = {
  id: null,
  name: "",
  email: "",
  loggedIn: false,
  expires_in: 3600,
  avatar: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_LOGIN_FORM_SUCCESS:
      return R.merge(state, { loggedIn: true });
    case AUTH_ME_SUCCESS:
      return R.mergeAll([state, payload, { loggedIn: true }]);
    case LOGOUT_SUCCESS:
      return R.merge(state, initialState);
    case UPLOAD_AVATAR_SUCCESS:
      return R.merge(state, { avatar: payload });
    case DELETE_AVATAR_SUCCESS:
      return R.merge(state, { avatar: "" });
    default:
      return state;
  }
};
