export const offline = localStorage.getItem("offline");
export const uid = localStorage.getItem("uid");
export const login = localStorage.getItem("login");
export const qrcode = localStorage.getItem("qrcode");
export const pitData = (index) => {
  localStorage.getItem("pit" + index);
};

export const setOffline = (offline) => {
  localStorage.setItem("offline", offline);
};
export const setUid = (uid) => {
  localStorage.setItem("uid", uid);
};
export const setLogin = (login) => {
  localStorage.setItem("login", login);
};
export const setQRCode = (qrcode) => {
  localStorage.setItem("qrcode", qrcode);
};
export const removeItem = (item) => {
  localStorage.removeItem(item);
};
