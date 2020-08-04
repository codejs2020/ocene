const loggedUser = JSON.parse(sessionStorage.getItem('user'))
const logOutButton = d('logout-btn')
const addNewStudentButton = d('addNewStudent-btn')
const addNewTeacherButton = d('addNewTeacher-btn')
const viewAllStudentsButton = d('viewAllStudents-btn')
const viewAllTeachersButton = d('viewAllTeachers-btn')
let mainMenu = d('mainMenu')

if (!loggedUser) {
  d('container').innerHTML = "ACCESS DENIED"
}
else {
  d('userGreeting').textContent = `Hello ${loggedUser.name} !`
}
function addNewPerson(name, surname) {
  let persons = localStorage.getItem('persons')
  if (persons == null) {
    persons = []
  } else {
    persons = JSON.parse(persons)
  }
  persons.push({ name, surname })
  localStorage.setItem('persons', JSON.stringify(persons))
}

function d(id) {
  return document.getElementById(id)
}
function getStudentInfo(studentId) {

  return JSON.parse(localStorage.getItem('students'))[studentId - 1]
}

function getStudentGrades(studentId) {

  return JSON.parse(localStorage.getItem('grades')).filter(grade => grade.student === studentId)
}

function getSubjectNameFromSubjectId(subjectId) {

  return JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.id === subjectId)[0].name
}

function getParentNameFromParentId(parentId) {

  return JSON.parse(localStorage.getItem('parents')).filter(parent => parent.id === parentId)[0].name
}
function getTeacherInfo(teacherId) {

  return JSON.parse(localStorage.getItem('teachers'))[teacherId - 1]
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
        <td><button data-id="${person.id}" onclick="editStudent(${person.id})">Edit</button></td>
        <td>
          <button data-id="${person.id}" onclick="deleteStudent(${person.id})">Delete</button>
          <button data-id="${person.id}" onclick="createDisplayForStudentInfo(${person.id})">View Profile</button>
        </td>
      </tr>`
  }
  output += '</table>'
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
          <button data-id="${person.id}" onclick="createDisplayForTeacherInfo(${person.id})">View Profile</button>
        </td>
      </tr>`
  }
  output += '</table>'
  dataFromStorage.innerHTML = output
}
function logOutUser() {

  window.location.href = "/src/html/index.html"
  sessionStorage.removeItem('user')
}

function createDisplayForNewStudent() {

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
  <label for="parentSurname">Parent Surame</label>
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

function createDisplayForNewTeacher() {

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


function createDisplayForStudentInfo(studentId) {

  let studentInfo = getStudentInfo(studentId)
  let studentGrades = getStudentGrades(studentId)
  let parentName = getParentNameFromParentId(studentInfo.parentId)
  let gradesTable = ''
  for (let grade of studentGrades) {
    gradesTable += `
      <tr>
          <td>${getSubjectNameFromSubjectId(grade.subject)}</td><td>${grade.valueOfGrade}</td><td>${grade.dateOfGrade}</td>
        </tr>`
  }

  mainMenu.innerHTML = `
  
  <h2>${studentInfo.name} ${studentInfo.surname} , Class : ${studentInfo.classUnit}</h2> 
  <h2>Parent Name : ${parentName}</h2>
  <h2> Student Grades : </h2>
  <table class="table">
      <thead><tr><td>Subject</td><td>Grade</td><td>Date</td></tr></thead>
      <tbody>${gradesTable}</tbody></table>
      <button type='button' class='btn' onclick="createDisplayForNewGrade(${studentInfo.id})">Add Grade</button>
      `

}
function createDisplayForTeacherInfo(teacherId) {

  let teacherInfo = getTeacherInfo(teacherId)
  let subjectName = JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.teacher === teacherId)[0].name
  mainMenu.innerHTML = `<h2>${teacherInfo.name} ${teacherInfo.surname}</h2>
  <h2> Subject : ${subjectName} </h2>` 
}

function addNewGrade(studentId, grade) {
  let teacher = JSON.parse(sessionStorage.getItem('user'))
  let subject = JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.teacher === teacher.id)[0]
  let allGrades = JSON.parse(localStorage.getItem('grades'))
  allGrades.push({ studentId, subject, grade })
  localStorage.setItem('grades', JSON.stringify(allGrades))
}

function createDisplayForNewGrade(studentId) {
  let teacher = JSON.parse(sessionStorage.getItem('user'))
  let subject = JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.teacher === teacher.id)[0]
  mainMenu.innerHTML = `<form> 
  <p>
  Subject : ${subject.name}
</p>
  <p>
    <label for="newGrade">Grade</label>
    <select name="newGrade" id="newGrade">
    <option value=1>1</option>
    <option value=2>2</option>
    <option value=3>3</option>
    <option value=4>4</option>
    <option value=5>5</option>
    </select>
  </p>
 
<input type="submit" id="submitNewGrade-btn" class="btn" value="Submit"> 
  </form>
  <script>
  function updateGradeStorage(event){
    event.preventDefault()
    addNewGrade(studentId,d('newGrade').value)
  }
  d('submitNewGrade-btn').addEventListener('click',updateGradeStorage)
   </script>
  `

}

logOutButton.addEventListener('click', logOutUser)
addNewStudentButton.addEventListener('click', createDisplayForNewStudent)
addNewTeacherButton.addEventListener('click', createDisplayForNewTeacher)
viewAllStudentsButton.addEventListener('click', getAllStudents)
viewAllTeachersButton.addEventListener('click', getAllTeachers)

