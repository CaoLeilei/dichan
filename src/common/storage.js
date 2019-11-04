
export const getLocalstorage = function (key) {
  if (localStorage && key) {
    return localStorage.getItem(key);
  }
  return '';
};

export const setLocalstorage = function (key, value) {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
};

export const getSessionstorage = function (key) {
  if (sessionStorage) {
    return sessionStorage.getItem(key);
  } else {
    return  '';
  }
};

export const setSessionstorage = function (key, value) {
  if (sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};