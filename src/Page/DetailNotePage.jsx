import React, { useEffect } from "react";
import "../styles/detail-note.css";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function DetailNotePage({ notes, updateNotes }) {
  useEffect(() => {
    if (notes.length === 0) {
      updateNotes();
    }
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((note) => note.id === id);
  console.log(id);
  console.log(notes);

  if (!note) return <p>Note tidak ditemukan</p>;
  const createdAtObject = new Date(note.createdAt);
  const indonesiaFormatTime = createdAtObject.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="detail-note-container" onClick={() => navigate("/")}>
      <div className="detail-note" onClick={(e) => e.stopPropagation()}>
        <p className="title">{note.title}</p>
        <p className="body">{note.body}</p>
        <p className="created-at">{indonesiaFormatTime}</p>
        {note.archived ? <div className="archived">Arsip</div> : null}
      </div>
    </div>
  );
}

DetailNotePage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      archived: PropTypes.bool,
      createdAt: PropTypes.string,
      owner: PropTypes.string,
    })
  ).isRequired,
};
