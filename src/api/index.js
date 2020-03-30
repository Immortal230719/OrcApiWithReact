import axios from "axios";
import { stringify } from "qs";

const url = "http://api.app2000.host/api/v1";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

export const fetchProducts = async () => {
  return await axios.get(`${url}/products`);
};

export const fetchProductsPage = async numOfPage => {
  console.log(`${url}/products?page=${numOfPage}`);

  const resolve = await axios.get(`${url}/products?page=${numOfPage}`);
  return resolve;
};

export const fetchSingleProduct = async slug => {
  const resolve = await axios.get(`${url}${slug}`);
  return resolve;
};

export const submitSignUpForm = async data => {
  const body = stringify(data);
  const resolve = await axios.post(`${url}/auth/signup`, body, {
    headers: headers
  });
  return resolve;
};

export const submitLoginForm = async data => {
  const body = stringify(data);
  const resolve = await axios.post(`${url}/auth/login`, body, {
    headers: headers
  });
  return resolve;
};

export const authMe = async token => {
  const response = await axios({
    method: "POST",
    url: `${url}/auth/me`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorizaton: `Bearer ${token}`
    }
  });

  return response;
};
