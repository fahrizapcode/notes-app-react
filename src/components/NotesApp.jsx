import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "../Page/HomePage";
import ArchivePage from "../Page/ArchivePage";
import DetailNotePage from "../Page/DetailNotePage";
import LandingPage from "../Page/LandingPage";
import RegisterPage from "../Page/RegisterPage";
import LoginPage from "../Page/LoginPage";
import NotFound from "../Page/NotFound";
import { useSearchParams } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import {
  archiveNote,
  getActiveNotes,
  getArchivedNotes,
  getUserLogged,
  putAccessToken,
} from "../utils/network-data";

export default function NotesAppWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <NotesApp defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}
class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotesForm: false,
      rotateButtonShowNotesForm: 0,
      archivedNotes: [],
      activeNotes: [],
      searchKeyword: props.defaultKeyword || "",
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";

          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };
    this.onSearchKeywords = this.onSearchKeywords.bind(this);
    this.onChangeShowNotesForm = this.onChangeShowNotesForm.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.onUpdateActiveNotes = this.onUpdateActiveNotes.bind(this);
    this.onUpdateActiveNotes = this.onUpdateActiveNotes.bind(this);
  }
  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }
  async componentDidMount() {
    const { data: authedUser } = await getUserLogged();
    document.documentElement.setAttribute("data-theme", this.state.theme);
    this.setState(() => {
      return {
        authedUser,
        initializing: false,
      };
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }
  onUpdateActiveNotes(notes) {
    this.setState(() => {
      return {
        activeNotes: notes,
      };
    });
  }
  onUpdateArchivedNotes(notes) {
    this.setState(() => {
      return {
        archiveNote: notes,
      };
    });
  }
  async updateNotes() {
    const { data: authedUser } = await getUserLogged();
    const { data: activeNotes } = await getActiveNotes();
    const { data: archivedNotes } = await getArchivedNotes();
    this.setState(() => {
      return {
        authedUser,
        initializing: false,
        archivedNotes,
        activeNotes,
      };
    });
  }
  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }
  onSearchKeywords(event) {
    this.setState(() => {
      return {
        searchKeyword: event.target.value,
      };
    });
    this.props.keywordChange(event.target.value);
  }
  onChangeShowNotesForm() {
    this.setState((prevState) => {
      return {
        showNotesForm: !prevState.showNotesForm,
        rotateButtonShowNotesForm:
          prevState.rotateButtonShowNotesForm === 0 ? 135 : 0,
      };
    });
  }

  render() {
    // this.updateNotes();
    // console.log(this.state.activeNotes);
    if (this.state.initializing) {
      return null;
    }
    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <Routes>
            <Route path="*" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="login"
              element={<LoginPage loginSuccess={this.onLoginSuccess} />}
            />
          </Routes>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider value={this.state}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSearchKeywords={this.onSearchKeywords}
                onChangeShowNotesForm={this.onChangeShowNotesForm}
                rotateButtonShowNotesForm={this.state.rotateButtonShowNotesForm}
                searchKeyword={this.state.searchKeyword}
                showNotesForm={this.state.showNotesForm}
                activeNotes={this.state.activeNotes}
                onUpdateActiveNotes={this.onUpdateActiveNotes}
                onLogout={this.onLogout}
                updateNotes={this.updateNotes}
              />
            }
          />
          <Route
            path="/archive"
            element={
              <ArchivePage
                archivedNotes={this.state.archivedNotes}
                searchKeyword={this.state.searchKeyword}
                showNotesForm={this.state.showNotesForm}
                onSearchKeywords={this.onSearchKeywords}
                onLogout={this.onLogout}
                updateNotes={this.updateNotes}
                onUpdateArchivedNotes={this.onUpdateActiveNotes}
              />
            }
          />
          <Route
            path="/detail-note/:id"
            element={
              <DetailNotePage
                notes={this.state.activeNotes}
                updateNotes={this.updateNotes}
              />
            }
          />
          <Route
            path="/archive-note/:id"
            element={
              <DetailNotePage
                notes={this.state.archivedNotes}
                updateNotes={this.updateNotes}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    );
  }
}

NotesApp.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};
