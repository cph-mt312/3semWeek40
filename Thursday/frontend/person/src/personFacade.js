const URL = "https://orc-dungeon.com/tomcat/person/api/person/"

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function getAllPersons() {
    return fetch(URL + "all")
        .then(handleHttpErrors)
}

function addPerson(person) {
    const options = makeOptions("POST", person)
    return fetch(URL, options)
        .then(handleHttpErrors)
}

function deletePerson(id) {
    const options = makeOptions("DELETE")
    return fetch(URL + "delete/" + id, options)
    .then(handleHttpErrors)
}

function getPerson(id) {
    return fetch(URL + id)
    .then(handleHttpErrors)
}

function editPerson(person, id) {
    const options = makeOptions("PUT", person)
    return fetch(URL + id, options)
    .then(handleHttpErrors)
}

const personFacade = {
    getAllPersons,
    addPerson,
    deletePerson,
    getPerson,
    editPerson
}

export default personFacade;