const loginForm = d('login-form')
const usernameField = d('username-field')
const passwordField = d('password-field')
const errorMessage = d('errorMessage')

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
      sessionStorage.setItem('user', JSON.stringify(user))
    }
  }
  if (!userFound) {
    errorMessage.textContent = 'INVALID USERNAME/PASSWORD'
  }
}

loginForm.addEventListener('submit', checkIfUserIsValid)
