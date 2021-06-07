import React, { ReactElement } from 'react';
import Header from './components/header/header';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { addNoteAction, editNoteAction, Note } from './features/notesSlice';
import {
  showActiveNotes,
  showArchiveNotes,
  blinkNote,
  blinkCategory,
} from './features/appSlice';

import './App.scss';
import InputsField from './components/input-field/inputs-field';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const inputNote = useAppSelector(state => state.app.inputNote);
  const inputCategory = useAppSelector(state => state.app.inputCategory);

  const noteToAdd: Note = {
    id: Date.now(),
    date: 'string',
    note: 'string',
    isActive: true,
    datesInNote: 'test',
  };

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
    </div>
  );
}

export default App;
