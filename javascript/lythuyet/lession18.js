//javascript không phải oop, hướng đối tượng từ đầu
//java mới thuần oop

// constructor
// function Mouse(name){
//     this.name = name
// }

// Mouse.prototype.run = function(){
//     console.log(`${this.name} running`)
// }

// const Mickey = new Mouse('Mickey')
// Mickey.run()

// thay thế bằng class, cho giống oop
class Mouse {
    constructor(name) {
        this.name = name
    }

    run() {
        console.log(`${this.name} running`)
    }
}

const mouse = new Mouse('Mickey')
mouse.run()

