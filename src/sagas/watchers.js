import { takeEvery, all } from "redux-saga/effects";
import {
  LOAD_PRODUCTS,
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM,
  LOAD_LOGIN_FORM,
  LOAD_AUTH_ME,
  LOGOUT,
  REFRESH_TOKEN
} from "actionTypes";

import {
  workerLoadProducts,
  workerLoadSingleProducts,
  workerLoadProductsPage,
  workerSubmitSignUp,
  workerSubmitLogin,
  workerAuthMe,
  workerLogout,
  workerRefreshToken
} from "sagas/workers";

function* watchLoadProducts() {
  yield takeEvery(LOAD_PRODUCTS, workerLoadProducts);
}

function* watchLoadSingleProducts() {
  yield takeEvery(LOAD_SINGLE_PRODUCT, workerLoadSingleProducts);
}

function* watchLoadProductsPage() {
  yield takeEvery(LOAD_PRODUCTS_PAGE, workerLoadProductsPage);
}

function* watchLoadSignUpForm() {
  yield takeEvery(LOAD_SIGN_UP_FORM, workerSubmitSignUp);
}

function* watchLoadLoginForm() {
  yield takeEvery(LOAD_LOGIN_FORM, workerSubmitLogin);
}

function* watchLoadAuthMe() {
  yield takeEvery(LOAD_AUTH_ME, workerAuthMe);
}

function* watchLogout() {
  yield takeEvery(LOGOUT, workerLogout);
}

function* watchRefreshToken() {
  yield takeEvery(REFRESH_TOKEN, workerRefreshToken)
}

export default function* rootSaga() {
  yield all([
    watchLoadProducts(),
    watchLoadSingleProducts(),
    watchLoadProductsPage(),
    watchLoadSignUpForm(),
    watchLoadLoginForm(),
    watchLogout(),
    watchLoadAuthMe(),
    watchRefreshToken()
  ]);
}
