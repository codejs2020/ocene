/* eslint-disable no-undef, no-unused-vars */

// === READ FUNCTIONS ===

function getStudentInfo (studentId) {
  return getDataFromStorage('students')[studentId - 1]
}

function getStudentGrades (studentId) {
  return getDataFromStorage('grades').filter(
    (grade) => grade.student === studentId
  )
}

function getSubjectNameFromSubjectId (subjectId) {
  return getDataFromStorage('subjects').filter(
    (subject) => subject.id === subjectId
  )[0].name
}
function getParentInfo (parentId) {
  return getDataFromStorage('parents')[parentId - 1]
}

function getParentNameFromParentId (parentId) {
  return getDataFromStorage('parents').filter(
    (parent) => parent.id === parentId
  )[0].name
}
function getParentSurnameFromParentId (parentId) {
  return getDataFromStorage('parents').filter(
    (parent) => parent.id === parentId
  )[0].surname
}
function getTeacherInfo (teacherId) {
  return getDataFromStorage('teachers')[teacherId]
}

// === UTILITY FUNCTIONS ===

function d (id) {
  return document.getElementById(id)
}

function generatePassword (length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let passwd = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    passwd += charset.charAt(Math.floor(Math.random() * n))
  }
  return passwd
}
function generateUsername (name) {
  const length = 4
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let username = name
  for (let i = 0, n = charset.length; i < length; ++i) {
    username += charset.charAt(Math.floor(Math.random() * n))
  }
  return username
}
function logOutUser () {
  window.location.href = '/src/html/index.html'
  sessionStorage.removeItem('user')
}
function changeObjectProperty (objectId, desc, array) {
  for (const i in array) {
    if (array[i].id === objectId) {
      array[i].desc = desc
      break
    }
  }
}
function getDataFromStorage (collection) {
  return JSON.parse(localStorage.getItem(collection))
}
