import * as R from 'ramda';

export const getProducts = state => {  
  return R.prop('products', state);
}

export const getProduct = state => {
  return R.prop('product', state);
}

export const getBackdrop = state => {
  return R.prop('backdrop', state);
}

export const getError = state => {  
  return R.prop('error', state);
}