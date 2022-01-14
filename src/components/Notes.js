import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = props => {
    // “useContext” hook is used to create common data that can be accessed throughout the component hierarchy without passing the props down manually to each level. Context defined will be available to all the child components without involving “props”.
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "default",
    });

    const updateNote = currentNote => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };

    const handleClick = e => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");
    };

    const onChange = e => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    // In this, basically there are 3 segments
    // In first segment, there is AddNote functionality where user can add a new note
    // In second segment, there is edit note functionality which will open only when user clicks on edit button
    // In third segment, I am showing all the notes of a user
    return (
        <div className="container">
            <AddNote showAlert={props.showAlert} />
            <button
                style={{ display: "none" }}
                type="button"
                className="btn btn-primary"
                ref={ref}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Submit
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Note
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="mb-5 mt-4">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        value={note.etitle}
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        value={note.edescription}
                                        name="edescription"
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        value={note.etag}
                                        name="etag"
                                        onChange={onChange}
                                        minLength={5}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                disabled={
                                    note.etitle.length < 5 || note.edescription.length < 5
                                }
                                onClick={handleClick}
                                type="button"
                                className="btn btn-primary"
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2 className="my-3 text-warning">Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map(note => {
                    return (
                        <Noteitem
                            key={note._id}
                            updateNote={updateNote}
                            showAlert={props.showAlert}
                            note={note}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Notes;