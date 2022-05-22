import { isObject } from './bool';

export function forEach(instance, callback) {
  if (Array.isArray(instance) || (typeof NodeList !== 'undefined' && instance instanceof NodeList)) {
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

  if (Array.isArray(instance) || (typeof NodeList !== 'undefined' && instance instanceof NodeList)) {
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

export function areEqual(...comparers) {
  function compare(x, y) {
    if (typeof x !== typeof y) {
      return false;
    } else if (Array.isArray(x) && Array.isArray(y)) {
      return x.length === y.length
        ? areEqual(x, y)
        : false;
    } else if (isObject(x) && isObject(y)) {
      return Object.keys(x).length === Object.keys(y).length
        ? areEqual(x, y)
        : false;
    } else {
      return x === y;
    }
  }

  function callback(allEqual, value, key) {
    function compareCurrent(currentEqual, comparer) {
      return currentEqual && compare(comparer[key], value);
    }

    return allEqual && reduce(comparers.slice(1), allEqual, compareCurrent);
  }

  return reduce(comparers[0], true, callback);
}
