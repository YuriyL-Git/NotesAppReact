import React, { ReactElement } from 'react';
import Header from './components/header/header';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { addNoteAction, editNoteAction } from './features/notesSlice';
import { Note } from './models/Note';
import {
  showActiveNotes,
  showArchiveNotes,
  blinkNote,
  blinkCategory,
} from './features/appSlice';

import './style/App.scss';
import InputsField from './components/input-field/inputs-field';
import NoteComponent from './components/note/note';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(state => state.notes);
  const isActiveNotes = useAppSelector(state => state.app.isActiveNotes);
  console.log(notes);

  const inputNote = useAppSelector(state => state.app.inputNote);
  const inputCategory = useAppSelector(state => state.app.inputCategory);

  /*  const noteToAdd: Note = {
    id: Date.now(),
    date: 'string',
    note: 'string',
    isActive: true,
    datesInNote: 'test',
  }; */

  const btnAddClick = () => {
    console.log(inputNote, inputCategory);
    if (!inputNote) {
      dispatch(blinkNote());
      return;
    }

    if (!inputCategory) {
      dispatch(blinkCategory());
    }
  };

  const btnShowNotesClick = () => {
    dispatch(showActiveNotes());
  };

  const btnShowArchiveClick = () => {
    dispatch(showArchiveNotes());
  };

  const addNote = (note: Note) => {
    dispatch(addNoteAction(note));
  };

  return (
    <div className="app">
      <Header
        btnAddClick={btnAddClick}
        btnShowNotesClick={btnShowNotesClick}
        btnShowArchiveClick={btnShowArchiveClick}
      />
      <InputsField />

      <div className="info-section">
        <div className="notes-field__wrapper">
          <p className="notes-field__title">Notes</p>
          <section className="notes-field">
            {notes.map(note => (
              <NoteComponent
                key={note.id}
                id={note.id}
                note={note.note}
                date={note.date}
                category={note.category}
                datesInNote={note.datesInNote}
                isActive={note.isActive}
              />
            ))}
          </section>
        </div>

        <div className="summary-field__wrapper">
          <p className="summary-field__title">Summary</p>
          <section className="summary-field">summaries</section>
        </div>
      </div>
    </div>
  );
}

export default App;
