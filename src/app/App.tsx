import React, { ReactElement } from 'react';
import Header from './components/header/header';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { edited, added, Note } from './features/notes/notesSlice';
import './App.scss';

const btnShowNotesClick = () => {
  console.log('notes click');
};
const btnShowArchiveClick = () => {
  console.log('archive click');
};

function App(): ReactElement {
  const currentState = useAppSelector(state => state.notes);
  const dispatch = useAppDispatch();

  const noteToAdd: Note = {
    date: 'string',
    note: 'string',
    isActive: true,
  };

  const btnAddClick = () => {
    dispatch(added(noteToAdd));
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
