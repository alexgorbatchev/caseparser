'use strict';

var snakeToCamel = function (data) {
  if (!data) return null;
  if (typeof data === 'string')
    return _convertStringKey(data, 'snakeToCamel');
  return _convertObject(data, this['snakeToCamel']);
};

var camelToSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string')
    return _convertStringKey(data, 'camelToSnake');
  return _convertObject(data, this['camelToSnake']);
};

var _isObject = function (data) {
  return Object.prototype.toString.call(data) === '[object Object]';
};

var _isArray = function (data) {
  return Object.prototype.toString.call(data) === '[object Array]';
};

var _convertStringKey = function (str, type) {
  if (type === 'snakeToCamel') return str.replace(/(\_\w)/g, function (g) { return g[1].toUpperCase(); });
  if (type === 'camelToSnake') return str.replace(/([A-Z])/g, function (g) { return '_' + g[0].toLowerCase(); });
};

var _convertObject = function (data, fn) {
  if (_isArray(data)) {
    return data.map(function (dataItem) {
      if (_isArray(dataItem) || _isObject(dataItem))
        return convertObjectKeys(dataItem, fn);
      return dataItem;
    });
  }
  return convertObjectKeys(data, fn);
};

var convertObjectKeys = function (data, fn) {
  var resultObject = {};
  for (var property in data) {
    if (_isArray(data[property]) || _isObject(data[property])) {
      resultObject[fn(property)] = _convertObject(data[property], fn);
    } else {
      resultObject[fn(property)] = data[property];
    }
  }
  return resultObject;
};

module.exports = {
  snakeToCamel: snakeToCamel,
  camelToSnake: camelToSnake
};