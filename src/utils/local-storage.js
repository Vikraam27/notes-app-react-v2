export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}
