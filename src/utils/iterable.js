import { isObject } from './isObject';

export function forEach(instance, callback) {
  if (Array.isArray(instance) || instance instanceof NodeList) {
    for (let index = 0; index < instance.length; index += 1) {
      callback(instance[index], index);
    }
  } else if (instance instanceof Set) {
    let index = 0;

    for (const item of instance.values()) {
      callback(item, index);
      index += 1;
    }
  } else if (isObject(instance)) {
    let index = 0;

    for (const key in instance) {
      if (instance.hasOwnProperty(key)) {
        callback(instance[key], key, index);
        index += 1;
      }
    }
  }
}

export function reduce(instance, initialState, callback) {
  if (!instance) return initialState;

  let result = initialState;

  if (Array.isArray(instance) || instance instanceof NodeList) {
    for (let index = 0; index < instance.length; index += 1) {
      result = callback(result, instance[index], index);
    }
  } else if (isObject(instance)) {
    let index = 0;

    for (const key in instance) {
      if (instance.hasOwnProperty(key)) {
        result = callback(result, instance[key], key, index);
        index += 1;
      }
    }
  }

  return result;
}
