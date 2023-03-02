const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks();

describe('NotesClient class', () => {
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
});
