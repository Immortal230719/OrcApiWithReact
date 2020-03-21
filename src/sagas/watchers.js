import { takeEvery, all } from "redux-saga/effects";
import {
  LOAD_PRODUCTS,
  LOAD_SINGLE_PRODUCT,
  LOAD_PRODUCTS_PAGE
} from "actionTypes";

import {
  workerLoadProducts,
  workerLoadSingleProducts,
  workerLoadProductsPage
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

export default function* rootSaga() {
  yield all([
    watchLoadProducts(),
    watchLoadSingleProducts(),
    watchLoadProductsPage()
  ]);
}
