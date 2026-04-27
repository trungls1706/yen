//super
class Hero {
    constructor(name, hp, damge) {
        this.name = name
        this.hp = hp
        this.damge = damge
    }

    applyDame(damge) {
        this.hp -= damge
    }

    attack(enmey) {
        enmey.applyDame(this.damge)
    }
}

// const heroA = new Hero('A', 100, 10)
// const heroB = new Hero('B', 200, 20)
// console.log(({ heroA, heroB }))
// heroA.attack(heroB)
// console.log(({ heroA, heroB }))


class RangeHero extends Hero {
    constructor(name, hp, damge, range) {
        super(name, hp, damge) // tham chiếu đến constructor của baseClass    
        this.range = range
    }

    attack(enmey) { //overRide
        enmey.applyDame(this.damge)
        this.hp += this.damge
    }
}

const heroA = new RangeHero('A', 100, 10, 5)
const heroB = new RangeHero('B', 200, 20, 5)
console.log(({ heroA, heroB }))
heroA.attack(heroB)
console.log(({ heroA, heroB }))


////////////////////


function Hero (name, hp, damge){
    this.name = name
    this.hp = hp
    this.damge = damge
}

Hero.prototype.applyDame = function(damge){
    this.hp -= damge
}

Hero.prototype.attack = function(enmey){
    enmey.applyDame(this.damge)
}


function RangeHero(name, hp, damge, range){
    Hero.apply(this, arguments) // this cho biết lúc này đang nằm trong RangeHero chứ ko phải Hero`
    this.range = range
}

RangeHero.prototype = new Hero() // kế thừa prototype của Hero

RangeHero.prototype.attack = function(enmey){ //overRide
    enmey.applyDame(this.damge)
    this.hp += this.damge
}

const heroA = new RangeHero('A', 100, 10, 5)
const heroB = new RangeHero('B', 200, 20, 5)
console.log(({ heroA, heroB }))
heroA.attack(heroB)
console.log(({ heroA, heroB }))