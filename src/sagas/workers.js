import { put, call, select } from "redux-saga/effects";

import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  setTimeLifeToken,
  checkTimeLifeToken,
} from "utils/tokenUtils";

import {
  getUrl,
  getPage,
  getSignUpValues,
  getLoginValues,
  getUser,
  getCreateProductForm,
  getProduct,
  getPatchProductForm,
} from "selectors";
import {
  fetchProducts,
  fetchSingleProduct,
  fetchProductsPage,
  submitSignUpForm,
  submitLoginForm,
  authMe,
  logout,
  refresh,
  fetchUploadAvatar,
  fetchDeleteAvatar,
  submitCreateProductForm,
  fetchDeleteProduct,
  fetchPatchProduct,
} from "api";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsStart,
  fetchSingleProductSuccess,
  fetchSingleProductFailure,
  fetchSingleProductStart,
  fetchProductsPageStart,
  fetchProductsPageSuccess,
  fetchProductsPageFailure,
  backdropToggle,
  submitSignUpFormStart,
  submitSignUpFormFailure,
  submitSignUpFormSuccess,
  submitLoginFormStart,
  submitLoginFormFailure,
  submitLoginFormSuccess,
  authMeSuccess,
  logoutSuccess,
  uploadAvatar,
  deleteAvatarSuccess,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  patchProductStart,
  patchProductSuccess,
  patchProductFailure,
} from "actions/sagaWorkerActions";

import { deleteFromProductsStore } from "actions/syncActions";

function* checkRefresh() {
  try {
    const { expires_in } = yield select(getUser);
    let expired = checkTimeLifeToken(expires_in);
    if (expired) {
      yield call(workerRefreshToken);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

export function* workerPatchProduct() {
  try {
    yield put(backdropToggle());
    yield put(patchProductStart());
    const values = yield select(getPatchProductForm);
    const product = yield select(getProduct);
    const token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(fetchPatchProduct, values, token, product.slug);
    yield put(patchProductSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield put(patchProductFailure(error));
  }
}

export function* workerDeleteProduct() {
  try {
    yield put(deleteProductStart());
    const product = yield select(getProduct);
    const token = yield call(getAuthToken);
    const response = yield call(fetchDeleteProduct, product.slug, token);
    if (response.status === 204) {
      yield put(deleteProductSuccess());
      yield put(deleteFromProductsStore(product.id));
    }
  } catch (error) {
    yield put(deleteProductFailure(error));
  }
}

export function* workerCreateProduct() {
  try {
    yield put(createProductStart());
    const values = yield select(getCreateProductForm);
    const token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(submitCreateProductForm, values, token);
    yield put(createProductSuccess(data));
  } catch (error) {
    yield put(createProductFailure(error));
  }
}

export function* workerDeleteAvatar() {
  try {
    const token = yield call(getAuthToken);
    yield call(fetchDeleteAvatar, token);
    yield put(deleteAvatarSuccess());
  } catch (error) {
    console.log(error);
  }
}

export function* workerUploadAvatar({ payload }) {
  if (!payload.type.match("image.*")) {
    return;
  }
  let formData = new FormData();
  formData.append("avatar", payload);
  const token = yield call(getAuthToken);
  const {
    data: { data },
  } = yield call(fetchUploadAvatar, formData, token);
  yield put(uploadAvatar(data.avatar));
}

export function* workerLoadProducts() {
  try {
    yield put(backdropToggle());
    yield call(checkRefresh);
    yield put(fetchProductsStart());
    const data = yield call(fetchProducts);
    yield put(fetchProductsSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* workerLoadSingleProducts() {
  try {
    yield call(checkRefresh);
    yield put(fetchSingleProductStart());
    const url = yield select(getUrl);
    const product = yield call(fetchSingleProduct, url);
    yield put(fetchSingleProductSuccess(product));
  } catch (error) {
    yield put(fetchSingleProductFailure(error));
  }
}

export function* workerLoadProductsPage() {
  try {
    yield call(checkRefresh);
    yield put(fetchProductsPageStart());
    const numOfPage = yield select(getPage);
    const products = yield call(fetchProductsPage, numOfPage);
    yield put(fetchProductsPageSuccess(products));
  } catch (error) {
    yield put(fetchProductsPageFailure(error));
  }
}

export function* workerSubmitSignUp() {
  try {
    yield put(backdropToggle());
    yield put(submitSignUpFormStart());
    const signUpValues = yield select(getSignUpValues);
    const {
      data: { data },
    } = yield call(submitSignUpForm, signUpValues);
    yield put(submitSignUpFormSuccess(data.message));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield put(submitSignUpFormFailure(error));
  }
}

export function* workerSubmitLogin() {
  try {
    yield put(backdropToggle());
    yield put(submitLoginFormStart());
    const LoginValues = yield select(getLoginValues);
    let {
      data: { data },
    } = yield call(submitLoginForm, LoginValues);
    yield call(setAuthToken, data.access_token);
    yield call(setTimeLifeToken);
    yield put(submitLoginFormSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield put(submitLoginFormFailure(error));
  }
}

export function* workerRefreshToken() {
  try {
    let token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(refresh, token);
    yield call(setAuthToken, data.access_token);
    const {
      data: { user },
    } = yield call(authMe, data.access_token);
    yield put(authMeSuccess(user));
  } catch (error) {
    console.log(error);
  }
}

export function* workerAuthMe() {
  try {
    yield put(backdropToggle());
    yield call(checkRefresh);
    let token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(authMe, token);
    yield put(authMeSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    console.log(error);
  }
}

export function* workerLogout() {
  try {
    yield put(backdropToggle());
    let token = yield call(getAuthToken);
    yield call(logout, token);
    yield call(removeAuthToken);
    yield put(logoutSuccess());
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    console.log(error);
  }
}
