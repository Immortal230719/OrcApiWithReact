import Cookies from "js-cookie";

const timeLifeOfToken = 120;

export const changeToken = (token) => {
  if (typeof token === "string") {
    const newToken = token + token.substring(0, 10);
    return newToken;
  }
};

export const returnToken = (token) => {
  if (typeof token === "string") {
    const newToken = token.slice(0, -10);
    return newToken;
  }
};

export function getAuthToken() {
  const token = Cookies.get("token");
  return returnToken(token);
}

export function setAuthToken(token) {
  const time = new Date(new Date().getTime() + timeLifeOfToken * 1000);
  const newToken = changeToken(token);
  Cookies.set("token", newToken, {
    expires: time,
  });
}

export function removeAuthToken() {
  Cookies.remove("token");
  Cookies.remove("_time");
}

export function setTimeLifeToken() {
  const timeLife = new Date(new Date().getTime() + timeLifeOfToken * 1000);
  const timeNow = new Date().getTime().toString();
  Cookies.set("_time", timeNow, {
    expires: timeLife,
  });
}

let time = Math.abs(Number(Cookies.get("_time")) - new Date().getTime());

export function checkTimeLifeToken(expires_in) {
  let expiresInMS = Number(expires_in) * 1000;
  const percent = expiresInMS / 100;
  let checkoutPercent = 0;
  if (time) {
    checkoutPercent = Math.ceil((expiresInMS - time) / percent);
  }
  if (checkoutPercent && checkoutPercent <= 50) {
    return true;
  }

  return false;
}

export const parseJwt = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
