import React, { ReactElement } from 'react';
import Header from './components/header/header';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { addNote } from './features/notesSlice';
import './style/App.scss';
import InputsField from './components/input-field/inputs-field';
import NoteComponent from './components/note/note';
import NoteInput from './models/NoteInput';
import SummaryTable from './components/summary-table/summary-table';
import {
  showActiveNotes,
  showArchiveNotes,
  blinkNote,
  blinkCategory,
  setTextareaNote,
} from './features/appSlice';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const allNotes = useAppSelector(state => state.notes);
  const isActiveNotes = useAppSelector(state => state.app.isActiveNotes);
  const inputNote = useAppSelector(state => state.app.textareaNote);
  const inputCategory = useAppSelector(state => state.app.selectCategory);

  const addNewNote = (noteInput: NoteInput) => {
    dispatch(addNote(noteInput));
    dispatch(setTextareaNote(''));
  };

  const btnAddClick = () => {
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
    addNewNote(noteToAdd);
    dispatch(showActiveNotes());
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
      <div className="notes-section">
        <div className="notes-field__wrapper">
          <p className="notes-field__title">
            {isActiveNotes ? 'Notes' : 'Archive'}
          </p>
          <section className="notes-field">
            {allNotes.map(note =>
              note.isActive === isActiveNotes ? (
                <NoteComponent
                  key={note.id}
                  id={note.id}
                  note={note.note}
                  date={note.date}
                  category={note.category}
                  datesInNote={note.datesInNote}
                  isActive={note.isActive}
                />
              ) : (
                ''
              ),
            )}
          </section>
        </div>
        <div className="summary-table__wrapper">
          <p className="summary-table__title">Summary</p>
          <SummaryTable />
        </div>
      </div>
    </div>
  );
}

export default App;
