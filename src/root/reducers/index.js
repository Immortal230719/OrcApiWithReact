import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import products from 'reducers/products';
import product from 'reducers/product';
import backdrop from 'reducers/backdrop';
import error from 'reducers/error';

export default history => combineReducers({
  backdrop,
  products,
  product,
  error,
  router: connectRouter(history)
})