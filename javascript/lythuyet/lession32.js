function celebrityName(firstName,) {
    var nameIntro = "This celebrity is ";
    function lastName(theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName
}

var mjName = celebrityName("Michael")
console.log(mjName('JSON'))


