import axios from 'axios';
// import { getLocalstorage } from './storage';

axios.defaults.timeout = 30000;
axios.defaults.baseURL ='';
axios.defaults.headers['Content-Type'] = 'application/json;charset:utf-8;';
axios.defaults.withCredentials = true;

const instance = axios.create();

const showErrorMessage = function (message) {
  if (window.App) {
    window.App.$alert(message, 'Message', {
      type: 'error'
    });
  } else {
    window.alert(message);
  }
}

class CErrorHandle {
  handleMap = new Map();

  addHandleMap (key, handle) {
    if (typeof handle === 'function') {
      this.handleMap.set(key, handle);
    }
  }
  deleteHandle (key) {
    this.handleMap.delete(key);
  }

  runHandle (error, key, resolve, reject) {
    let handle = this.handleMap.get(key);
    if (handle && typeof handle === 'function') {
      handle(error).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    }
  }
}

let errorHandle;
(function initErrorHandle() {
  errorHandle = new CErrorHandle();
  errorHandle.addHandleMap(400,function () {});
})();

instance.interceptors.response.use(response => {
  return response;
});

const runAjaxHandle = function (response, config, resolve, reject) {
  if (response.status === 200 && response.data ) {
    if (response.data.status_code === 200) {
      resolve(response.data.data);
    } else if (response.data.status_code === 401 ||response.data.status_code === 403) {
      let origin = location.origin;
      window.location.href = origin + '/#/login';
      reject(new Error(response.data.status_msg));
    } else {
      let errorHandle = config[response.data.status_code];
      if (typeof errorHandle === 'function') {
        errorHandle(response, config, resolve, reject);
      } else {
        showErrorMessage(response.data.status_msg);
        reject(new Error(response.data.status_msg));
      }
    }
  } else if (response.status === 401 || response.status === 403) {
    let errorHandle = config[response.status];
    if (typeof errorHandle === 'function') {
      errorHandle(response, config, resolve, reject);
    } else {
      let origin = location.origin;
      window.location.href = origin + '/#/login';
      reject(new Error(response.status));
    }
  } else {
    if (response.status) {
      let errorHandle = config[response.status];
      if (typeof errorHandle === 'function') {
        errorHandle(response, config, resolve, reject);
      } else {
        showErrorMessage(response.status);
        reject(new Error(response.status));
      }
    } else {
      showErrorMessage(response.status);
      reject(new Error(response.status));
    }
  }
};

const $request = function (config) {
  return new Promise((resolve, reject) => {
    instance.request(config).then(response => {
      runAjaxHandle(response, config, resolve, reject)
      // resolve(response);
    }).catch(err => {
      reject(err);
    })
  });
};

const $get = function (url, data, config) {
  config = config || {};

  if (data) {
    let queryArr = [];
    let queryStr = '';
    for(let key in data) {
      queryArr.push(key + '=' + data[key]);
    }
    if (queryArr.length) {
      queryStr = queryArr.join('&');
    }
    if (url.includes('?')) {
      url += '&' + queryStr;
    } else {
      if (queryStr) {
        url += '?' + queryStr;
      } else {
        url;
      }
    }
  }
  config.url = url;
  config.method = 'get';
  return $request(config);
};

const $post = function (url, data, config) {
  config = config || {};
  config.url = url;
  config.data = data;
  config.method = 'post';
  return $request(config);
};

// const $put = function () {
//
// };
//
// const $delete = function () {
//
// };
//
//
// export const install = function () {
//
// };

export default {
  $get: $get,
  $post: $post,
  // $put: $put,
  // $delete: $delete
};