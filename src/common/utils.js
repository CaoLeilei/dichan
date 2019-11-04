
export const phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;

export const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

/**
 * 检测输入的内容是否为电子邮件
 * @param str
 * @returns {boolean}
 */
export const isEmail = function (str) {
  return emailReg.test(str);
};

/**
 * 检测字符串是否位手机号
 * @param str
 * @returns {boolean}
 */
export const isPhone = function (str) {
  return phoneReg.test(str);
};


export const isArray = function (arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }

  return toStr.call(arr) === '[object Array]';
}

export const hasOwn = Object.prototype.hasOwnProperty;
export const toStr = Object.prototype.toString;
export const defineProperty = Object.defineProperty;
export const gOPD = Object.getOwnPropertyDescriptor;

export const isPlainObject = function (obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  let hasOwnConstructor = hasOwn.call(obj, 'constructor');
  let hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  let key;
  for (key in obj) { /**/ }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
};


export const setProperty = function (target, options) {
  if (defineProperty && options.name === '__proto__') {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
};


// Return undefined instead of __proto__ if '__proto__' is not an own property
export const getProperty = function (obj, name) {
  if (name === '__proto__') {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      // In early versions of node, obj['__proto__'] is buggy when obj has
      // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
      return gOPD(obj, name).value;
    }
  }

  return obj[name];
};
