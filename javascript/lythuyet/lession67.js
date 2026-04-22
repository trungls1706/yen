class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    console.log(`${this.name} is ${this.age} years old`);
  }
}

let cat = new Animal("cat", 10);
cat.speak();

// ---------

class Dog extends Animal {
  speak() {
    super.speak(); // goi method cua cha 
    console.log(`${this.name} is ${this.age} years old`);
  }
}


class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
}


class Studend extends Person {
    constructor(name, age, mssv) {
        super(name, age);
        this.mssv = mssv;
    }
}

// ================
class User {
    login() {
        console.log('login');
    }
}

class Admin extends User {
    login() {
        super.login();
        console.log('login admin');
    }
}


