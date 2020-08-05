// === UTILITY FUNCTIONS ===

function d(id) {
    return document.getElementById(id)
  }

function generatePassword() {
    const length = 8
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let passwd = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
      passwd += charset.charAt(Math.floor(Math.random() * n));
    }
    return passwd
  }
  function generateUsername(name) {
    const length = 4
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    username = name
    for (let i = 0, n = charset.length; i < length; ++i) {
      username += charset.charAt(Math.floor(Math.random() * n))
    }
    return username
  }
  function logOutUser() {
    window.location.href = '/src/html/index.html'
    sessionStorage.removeItem('user')
  }
  