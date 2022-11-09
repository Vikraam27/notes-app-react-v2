import React from 'react';
import { Route, Routes } from 'react-router-dom';
import autoBind from 'auto-bind';

import Nav from '../components/Nav';
import HomePage from './HomePage';
import NoteDetails from './NoteDetails';

import '../styles/main.css';
import NewNotesPages from './NewNotesPages';
import FetchAPI from '../utils/API';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      notes: [],
      archiveNote: [],
      title: '',
      body: '',
      initialize: true,
    };

    autoBind(this);
  }

  async componentDidMount() {
    await this.getAllActiveNotes();
    await this.getAllArchiveNote();
    this.onChangeHandler('initialize', false);
  }

  onChangeHandler(key, value) {
    this.setState(() => ({
      [key]: value,
    }));
  }

  async onAddNote() {
    const { title, body } = this.state;
    const { error } = await FetchAPI.addNote({ title, body });
    if (error) {
      alert(error);
    }
    this.onChangeHandler('title', '');
    this.onChangeHandler('body', '');
    await this.getAllActiveNotes();
  }

  onSearchHandler(data) {
    return data.filter((note) => {
      const { query } = this.state;
      const loweredCaseaNoteTitle = (note.title || '-').toLowerCase();
      const jammedNotetitle = loweredCaseaNoteTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedNotetitle.indexOf(jammedQuery) !== -1;
    });
  }

  async onClickArchive(id) {
    const { error } = await FetchAPI.archiveNote(id);
    if (error) {
      return error;
    }
    this.getAllActiveNotes();
    await this.getAllArchiveNote();
    return null;
  }

  async onClickUnArchive(id) {
    const { error } = await FetchAPI.unarchiveNote(id);
    if (error) {
      return error;
    }
    this.getAllActiveNotes();
    await this.getAllArchiveNote();
    return error;
  }

  async onDeleteNote(id) {
    const { error, message } = await FetchAPI.deleteNote(id);
    if (error) {
      return { error, message };
    }
    this.getAllActiveNotes();
    await this.getAllArchiveNote();
    return { error, message };
  }

  async getAllArchiveNote() {
    const { error, data } = await FetchAPI.getArchivedNotes();
    if (error) {
      alert(error);
    }
    this.onChangeHandler('archiveNote', data);
  }

  async getAllActiveNotes() {
    const { error, data } = await FetchAPI.getActiveNotes();
    if (error) {
      alert(error);
    }
    this.onChangeHandler('notes', data);
  }

  render() {
    const {
      notes, query, body, title, archiveNote, initialize,
    } = this.state;
    if (initialize) {
      return (
        <div className="loader__container">
          <span className="loader" />
        </div>
      );
    }
    return (
      <>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                notes={this.onSearchHandler(notes)}
                query={query}
                onChangeHandler={this.onChangeHandler}
              />
            )}
          />

          <Route
            path="/archived"
            element={(
              <HomePage
                notes={this.onSearchHandler(archiveNote)}
                query={query}
                onChangeHandler={this.onChangeHandler}
              />
            )}
          />
          <Route
            path="/new-note"
            element={(
              <NewNotesPages
                title={title}
                body={body}
                onChangeHandler={this.onChangeHandler}
                onClickHandler={this.onAddNote}
              />
            )}
          />
          <Route
            path="/note/:id"
            element={(
              <NoteDetails
                onDeleteNote={this.onDeleteNote}
                onClickArchive={this.onClickArchive}
                onClickUnArchive={this.onClickUnArchive}
              />
            )}
          />
          <Route path="*" element={<h1 className="not-found">Page not found</h1>} />
        </Routes>
      </>
    );
  }
}

export default App;
