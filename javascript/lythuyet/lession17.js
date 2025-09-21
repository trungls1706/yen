// Enhanced object literals


// khởi tạo cách truyền thống
// constructor
function Mouse(name){
    this.name = name
}

Mouse.prototype.run = function(){
    console.log(`${this.name} running`)
}

const Mickey = new Mouse('Mickey')
Mickey.run()

//object literals
const Jerry = {
    name:'Jerry',
    run : function(){
        console.log(`${this.name} running`)
    }
};
Jerry.run()

//Enhanced object literals
const name = 'Tom'
const cat = {
    name,
    run(){
        console.log(`${this.name} running`)
    }
}
cat.run()



