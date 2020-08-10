/* eslint-disable no-undef, no-unused-vars */

// === DOM FUNCTIONS ===

function createDisplayForAllStudents () {
  const dataFromStorage = d('mainMenu')
  const allstudents = getDataFromStorage('students')
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
          <td><button data-id="${person.id}" onclick="createDisplayForStudentUpdate(${person.id})">Edit</button></td>
          <td>
            <button data-id="${person.id}" onclick="deleteStudent(${person.id})">Delete</button>
            <button data-id="${person.id}" onclick="createDisplayForStudentInfo(${person.id})">View Profile</button>
          </td>
        </tr>`
  }
  output += '</table>'
  dataFromStorage.innerHTML = output
}
function createDisplayForAllTeachers () {
  const dataFromStorage = d('mainMenu')
  const allTeachers = getDataFromStorage('teachers')
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
          <td><button data-id="${person.id}" onclick="createDisplayForTeacherUpdate(${person.id})">Edit</button></td>
          <td>
            <button data-id="${person.id}" onclick="deleteTeacher(${person.id})">Delete</button>
            <button data-id="${person.id}" onclick="createDisplayForTeacherInfo(${person.id})">View Profile</button>
          </td>
        </tr>`
  }
  output += '</table>'
  dataFromStorage.innerHTML = output
}
function createDisplayForAllSubjects () {
  const dataFromStorage = d('mainMenu')
  const allSubjects = getDataFromStorage('subjects')
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
          <td><button data-id="${
  subject.id
}" onclick="createDisplayForSubjectUpdate(${
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
  scr.innerHTML = 'd(\'updateStudentStorage-btn\').addEventListener(\'click\',addStudentEventHandler)'
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
  
    <input type="submit" value="Submit" id='updateTeacherStorage-btn' class='btn'>
  </form>`
  const scr = document.createElement('script')
  scr.innerHTML = 'd(\'updateTeacherStorage-btn\').addEventListener(\'click\',addTeacherEventHandler)'
  mainMenu.appendChild(scr)
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
  scr.innerHTML = 'd(\'updateSubjectStorage-btn\').addEventListener(\'click\',updateSubjectEventHandler)'
  mainMenu.appendChild(scr)
}

function createDisplayForStudentInfo (id) {
  const studentInfo = getStudentInfo(id)
  const studentGrades = getStudentGrades(id)
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

function createDisplayForTeacherInfo (id) {
  const teacherInfo = getTeacherInfo(id)
  const subjectName = getDataFromStorage('subjects').filter(
    (subject) => subject.teacher === id
  )[0].name
  mainMenu.innerHTML = `<h2>${teacherInfo.name} ${teacherInfo.surname}</h2>
    <h2> Subject : ${subjectName} </h2>`
}

function createDisplayForNewGrade () {
  const teacher = JSON.parse(sessionStorage.getItem('user'))
  const subject = getDataFromStorage('subjects').filter(
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
  scr.innerHTML = 'd(\'submitNewGrade-btn\').addEventListener(\'click\',updateGradeEventHandler)'
  mainMenu.appendChild(scr)
}

function createDisplayForStudentUpdate (id) {
  const student = getDataFromStorage('students').filter(
    (student) => student.id === id
  )[0]
  const parentId = student.parentId
  const parentName = getParentNameFromParentId(parentId)
  const parentSurname = getParentSurnameFromParentId(parentId)
  mainMenu.innerHTML = `<form>
    <p>
      <label for="name">Name</label>
      <input type="hidden" name="studentId" id="studentId" value=${student.id}>
      <input type="text" name="name" id="studentName" value=${student.name} required>
    </p>
    <p>
      <label for="surname">Surname</label>
      <input type="text" name="surname" id="studentSurname" value=${student.surname} required>
    </p>
    <p>
    <label for="parentName">Parent Name</label>
      <input type="text" name="parentName" id="parentName" value=${parentName} required>
    </p>
    <p>
    <label for="parentSurname">Parent Surame</label>
      <input type="text" name="parentSurname" id="parentSurname" value=${parentSurname} required>
    </p>
    <p>
    <label for="classUnit">Class Unit</label>
      <input type="text" name="classUnit" id="classUnit" value=${student.classUnit} required>
    </p>
    <input type="submit" value="Submit" id="editStudentStorage-btn" class="btn">
  </form>`
  const scr = document.createElement('script')
  scr.innerHTML = 'd(\'editStudentStorage-btn\').addEventListener(\'click\',editStudentEventHandler)'
  mainMenu.appendChild(scr)
}

function createDisplayForTeacherUpdate (id) {
  const teacher = getDataFromStorage('teachers').filter(
    (teacher) => teacher.id === id
  )[0]
  const teachersSubject = getDataFromStorage('subjects').filter(
    (subject) => subject.teacher === id
  )[0].id
  mainMenu.innerHTML = `<form>
    <p>
      <label for="name">Name</label>
      <input type="hidden" name="teacherId" id="teacherId" value=${teacher.id}>
      <input type="text" name="name" id="teacherName" value=${teacher.name} required>
    </p>
    <p>
      <label for="surname">Surname</label>
      <input type="text" name="surname" id="teacherSurname" value=${teacher.surname} required>
    </p>
    <p>
    <label for="classUnit">Subject ID</label>
      <input type="text" name="subject" id="subject" value=${teachersSubject} required>
    </p>
    <input type="submit" value="Submit" id="editTeacherStorage-btn" class="btn">
  </form>`
  const scr = document.createElement('script')
  scr.innerHTML = 'd(\'editTeacherStorage-btn\').addEventListener(\'click\',editTeacherEventHandler)'

  mainMenu.appendChild(scr)
}

function createDisplayForSubjectUpdate (id) {
  const subject = getDataFromStorage('subjects').filter(
    (subject) => subject.id === id
  )[0]

  mainMenu.innerHTML = `<form>
    <p>
      <label for="name">Name</label>
      <input type="hidden" name="subjectId" id="subjectId" value=${subject.id}>
      <input type="text" name="name" id="subjectName" value=${subject.name} required>
    </p>
    <p>
      <label for="surname">Year</label>
      <input type="text" name="year" id="subjectYear" value=${subject.year} required>
    </p>
    
    <input type="submit" value="Submit" id="editSubjectStorage-btn" class="btn">
  </form>`
  const scr = document.createElement('script')
  scr.innerHTML = 'd(\'editSubjectStorage-btn\').addEventListener(\'click\',editSubjectEventHandler)'

  mainMenu.appendChild(scr)
}
