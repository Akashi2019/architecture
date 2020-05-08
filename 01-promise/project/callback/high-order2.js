function say(who) {
  console.log(`Hello ${who}`);
}

Function.prototype.before = function (callback) {
  return (...args) => {
    callback();
    this(...args);
  };
};

let newSay = say.before(function () {
  console.log("刷牙");
});

newSay("我");
