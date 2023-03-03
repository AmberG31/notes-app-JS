const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks();

describe('NotesClient class', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('it calls fetch and loads the data', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
     name: ['This is first note']
    }));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toEqual(['This is first note']);
      done();
    })
  });

  it('checks if the correct method is called', () => {
    const client = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify(['1', '3']));
    client.createNote('This is a test note', (notes) => {
      expect(notes).toEqual(['1', '3'])
    })
  
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/notes');
      
    const optionsObject = fetch.mock.calls[0][1];

    expect(optionsObject.method).toEqual('POST');
    expect(optionsObject.headers['Content-type']).toEqual('application/json');
    expect(JSON.parse(optionsObject.body)).toEqual({content: 'This is a test note'});
  })

  it('creates a new note using fetch', (done) => {
    const noteClient = new NotesClient()

    fetch.mockResponseOnce(JSON.stringify(['Walk the dog']));

    noteClient.createNote("Walk the dog", (notes) => {
      expect(notes.length).toBe(1);
      expect(notes[notes.length -1]).toEqual('Walk the dog');
      done();
    })
  })
});
