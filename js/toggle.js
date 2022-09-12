const nav = doc.querySelector('.sidebar nav')
countNotes()

nav.addEventListener('click', function(e) {
   switch(e.target.innerText) {
      case 'All notes':
         showAllNotes(e.target)
         countNotes()
         break;
      case 'Archived notes':
         showArchivedNotes(e.target)
         break;
      case 'Task':
         showSubcategories(e.target, 'Task')
         break;
      case 'Random thought':
         showSubcategories(e.target, 'Random thought')
         break;
      case 'Idea':
         showSubcategories(e.target, 'Idea')
         break;
   }
})

function showAllNotes(target) {
   removeColor()
   target.classList.add('chosen')
   summary.classList.remove('hidden')
   const allNotes = doc.getElementsByClassName('note')
   Array.prototype.forEach.call(allNotes, function(note) {
      if (!note.classList.contains('archived')) {
         note.classList.remove('hidden')
      } else {
         note.classList.add('hidden')
      }
  });
}

function showArchivedNotes(target) {
   removeColor()
   target.classList.add('chosen')
   summary.classList.add('hidden')
   const allNotes = doc.getElementsByClassName('note')
   Array.prototype.forEach.call(allNotes, function(note) {
      if (!note.classList.contains('archived')) {
         note.classList.add('hidden')
      } else {
         note.classList.remove('hidden')
      }
  });
}

function showSubcategories(target, category) {
   removeColor()
   target.classList.add('chosen')
   summary.classList.add('hidden')
   let array = []
   const categories = doc.getElementsByClassName('note__category')
   const allNotes = doc.getElementsByClassName('note')
   for (let i = 0; i < categories.length; i++) {
      if (categories[i].textContent === category) array.push(i)
   }
   for (let i = 0; i < allNotes.length; i++) {
      if (!array.includes(i) || allNotes[i].classList.contains('archived')) {
         allNotes[i].classList.add('hidden')
      } else {
         allNotes[i].classList.remove('hidden')
      }
   }
}

function removeColor() {
   const categories = doc.querySelectorAll('.sidebar__category')
   categories.forEach(category => category.classList.remove('chosen'))
   const subcategories = doc.querySelectorAll('.sidebar__item')
   subcategories.forEach(subcategory => subcategory.classList.remove('chosen'))
}

function countNotes() {
   const categories = doc.getElementsByClassName('note__category')
   const allNotes = doc.getElementsByClassName('note')
   let taskArchived = 0, taskActive = 0;
   let randomThoughtArchived = 0, randomThoughtActive = 0;
   let ideaArchived = 0, ideaActive = 0;
   for (let i = 0; i < allNotes.length; i++) {
      if (allNotes[i].classList.contains('deleted')) continue;
      if (categories[i].textContent === 'Task') {
         allNotes[i].classList.contains('archived') ? taskArchived++ : taskActive++;
      }
      if (categories[i].textContent === 'Random thought') {
         allNotes[i].classList.contains('archived') ? randomThoughtArchived++ : randomThoughtActive++
      }
      if (categories[i].textContent === 'Idea') {
         allNotes[i].classList.contains('archived') ? ideaArchived++ : ideaActive++;
      }
   }
   let task = doc.querySelector('.summary__task')
   task.innerText = taskActive
   let thought = doc.querySelector('.summary__thought')
   thought.innerText = randomThoughtActive
   let idea = doc.querySelector('.summary__idea')
   idea.innerText = ideaActive
   let taskArch = doc.querySelector('.summary__task-archived')
   taskArch.innerText = taskArchived
   let thoughtArch = doc.querySelector('.summary__thought-archived')
   thoughtArch.innerText = randomThoughtArchived
   let ideaArch = doc.querySelector('.summary__idea-archived')
   ideaArch.innerText = ideaArchived
}