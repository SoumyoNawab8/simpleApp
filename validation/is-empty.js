const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof data === 'object' && Object.keys(data).length === 0) ||
  (typeof data === 'string' && data.trim().length === 0);

module.exports = isEmpty;
