class NotesClient {
  loadNotes(callback, errorCalback) {
    return fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => errorCalback(error))
  };

  createNote(note, callback, errorCallback) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({"content": note}),
    })
    .then((response) => response.json())
    .then((notes) => { 
      callback(notes)
    })
    .catch((error) => {
      errorCallback(error);
    });
  };
}

module.exports = NotesClient;
