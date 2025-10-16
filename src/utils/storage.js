export function saveToken(token){
  localStorage.setItem('cp_token', token);
}

export function getToken(){
  return localStorage.getItem('cp_token');
}

export function removeToken(){
  localStorage.removeItem('cp_token');
}
