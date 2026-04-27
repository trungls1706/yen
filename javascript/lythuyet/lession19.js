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



////

function Animal(name) {
    this.name = name;
}

// Không nên dùng arrow ở prototype method
Animal.prototype.eat = function() {
    console.log(this.name + ' is eating...');
};

Animal.prototype.sleep = function() {
    console.log(this.name + ' is sleeping...');
};


function Bird(name, canFly) {
    // gọi constructor cha, bind this của Bird
    Animal.apply(this, arguments);

    this.canFly = canFly;
}

// inherit từ Animal
Bird.prototype = Object.create(Animal.prototype);

// fix constructor bị trỏ sai
Bird.prototype.constructor = Bird;


// override method
Bird.prototype.eat = function() {
    console.log(this.name + ' pecks food...');
};

// method riêng của Bird
Bird.prototype.fly = function() {
    if(this.canFly){
       console.log(this.name + ' is flying');
    }
};