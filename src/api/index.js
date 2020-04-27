import axios from "axios";

const apiKey = "d6fbdf9b-1f67-436a-91a7-0cc32628f339";

const headers = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

//Products API
const products = axios.create({
  baseURL: "https://api.app2000.host/api/v1/products",
});

export const fetchProductsPage = async (numOfPage) => {
  return await products.get(`?page=${numOfPage}`);
};
export const fetchSingleProduct = async (slug) => {
  return await products.get(slug);
};
export const fetchDeleteProduct = async (slug, token) => {
  return await products.delete(slug, {
    headers: headers(token),
  });
};
export const fetchPatchProduct = async (data, token, slug) => {
  return await products.patch(slug, data, {
    headers: headers(token),
  });
};
export const submitCreateProductForm = async (data, token) => {
  return await products.post("", data, {
    headers: headers(token),
  });
};

//Avatar API
const avatar = axios.create({
  baseURL: "https://api.app2000.host/api/v1/avatars",
});

export const fetchUploadAvatar = async (file, token) => {
  return await avatar.post("", file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const fetchDeleteAvatar = async (token) => {
  return await avatar.delete("", {
    headers: headers(token),
  });
};

//Auth API
const auth = axios.create({
  baseURL: "https://api.app2000.host/api/v1/auth/",
});

export const submitSignUpForm = async (data) => {
  return await auth.post("signup", data);
};
export const submitLoginForm = async (data) => {
  return await auth.post("login", data);
};
export const authMe = async (token) => {
  return await auth.post("me", {}, { headers: headers(token) });
};
export const logout = async (token) => {
  return await auth.post("logout", {}, { headers: headers(token) });
};
export const refresh = async (token) => {
  return await auth.post("refresh", {}, { headers: headers(token) });
};
