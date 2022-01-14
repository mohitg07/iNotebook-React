import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = props => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);


  // Get all Notes
  // auth-token is required for this step
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };


  // Add a Note
  // auth-token is required for this step
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };


  // Delete a Note
  const deleteNote = async id => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    //return only those notes whose id does not match with the given id
    const newNotes = notes.filter(note => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      // I want only that note whose id matches with the given id so that I can update that particular note
      if (element._id=== id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // Use a Provider to pass the current theme to the tree below.
  // Any component can read it, no matter how deep it is.
  // In this example, we're passing "notes, addNote, deleteNote, editNote, getNotes" as the current values
  return (
    <NoteContext.Provider
      value={{notes, addNote, deleteNote, editNote, getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;