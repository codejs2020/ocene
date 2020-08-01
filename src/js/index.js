const submitButton = document.getElementById('login-submit-button')
const usernameField = document.getElementById('username-field')
const passwordField = document.getElementById('password-field')
const errorMessage = document.getElementById('errorMessage')

function checkIfUserIsValid (event) {
  event.preventDefault()
  const username = usernameField.value
  const password = passwordField.value

  for (const user of JSON.parse(localStorage.getItem('users'))) {
    if (user.username === username && user.password === password) {
      const userType = user.typeOfUser
      if (userType === 2) window.location.href = '/src/html/admin.html'
      if (userType === 1) window.location.href = '/src/html/parent.html'
    } else {
      errorMessage.textContent = 'INVALID USERNAME/PASSWORD'
    }
  }
}

submitButton.addEventListener('click', checkIfUserIsValid)
