
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_PAGE_START,
  FETCH_PRODUCTS_PAGE_SUCCESS,
  FETCH_PRODUCTS_PAGE_FAILURE,
  FETCH_SINGLE_PRODUCT_START,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE,
  BACKDROP_TOGGLE
} from 'actionTypes';
import {
    fetchProducts as fetchProductsApi,
    fetchProductsPage as fetchProductsPageApi,
    fetchSingleProduct as fetchSingleProductApi
} from 'api';

async function withBackdrop(func, dispatch) {
  dispatch({
    type: BACKDROP_TOGGLE
  })

  await func();

  dispatch({
    type: BACKDROP_TOGGLE
  })
}

export const fetchProducts = () => dispatch => {  

  const fetchData = async () => {
    dispatch({
      type: FETCH_PRODUCTS_START
    })

    try {
      const products = await fetchProductsApi();
      
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products.data
      })    
    } catch (error) {      
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error,
        error: true
      })
    }
  }

  withBackdrop(fetchData, dispatch);
}

export const fetchProductsPage = (numOfPage) => dispatch => {  
  const fetchData = async () => {
    dispatch({
      type: FETCH_PRODUCTS_PAGE_START
    })
  
    try {
      const products = await fetchProductsPageApi(numOfPage);
      
      dispatch({
        type: FETCH_PRODUCTS_PAGE_SUCCESS,
        payload: products.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_PAGE_FAILURE,
        payload: error,
        error: true
      })
    }
  }

  withBackdrop(fetchData, dispatch);
}

export const fetchSingleProduct = (slug) => dispatch => {
  const fetchData = async () => {
    dispatch({
      type: FETCH_SINGLE_PRODUCT_START
    })
  
    try {
      const product = await fetchSingleProductApi(slug);
      
      dispatch({
        type: FETCH_SINGLE_PRODUCT_SUCCESS,
        payload: product.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_SINGLE_PRODUCT_FAILURE,
        payload: error,
        error: true
      })
    }
  }

  withBackdrop(fetchData, dispatch);
}