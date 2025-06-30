import React from "react";
import NotesList from "../components/NotesList";
import "../styles/notes-content.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ThemeConsumer } from "../contexts/ThemeContext";
import { getArchivedNotes } from "../utils/network-data";
export default class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { data } = await getArchivedNotes();
    this.props.onUpdateArchivedNotes(data);
    this.props.updateNotes();
  }
  render() {
    const {
      archivedNotes,
      searchKeyword,
      onSearchKeywords,
      onLogout,
      updateNotes,
    } = this.props;
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          return (
            <div
              className="notes-content"
              style={{
                marginLeft: 76,
                borderLeft: "1px solid black",
                height: 726,
              }}
            >
              <NotesList
                title="Di Arsipkan"
                isActiveNotes={false}
                notesData={archivedNotes}
                searchKeyword={searchKeyword}
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
                  src={
                    theme === "light" ? "./image/sun.svg" : "./image/moon.svg"
                  }
                  onClick={toggleTheme}
                  alt="theme-button"
                  width={theme === "light" ? 24 : 18}
                />
                <input
                  type="search"
                  className="search-note"
                  placeholder="Cari catatan"
                  onChange={onSearchKeywords}
                  value={searchKeyword}
                />
              </div>
            </div>
          );
        }}
      </ThemeConsumer>
    );
  }
}

ArchivePage.propTypes = {
  archivedNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      archived: PropTypes.bool,
      createdAt: PropTypes.string,
      owner: PropTypes.string,
    })
  ).isRequired,
  searchKeyword: PropTypes.string.isRequired,
  onSearchKeywords: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  updateNotes: PropTypes.func.isRequired,
  onUpdateArchivedNotes: PropTypes.func.isRequired,
};
