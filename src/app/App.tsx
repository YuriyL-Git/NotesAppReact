import React, { ReactElement } from 'react';
import './App.scss';
import Header from './components/header/header';

const btnAddClick = () => {
  console.log('add click');
};
const btnShowNotesClick = () => {
  console.log('notes click');
};
const btnShowArchiveClick = () => {
  console.log('archive click');
};

function App(): ReactElement {
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
