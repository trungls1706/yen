//class inheritance

// class Animal {
//     constructor(name) {
//         this.name = name
//     }

//     eat() {
//         console.log('Eating...')
//     }
// }

// class Bird extends Animal {
//     fly() {
//         console.log('Flying...')
//     }
// }

// const bird = new Bird('Én')
// bird.fly()
// bird.eat()

function Animal(name) {
    this.name = name
}

Animal.prototype.eat = () => {
    console.log('eating...')
}

function Bird(name) {
    Animal.apply(this, arguments); // this cho biết lúc này đang nằm trong Bird chứ ko phải animal`
}

Bird.prototype = new Animal()

