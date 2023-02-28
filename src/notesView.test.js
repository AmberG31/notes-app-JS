/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");

describe('NotesView class', () => {
  it('displays the list of notes', () => {
    document.body.innerHTML = fs.readFileSync('../index.html');
    
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('This is first note');
    model.addNote('And this is a second note');
    
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });
});


