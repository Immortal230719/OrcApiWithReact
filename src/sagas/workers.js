import { put, call, select} from "redux-saga/effects";

import {
  getAuthToken, 
  setAuthToken, 
  removeAuthToken,
  setTimeLifeToken,
  checkTimeLifeToken
} from 'utils/tokenUtils';

import {
  getUrl,
  getPage,
  getSignUpValues,
  getLoginValues,
  getUser
} from "selectors";
import {
  fetchProducts,
  fetchSingleProduct,
  fetchProductsPage,
  submitSignUpForm,
  submitLoginForm,
  authMe,
  logout,
  refresh
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

function* checkRefresh() {
  try {
    const { expires_in } = yield select(getUser)
    let expired = checkTimeLifeToken(expires_in)
    if ( expired ) {
      yield call(workerRefreshToken)
      return
    }  
  } catch (error) {
    console.log(error);  
  }
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
    yield put(backdropToggle());
    yield call(checkRefresh);
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
    yield call(checkRefresh)
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
    let {
      data: { data }
    } = yield call(submitLoginForm, LoginValues); 
    yield call(setAuthToken, data.access_token)
    yield call(setTimeLifeToken)
    yield put(submitLoginFormSuccess(data));
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    yield put(submitLoginFormFailure(error));
  }
}

export function* workerRefreshToken() {
  try {
    let token = yield call(getAuthToken)
    const { data: { data } } = yield call(refresh, token);
    yield call(setAuthToken, data.access_token)
    const { data: { user } } = yield call(authMe, data.access_token);
    yield put(authMeSuccess(user))
  } catch (error) {
    console.log(error);
    
  }
}

export function* workerAuthMe() {
  try {
    yield put(backdropToggle());
    yield call(checkRefresh)
    let token = yield call(getAuthToken) 
    const { data: { data } } = yield call(authMe, token);
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
    let token = yield call(getAuthToken)
    yield call(logout, token)
    yield call(removeAuthToken)
    yield put(logoutSuccess())    
    yield put(backdropToggle());
  } catch (error) {
    yield put(backdropToggle());
    console.log(error);
  }
}