import React, { ReactElement } from 'react';
import Header from './components/header/header';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { addNoteAction, editNoteAction } from './features/notesSlice';
import {
  showActiveNotes,
  showArchiveNotes,
  blinkNote,
  blinkCategory,
  setInputNote,
} from './features/appSlice';

import './style/App.scss';
import InputsField from './components/input-field/inputs-field';
import NoteComponent from './components/note/note';
import NoteInput from './models/NoteInput';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(state => state.notes);
  const isActiveNotes = useAppSelector(state => state.app.isActiveNotes);
  console.log(notes);

  const inputNote = useAppSelector(state => state.app.inputNote);
  const inputCategory = useAppSelector(state => state.app.inputCategory);

  const addNote = (noteInput: NoteInput) => {
    dispatch(addNoteAction(noteInput));
    dispatch(setInputNote(''));
  };

  const btnAddClick = () => {
    console.log(inputNote, inputCategory);
    if (!inputNote) {
      dispatch(blinkNote());
      return;
    }

    if (!inputCategory) {
      dispatch(blinkCategory());
      return;
    }
    const noteToAdd: NoteInput = {
      noteText: inputNote,
      noteCategory: inputCategory,
    };
    addNote(noteToAdd);
  };

  const btnShowNotesClick = () => {
    dispatch(showActiveNotes());
  };

  const btnShowArchiveClick = () => {
    dispatch(showArchiveNotes());
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
            {notes.map(note =>
              note.isActive === isActiveNotes ? (
                <NoteComponent
                  key={note.key}
                  note={note.note}
                  date={note.date}
                  category={note.category}
                  datesInNote={note.datesInNote}
                  isActive={note.isActive}
                />
              ) : (
                <div />
              ),
            )}
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
