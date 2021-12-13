## 原型链继承

```js
function Parent() {
  this.name = 'kevin'
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {}

Child.prototype = new Parent()

var child1 = new Child()

console.log(child1.getName()) // kevin
```

当构造函数原型上的属性是一个引用类型时，所有的实例共享这个引用类型属性

```js
function Parent() {
  this.names = ['kevin', 'daisy']
}

function Child() {}

Child.prototype = new Parent()

var child1 = new Child()

child1.names.push('yayu')

console.log(child1.names) // ["kevin", "daisy", "yayu"]

var child2 = new Child()

console.log(child2.names) // ["kevin", "daisy", "yayu"]
```

::: warning
尽量不要在实际开发中直接操作原型链，也尽量不要在直接操作原型链定义引用类型的属性
:::

## 借用构造函数

```js
function Parent() {
  this.names = ['kevin', 'daisy']
}

function Child() {
  Parent.call(this)
}

var child1 = new Child()

child1.names.push('yayu')

console.log(child1.names) // ["kevin", "daisy", "yayu"]

var child2 = new Child()

console.log(child2.names) // ["kevin", "daisy"]
```

通过 call 方法在将要创建的新对象上执行构造函数，这样就实现了在每次创建实例的环境下进行构造函数的初始化代码，每个实例都拥有了自己的构造函数副本，并且可以向构造函数内进行传参

```js
function Parent(name) {
  this.name = name
}

function Child(name) {
  Parent.call(this, name)
}

var child1 = new Child('kevin')

console.log(child1.name) // kevin

var child2 = new Child('daisy')

console.log(child2.name) // daisy
```

缺点：每次创造实例的时候都会执行一次构造函数

## 组合继承

```js
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  // 使用构造函数继承属性
  Parent.call(this, name)

  this.age = age
}

// 使用原型链继承方法
Child.prototype = new Parent()
// 还原原型上的constructor
Child.prototype.constructor = Child

var child1 = new Child('kevin', '18')

child1.colors.push('black')

console.log(child1.name) // kevin
console.log(child1.age) // 18
console.log(child1.colors) // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20')

console.log(child2.name) // daisy
console.log(child2.age) // 20
console.log(child2.colors) // ["red", "blue", "green"]
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

## 原型式继承

```js
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

通过模拟 Object.create(),将传入的对象作为原型，缺点和原型链继承一样，共享同一个原型对象

```js
var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly'],
}

var person1 = createObj(person)
var person2 = createObj(person)

person1.name = 'person1'
console.log(person2.name) // kevin

person1.friends.push('taylor')
console.log(person2.friends) // ["daisy", "kelly", "taylor"]
```

注意：修改`person1.name`的值，`person2.name`的值并未发生改变，并不是因为`person1`和`person2`有独立的 name 值，而是因为`person1.name = 'person1'`，给`person1`添加了 name 值，并非修改了原型上的 name 值。

## 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj(o) {
  var clone = Object.create(o)
  clone.sayName = function () {
    console.log('hi')
  }
  return clone
}
```

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
由于不能复用函数而效率较低

## 寄生组合式继承

组合继承会重复调用两次父构造函数

```js
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name) //第二次调用父构造函数
  this.age = age
}

Child.prototype = new Parent() //第一次调用父构造函数

var child1 = new Child('kevin', '18')

console.log(child1)
```

会造成同名属性重复

可以配合寄生式继承，获取一个全新的对象，再把这个新对象赋值给需要继承的对象原型上

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  var prototype = object(parent.prototype)//创建对象
  prototype.constructor = child           //增强对象
  child.prototype = prototype             //指定对象
}

// 当我们使用的时候：
prototype(Child, Parent)
```
