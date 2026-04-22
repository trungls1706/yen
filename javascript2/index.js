function User() {
    this.name = '';
    this.age = '';

    this.setInfo = function (name, age) {
        this.name = name;
        this.age = age;
    }

    this.checkLogin = function(){
        return `${this.name} ${this.age}`
    }

    return this
}

let a = new User();
a.setInfo('tom', 18);

console.log(a.checkLogin())