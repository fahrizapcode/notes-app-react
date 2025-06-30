import React from "react";
import "../styles/notes-list.css";
import NotesComponent from "./NotesComponent";
import PropTypes from "prop-types";
export default function NotesList({
  title,
  notesData,
  searchKeyword,
  updateNotes,
}) {
  let filteredNotes = notesData.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <div className="notes-list">
      <p className="heading-notes-list">{title}</p>
      {filteredNotes.length === 0 ? (
        <div className="no-notes">Tidak ada catatan</div>
      ) : (
        <div className="notes-component-container">
          {filteredNotes.map((note) => (
            <NotesComponent
              key={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
              id={note.id}
              updateNotes={updateNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

NotesList.propTypes = {
  title: PropTypes.string.isRequired,
  notesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      archived: PropTypes.bool,
      createdAt: PropTypes.string,
      owner: PropTypes.string,
    })
  ).isRequired,
  updateNotes: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
};
