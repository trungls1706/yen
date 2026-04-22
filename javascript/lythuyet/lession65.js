const gift = {
  amount: 10,
  unit: "USD",
};

const boy = {
  amount: 100000,
  unit: "USD",
}

function goShopping(item, quantity, price) {
  const total = price * quantity;
  if (this.amount < total) {
    console.log(
      `You don't have enough`,
    );
  } else {
    console.log(
      `You have bought ${quantity} ${item} for ${total} ${this.unit}`,
    );
  }
}


// goShopping.call(gift, "T-shirt", 2, 100);
// goShopping.call(boy, "T-shirt", 2, 100);

// goShopping.apply(gift, ["T-shirt", 2, 100]);


// const bought = goShopping.bind(boy);
// bought("T-shirt", 2, 100);

// goShopping.bind(boy)("T-shirt", 2, 100);


// function logApply(){
//     console.log.apply(console, arguments)
// }

// logApply(1,2,3)

function Animal (name, weight){
    this.name = name
    this.weight = weight
}

function Cat(){
    Animal.call(this, 'cat', 50)
    this.say = function(){
        console.log(`im a ${this.name} and my weight is ${this.weight}`)
    }
}

const cat = new Cat()
cat.say()

/**
 * call, apply, bind thay đổi this của 1 doi tuong trong hàm
 * tham so là 1 object được chỉ định bởi this 
 * bind => gán và gọi sau
 */