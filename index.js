const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

const model = new NotesModel();
//model.addNote('This is an example note');

const view = new NotesView(model);

//console.log(model.getNotes());
//view.displayNotes();
