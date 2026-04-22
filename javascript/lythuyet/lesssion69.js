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

const heroA = new Hero('A', 100, 10)
const heroB = new Hero('B', 200, 20)
console.log(({ heroA, heroB }))
heroA.attack(heroB)
console.log(({ heroA, heroB }))