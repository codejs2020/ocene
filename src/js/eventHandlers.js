/* eslint-disable no-undef, no-unused-vars */

// === EVENT HANDLERS ===

function editStudentEventHandler (event) {
  event.preventDefault()
  const id = d('studentId').value
  const name = d('studentName').value
  const surname = d('studentSurname').value
  const parentName = d('parentName').value
  const parentSurname = d('parentSurname').value
  const classUnit = d('classUnit').value
  const parentId = getDataFromStorage('students').filter(student => student.id === id)[0].parentId
  editStudent(id, name, surname, classUnit)
  editParent(parentId, parentName, parentSurname)
  createDisplayForStudentInfo(studentId)
}

function updateSubjectEventHandler (event) {
  event.preventDefault()
  const name = d('name').value
  const year = d('year').value
  addNewSubject(name, year)
  createDisplayForAllSubjects()
}

function addStudentEventHandler (event) {
  event.preventDefault()
  const name = d('studentName').value
  const surname = d('studentSurname').value
  const parentName = d('parentName').value
  const parentSurname = d('parentSurname').value
  const classUnit = d('classUnit').value
  addNewStudent(name, surname, classUnit)
  addNewParent(parentName, parentSurname)
  createDisplayForAllStudents()
}
function addTeacherEventHandler (event) {
  const name = d('name').value
  const surname = d('surname').value
  const subject = d('subject').value
  addNewTeacher(name, surname, subject)
  createDisplayForAllTeachers()
}

function updateGradeEventHandler (event) {
  event.preventDefault()
  const studentId = localStorage.getItem('thisStudent')
  addNewGrade(studentId, d('newGrade').value)
  createDisplayForStudentInfo(studentId)
}

function editTeacherEventHandler (event) {
  event.preventDefault()
  const id = d('teacherId').value
  const name = d('teacherName').value
  const surname = d('teacherSurname').value
  const subject = d('subject').value
  editTeacher(id, name, surname, subject)
  createDisplayForTeacherInfo(id)
}

function editSubjectEventHandler (event) {
  event.preventDefault()
  const id = d('subjectId').value
  const name = d('subjectName').value
  const year = d('subjectYear').value
  editSubject(id, name, year)
  createDisplayForAllSubjects()
}
