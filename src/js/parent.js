const loggedUser =JSON.parse(sessionStorage.getItem('user'))
d('parentGreeting').textContent = `Hello ${loggedUser.name} !`

function d (id) {
    return document.getElementById(id)
  }