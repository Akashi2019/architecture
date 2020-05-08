let fs = require('fs');

let e = {
  _obj: {},
  _callback: [],
  on(callback){
    this._callback.push(callback);
  },
  emit(key, value){
    this._obj[key] = value;
    this._callback.forEach(fn => {
      fn(this._obj);
    })
  }
}

e.on(function(obj){
  console.log('获取一个')
})

e.on(function(obj){
  if(Object.keys(obj).length === 2){
    console.log(obj);
  }
})

fs.readFile('./age.txt', 'utf8', function(error, data){
  e.emit('age', data);
})

fs.readFile('./name.txt', 'utf8', function(error, data){
  e.emit('name', data);
})