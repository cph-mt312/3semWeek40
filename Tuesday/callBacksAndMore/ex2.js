var nameArray = ["Hassan", "Jan", "Peter", "Boline", "Frederik", "Anette", "Jens"];

function reverseName(name) {
    return name.split("").reverse().join("");
  }

function myFilter(array, callback) {
    
}

function myMap(array, callback) {
    let nameArrayCopy = [];
    array.forEach(name => {
        const newItem = callback(name)
        nameArrayCopy.push(newItem)
    });
    return nameArrayCopy;
  }
  let homeMadeMap = myMap(nameArray, reverseName);
  console.log(homeMadeMap)