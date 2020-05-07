import * as R from "ramda";

import {
  // AUTH_ME_SUCCESS,
  SUBMIT_LOGIN_FORM_SUCCESS,
  LOGOUT_SUCCESS,
  UPLOAD_AVATAR_SUCCESS,
  DELETE_AVATAR_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  SET_CREATED_TO_FALSE,
} from "actionTypes";

const initialState = {
  id: null,
  name: "",
  email: "",
  loggedIn: false,
  expires_in: 120,
  avatar: "",
  created: false,
  office_coords: {
    lat: "55.7543",
    long: "37.5744",
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_LOGIN_FORM_SUCCESS:
      return R.mergeAll([state, payload, { loggedIn: true }]);
    // case AUTH_ME_SUCCESS:
    //   return R.mergeAll([state, payload, { loggedIn: true }]);
    case LOGOUT_SUCCESS:
      return R.merge(state, initialState);
    case UPLOAD_AVATAR_SUCCESS:
      return R.merge(state, { avatar: payload });
    case DELETE_AVATAR_SUCCESS:
      return R.merge(state, { avatar: "" });
    case CREATE_PRODUCT_SUCCESS:
      return R.merge(state, { created: true });
    case SET_CREATED_TO_FALSE:
      return R.merge(state, { created: false });
    default:
      return state;
  }
};
