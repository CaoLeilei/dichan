/**
 * 获取cookie
 * @param key
 * @returns {string}
 */
export const getCookies = function (name) {
  var start = document.cookie.indexOf(name + "=");
  var len = start + name.length + 1;
  if ((!start) && (name != document.cookie.substring(0, name.length))) {
    return '';
  }
  if (start == -1) return '';
  var end = document.cookie.indexOf(';', len);
  if (end == -1) end = document.cookie.length;
  return unescape(document.cookie.substring(len, end));
};

/**
 * 设置cookie
 * @param key
 * @param value
 * @param expires
 * @param path
 * @param domain
 */
export const setCookies = function (name, value, expires, path, domain, secure) {
  var today = new Date();
  today.setTime(today.getTime());
  var expiresDate = new Date(today.getTime() + (expires));
  document.cookie = encodeURIComponent(name) + '=' + escape(value) + ((expires) ? ';expires=' + expiresDate.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
};

/**
 * 检查是否可以使用cookie
 * @returns {boolean}
 */
export const checkCanUserCookie = function () {
  return false;
};
