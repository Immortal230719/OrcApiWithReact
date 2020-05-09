import { put, call, select } from 'redux-saga/effects';

import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  setTimeLifeToken,
  checkTimeLifeToken,
  parseJwt,
} from 'utils/tokenUtils';

import { getUrl, getPage, getUser, getProduct } from 'selectors';
import {
  fetchSingleProduct,
  fetchProductsPage,
  submitSignUpForm,
  submitLoginForm,
  logout,
  refresh,
  fetchUploadAvatar,
  fetchDeleteAvatar,
  submitCreateProductForm,
  fetchDeleteProduct,
  fetchPatchProduct,
} from 'api';
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
} from 'actions/sagaWorkerActions';

import { errorAction } from 'reducers/error';

import { deleteFromProductsStore } from 'actions/syncActions';

// Error workers

function* ErrorHandling(error) {
  const {
    response: { status },
  } = error;
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
    case 422: {
      message = '';
      const {
        response: {
          data: { errors },
        },
      } = error;
      Object.values(errors).forEach((value) => {
        message += value;
        return message;
      });
      yield put(errorAction({ error: true, message }));
      break;
    }
    default:
      throw error;
  }
}

// Auth workers

export function* workerRefreshToken() {
  try {
    const token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(refresh, token);
    yield call(setAuthToken, data.access_token);
    yield call(setTimeLifeToken);
    const { user } = parseJwt(data.access_token);
    yield put(submitLoginFormSuccess(user));
  } catch (error) {
    yield call(ErrorHandling, error);
  }
}
function* checkRefresh() {
  try {
    const { expiresIn } = yield select(getUser);
    const expired = yield call(checkTimeLifeToken, expiresIn);
    if (expired) {
      yield call(workerRefreshToken);
      return;
    }
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
    const {
      data: { data },
    } = yield call(submitLoginForm, payload);
    const { user } = parseJwt(data.access_token);
    yield call(setAuthToken, data.access_token);
    yield call(setTimeLifeToken);
    yield put(submitLoginFormSuccess(user));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield call(ErrorHandling, error);
  }
}
export function* workerLogout() {
  try {
    yield put(backdropToggle());
    yield call(checkRefresh);
    const token = yield call(getAuthToken);
    yield call(logout, token);
    yield call(removeAuthToken);
    yield put(logoutSuccess());
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield call(ErrorHandling, error);
  }
}

// Products workers

export function* workerPatchProduct({ payload }) {
  try {
    yield put(backdropToggle());
    yield call(checkRefresh);
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
    yield call(checkRefresh);
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
    yield call(checkRefresh);
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

// Avatar workers

export function* workerDeleteAvatar() {
  try {
    yield call(checkRefresh);
    const token = yield call(getAuthToken);
    yield call(fetchDeleteAvatar, token);
    yield put(deleteAvatarSuccess());
  } catch (error) {
    yield call(ErrorHandling, error);
  }
}
export function* workerUploadAvatar({ payload }) {
  try {
    yield call(checkRefresh);
    if (!payload.type.match('image.*')) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', payload);
    const token = yield call(getAuthToken);
    const {
      data: { data },
    } = yield call(fetchUploadAvatar, formData, token);
    yield put(uploadAvatar(data.avatar));
  } catch (error) {
    yield call(ErrorHandling, error);
  }
}
