const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");

class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-note');
    this.resetBbutton = document.querySelector('#reset-notes');


    this.buttonEl.addEventListener('click', () => {
      const newNote = document.querySelector('#note-input').value 
      this.addNewNote(newNote);
      document.querySelector("#note-input").value = " "; // empties the input box
    });
    this.resetBbutton.addEventListener('click', () => {
      this.resetNotes();
    });
  };

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
    console.log(newNote);
  };

  displayNotes() {
    // console.log('This is an example note');

    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });

    const notes = this.model.getNotes()

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
  };

  // it hides all the notes
  resetNotes() {
    console.log('Hide all notes.');

    const notesEl = document.querySelectorAll('.note');
    notesEl.forEach(element => element.remove());  
  };

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      this.model.setNotes(data)
      this.displayNotes();
    });
  };
};

module.exports = NotesView;