Function.prototype.uncurring = function () {
  return (...args) => {
    return Function.prototype.call.apply(this, args);
  };
};

var push = Array.prototype.push.uncurring();
(function () {
  push(arguments, 4);
  console.log(arguments);
})(1, 2, 3);

var obj = {
  length: 1,
  0: 1,
};

push(obj, 2);

console.log(obj);
