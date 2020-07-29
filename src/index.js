/***
 *
 *
 * Podaci:
 *  - ucenici
 *  - profesori
 *  - predmeti
 *  - ocene
 *      - testovi
 *      - zaključna
 *  - odeljenja: "1 A4 2020" godina, smer, odeljenje, školska godina
 *
 *  - izostanci? 2.0
 *  - časovi? 2.0
 *  - roditelji? 1.1
 *
 * Funkcije:
 *
 * Stranice:
 *  - home
 *  - login
 *  - profesor admin
 *  - učenik
 *  - statičke: novosti, obaveštenja...
 *
 * Admin opcije:
 *  - CRUD: profesor :: id, ime, prezime, username, password
 *  - CRUD: učenici :: id, ime, prezime, username, password, odeljenje, ocene po predmetima[objekat]
 *  - CRUD: odeljenje :: id, godina, smer, odeljenje, školska godina, predmeti[niz]
 *  - CRUD: predmeti: id, ime
 * - učenici_odeljenja: id_učenika, id_odeljenja
 * - profesori_odeljenja: id_profesora, id_odeljenja
 *  -
 * Interfejs:
 *  Sve admin stranice (skoro):
 *  - Dodaj nov unos
 *  - Forma za nov unos
 *  - Tabela
 *  - edit
 *  - delete
 *  - Forma za editovanje (verovanto ista kao za dodavanje samo popunjena)
 */

function addNewPerson(name,surname) {
  let persons = localStorage.getItem('persons')
  if (persons == null) {
    persons = []
  } else {
    persons = JSON.parse(persons)
  }
  persons.push({ name, surname })
  localStorage.setItem('persons', JSON.stringify(persons))
}

function d(id) {
  return document.getElementById(id)
}

document.getElementById('add-new-form').addEventListener('submit', function (event) {
  event.preventDefault()
  addNewPerson(d('name').value, d('surname').value)
  d('name').value=''
  d('surname').value=''
})

