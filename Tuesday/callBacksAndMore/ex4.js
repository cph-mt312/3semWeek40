var all = ["Hassan", "Peter", "Carla", "Boline"];
let hashTagJoin = all.join("#");
console.log("a)")
console.log(hashTagJoin);

var numbers = [2, 3, 67, 33];
var reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log("\nb)")
console.log(numbers.reduce(reducer));

var members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}
];

// Not quite sure to make this one yet ^