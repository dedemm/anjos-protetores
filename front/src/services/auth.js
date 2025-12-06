
export const getToken = () => localStorage.getItem("token");


export const getPayload = () => {
  const token = getToken();
  if (!token) return null;
  
  try {

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    

    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
};


export const getRole = () => {
  const payload = getPayload();
  return payload?.role || null;
};


export const isAdmin = () => {
  return getRole() === 'ADMIN';
};


export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};