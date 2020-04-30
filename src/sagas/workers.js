import { put, call, select } from "redux-saga/effects";

import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  setTimeLifeToken,
  checkTimeLifeToken,
} from "utils/tokenUtils";

import { getUrl, getPage, getUser, getProduct } from "selectors";
import {
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
  fetchSingleProductSuccess,
  fetchSingleProductStart,
  fetchProductsPageStart,
  fetchProductsPageSuccess,
  backdropToggle,
  submitSignUpFormStart,
  submitSignUpFormSuccess,
  submitLoginFormStart,
  submitLoginFormSuccess,
  authMeSuccess,
  logoutSuccess,
  uploadAvatar,
  deleteAvatarSuccess,
  createProductStart,
  createProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  patchProductStart,
  patchProductSuccess,
  setSubmitSuccessed,
} from "actions/sagaWorkerActions";

import { errorAction } from "reducers/error";

import { deleteFromProductsStore } from "actions/syncActions";

//Error workers

function* ErrorHandling(error) {
  const status = error.response.status;
  let message = error.response.data.error;
  switch (status) {
    case 404:
      yield put(errorAction({ error: true, message }));
      break;
    case 400:
      yield put(errorAction({ error: true, message }));
      break;
    case 401:
      yield put(errorAction({ error: true, message }));
      break;
    case 403:
      yield put(errorAction({ error: true, message }));
      break;
    case 422:
      message = "";
      let errors = error.response.data.errors;
      for (let key in errors) {
        message += `${errors[key]} `;
      }
      yield put(errorAction({ error: true, message }));
      break;
    default:
      throw error;
  }
}

//Products workers

export function* workerPatchProduct({ payload }) {
  try {
    yield put(backdropToggle());
    yield put(patchProductStart());
    const product = yield select(getProduct);
    const token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(fetchPatchProduct, payload, token, product.slug);
    yield put(patchProductSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield call(ErrorHandling, error);
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
    yield call(ErrorHandling, error);
  }
}
export function* workerCreateProduct({ payload }) {
  try {
    yield put(createProductStart());
    const token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(submitCreateProductForm, payload, token);
    yield put(createProductSuccess(data));
  } catch (error) {
    yield call(ErrorHandling, error);
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
    yield call(ErrorHandling, error);
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
    yield call(ErrorHandling, error);
  }
}

//Avatar workers

export function* workerDeleteAvatar() {
  try {
    const token = yield call(getAuthToken);
    yield call(fetchDeleteAvatar, token);
    yield put(deleteAvatarSuccess());
  } catch (error) {
    yield call(ErrorHandling, error);
  }
}
export function* workerUploadAvatar({ payload }) {
  try {
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
  } catch (error) {
    yield call(ErrorHandling, error);
  }
}

// Auth workers

function* checkRefresh() {
  try {
    const { expires_in } = yield select(getUser);
    let expired = checkTimeLifeToken(expires_in);
    if (expired) {
      yield call(workerRefreshToken);
      return;
    }
  } catch (error) {
    yield call(ErrorHandling, error);
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
    yield call(ErrorHandling, error);
  }
}
export function* workerSubmitSignUp({ payload }) {
  try {
    yield put(backdropToggle());
    yield put(submitSignUpFormStart());
    const {
      data: { data },
    } = yield call(submitSignUpForm, payload);
    yield put(submitSignUpFormSuccess(data.message));
    yield put(setSubmitSuccessed());
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield call(ErrorHandling, error);
  }
}
export function* workerSubmitLogin({ payload }) {
  try {
    yield put(backdropToggle());
    yield put(submitLoginFormStart());
    let {
      data: { data },
    } = yield call(submitLoginForm, payload);
    yield call(setAuthToken, data.access_token);
    yield call(setTimeLifeToken);
    yield put(submitLoginFormSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield call(ErrorHandling, error);
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
    yield call(ErrorHandling, error);
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
    yield call(ErrorHandling, error);
  }
}
