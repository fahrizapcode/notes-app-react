import React from "react";
import "../styles/notes-form.css";
import PropTypes from "prop-types";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
export default class NotesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteTitle: "",
      newNoteBody: "",
    };
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        newNoteBody: event.target.value,
      };
    });
  }
  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        newNoteTitle: event.target.value,
      };
    });
  }

  async onSubmitHandler(event) {
    event.preventDefault();
    const newNote = {
      title: this.state.newNoteTitle,
      body: this.state.newNoteBody,
    };
    await addNote(newNote);
    this.props.updateNotes();
  }

  render() {
    return (
      <div className="notes-form">
        <form onSubmit={this.onSubmitHandler}>
          <div className="header">
            <h1>Tambah Catatan</h1>
            <p>Sisa karakter: {50 - this.state.newNoteTitle.length}</p>
          </div>
          <input
            id="title"
            type="text"
            placeholder="Tuliskan judul catatan"
            value={this.state.newNoteTitle}
            onChange={this.onTitleChangeHandler}
            maxLength={50}
            required
          />
          <textarea
            id="body"
            placeholder="Tuliskan isi catatan"
            value={this.state.newNoteBody}
            onChange={this.onBodyChangeHandler}
            required
          ></textarea>
          <button type="submit">
            <img src="./image/plus.svg" alt="" />
          </button>
        </form>
      </div>
    );
  }
}

NotesForm.propTypes = {
  updateNotes: PropTypes.func.isRequired,
};
