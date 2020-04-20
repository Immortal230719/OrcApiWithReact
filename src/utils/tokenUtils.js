import Cookies from 'js-cookie';

export const changeToken = token => {
  if ( typeof token === 'string') {
    const newToken = token + token.substring(0, 10)
    return newToken;
  }
}

export const returnToken = token => {
  if ( typeof token === 'string') {
    const newToken = token.slice(0, -10)
    return newToken;
  }
}

export function getAuthToken() {
  const token = Cookies.get('token')
  return returnToken(token)
}

export function setAuthToken(token) {
  const newToken = changeToken(token);
  Cookies.set('token', newToken)
}

export function removeAuthToken() {
  Cookies.remove('token')
}

export function setTimeLifeToken() {
  const time = new Date().getTime().toString()
  Cookies.set('_time', time)
}

export function checkTimeLifeToken(expires_in) {
  expires_in = Number(expires_in) * 1000;
  const percent = expires_in / 100;
  let time = Math.abs(Number(Cookies.get('_time')) - new Date().getTime());
  let checkoutPercent = 0;
  if( time ) {  
    checkoutPercent = Math.ceil((expires_in - time) / percent)
  }    
  if( checkoutPercent && checkoutPercent <= 10 ) {
    return true
  }
   
  return false;
}