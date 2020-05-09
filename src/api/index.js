import axios from 'axios';

const baseUrl = 'https://api.app2000.host/api/v1';
const headers = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Products API
const products = axios.create({
  baseURL: `${baseUrl}/products`,
});

export const fetchProductsPage = async (numOfPage) => {
  const response = await products.get(`?page=${numOfPage}`);
  return response;
};
export const fetchSingleProduct = async (slug) => {
  const response = await products.get(slug);
  return response;
};
export const fetchDeleteProduct = async (slug, token) => {
  const response = await products.delete(slug, {
    headers: headers(token),
  });
  return response;
};
export const fetchPatchProduct = async (data, token, slug) => {
  const response = await products.patch(slug, data, {
    headers: headers(token),
  });
  return response;
};
export const submitCreateProductForm = async (data, token) => {
  const response = await products.post('', data, {
    headers: headers(token),
  });
  return response;
};

// Avatar API
const avatar = axios.create({
  baseURL: `${baseUrl}/avatars/`,
});

export const fetchUploadAvatar = async (file, token) => {
  const response = await avatar.post('', file, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const fetchDeleteAvatar = async (token) => {
  const response = await avatar.delete('', {
    headers: headers(token),
  });
  return response;
};

// Auth API
const auth = axios.create({
  baseURL: `${baseUrl}/auth`,
});

export const submitSignUpForm = async (data) => {
  const response = await auth.post('signup', data);
  return response;
};
export const submitLoginForm = async (data) => {
  const response = await auth.post('login', data);
  return response;
};
export const authMe = async (token) => {
  const response = await auth.post('me', {}, { headers: headers(token) });
  return response;
};
export const logout = async (token) => {
  const response = await auth.post('logout', {}, { headers: headers(token) });
  return response;
};
export const refresh = async (token) => {
  const response = await auth.post('refresh', {}, { headers: headers(token) });
  return response;
};
