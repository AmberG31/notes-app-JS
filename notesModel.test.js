const NotesModel = require("./notesModel");
const model = new NotesModel();

describe('NotesModel', () => {
  it('returns an empty array if no notes added', () => {
    expect(model.getNotes()).toEqual([]);
  });

  it('adds two notes and returns them in an array', () => {
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  });
  
  it('deletes all the notes', () => {
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });
});
