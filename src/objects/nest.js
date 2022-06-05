export default function Nest() {
  const root = {};

  function setInPath(path, instance, value) {
    const key = path[0];

    if (path.length > 1) {
      if (!instance.hasOwnProperty(key)) {
        instance[key] = {};
      }

      setInPath(path.slice(1), instance[key], value);
    } else {
      instance[key] = value;
    }
  }

  function getInPath(path, instance, notSetValue) {
    const key = path[0];

    return instance.hasOwnProperty(key)
      ? path.length > 1
        ? getInPath(path.slice(1), instance[key], notSetValue)
        : instance[key]
      : notSetValue;
  }

  function deleteInPath(path, instance = {}) {
    const key = path[0];

    if (!instance.hasOwnProperty(key)) return;

    if (path.length > 1) {
      deleteInPath(path.slice(1), instance[key]);
    } else {
      delete instance[key];
    }
  }

  return {
    setIn(path, value) {
      setInPath(path, root, value);
    },
    getIn(path, notSetValue) {
      return getInPath(path, root, notSetValue);
    },
    deleteIn(path) {
      deleteInPath(path, root);
    },
  };
}
