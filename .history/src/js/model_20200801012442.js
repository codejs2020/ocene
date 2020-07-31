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
    this.subjects = JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.year === this.year)
    this.students = JSON.parse(localStorage.getItem('students')).filter(student => student.classUnit === this.id)
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
  constructor (id, name, surname, classUnit) {
    this.id = id
    this.name = name
    this.surname = surname
    this.classUnit = classUnit
    this.grades = JSON.parse(localStorage.getItem('grades')).filter(grade => grade.student === this.id)
  }

  getGradesForSubject (subjectId) {
    const gradesForSubject = JSON.parse(localStorage.getItem('grades')).filter(subject => subject.id === subjectId && student.id === this.id)
    return gradesForSubject
  }
}

class User {
  constructor (id, name, surname, username, password, typeOfUser) {
    this.id = id
    this.name = name
    this.surname = surname
    this.username = username
    this.password = password
    this.typeOfUser = typeOfUser
  }
}

class Parent extends User {
  constructor (id, name, surname, username, password, student, typeOfUser = userTypes.parent) {
    super(id, name, surname, username, password)
    this.student = student
    this.typeOfUser = typeOfUser
  }
}
class Teacher extends User {
  constructor (id, name, surname, username, password, typeOfUser = userTypes.teacher) {
    super(id, name, surname, username, password)
    this.subjects = JSON.parse(localStorage.getItem('subjects')).filter(subject => subject.teacher === this.id)
    this.typeOfUser = typeOfUser
    
  }
}
let personId = 0
let subjectId = 0
const math1 = new Subject(++subjectId, 'Mathematics 1', 1, 1)
const english1 = new Subject(++subjectId, 'English 1', 2, 1)
const history1 = new Subject(++subjectId, 'History 1', 3, 1)
const subjects = [math1, english1, history1]
localStorage.setItem('subjects', JSON.stringify(subjects))
const classUnit1 = new ClassUnit(1, 1)
const student1 = new Student(++personId, 'Marko', 'Markovic', 1)
const student2 = new Student(++personId, 'Maja', 'Majic', 1)
const student3 = new Student(++personId, 'Milos', 'Milosevic', 1)
const students = [student1, student2, student3]
localStorage.setItem('students', JSON.stringify(students))
const teacher1 = new Teacher(++personId, 'Rajka', 'Matematicarka', 'rajka', '123')
const teacher2 = new Teacher(++personId, 'Borka', 'Engleskinja', 'borkaEng', '234')
const teacher3 = new Teacher(++personId, 'Zika', 'Istoricar', 'zikaIst', '456')
const teachers = [teacher1, teacher2, teacher3]
const parent1 = new Parent(++personId, 'Markov Cale', 'Markovic', 'maretovLeca', 'abc')
const parent2 = new Parent(++personId, 'Majina Keva', 'Majic', 'majinaKeva', 'aaa')
const parent3 = new Parent(++personId, 'Milosevi Matorci', 'Milosevic', 'milosevici', '111')
const parents = [parent1, parent2, parent3]
const allUsers = [...teachers, ...parents]
localStorage.setItem('users', JSON.stringify(allUsers))
const grade1 = new Grade(1, 1, 1, 3)
const grade2 = new Grade(2, 1, 2, 3)
const grade3 = new Grade(3, 1, 1, 4)
const grade4 = new Grade(4, 1, 2, 2)
const grade5 = new Grade(5, 1, 3, 5)
const grade6 = new Grade(6, 1, 3, 4)
const grade7 = new Grade(7, 2, 1, 5)
const grade8 = new Grade(8, 2, 2, 5)
const grade9 = new Grade(9, 2, 4, 5)
const grade10 = new Grade(10, 3, 2, 2)
const grade11 = new Grade(11, 3, 3, 5)
const grade12 = new Grade(12, 3, 2, 4)
allGrades = [grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12]
localStorage.setItem('grades', JSON.stringify(allGrades))
const persons = [...students, ...teachers]
localStorage.setItem('persons', JSON.stringify(persons))
