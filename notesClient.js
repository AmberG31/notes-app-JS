class NotesClient {
  loadNotes(callback) {
    return fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) => callback(data));
  };

  createNote(note, callback) {
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
  };
}

module.exports = NotesClient;
