import { takeEvery, all, takeLeading } from "redux-saga/effects";
import {
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM,
  LOAD_LOGIN_FORM,
  LOAD_AUTH_ME,
  LOGOUT,
  REQUEST_UPLOAD_AVATAR,
  DELETE_AVATAR,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  PATCH_PRODUCT,
} from "actionTypes";

import {
  workerLoadSingleProducts,
  workerLoadProductsPage,
  workerSubmitSignUp,
  workerSubmitLogin,
  workerAuthMe,
  workerLogout,
  workerUploadAvatar,
  workerDeleteAvatar,
  workerCreateProduct,
  workerDeleteProduct,
  workerPatchProduct,
} from "sagas/workers";

function* watchLoadCreateProduct() {
  yield takeEvery(CREATE_PRODUCT, workerCreateProduct);
}

function* watchPatchProduct() {
  yield takeEvery(PATCH_PRODUCT, workerPatchProduct);
}

function* watchDeleteProduct() {
  yield takeEvery(DELETE_PRODUCT, workerDeleteProduct);
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
    watchLoadSingleProducts(),
    watchLoadProductsPage(),
    watchLoadSignUpForm(),
    watchLoadLoginForm(),
    watchLogout(),
    watchLoadAuthMe(),
    watchLoadAvatar(),
    watchDeleteAvatar(),
    watchLoadCreateProduct(),
    watchDeleteProduct(),
    watchPatchProduct(),
  ]);
}
