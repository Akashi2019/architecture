function isType(type) {
  return function (content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  };
}

let util = {};
['String', 'Number'].forEach((type) => {
  util['is' + type] = isType(type);
})

console.log(util.isString(123))