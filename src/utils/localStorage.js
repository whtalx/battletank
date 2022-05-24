import { forEach, reduce } from './iterable';

export function getFromLocalStorage(values) {
  function notSet(value) {
    return typeof value === 'function'
      ? value()
      : value;
  }

  function callback(source, notSetValue, key) {
    const result = source;

    try {
      const value = window.localStorage.getItem(key);
      result[key] = typeof value === 'string'
        ? JSON.parse(value)
        : notSet(notSetValue);
    } catch (error) {
      result[key] = notSet(notSetValue);
    }

    return result;
  }

  return reduce(values, {}, callback);
}

export function saveToLocalStorage(values) {
  function callback(value, key) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  try {
    forEach(values, callback);
  } catch {
  }
}
