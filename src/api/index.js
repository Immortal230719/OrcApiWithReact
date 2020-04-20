import axios from "axios";

const url = "https://api.app2000.host/api/v1";

export const fetchProducts = async () => {
  return await axios.get(`${url}/products`);
};

export const fetchProductsPage = async numOfPage => {
  const resolve = await axios.get(`${url}/products?page=${numOfPage}`);
  return resolve;
};

export const fetchSingleProduct = async slug => {
  const resolve = await axios.get(`${url}${slug}`);
  return resolve;
};

export const submitSignUpForm = async data => {
  const resolve = await axios.post(`${url}/auth/signup`, data);
  return resolve;
};

export const submitLoginForm = async data => {  
  const resolve = await axios.post(`${url}/auth/login`, data)
  return resolve;
};

export const authMe = async token => {
  const response = await axios.post(`${url}/auth/me`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );
  return response;
};

export const logout = async token => {
  const response = await axios.post(`${url}/auth/logout`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );
  return response;
}

export const refresh = async token => {
  const response = await axios.post(`${url}/auth/refresh`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );
  return response;
}
