class Subject {
  constructor(name) {
    this.name = name;
    this.state = "happy";
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  setState(state) {
    this.state = state;
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(obj) {
    console.log(`${this.name}: ${obj.name} state is ${obj.state}`);
  }
}

var father = new Observer("father");
var mother = new Observer("mother");

var child = new Subject("baby");
child.attach(father);
child.attach(mother);

child.setState("cry");

child.setState("haha");
