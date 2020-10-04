import "./style.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade"

// Get all persons

document.getElementById("reload").addEventListener("click", getAllPersons)

function getAllPersons() {
  personFacade.getAllPersons()
    .then(data => {
      const persons = data.all;
      const tableRows = persons.map(person => `
  <tr>
  <td>${person.id}</td>
  <td>${person.fName}</td>
  <td>${person.lName}</td>
  <td>${person.phone}</td>
  <td>${person.street}</td>
  <td>${person.zip}</td>
  <td>${person.city}</td>
</tr>
  `)
      const tableRowsAsStr = tableRows.join("");
      document.getElementById("tbody").innerHTML = tableRowsAsStr
    })
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => {
          console.log(e.message)
          document.getElementById("error").innerHTML = e.message;
        })
      }
      else { console.log("Network error"); }
    })
}
getAllPersons();

// Add person

document.getElementById("savebtn").addEventListener("click", addPerson)

function addPerson() {
  let newPerson = {
    fName: document.getElementById("fname").value,
    lName: document.getElementById("lname").value,
    phone: document.getElementById("phone").value,
    street: document.getElementById("street").value,
    zip: document.getElementById("zip").value,
    city: document.getElementById("city").value
  }
  document.getElementById("error").innerHTML = ""
  personFacade.addPerson(newPerson)
    .then(getAllPersons)
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => {
          console.log(e.message)
          document.getElementById("error").innerHTML = e.message;
        })
      }
      else { console.log("Network error") }
    })
}

// Delete person

document.getElementById("deletebtn").addEventListener("click", deletePerson)

function deletePerson() {
  let id = document.getElementById("deleteId").value
  document.getElementById("error").innerHTML = ""
  personFacade.deletePerson(id)
    .then(getAllPersons)
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => {
          console.log(e.message)
          document.getElementById("error").innerHTML = e.message;
        })
      }
      else { console.log("Network error") }
    })
}

// Edit person

document.getElementById("editbtn").addEventListener("click", editPerson)

function editPerson() {
  let id = document.getElementById("editId").value;
  let editedPerson = {
    fName: document.getElementById("editfname").value,
    lName: document.getElementById("editlname").value,
    phone: document.getElementById("editphone").value,
    street: document.getElementById("editstreet").value,
    zip: document.getElementById("editzip").value,
    city: document.getElementById("editcity").value
  }
  document.getElementById("error").innerHTML = ""
  personFacade.editPerson(editedPerson, id)
    .then(getAllPersons)
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => {
          console.log(e.message)
          document.getElementById("error").innerHTML = e.message;
        })
      }
      else { console.log("Network error") }
    })
}