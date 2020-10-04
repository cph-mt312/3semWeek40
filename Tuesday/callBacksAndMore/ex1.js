var nameArray = ["Hassan", "Jan", "Peter", "Boline", "Frederik", "Anette", "Jens"];

let namesContainingLetterA = nameArray.filter(function (names) {
    return names.includes("a") || names.includes("A");
})

console.log("a)")
console.log(namesContainingLetterA);

let reverseNames = namesContainingLetterA.map(function (names) {
    return names.split("").reverse().join("");
})

console.log("\nb)")
console.log(reverseNames);