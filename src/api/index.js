import axios from "axios";
import { stringify } from "qs";

const url = "https://api.app2000.host/api/v1";

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
  const resolve = await axios.get(`${url}${slug}`); //1qwe123
  return resolve;
};

// export const submitSignUpForm = async data => {
//   console.log(data);

//   const body = stringify(data);
//   console.log(typeof data);
//   const resolve = await axios({
//     method: "post",
//     url: `${url}/auth/signup`,
//     data: body,
//     headers: headers
//   });
//   return resolve;
// };

export const submitSignUpForm = async data => {
  const body = stringify(data);
  const resolve = await axios.post(`${url}/auth/signup`, body, {
    headers: headers
  });
  return resolve;
};
