import { takeEvery, takeLatest, all, takeLeading } from 'redux-saga/effects';
import {
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS_PAGE,
  LOAD_SIGN_UP_FORM,
  LOAD_LOGIN_FORM,
  LOGOUT,
  REQUEST_UPLOAD_AVATAR,
  DELETE_AVATAR,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  PATCH_PRODUCT,
  REFRESH_TOKEN,
} from 'actionTypes';

import {
  workerLoadSingleProducts,
  workerLoadProductsPage,
  workerSubmitSignUp,
  workerSubmitLogin,
  workerLogout,
  workerUploadAvatar,
  workerDeleteAvatar,
  workerCreateProduct,
  workerDeleteProduct,
  workerPatchProduct,
  workerRefreshToken,
} from 'sagas/workers';

function* watchLoadCreateProduct() {
  yield takeLeading(CREATE_PRODUCT, workerCreateProduct);
}

function* watchPatchProduct() {
  yield takeLeading(PATCH_PRODUCT, workerPatchProduct);
}

function* watchDeleteProduct() {
  yield takeLeading(DELETE_PRODUCT, workerDeleteProduct);
}

function* watchLoadSingleProducts() {
  yield takeLatest(LOAD_SINGLE_PRODUCT, workerLoadSingleProducts);
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
  yield takeLeading(LOAD_SIGN_UP_FORM, workerSubmitSignUp);
}

function* watchLoadLoginForm() {
  yield takeEvery(LOAD_LOGIN_FORM, workerSubmitLogin);
}

function* watchRefreshToken() {
  yield takeLeading(REFRESH_TOKEN, workerRefreshToken);
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
    watchLoadAvatar(),
    watchDeleteAvatar(),
    watchLoadCreateProduct(),
    watchDeleteProduct(),
    watchPatchProduct(),
    watchRefreshToken(),
  ]);
}
