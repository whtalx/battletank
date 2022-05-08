import { forEach, reduce } from './iterable';

export function getFromLocalStorage(values) {
  function callback(source, notSetValue, key) {
    const result = source;

    try {
      const value = window.localStorage.getItem(key);
      result[key] = typeof value === 'string'
        ? JSON.parse(value)
        : notSetValue;
    } catch (error) {
      result[key] = notSetValue;
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
