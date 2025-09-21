// The Differences Between Arrow and Regular Functions You Should Know

// Function declaration
function greet(who) {
    return `Hello, ${who}!`;
}
// Function expression
const greet2 = function (who) {
    return `Hello, ${who}`;
}

const greet3 = (who) => {
    return `Hello, ${who}!`;
}

function myFunction() {
    console.log(this);
}

// Simple invocation
myFunction(); // logs global object (window)

const myObject = {
    method() {
        console.log(this);
    }
};
// Method invocation
myObject.method(); // logs myObject


function myFunction() {
    console.log(this);
}

const myContext = { value: 'A' };
myFunction.call(myContext);  // logs { value: 'A' }
myFunction.apply(myContext); // logs { value: 'A' }