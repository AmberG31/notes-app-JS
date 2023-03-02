class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector("#main-container");

    this.showButton = document.querySelector("#add-note-button")
    this.showButton.addEventListener("click", () => {
      const newNote = document.querySelector("#add-note").value;
      this.addnewNote(newNote);
    });
  }

  displayNotes = () => {

    document.querySelectorAll('.note').forEach(element => {
    element.remove();
    });
    const notes = this.model.getNotes();

    notes.forEach((note) => {
      const noteEl = document.createElement("div");
      noteEl.textContent = note;
      noteEl.className = "note";
      this.mainContainerEl.append(noteEl);
    });

    document.querySelector('#add-note').value = ""
    // get the list of notes from the model.
    // for each note, create a new div element on the page (with an HTML class "note").
  };

  addnewNote = (newNote) => {
    // const note = document.createElement("div")
    // note.id = 'note'
    // note.innerText = document.querySelector('#add-note').value

    // this.mainContainerEl.append(note)
    this.client.createNote(newNote, (data) => {this.model.setNotes(data);
      this.displayNotes();})
    
  };

  async displayNotesFromApi(){
      await this.client.loadNotes((data) =>{
      this.model.setNotes(data)
      this.displayNotes()
    }) 
  }
}

module.exports = NotesView;



class notesClient {
  loadNotes = (callback) => {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data));
  };
  createNote = (note, callback) => {
    const data = { content: note };
    // method should send a POST request to the notes backend to create a new note.
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => callback(data));
  };
}
module.exports = notesClient;