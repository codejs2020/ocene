/* eslint-disable no-undef, no-unused-vars */

//  === VARIABLES ===

const loggedUser = JSON.parse(sessionStorage.getItem('user'))
const logOutButton = d('logout-btn')
const addNewStudentButton = d('addNewStudent-btn')
const addNewTeacherButton = d('addNewTeacher-btn')
const addNewSubjectButton = d('addNewSubject-btn')
const viewAllStudentsButton = d('viewAllStudents-btn')
const viewAllTeachersButton = d('viewAllTeachers-btn')
const viewAllSubjectsButton = d('viewAllSubjects-btn')
const mainMenu = d('mainMenu')

// === AUTHORIZATION ===

if (!loggedUser) {
  d('container').innerHTML = 'ACCESS DENIED'
} else {
  d('userGreeting').textContent = `Hello ${loggedUser.name} !`
}

// === READ FUNCTIONS ===

function getStudentInfo (studentId) {
  return JSON.parse(localStorage.getItem('students'))[studentId - 1]
}

function getStudentGrades (studentId) {
  return JSON.parse(localStorage.getItem('grades')).filter(
    (grade) => grade.student === studentId
  )
}

function getSubjectNameFromSubjectId (subjectId) {
  return JSON.parse(localStorage.getItem('subjects')).filter(
    (subject) => subject.id === subjectId
  )[0].name
}

function getParentNameFromParentId (parentId) {
  return JSON.parse(localStorage.getItem('parents')).filter(
    (parent) => parent.id === parentId
  )[0].name
}
function getTeacherInfo (teacherId) {
  return JSON.parse(localStorage.getItem('teachers'))[teacherId]
}

function getAllStudents () {
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
function getAllTeachers () {
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
        <td><button data-id="${person.id}" onclick="editTeacher(${person.id})">Edit</button></td>
        <td>
          <button data-id="${person.id}" onclick="deleteTeacher(${person.id})">Delete</button>
          <button data-id="${person.id}" onclick="createDisplayForTeacherInfo(${person.id})">View Profile</button>
        </td>
      </tr>`
  }
  output += '</table>'
  dataFromStorage.innerHTML = output
}
function getAllSubjects () {
  const dataFromStorage = d('mainMenu')
  const allSubjects = JSON.parse(localStorage.getItem('subjects'))
  let output = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Year</th>
      <th>Teacher</th>
      <th></th>
    </tr>
  </thead>`
  for (const subject of allSubjects) {
    output += `<tr>
        <td>${subject.id}</td><td>${subject.name}</td>
        <td>${subject.year}</td>
        <td>${getTeacherInfo(subject.teacher).name} ${
  getTeacherInfo(subject.teacher).surname
}</td>
        <td><button data-id="${subject.id}" onclick="editSubject(${
  subject.id
})">Edit</button></td>
        <td>
          <button data-id="${subject.id}" onclick="deleteSubject(${
  subject.id
})">Delete</button>
        </td>
      </tr>`
  }
  output += '</table>'
  dataFromStorage.innerHTML = output
}

// === CREATE FUNCTIONS ===

function addNewStudent (name, surname, classUnit) {
  const allStudents = JSON.parse(localStorage.getItem('students'))
  const parents = JSON.parse(localStorage.getItem('parents'))
  const parentId = parents[parents.length - 1].id + 1
  const id = allStudents[allStudents.length - 1].id + 1
  allStudents.push({ id, name, surname, classUnit, parentId })
  localStorage.setItem('students', JSON.stringify(allStudents))
}
function addNewParent (name, surname) {
  const parents = JSON.parse(localStorage.getItem('parents'))
  const users = JSON.parse(localStorage.getItem('users'))
  const id = parents[parents.length - 1].id + 1
  const username = generateUsername(surname)
  const password = generatePassword()
  parents.push({ id, name, surname, username, password, typeOfUser: 1 })
  users.push({ id, name, surname, username, password, typeOfUser: 1 })
  localStorage.setItem('parents', JSON.stringify(parents))
  localStorage.setItem('users', JSON.stringify(users))
}
function addNewGrade (studentId, grade) {
  const teacher = JSON.parse(sessionStorage.getItem('user'))
  const subject = JSON.parse(localStorage.getItem('subjects')).filter(
    (subject) => subject.teacher === teacher.id
  )[0]
  const allGrades = JSON.parse(localStorage.getItem('grades'))
  const lastId = allGrades[allGrades.length - 1].id
  allGrades.push({
    id: lastId + 1,
    student: Number(studentId),
    subject: subject.id,
    valueOfGrade: Number(grade),
    dateOfGrade: new Date()
  })
  localStorage.setItem('grades', JSON.stringify(allGrades))
}
function addNewTeacher (name, surname, subjectId) {
  const allTeachers = JSON.parse(sessionStorage.getItem('teachers'))
  const allSubjects = JSON.parse(sessionStorage.getItem('subjects'))
  const id = allTeachers[allTeachers.length - 1].id + 1
  const teachersSubject = JSON.parse(localStorage.getItem('subjects')).filter(
    (subject) => subject.id === subjectId
  )
  const password = generatePassword(surname)
  const username = generateUsername(surname)
  teachersSubject.teacher = id
  allSubjects.push(teachersSubject)
  localStorage.setItem('subjects', JSON.stringify(allSubjects))
  allTeachers.push({ id, name, surname, username, password, typeOfUser: 2 })
  localStorage.setItem('teachers', JSON.stringify(allTeachers))
}
function addNewSubject (name, year) {
  const allSubjects = JSON.parse(localStorage.getItem('subjects'))
  const id = allSubjects[allSubjects.length - 1].id + 1
  allSubjects.push({ id, name, teacher: 0, year })
  localStorage.setItem('subjects', JSON.stringify(allSubjects))
}
// === UPDATE FUNCTIONS === (TODO)

// === DELETE FUNCTIONS ==== (TODO)

function deleteStudent (id) {
  const confirmation = confirm('Are you sure?')
  if (confirmation) {
    const allStudents = JSON.parse(localStorage.getItem('students'))
    const allParents = JSON.parse(localStorage.getItem('parents'))
    const allGrades = JSON.parse(localStorage.getItem('grades'))
    const parentId = allStudents.filter((student) => student.id === id)[0]
      .parentId

    const studentsWithoutThisStudent = allStudents.filter(
      (student) => student.id !== id
    )
    const parentsWithoutThisParent = allParents.filter(
      (parent) => parent.id !== parentId
    )
    const gradesWithoutThisStudentsGrades = allGrades.filter(
      (grade) => grade.student !== id
    )
    localStorage.setItem(
      'students',
      JSON.stringify(studentsWithoutThisStudent)
    )

    localStorage.setItem('parents', JSON.stringify(parentsWithoutThisParent))
    localStorage.setItem(
      'grades',
      JSON.stringify(gradesWithoutThisStudentsGrades)
    )
    getAllStudents()
  }
}
function deleteTeacher (id) {
  const confirmation = confirm('Are you sure?')
  if (confirmation) {
    const allTeachers = JSON.parse(localStorage.getItem('teachers'))
    const teachersWithoutThisTeacher = allTeachers.filter(
      (teacher) => teacher.id !== id
    )
    localStorage.setItem(
      'teachers',
      JSON.stringify(teachersWithoutThisTeacher)
    )
    getAllTeachers()
  }
}
function deleteSubject (id) {
  const confirmation = confirm('Are you sure?')
  if (confirmation) {
    const allSubjects = JSON.parse(localStorage.getItem('subjects'))
    const subjectsWithoutThisSubject = allSubjects.filter(
      (subject) => subject.id !== id
    )
    localStorage.setItem(
      'subjects',
      JSON.stringify(subjectsWithoutThisSubject)
    )
    getAllSubjects()
  }
}
// === DOM FUNCTIONS ===

function createDisplayForNewStudent () {
  mainMenu.innerHTML = `<form>
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="studentName" required>
  </p>
  <p>
    <label for="surname">Surname</label>
    <input type="text" name="surname" id="studentSurname" required>
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
  <input type="submit" value="Submit" id="updateStudentStorage-btn" class="btn">
</form>`
  const scr = document.createElement('script')
  scr.innerHTML = `  function updateStudentStorage(event){
    event.preventDefault()
    const newStudentName = d('studentName').value
    const newStudentSurname = d('studentSurname').value
    const newStudentParentName = d('parentName').value
    const newStudentParentSurname = d('parentSurname').value
    const newStudentClassUnit = d('classUnit').value
    addNewStudent(newStudentName,newStudentSurname,newStudentClassUnit)
    addNewParent(newStudentParentName,newStudentParentSurname)
    const students = JSON.parse(localStorage.getItem('students'))
    const newStudentId = students[students.length-1].id
    createDisplayForStudentInfo(newStudentId)
  }
  d('updateStudentStorage-btn').addEventListener('click',updateStudentStorage)`
  mainMenu.appendChild(scr)
}

function createDisplayForNewTeacher () {
  mainMenu.innerHTML = `<form>
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" required>
  </p>
  <p>
    <label for="surname">Surname</label>
    <input type="text" name="surname" id="surname" required>
  </p>
  <p>
  <label for="subject">Subject ID</label>
    <input type="text" name="subject" id="subject" required>
  </p>

  <input type="submit" value="Submit">
</form>`
}
function createDisplayForNewSubject () {
  mainMenu.innerHTML = `<form>
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" required>
  </p>
  <p>
    <label for="surname">Year</label>
    <input type="text" name="year" id="year" required>
  </p>
  <p>
  
  <input type="submit" value="Submit" id="updateSubjectStorage-btn">
</form>`
  const scr = document.createElement('script')
  scr.innerHTML = `  function updateSubjectStorage(event){
  event.preventDefault()
  const newSubjectName = d('name').value
  const newSubjectYear = d('year').value
  addNewSubject(newSubjectName,newSubjectYear)
  getAllSubjects()
}
d('updateSubjectStorage-btn').addEventListener('click',updateSubjectStorage)`
  mainMenu.appendChild(scr)
}

function createDisplayForStudentInfo (studentId) {
  const studentInfo = getStudentInfo(studentId)
  const studentGrades = getStudentGrades(studentId)
  const parentName = getParentNameFromParentId(studentInfo.parentId)
  localStorage.setItem('thisStudent', studentInfo.id)
  let gradesTable = ''
  for (const grade of studentGrades) {
    gradesTable += `
      <tr>
          <td>${getSubjectNameFromSubjectId(grade.subject)}</td><td>${
  grade.valueOfGrade
}</td><td>${grade.dateOfGrade}</td>
        </tr>`
  }

  mainMenu.innerHTML = `
  
  <h2>${studentInfo.name} ${studentInfo.surname} , Class : ${studentInfo.classUnit}</h2> 
  <h2>Parent Name : ${parentName}</h2>
  <h2>Student ID : ${studentInfo.id}</h2>
  <h2> Student Grades : </h2>
  <table class="table">
      <thead><tr><td>Subject</td><td>Grade</td><td>Date</td></tr></thead>
      <tbody>${gradesTable}</tbody></table>
      <button type='button' class='btn' onclick="createDisplayForNewGrade(${studentInfo.id})">Add Grade</button>
      `
}
function createDisplayForTeacherInfo (teacherId) {
  const teacherInfo = getTeacherInfo(teacherId)
  const subjectName = JSON.parse(localStorage.getItem('subjects')).filter(
    (subject) => subject.teacher === teacherId
  )[0].name
  mainMenu.innerHTML = `<h2>${teacherInfo.name} ${teacherInfo.surname}</h2>
  <h2> Subject : ${subjectName} </h2>`
}

function createDisplayForNewGrade () {
  const teacher = JSON.parse(sessionStorage.getItem('user'))
  const subject = JSON.parse(localStorage.getItem('subjects')).filter(
    (subject) => subject.teacher === teacher.id
  )[0]
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
  </form>`
  const scr = document.createElement('script')
  scr.innerHTML = `  function updateGradeStorage(event){
    event.preventDefault()
    const studentId = localStorage.getItem('thisStudent')
    addNewGrade(studentId,d('newGrade').value)
    createDisplayForStudentInfo(studentId)
  }
  d('submitNewGrade-btn').addEventListener('click',updateGradeStorage)`
  mainMenu.appendChild(scr)
}

// === EVENT LISTENERS ===

logOutButton.addEventListener('click', logOutUser)
addNewStudentButton.addEventListener('click', createDisplayForNewStudent)
addNewTeacherButton.addEventListener('click', createDisplayForNewTeacher)
addNewSubjectButton.addEventListener('click', createDisplayForNewSubject)
viewAllStudentsButton.addEventListener('click', getAllStudents)
viewAllTeachersButton.addEventListener('click', getAllTeachers)
viewAllSubjectsButton.addEventListener('click', getAllSubjects)
