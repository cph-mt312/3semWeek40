const URL = "http://localhost:3333/api/users/";

function getUsers() {
    return fetch(URL)
    .then(res => res.json())
}

function getUser(id) {
  return fetch(URL + id)
  .then(function(response) {
    return response.json();
  });
}

function addUser(user) {
    const options = makeOptions("POST", user)
    return fetch(URL, options)
    .then(handleHttpErrors)
}

function editUser(user) {
  const options = makeOptions("PUT", user)
  return fetch(URL + user.id, options)
  .then(handleHttpErrors)
}

function deleteUser(id) {
  const options = makeOptions("DELETE")
  return fetch(URL + id, options)
  .then(handleHttpErrors)
}

const userFacade = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
}

function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }
   
   function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }

export default userFacade;