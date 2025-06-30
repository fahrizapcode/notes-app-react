import React from "react";
// import { getData } from "../data/data";
import SidebarComponent from "../components/SidebarComponent";
import "../styles/notes-app.css";
import NotesContent from "../components/NotesContent";
import PropTypes from "prop-types";
import { getActiveNotes } from "../utils/network-data";
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { data } = await getActiveNotes();
    this.props.onUpdateActiveNotes(data);
    this.props.updateNotes();
  }

  render() {
    const {
      onChangeShowNotesForm,
      onSearchKeywords,
      rotateButtonShowNotesForm,
      showNotesForm,
      searchKeyword,
      onLogout,
      updateNotes,
      activeNotes,
    } = this.props;

    return (
      <div className="notes-app">
        <SidebarComponent
          onChangeShowNotesForm={onChangeShowNotesForm}
          rotateButtonShowNotesForm={rotateButtonShowNotesForm}
        />
        <NotesContent
          updateNotes={updateNotes}
          showNotesForm={showNotesForm}
          searchKeyword={searchKeyword}
          onSearchKeywords={onSearchKeywords}
          onLogout={onLogout}
          activeNotes={activeNotes}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  activeNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      archived: PropTypes.bool,
      createdAt: PropTypes.string,
      owner: PropTypes.string,
    })
  ).isRequired,
  onChangeShowNotesForm: PropTypes.func.isRequired,
  onSearchKeywords: PropTypes.func.isRequired,
  rotateButtonShowNotesForm: PropTypes.number.isRequired,
  showNotesForm: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  updateNotes: PropTypes.func.isRequired,
  onUpdateActiveNotes: PropTypes.func.isRequired,
};
