# 前端架构1-Promise-01

## 高阶函数

1. 如果一个函数的参数是一个函数（回调函数也是一个高阶函数）
2. 如果一个函数的返回一个函数，这个函数就叫高阶函数

```
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
```



## 柯里化(curring)和反柯里化(uncurring)

- 柯里化又称部分求值，字面意思就是不会立刻求值，而是到了需要的时候再去求值（提前接收部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数。因为这样的特性，也被称为部分计算函数）



- 反柯里化的作用是，当我们调用某个方法，不用考虑这个对象在被设计时，是否拥有这个方法，只要这个方法适用于它，我们就可以对这个对象使用它。(是一个泛型化的过程。它使得被反柯里化的函数，可以接收更多参数。目的是创建一个更普适性的函数，可以被不同的对象使用。)

### curring：

```
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
```

### uncurring:

```
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

  0: 1

};

push(obj, 2);

console.log(obj);
```

### 难点： Function.prototype.call.apply(this, args)

举个栗子:

> 我们平时借用Math.Max时求数组中最大值是这样的
> Math.Max.apply([], [1,2,3])

- 先执行apply将Math替换为[]
- 然后再执行Max并传入[1,2,3] 因为apply的关系 参数[1,2,3]已经扁平化成1,2,3
- 所以相当于[].Max(1,2,3)

call也是一样的道理：

之所以要和大家讲这个例子是想说明**先调用apply再调用排在apply之前的函数max**

这次主角也不例外

过程解析：

```
Function.prototype.call.apply(Array.prototype.push, [obj, 2])
```

apply替换的执行函数的对象并扁平化了数组内容，

```
Array.prototype.push.call(obj, 2)
```

call函数将数组内容的第一个参数替换执行函数对象

```
obj.push(2)
```

结果便是

```
{0: 1, 1: 2, length: 2}
```