import { takeEvery, all, takeLeading } from "redux-saga/effects";
import {
  LOAD_PRODUCTS,
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM,
  LOAD_LOGIN_FORM,
  LOAD_AUTH_ME,
  LOGOUT,
  REQUEST_UPLOAD_AVATAR,
  DELETE_AVATAR,
  LOAD_CREATE_PRODUCT,
} from "actionTypes";

import {
  workerLoadProducts,
  workerLoadSingleProducts,
  workerLoadProductsPage,
  workerSubmitSignUp,
  workerSubmitLogin,
  workerAuthMe,
  workerLogout,
  workerUploadAvatar,
  workerDeleteAvatar,
  workerCreateProduct,
} from "sagas/workers";

function* watchLoadCreateProduct() {
  yield takeEvery(LOAD_CREATE_PRODUCT, workerCreateProduct);
}

function* watchLoadProducts() {
  yield takeEvery(LOAD_PRODUCTS, workerLoadProducts);
}

function* watchLoadSingleProducts() {
  yield takeLeading(LOAD_SINGLE_PRODUCT, workerLoadSingleProducts);
}

function* watchLoadAvatar() {
  yield takeLeading(REQUEST_UPLOAD_AVATAR, workerUploadAvatar);
}

function* watchDeleteAvatar() {
  yield takeLeading(DELETE_AVATAR, workerDeleteAvatar);
}

function* watchLoadProductsPage() {
  yield takeLeading(LOAD_PRODUCTS_PAGE, workerLoadProductsPage);
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

export default function* rootSaga() {
  yield all([
    watchLoadProducts(),
    watchLoadSingleProducts(),
    watchLoadProductsPage(),
    watchLoadSignUpForm(),
    watchLoadLoginForm(),
    watchLogout(),
    watchLoadAuthMe(),
    watchLoadAvatar(),
    watchDeleteAvatar(),
    watchLoadCreateProduct(),
  ]);
}
