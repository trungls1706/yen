// prototype, tương tự static trong java
// được chia sẽ, với từ khoá new 

function Mouse(color, weight) {
    this.type = 'mouse'
    this.color = color
    this.weight = weight

    console.log('this', this)
}

Mouse.prototype.sleep = function(){ // tiết kiệm bộ nhớ
    console.log('sleep....', this.color)
}

var aaa = new Mouse('red',20)
var bbb = new Mouse('blue',10)

aaa.sleep()
bbb.sleep()

// từ khoá new sẽ bỏ qua 

function Cat(color, weight){
    this.type = 'cat'
    this.color = color
    this.weight = weight
}

Cat.prototype.sleep = function(){
    console.log('sleep....', this.color)
}

var ccc = Cat('white', 15) // bỏ qua new, this trỏ về global object window
console.log(ccc) // undefined
console.log(window.color) // white
console.log(window.weight) // 15