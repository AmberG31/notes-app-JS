const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

console.log('The notes app is running');

const model = new NotesModel();
const client = new NotesClient();
const view = new NotesView(model, client);

client.loadNotes(
  notes => {
    model.setNotes(notes);
    view.displayNotes();
  }, 
  error => {
    view.displayError(error);
  }
)

