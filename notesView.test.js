/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");
const exp = require('constants');

const htmlString = fs.readFileSync('./index.html');
beforeEach(() => {
  document.body.innerHTML = htmlString;
});

jest.mock('./notesClient')


describe('NotesView class', () => {
  beforeEach(() => {
    NotesClient.mockClear();
  });

  it('displays the list of notes', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model,client);
    model.addNote('This is first note');
    model.addNote('And this is a second note');
    
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('allows to add text, click the button and display the added note', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model,client);

    const buttonEl = document.querySelector('#add-note');
    const inputEl = document.querySelector('#note-input');

    inputEl.value = 'Test: adding a note';
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelector('div.note').textContent).toEqual('Test: adding a note');
  });

  it('displays the correct number of notes', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model,client);

    model.addNote('First note');
    model.addNote('Second note');

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(2)
  });

  it('resets the notes to blank', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model,client);

    const buttonEl = document.querySelector('#add-note');
    const inputEl = document.querySelector('#note-input');

    inputEl.value = 'Test: adding a note';
    buttonEl.click();

    const resetButton = document.querySelector('#reset-notes');
    resetButton.click();

    expect(document.querySelectorAll('div.note').length).toBeNull;
  });

  // displayNotesFromApi
  it('displays the notes from API', () => {
    const model = new NotesModel();
    const client = new NotesClient();

    client.loadNotes.mockImplementation((callback) => callback(['Added a note']));
    const view = new NotesView(model,client); 

    view.displayNotesFromApi();
    expect(document.querySelector('.note').textContent).toEqual('Added a note');

  });

  it('displays an error if the notes can;t be displayed', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model,client);

    view.displayError()

    const errorEl = document.querySelectorAll('.error');
    expect(errorEl[0].textContent).toContain('Oopsy, something went wrong!')
  })
});
