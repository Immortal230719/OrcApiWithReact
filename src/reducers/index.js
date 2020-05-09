import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import products from 'reducers/products';
import product from 'reducers/product';
import backdrop from 'reducers/backdrop';
import error from 'reducers/error';
import paginator from 'reducers/paginator';
import user from 'reducers/user';

export default (history) =>
  combineReducers({
    user,
    backdrop,
    products,
    product,
    error,
    paginator,
    router: connectRouter(history),
    form: formReducer,
  });
