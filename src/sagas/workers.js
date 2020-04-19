import { put, call, select } from "redux-saga/effects";
import Cookies from 'js-cookie';

import { changeToken, returnToken } from 'utils/changeToken';

import {
  getUrl,
  getPage,
  getSignUpValues,
  getLoginValues
} from "selectors";
import {
  fetchProducts,
  fetchSingleProduct,
  fetchProductsPage,
  submitSignUpForm,
  submitLoginForm,
  authMe,
  logout
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
  logoutSuccess
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
    const newToken = changeToken(data.access_token);  
    const inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set('token', newToken, {
      expires: inSixtyMinutes
    })
    yield put(submitLoginFormSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield put(submitLoginFormFailure(error));
  }
}

export function* workerAuthMe() {
  try {
    yield put(backdropToggle());
    const newToken = Cookies.get('token')
    const oldToken = returnToken(newToken)  
    const { data: { data } } = yield call(authMe, oldToken);
    yield put(authMeSuccess(data))

    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    console.log(error);
  }
}

export function* workerLogout() {
  try {
    yield put(backdropToggle());
    const newToken = Cookies.get('token')
    const oldToken = returnToken(newToken)
    yield call(logout, oldToken)
    Cookies.remove('token');
    yield put(logoutSuccess())    
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    console.log(error);
  }
}
