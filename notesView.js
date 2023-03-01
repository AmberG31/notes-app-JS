const NotesModel = require("./notesModel");

class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-note');

    this.buttonEl.addEventListener('click', () => {
      const newNote = document.querySelector('#note-input').value 
      this.addNewNote(newNote);
    })
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
    console.log(newNote);
  }

  displayNotes() {
    console.log('This is an example note');

    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    })

    const notes = this.model.getNotes()

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }
};

module.exports = NotesView;