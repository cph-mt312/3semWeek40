var persons = [{name:"Hassan",phone:"1234567"},
{name: "Peter",phone: "675843"},
{name: "Jan", phone: "98547"},
{name: "Boline", phone: "79345"}
];

let navList = persons.map(person => `<a href="">${person.name}</a>`).join("\n");
console.log("b)")
console.log(navList);

let tableRows = persons.map((person) => `<tr><td>${person.name}</td><td>${person.phone}</td></tr>`).join("");
console.log("\nc)");
console.log(tableRows);