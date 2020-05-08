let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("xxx");
  }, 1000);
  //resolve('xxx');
  //throw new Error("error");
  //reject('reason');
});

promise.then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log(reason);
  }
);
