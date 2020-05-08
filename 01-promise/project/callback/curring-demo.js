var monthTime = 0;

function overtime1(time) {
  return (monthTime += time);
}

overtime1(3.5);
overtime1(4.5);
overtime1(2.1);

console.log(monthTime);

var overtime2 = (function () {
  var args = [];
  return function () {
    if (arguments.length === 0) {
      var time = 0;
      for (var i = 0; i < args.length; i++) {
        time += args[i];
      }
      return time;
    } else {
      [].push.apply(args, arguments);
    }
  };
})();

overtime2(3.5);
overtime2(4.5);
overtime2(2.1);

console.log(overtime2());

function curring(fn) {
  var allArgs = [];

  return function next() {
    var args = [].slice.call(arguments);

    if (args.length > 0) {
      allArgs = allArgs.concat(args);
      return next;
    } else {
      return fn.apply(null, allArgs);
    }
  };
}

var add = curring(function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

console.log(add(1)(2, 3)(4)());

function curring2(fn) {
  var allArgs = [];

  function next() {
    var args = [].slice.call(arguments);
    allArgs = allArgs.concat(args);
    return next;
  }

  next.toString = function () {
    return fn.apply(null, allArgs);
  };

  next.valueOf = function () {
    return fn.apply(null, allArgs);
  };

  return next;
}

var add2 = curring2(function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

console.log(add2(1)(2, 3)(4)(5));
