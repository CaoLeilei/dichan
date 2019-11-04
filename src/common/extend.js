'use strict';
import {isArray, isPlainObject,setProperty, getProperty} from './utils';

module.exports = function extend() {
  let options;
  let name;
  let src;
  let copy;
  let copyIsArray;
  let clone;
  let target = arguments[0];
  let i = 1;
  let length = arguments.length;
  let deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }
  if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i];
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name);

        // Prevent never-ending loop
        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

            // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            setProperty(target, { name: name, newValue: copy });
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
};