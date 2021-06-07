import React, { ReactElement } from 'react';
import Header from './components/header/header';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { addNote, editNote, Note } from './features/notesSlice';
import { showActiveNotes, showArchiveNotes } from './features/appSlice';

import './App.scss';

function App(): ReactElement {
  const notesState = useAppSelector(state => state.notes);
  const appState = useAppSelector(state => state.app);

  const dispatch = useAppDispatch();

  const noteToAdd: Note = {
    id: Date.now(),
    date: 'string',
    note: 'string',
    isActive: true,
    datesInNote: 'test',
  };

  const btnAddClick = () => {
    dispatch(addNote(noteToAdd));
    console.log('notesState', notesState);
  };

  const btnShowNotesClick = () => {
    dispatch(showActiveNotes());
    console.log(appState);
  };

  const btnShowArchiveClick = () => {
    dispatch(showArchiveNotes());
    console.log(appState);
  };

  return (
    <div className="app">
      <Header
        btnAddClick={btnAddClick}
        btnShowNotesClick={btnShowNotesClick}
        btnShowArchiveClick={btnShowArchiveClick}
      />
    </div>
  );
}

export default App;
