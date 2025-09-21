// prototype, tương tự static trong java
// được chia sẽ, với từ khoá new 

function Mouse(color, weight) {
    this.type = 'mouse'
    this.color = color
    this.weight = weight
}

Mouse.prototype.sleep = function(){ // tiết kiệm bộ nhớ
    console.log('sleep....', this.color)
}

var aaa = new Mouse('red',20)
var bbb = new Mouse('blue',10)

aaa.sleep()
bbb.sleep()

// từ khoá new sẽ bỏ qua 