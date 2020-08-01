const loginForm = document.getElementById('login-form')
const usernameField = document.getElementById('username-field')
const passwordField = document.getElementById('password-field')
const errorMessage = document.getElementById('errorMessage')

function checkIfUserIsValid (event) {
  event.preventDefault()
  const username = usernameField.value
  const password = passwordField.value

  let userFound = false
  for (const user of JSON.parse(localStorage.getItem('users'))) {
    if (user.username === username && user.password === password) {
      userFound = true
      const userType = user.typeOfUser
      if (userType === 2) window.location.href = '/src/html/admin.html'
      if (userType === 1) window.location.href = '/src/html/parent.html'
    }
  }
  if (!userFound) {
    errorMessage.textContent = 'INVALID USERNAME/PASSWORD'
  }
}

loginForm.addEventListener('submit', checkIfUserIsValid)
