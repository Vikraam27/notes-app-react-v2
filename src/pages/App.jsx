import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import autoBind from 'auto-bind';

import Nav from '../components/Nav';
import HomePage from './HomePage';
import NoteDetails from './NoteDetails';

import {
  getArchivedNotes, getAllNotes, getActiveNotes,
  addNote, setIsarchiveNote, deleteNote, editNote, getNote,
} from '../utils/local-data';
import '../styles/main.css';
import NewNotesPages from './NewNotesPages';
import EditNote from './EditNote';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      notes: getAllNotes(),
      title: '',
      body: '',
      tag: '',
    };

    autoBind(this);
  }

  onChangeHandler(key, value) {
    this.setState(() => ({
      [key]: value,
    }));
  }

  onAddNote() {
    const { title, body, tag } = this.state;
    addNote({ title, body, tag });
    this.onChangeHandler('title', '');
    this.onChangeHandler('body', '');
    this.onChangeHandler('tag', '');
    this.onChangeHandler('notes', getAllNotes());
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

  onClickArchive(id) {
    setIsarchiveNote(id);
    this.onChangeHandler('notes', getAllNotes());
  }

  onDeleteNote(id) {
    deleteNote(id);
    this.onChangeHandler('notes', getAllNotes());
  }

  onOpenEditPage(id) {
    const note = getNote(id);
    this.onChangeHandler('title', note.title);
    this.onChangeHandler('body', note.body);
    this.onChangeHandler('tag', note.tag);
  }

  onEditNote({
    id, title, body, tag,
  }) {
    editNote({
      id, title, body, tag,
    });
    this.onChangeHandler('notes', getAllNotes());
  }

  render() {
    const {
      notes, query, body, tag, title,
    } = this.state;
    return (
      <BrowserRouter>
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
                notes={this.onSearchHandler(getArchivedNotes(notes))}
                query={query}
                onChangeHandler={this.onChangeHandler}
              />
            )}
          />
          <Route
            path="/unarchived"
            element={(
              <HomePage
                notes={this.onSearchHandler(getActiveNotes(notes))}
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
                tag={tag}
                onChangeHandler={this.onChangeHandler}
                onClickHandler={this.onAddNote}
              />
            )}
          />
          <Route
            path="/note/:id"
            element={(
              <NoteDetails
                onClickArchive={this.onClickArchive}
                onDeleteNote={this.onDeleteNote}
                onOpenEditPage={this.onOpenEditPage}
              />
            )}
          />
          <Route
            path="/edit-note/:id"
            element={(
              <EditNote
                onEditNote={this.onEditNote}
                onChangeHandler={this.onChangeHandler}
                title={title}
                body={body}
                tag={tag}
              />
            )}
          />
          <Route path="*" element={<h1 className="not-found">Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
