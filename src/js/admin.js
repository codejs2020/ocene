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

// === CREATE FUNCTIONS ===

function addNewStudent (name, surname, classUnit) {
  const allStudents = getDataFromStorage('students')
  const parents = getDataFromStorage('parents')
  const parentId = parents[parents.length - 1].id + 1
  const id = allStudents[allStudents.length - 1].id + 1
  allStudents.push({ id, name, surname, classUnit, parentId })
  localStorage.setItem('students', JSON.stringify(allStudents))
}
function addNewParent (name, surname) {
  const parents = getDataFromStorage('parents')
  const users = getDataFromStorage('users')
  const id = parents[parents.length - 1].id + 1
  const username = generateUsername(surname)
  const password = generatePassword(8)
  parents.push({ id, name, surname, username, password, typeOfUser: 1 })
  users.push({ id, name, surname, username, password, typeOfUser: 1 })
  localStorage.setItem('parents', JSON.stringify(parents))
  localStorage.setItem('users', JSON.stringify(users))
}
function addNewGrade (studentId, grade) {
  const teacher = JSON.parse(sessionStorage.getItem('user'))
  const subject = getDataFromStorage('subjects').filter(
    (subject) => subject.teacher === teacher.id
  )[0]
  const allGrades = getDataFromStorage('grades')
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
  const allTeachers = getDataFromStorage('teachers')
  const allSubjects = getDataFromStorage('subjects')
  const id = allTeachers[allTeachers.length - 1].id + 1
  const teachersSubject = getDataFromStorage('subjects').filter(
    (subject) => subject.id === subjectId
  )
  const password = generatePassword(8)
  const username = generateUsername(surname)
  allTeachers.push({ id, name, surname, username, password, typeOfUser: 2 })
  localStorage.setItem('teachers', JSON.stringify(allTeachers))
  teachersSubject.teacher = id
  allSubjects.push(teachersSubject)
  localStorage.setItem('subjects', JSON.stringify(allSubjects))
}
function addNewSubject (name, year) {
  const allSubjects = getDataFromStorage('subjects')
  const id = allSubjects[allSubjects.length - 1].id + 1
  allSubjects.push({ id, name, teacher: 0, year })
  localStorage.setItem('subjects', JSON.stringify(allSubjects))
}
// === UPDATE FUNCTIONS === (TODO)

function editStudent (id, name, surname, classUnit) {
  const allStudents = getDataFromStorage('students')
  changeObjectProperty(id, name, allStudents)
  changeObjectProperty(id, surname, allStudents)
  changeObjectProperty(id, classUnit, allStudents)
  localStorage.setItem('students', JSON.stringify(allStudents))
}
function editParent (id, name, surname) {
  const allParents = getDataFromStorage('parents')
  changeObjectProperty(id, name, allParents)
  changeObjectProperty(id, surname, allParents)
  localStorage.setItem('parents', JSON.stringify(allParents))
}
function editTeacher (id, name, surname, subjectId) {
  const allTeachers = getDataFromStorage('teachers')
  changeObjectProperty(id, name, allTeachers)
  changeObjectProperty(id, surname, allTeachers)
  changeObjectProperty(id, subjectId, allTeachers)
  localStorage.setItem('teachers', JSON.stringify(allTeachers))
}
function editSubject (id, name, year) {
  const allSubjects = getDataFromStorage('subjects')
  changeObjectProperty(id, name, allSubjects)
  changeObjectProperty(id, year, allSubjects)
  localStorage.setItem('subjects', JSON.stringify(allSubjects))
}
// === DELETE FUNCTIONS ====

function deleteStudent (id) {
  const confirmation = confirm('Are you sure?')
  if (confirmation) {
    const allStudents = getDataFromStorage('students')
    const allParents = getDataFromStorage('parents')
    const allGrades = getDataFromStorage('grades')
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
    createDisplayForAllStudents()
  }
}
function deleteTeacher (id) {
  const confirmation = confirm('Are you sure?')
  if (confirmation) {
    const allTeachers = getDataFromStorage('teachers')
    const teachersWithoutThisTeacher = allTeachers.filter(
      (teacher) => teacher.id !== id
    )
    localStorage.setItem(
      'teachers',
      JSON.stringify(teachersWithoutThisTeacher)
    )
    createDisplayForAllTeachers()
  }
}
function deleteSubject (id) {
  const confirmation = confirm('Are you sure?')
  if (confirmation) {
    const allSubjects = getDataFromStorage('subjects')
    const subjectsWithoutThisSubject = allSubjects.filter(
      (subject) => subject.id !== id
    )
    localStorage.setItem(
      'subjects',
      JSON.stringify(subjectsWithoutThisSubject)
    )
    createDisplayForAllSubjects()
  }
}

// === EVENT LISTENERS ===

logOutButton.addEventListener('click', logOutUser)
addNewStudentButton.addEventListener('click', createDisplayForNewStudent)
addNewTeacherButton.addEventListener('click', createDisplayForNewTeacher)
addNewSubjectButton.addEventListener('click', createDisplayForNewSubject)
viewAllStudentsButton.addEventListener('click', createDisplayForAllStudents)
viewAllTeachersButton.addEventListener('click', createDisplayForAllTeachers)
viewAllSubjectsButton.addEventListener('click', createDisplayForAllSubjects)
