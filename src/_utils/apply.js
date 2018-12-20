const apply = (fn, ...args) => {
  try {
    return new fn(...args)
  } catch (_) {
    return fn(...args);
  }
};

export default apply;
