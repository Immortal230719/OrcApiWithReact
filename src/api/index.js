import axios from 'axios';

const url = 'https://api.app2000.host/api/v1'

export const fetchProducts = async () => {
  return await axios.get(`${url}/products`);
}

export const fetchProductsPage = async (numOfPage) => {
  const resolve = await axios.get(`${url}/products?page=${numOfPage}`)
  return resolve;
}

export const fetchSingleProduct = async (slug) => {
  const resolve = await axios.get(`${url}/products/${slug}`);
  return resolve;
}