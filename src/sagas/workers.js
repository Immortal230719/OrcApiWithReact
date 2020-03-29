import { put, call, select } from "redux-saga/effects";

import { getUrl, getPage, getSignUpValues, getLoginValues } from "selectors";
import {
  fetchProducts,
  fetchSingleProduct,
  fetchProductsPage,
  submitSignUpForm,
  submitLoginForm
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
  submitLoginFormSuccess
} from "actions/sagaWorkerActions";

export function* workerLoadProducts() {
  try {
    yield put(backdropToggle());
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
    yield put(backdropToggle());
    yield put(fetchSingleProductStart());
    const url = yield select(getUrl);
    const product = yield call(fetchSingleProduct, url);
    yield put(fetchSingleProductSuccess(product));
    yield put(backdropToggle());
  } catch (error) {
    yield put(fetchSingleProductFailure(error));
  }
}

export function* workerLoadProductsPage() {
  try {
    yield put(backdropToggle());
    yield put(fetchProductsPageStart());
    const numOfPage = yield select(getPage);
    const products = yield call(fetchProductsPage, numOfPage);
    yield put(fetchProductsPageSuccess(products));
    yield put(backdropToggle());
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
      data: { data }
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
    const {
      data: { data }
    } = yield call(submitLoginForm, LoginValues);
    yield put(submitLoginFormSuccess(data.message));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield put(submitLoginFormFailure(error));
  }
}
