const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.state === REJECTED) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onfulfilled, onrejected) {
    if (this.state === RESOLVED) {
      onfulfilled(this.value);
    }

    if (this.state === REJECTED) {
      onrejected(this.reason);
    }

    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onfulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason);
      });
    }
  }
}

module.exports = Promise;
