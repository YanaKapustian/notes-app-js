const doc = document
const notes = doc.querySelectorAll('.note')
const noteIcons = doc.querySelectorAll('.note__icon')
const notesBlock = doc.querySelector('.notes__block')
const btnAddNote = doc.querySelector('.btn__add-note')
const notesAddBlock = doc.querySelector('.notes__add')
const btnCreateNote = doc.querySelector('.btn__create-note')
const title = doc.querySelector('.title-input')
const textarea = doc.querySelector('.textarea')
const select = doc.querySelector('.select')
const message = doc.querySelector('.message')
const summary = doc.querySelector('.summary')

document.addEventListener('click', async function(e) {
   if (e.target.classList.contains('note__icon')) {
      [id, action] = e.target.id.split('_')
   } else if (e.target.tagName === 'IMG') {
      [id, action] = e.target.closest('div').id.split('_')
   } else return
      switch(action) {
         case 'edit': 
            editNote(id)
            break;
         case 'archive': 
            archiveNote(id)
            break;
         case 'delete': 
            deleteNote(id)
            break;
      }
   }
)

let edited = false;

function editNote(id) {
   notesBlock.classList.add('hidden')
   notesAddBlock.classList.remove('hidden')
   summary.classList.add('hidden')
   fillInTheInputs(id)
   edited = true;
}

function fillInTheInputs(id) {
   let noteToEdit = document.getElementById(id)
   title.value = noteToEdit.querySelector('.note__title').innerText
   textarea.value = noteToEdit.querySelector('.note__content').innerText
   select.value = noteToEdit.querySelector('.note__category').innerText
}

function UpdateNote() {
   let noteToEdit = document.getElementById(id)
   noteToEdit.querySelector('.note__title').innerText = title.value
   noteToEdit.querySelector('.note__content').innerText = textarea.value
   noteToEdit.querySelector('.note__category').innerText = select.value
   noteToEdit.querySelector('.note__dates').innerText = findDate() ? findDate().map(date => ' ' + date) : ''
}

function archiveNote(id) {
   let noteToArchive = document.getElementById(id)
   noteToArchive.classList.toggle('archived')
   noteToArchive.classList.add('hidden')
   countNotes()
}

function deleteNote(id) {
   let noteToDelete = document.getElementById(id)
   noteToDelete.classList.add('deleted')
   countNotes()
}

btnAddNote.addEventListener('click', function() {
   notesBlock.classList.add('hidden')
   summary.classList.add('hidden')
   notesAddBlock.classList.remove('hidden')
})

btnCreateNote.addEventListener('click', function(e) {
   e.preventDefault()
   if (checkFilledFields()) {
      edited ? UpdateNote() : createNote()
      cleanTheInputs()
      notesBlock.classList.remove('hidden')
      notesAddBlock.classList.add('hidden')
      summary.classList.remove('hidden')
   }
   countNotes()
})

function checkFilledFields() {
   if (!title.value || !textarea.value || select.value === 'Choose a category') {
      message.innerText = 'Please fill in all the inputs'
      return false;
   } else {
      message.innerText = ''
      return true;
   }
}

function twoFigureNum(number) {
   let num = number.toString()
   return num.length === 1 ? `0${num}` : num
}

function findDate() {
   let str = textarea.value;
   let regexp = /[0-9]{1,2}.[0-9]{1,2}.[0-9]{0,4}/g;
   return str.match(regexp)
}

function createNote() {
   let today = new Date();
   let id = generateId()
      notesBlock.insertAdjacentHTML('beforeend', 
      `<div class="note" id=${id}>
      <div class="note__header">
         <span class="note__title">${title.value}</span>
         <div class="note__info">
            <span class="note__category">${select.value}</span>
            <span class="note__date">${twoFigureNum(today.getDate())}.${twoFigureNum(today.getMonth() + 1)}.${today.getFullYear()}</span>
         </div>
      </div>
      <div class="note__main">
         <p class="note__content">${textarea.value}</p>
         <span class="note__dates">${findDate() ? findDate().map(date => ' ' + date) : ''} </span>
      </div>
      <div class="note__actions">
         <div class="note__icon" id="${id}_edit"><img src="img/pencil.png" alt="edit"></div>
         <div class="note__icon" id="${id}_archive"><img src="img/download-button.png" alt="archive"></div>
         <div class="note__icon" id="${id}_delete"><img src="img/garbage.png" alt="delete"></div>
      </div>
   </div>`
      )
      
}

function cleanTheInputs() {
   title.value = ''
   select.value = 'Choose a category'
   textarea.value = ''
}

let idGenerator = 6;
function generateId() {
   return idGenerator++;
}

