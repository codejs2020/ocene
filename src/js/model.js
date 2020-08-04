/* eslint-disable no-undef, no-unused-vars */
const userTypes = {
  parent: 1,
  teacher: 2
}

class Subject {
  constructor (id, name, teacher, year) {
    this.id = id
    this.name = name
    this.teacher = teacher
    this.year = year
  }
}

class ClassUnit {
  constructor (id, year) {
    this.id = id
    this.year = year
  }
}

class Grade {
  constructor (id, student, subject, valueOfGrade, dateOfGrade = Date.now()) {
    this.id = id
    this.student = student
    this.subject = subject
    this.valueOfGrade = valueOfGrade
    this.dateOfGrade = dateOfGrade
  }
}

class Student {
  constructor (id, name, surname, classUnit, parentId) {
    this.id = id
    this.name = name
    this.surname = surname
    this.classUnit = classUnit
    this.parentId = parentId
  }

  getAllGrades () {
    return JSON.parse(localStorage.getItem('grades')).filter(grade => grade.student === this.id)
  }

  getGradesForSubject (subjectId) {
    const gradesForSubject = JSON.parse(localStorage.getItem('grades')).filter(subject => subject.id === subjectId && student.id === this.id)
    return gradesForSubject
  }
}

class User {
  constructor (id, name, surname, username, password) {
    this.id = id
    this.name = name
    this.surname = surname
    this.username = username
    this.password = password
  }
}

class Parent extends User {
  constructor (id, name, surname, username, password) {
    super(id, name, surname, username, password)
    this.typeOfUser = userTypes.parent
  }
  getMyStudent(){
    return JSON.parse(localStorage.getItem('students')).filter(student=>student.parentId == this.id)[0]
  }
}

class Teacher extends User {
  constructor (id, name, surname, username, password) {
    super(id, name, surname, username, password)
    this.typeOfUser = userTypes.teacher
  }

  getSubjects () {
    return JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.teacher === this.id)
  }
}

const storageData = { subjects: [], students: [], teachers: [], parents: [], grades: [] }
const constructors = { subjects: Subject, students: Student, teachers: Teacher, parents: Parent, grades: Grade }
const data = {
  subjects: [
    ['Mathematics 1', 1, 1],
    ['English 1', 2, 1],
    ['History 1', 3, 1]
  ],
  students: [
    ['Marko', 'Markovic', 1,1],
    ['Maja', 'Majic', 1,2],
    ['Milos', 'Milosevic', 1,3],
    
  ],
  teachers: [
    ['Rajka', 'Matematicarka', 'rajka', '123'],
    ['Borka', 'Engleskinja', 'borkaEng', '234'],
    ['Zika', 'Istoricar', 'zikaIst', '456']
  ],
  parents: [
    ['Markov Cale', 'Markovic', 'maretovLeca', 'abc'],
    ['Majina Keva', 'Majic', 'majinaKeva', 'aaa'],
    ['Milosevi Matorci', 'Milosevic', 'milosevici', '111']
  ],
  grades: [
    [1, 1, 3],
    [1, 2, 3],
    [1, 1, 4],
    [1, 2, 2],
    [1, 3, 5],
    [1, 3, 4],
    [2, 1, 5],
    [2, 2, 5],
    [2, 4, 5],
    [3, 2, 2],
    [3, 3, 5],
    [3, 2, 4]
  ]
}

const classUnit1 = new ClassUnit(1, 1)
for (const type in data) {
  for (let i = 1; i <= data[type].length; i++) {
    const row = data[type][i - 1]
    storageData[type].push(new constructors[type](i, ...row))
  }
}

// if (localStorage.getItem('grades') === null) { // ne briši ako već postoji nešto
  localStorage.setItem('grades', JSON.stringify(storageData.grades))
  localStorage.setItem('students', JSON.stringify(storageData.students))
  localStorage.setItem('subjects', JSON.stringify(storageData.subjects))
  localStorage.setItem('teachers' , JSON.stringify(storageData.teachers))
  localStorage.setItem('parents' , JSON.stringify(storageData.parents))
  localStorage.setItem('users', JSON.stringify([...storageData.teachers, ...storageData.parents]))
  localStorage.setItem('persons', JSON.stringify([...storageData.students, ...storageData.teachers]))
// }

