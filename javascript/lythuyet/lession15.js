//call
//call: function call(this, param1, param2)

// function greeting(name,age){
//     console.log(`hi ${name} ${age}`)
// }
// greeting.call(null,'tom',18)

// https://viblo.asia/p/bind-apply-and-call-trong-javascript-DzVGpoMDvnW
// https://freetuts.net/hieu-hon-ve-ham-call-va-apply-trong-javascript-786.html?

const cat = {
    name: 'tom',
    age: 18
}

function greeting() {
    console.log(`hi ${this.name} ${this.age}`)
}
greeting.call(cat)

// Một trường hợp khác với global và local variable. Ta có ví dụ tương tự như sau:
var name = "xxx";
var user = {
    name: "yyy",
    showInfo: function () {
        console.log("Name:" + this.name);
    }
}

var showData = user.showInfo;
var showDataBind = user.showInfo.bind(user)
showData() // call global data : return Name: xxx
showDataBind() // call local data: return Name: yyy


function log(level, time, msg) {
    console.log(level + '-' + time + ':' + msg);
}

function logAccessToday(msg){
    log('Access', 'Today', msg);
}

var logAccessToday =   log.bind('Access', 'Today', msg);
