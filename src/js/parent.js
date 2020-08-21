/* eslint-disable no-undef, no-unused-vars */

const loggedUser = JSON.parse(sessionStorage.getItem('user'))
const printGradesButton = d('printGrades-btn')

if (!loggedUser) {
  d('container').innerHTML = 'ACCESS DENIED'
} else {
  d('parentGreeting').textContent = `Hello ${loggedUser.name} ! Here are your childs grades: `
}

const parent = new Parent(loggedUser.id, loggedUser.name, loggedUser.surname, loggedUser.username, loggedUser.password)
const studentJson = parent.getMyStudent()
const logOutButton = d('logout-btn')

function d (id) {
  return document.getElementById(id)
}

function getAllGrades () {
  const gradesTable = d('dataFromLS')
  const studentGrades = JSON.parse(localStorage.getItem('grades')).filter(grade => grade.student === studentJson.id)
  let output = ''
  for (const grade of studentGrades) {
    const subjectName = JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.id === grade.subject)[0].name
    output += `
        <tr>
          <td>${subjectName}</td><td>${grade.valueOfGrade}</td><td>${grade.dateOfGrade}</td>
        </tr>`
  }
  gradesTable.innerHTML = output
}

function logOutUser () {
  window.location.href = '/src/html/index.html'
  sessionStorage.removeItem('user')
}

function printGrades () {
  const greeting = d('parentGreeting').textContent
  d('parentGreeting').textContent = ''
  logOutButton.style.display = 'none'
  printGradesButton.style.display = 'none'
  print()
  d('parentGreeting').textContent = greeting
  logOutButton.style.display = 'initial'
  printGradesButton.style.display = 'initial'
}

logOutButton.addEventListener('click', logOutUser)
printGradesButton.addEventListener('click', printGrades)

getAllGrades()
