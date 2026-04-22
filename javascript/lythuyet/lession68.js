function Animal(name) {
  this.name = name
}

Animal.prototype.speak = function () {
  console.log(this.name + " makes a sound")
}

function Dog(name, breed) {
  Animal.call(this, name)
  this.breed = breed
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.speak = function () {
  console.log(this.name + " barks")
}

const dog = new Dog("Lucky", "Husky")
dog.speak()
