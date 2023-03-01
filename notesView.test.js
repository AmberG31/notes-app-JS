/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const exp = require('constants');

const htmlString = fs.readFileSync('./index.html');
beforeEach(() => {
  document.body.innerHTML = htmlString;
});


describe('NotesView class', () => {
  it('displays the list of notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('This is first note');
    model.addNote('And this is a second note');
    
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('allows to add text, click the button and display the added note', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const buttonEl = document.querySelector('#add-note');
    const inputEl = document.querySelector('#note-input');

    inputEl.value = 'Test: adding a note';
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelector('div.note').textContent).toEqual('Test: adding a note');
  })

  it('displays the correct number of notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('First note');
    model.addNote('Second note');

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(2)
  })
});
