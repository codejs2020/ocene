const loggedUser =JSON.parse(sessionStorage.getItem('user'))
const logOutButton = d('logout-btn')
const addNewStudentButton = d('addNewStudent-btn')
const addNewTeacherButton = d('addNewTeacher-btn')
const mainMenu = d('mainMenu')
const viewAllPersonsButton = d('viewEveryone-btn')
const viewAllStudentsButton = d('viewAllStudents-btn')
const viewAllTeachersButton = d('viewAllTeachers-btn')

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


function getAllPersons () {
  const dataFromStorage = d('mainMenu')
  const allPersons = JSON.parse(localStorage.getItem('persons'))
  let output = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Surname</th>
      <th></th>
      <th></th>
    </tr>
  </thead>`
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
  output+='</table>'
  dataFromStorage.innerHTML = output
}

function getAllStudents() {
  const dataFromStorage = d('mainMenu')
  const allstudents = JSON.parse(localStorage.getItem('students'))
  let output = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Surname</th>
      <th></th>
      <th></th>
    </tr>
  </thead>`
  for (const person of allstudents) {
    output += `<tr>
        <td>${person.id}</td><td>${person.name}</td>
        <td>${person.surname}</td>
        <td><button data-id="${person.id}" onclick="editPerson(${person.id})">Edit</button></td>
        <td>
          <button data-id="${person.id}" onclick="deletePerson(${person.id})">Delete</button>
          <button data-id="${person.id}" onclick="viewPerson(${person.id})">View Profile</button>
        </td>
      </tr>`
  }
  output+='</table>'
  dataFromStorage.innerHTML = output
}
function getAllTeachers() {
  const dataFromStorage = d('mainMenu')
  const allTeachers = JSON.parse(localStorage.getItem('teachers'))
  let output = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Surname</th>
      <th></th>
      <th></th>
    </tr>
  </thead>`
  for (const person of allTeachers) {
    output += `<tr>
        <td>${person.id}</td><td>${person.name}</td>
        <td>${person.surname}</td>
        <td><button data-id="${person.id}" onclick="editPerson(${person.id})">Edit</button></td>
        <td>
          <button data-id="${person.id}" onclick="deletePerson(${person.id})">Delete</button>
          <button data-id="${person.id}" onclick="viewPerson(${person.id})">View Profile</button>
        </td>
      </tr>`
  }
  output+='</table>'
  dataFromStorage.innerHTML = output
}
function logOutUser(){
  
  window.location.href="/src/html/index.html"
  sessionStorage.removeItem('user')
}

function createDisplayForNewStudent(){

  mainMenu.innerHTML = `<form action="" method="post" id="add-new-form">
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" required>
  </p>
  <p>
    <label for="surname">Surname</label>
    <input type="text" name="surname" id="surname" required>
  </p>
  <p>
  <label for="parentName">Parent Name</label>
    <input type="text" name="parentName" id="parentName" required>
  </p>
  <p>
  <label for="parentSurname">Parent Name</label>
    <input type="text" name="parentSurname" id="parentSurname" required>
  </p>
  <p>
  <label for="classUnit">Class Unit</label>
    <input type="text" name="classUnit" id="classUnit" required>
  </p>
  <input type="hidden" name="id" id="id" value=''>

  <input type="submit" value="Submit">
</form>`
}

function createDisplayForNewTeacher(){

  mainMenu.innerHTML = `<form action="" method="post" id="add-new-form">
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" required>
  </p>
  <p>
    <label for="surname">Surname</label>
    <input type="text" name="surname" id="surname" required>
  </p>
  <p>
  <label for="subject">Subject</label>
    <input type="text" name="subject" id="subject" required>
  </p>
  <p>
  <label for="username">Username</label>
    <input type="text" name="username" id="username" required>
  </p>
  <p>
  <label for="password">Password</label>
    <input type="text" name="password" id="password" required>
  </p>
  <input type="hidden" name="id" id="id" value=''>

  <input type="submit" value="Submit">
</form>`
}

logOutButton.addEventListener('click',logOutUser)
addNewStudentButton.addEventListener('click',createDisplayForNewStudent)
addNewTeacherButton.addEventListener('click',createDisplayForNewTeacher)
viewAllPersonsButton.addEventListener('click',getAllPersons)
viewAllStudentsButton.addEventListener('click',getAllStudents)
viewAllTeachersButton.addEventListener('click',getAllTeachers)

