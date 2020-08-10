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
  addToStorage('students', allStudents)
}
function addNewParent (name, surname) {
  const parents = getDataFromStorage('parents')
  const users = getDataFromStorage('users')
  const id = parents[parents.length - 1].id + 1
  const username = generateUsername(surname)
  const password = generatePassword(8)
  parents.push({ id, name, surname, username, password, typeOfUser: 1 })
  users.push({ id, name, surname, username, password, typeOfUser: 1 })
  addToStorage('parents', parents)
  addToStorage('users', users)
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
  addToStorage('grades', allGrades)
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
  addToStorage('teachers', allTeachers)
  teachersSubject.teacher = id
  allSubjects.push(teachersSubject)
  addToStorage('subjects', allSubjects)
}
function addNewSubject (name, year) {
  const allSubjects = getDataFromStorage('subjects')
  const id = allSubjects[allSubjects.length - 1].id + 1
  allSubjects.push({ id, name, teacher: 0, year })
  addToStorage('subjects', allSubjects)
}
// === UPDATE FUNCTIONS === (TODO)

function editStudent (id, ...elements) {
  edit(id, 'students',elements)
}
function editParent(id, ...elements) {
  edit(id, 'parents',elements)
}
function editTeacher(id, ...elements) {
  edit(id, 'teachers',elements)
}
function editSubject(id, ...elements) {
  edit(id, 'subjects', elements)
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
    addToStorage(
      'students',
      studentsWithoutThisStudent)

    addToStorage('parents', parentsWithoutThisParent)
    addToStorage(
      'grades',
      gradesWithoutThisStudentsGrades)

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
    addToStorage(
      'teachers',
      teachersWithoutThisTeacher)

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
    addToStorage(
      'subjects',
      subjectsWithoutThisSubject)

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
