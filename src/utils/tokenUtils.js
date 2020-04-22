import Cookies from 'js-cookie';

const timeLifeOfToken = 3600;

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
  const time = new Date(new Date().getTime() + timeLifeOfToken * 1000);
  const newToken = changeToken(token);
  Cookies.set('token', newToken, {
    expires: time
  })
}

export function removeAuthToken() {
  Cookies.remove('token')
  Cookies.remove('_time')
}

export function setTimeLifeToken() {
  const timeLife = new Date(new Date().getTime() + timeLifeOfToken * 1000);
  const time = new Date().getTime().toString()
  Cookies.set('_time', time, {
    expires: timeLife
  })
}


let time = Math.abs(Number(Cookies.get('_time')) - new Date().getTime());

export function checkTimeLifeToken(expires_in) {
  expires_in = Number(expires_in) * 1000;
  const percent = expires_in / 100;  
  let checkoutPercent = 0;
  if( time ) {  
    checkoutPercent = Math.ceil((expires_in - time) / percent)
  }    
  if( checkoutPercent && checkoutPercent <= 10 ) {
    return true
  }
   
  return false;
}
