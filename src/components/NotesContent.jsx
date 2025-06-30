import React from "react";
import "../styles/notes-content.css";
import NotesList from "./NotesList";
import NotesForm from "./NotesForm";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ThemeConsumer } from "../contexts/ThemeContext";

export default function NotesContent({
  showNotesForm,
  searchKeyword,
  onSearchKeywords,
  onLogout,
  activeNotes,
  updateNotes,
}) {
  // console.log(initialNotes);
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <div className="notes-content">
            {showNotesForm ? <NotesForm updateNotes={updateNotes} /> : null}
            <NotesList
              title="Catatan Aktif"
              searchKeyword={searchKeyword}
              notesData={activeNotes}
              onSearchKeywords={onSearchKeywords}
              updateNotes={updateNotes}
            />
            <div className="nav-top">
              <Link to="/">
                <img src="./image/home.svg" alt="home" width={33} />
              </Link>
              <Link to="/archive">
                <img src="./image/archive.svg" alt="archive" width={20} />
              </Link>
              <img
                src="./image/logout.svg"
                alt="logout"
                width={26}
                onClick={onLogout}
              />
              <img
                src={theme === "light" ? "./image/sun.svg" : "./image/moon.svg"}
                onClick={toggleTheme}
                alt="theme-button"
                width={theme === "light" ? 24 : 18}
              />
              <input
                type="search"
                className="search-note"
                placeholder="Cari catatan"
                onChange={onSearchKeywords}
              />
            </div>
          </div>
        );
      }}
    </ThemeConsumer>
  );
}

NotesContent.propTypes = {
  showNotesForm: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string,
  onSearchKeywords: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  updateNotes: PropTypes.func.isRequired,
  activeNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      archived: PropTypes.bool,
      createdAt: PropTypes.string,
      owner: PropTypes.string,
    })
  ),
};
