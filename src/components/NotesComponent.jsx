import React from "react";
import "../styles/notes-component.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/network-data";

export default function NotesComponent({
  title,
  body,
  id,
  updateNotes,
  archived,
}) {
  const navigate = useNavigate();
  async function onDeleteHandler(id) {
    await deleteNote(id);
    await updateNotes();
  }
  return (
    <div
      className="notes-component"
      onClick={() =>
        archived
          ? navigate(`/archive-note/${id}`)
          : navigate(`/detail-note/${id}`)
      }
    >
      <p className="title">{title}</p>
      <p className="body">{body}</p>

      <button
        style={{ marginRight: 44 }}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteHandler(id);
        }}
      >
        <img src="./image/trash.svg" alt="trash" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          archived ? unarchiveNote(id) : archiveNote(id);
          updateNotes();
        }}
      >
        <img
          src={archived ? "./image/unarchive.svg" : "./image/archive.svg"}
          alt="archive"
          width={archived ? 20 : 15}
        />
      </button>
    </div>
  );
}

NotesComponent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
};
