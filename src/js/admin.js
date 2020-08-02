const loggedUser =JSON.parse(sessionStorage.getItem('user'))
const logOutButton = d('logout-btn')
if (!loggedUser){
  d('container').innerHTML="ACCESS DENIED"
}
else{
d('userGreeting').textContent = `Hello ${loggedUser.name} !`
}
function addNewPerson (name, surname) {
  let persons = localStorage.getItem('persons')
  if (persons == null) {
    persons = []
  } else {
    persons = JSON.parse(persons)
  }
  persons.push({ name, surname })
  localStorage.setItem('persons', JSON.stringify(persons))
}

function d (id) {
  return document.getElementById(id)
}

document.getElementById('add-new-form').addEventListener('submit', function (event) {
  event.preventDefault()
  addNewPerson(d('name').value, d('surname').value)
  d('name').value = ''
  d('surname').value = ''
})

function getAllPersons () {
  const dataFromStorage = d('dataFromLS')
  const allPersons = JSON.parse(localStorage.getItem('persons'))
  let output = ''
  for (const person of allPersons) {
    output += `
      <tr>
        <td>${person.id}</td><td>${person.name}</td>
        <td>${person.surname}</td>
        <td><button data-id="${person.id}" onclick="editPerson(${person.id})">Edit</button></td>
        <td>
          <button data-id="${person.id}" onclick="deletePerson(${person.id})">Delete</button>
          <button data-id="${person.id}" onclick="viewPerson(${person.id})">View Profile</button>
        </td>
      </tr>`
  }
  dataFromStorage.innerHTML = output
}
function logOutUser(){
  
  window.location.href="/src/html/index.html"
  sessionStorage.removeItem('user')
}

logOutButton.addEventListener('click',logOutUser)

getAllPersons()
