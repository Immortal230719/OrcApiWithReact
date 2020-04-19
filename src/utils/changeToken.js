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