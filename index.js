const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

const model = new NotesModel();
const client = new NotesClient();
const view = new NotesView(model, client);
 
//console.log(model.getNotes());
//view.displayNotes();
view.displayNotesFromApi();
