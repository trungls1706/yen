//method overide

class CoffeeMachine {
    makeCoffee() {
        console.log('making coffee ....')
    }
}

class Store extends CoffeeMachine {
    makeCoffee(cb) {
        console.log('making coffee and buy')
        cb()
    }
}

let store = new Store()
console.log(store.makeCoffee(() => {
    console.log('charge')
}))