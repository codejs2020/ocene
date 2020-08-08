/* eslint-disable no-undef, no-unused-vars */

// === UTILITY FUNCTIONS ===

function d (id) {
  return document.getElementById(id)
}

function generatePassword () {
  const length = 8
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
