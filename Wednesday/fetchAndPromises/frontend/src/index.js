import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"
import userFacade from "./userFacade"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

const div = document.getElementById("jokes");
const pTag = document.getElementById("joke");

function makeListItems() {
const jokes = jokeFacade.getJokes();
let jokeList = jokes.map(joke => `<li>${joke}</li>`);
const joinListItems = jokeList.join("");
div.innerHTML = joinListItems;
}
makeListItems();

function findById() {
  const findJokeBtn = document.getElementById("findJokeBtn");
  findJokeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let input = document.getElementById("input").value;
    let jokeId = jokeFacade.getJokeById(input);
    pTag.innerHTML = `${jokeId}`;
  });
}
findById();

function addJoke() {
  const addJokeBtn = document.getElementById("addJokeBtn");
  addJokeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let input = document.getElementById("input").value;
    jokeFacade.addJoke(input);
    makeListItems();
  });
}
addJoke();


/* JS For Exercise-2 below */

const pTagQuote = document.getElementById("quote");

function quoteOfTheHour() {
  let fetchQuoteBtn = document.getElementById("fetchQuoteBtn");
  fetchQuoteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    updateQuote();
  });
}

function updateQuote() {
  fetch("https://studypoints.info/jokes/api/jokes/period/hour")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    pTagQuote.innerHTML = data.joke;
  });
}
quoteOfTheHour();


/* JS For Exercise-3 below */

// Get all users

function makeUsersTable() {
userFacade.getUsers()
.then(users => {
  const userRows = users.map(user => `
  <tr>
  <td>${user.id}</td>
  <td>${user.age}</td>
  <td>${user.name}</td>
  <td>${user.gender}</td>
  <td>${user.email}</td>
  </tr>
  `)
  const userRowsToString = userRows.join("");
  document.getElementById("allUserRows").innerHTML = userRowsToString;
});
}
makeUsersTable();

// Add user

let addUserBtn = document.getElementById("addUserBtn");
addUserBtn.addEventListener("click", (event) => {
  event.preventDefault();
let age = document.getElementById("age").value;
let name = document.getElementById("name").value;
let gender = document.getElementById("gender").value;
let email = document.getElementById("email").value;
const newUser = {
  "age": age,
  "name": name,
  "gender": gender,
  "email": email
}
userFacade.addUser(newUser)
document.getElementById("error").innerHTML = ""
.then(makeUsersTable())
.catch(err => {
  if (err.status) {
    err.fullError.then(e => document.getElementById("error").innerHTML = e.msg)
  }
  else {console.log("Network error")}
})
});


// Find user by id

const pTagFoundUser = document.getElementById("foundUser");

let findUserBtn = document.getElementById("findUserBtn");
findUserBtn.addEventListener("click", (event) => {
  event.preventDefault();
let findUserInput = document.getElementById("findUserInput").value;
userFacade.getUser(findUserInput)
.then(data => {
pTagFoundUser.innerHTML = data.name;
})
});

// Delete user

const pTagDeletedUser = document.getElementById("deletedUser");

let deleteUserBtn = document.getElementById("deleteUserBtn");
deleteUserBtn.addEventListener("click", (event) => {
  event.preventDefault();
let deleteUserInput = document.getElementById("deleteUserInput").value;
userFacade.deleteUser(deleteUserInput)
.then(makeUsersTable());
});

// Edit user

let editUserBtn = document.getElementById("editUserBtn");
editUserBtn.addEventListener("click", (event) => {
  event.preventDefault();

})


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



