let Promise = require("./promise-A-plus");
//let Promise = require('./promise-std');
let promise = new Promise((resolve, reject) => {
  resolve("hello");
});

// let promise2 = promise.then((data)=> {
//   return promise2;
// })
let promise2 = promise.then(
  (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("hello");
      }, 1000);
    });
   //return 100;
   //throw new Error('error');
  },
  (err) => {
    console.log(err);
  }
);

promise2.then(
  (data) => {
    console.log("s:" + data);
  },
  (err) => {
    console.log(err);
  }
);
