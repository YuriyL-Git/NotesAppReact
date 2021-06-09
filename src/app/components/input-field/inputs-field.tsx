import React, { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  stopBlinkNote,
  stopBlinkCategory,
  setInputNote,
  setInputCategory,
} from '../../features/appSlice';
import './_inputs-field.scss';
import Select from '../select/select';

const InputsField = (): ReactElement => {
  const dispatch = useAppDispatch();

  const blinkNote = useAppSelector(state => state.app.blinkNoteClass);
  const blinkCategory = useAppSelector(state => state.app.blinkCategoryClass);
  const noteText = useAppSelector(state => state.app.inputNote);
  const noteCategory = useAppSelector(state => state.app.inputCategory);

  const inputOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target) return;
    const inputValue = event.target.value;
    dispatch(setInputCategory(inputValue));
  };

  return (
    <div className="note-to-add__wrapper">
      <section className="note-to-add">
        <textarea
          className={`note-to-add__input ${blinkNote}`}
          cols={30}
          rows={10}
          value={noteText}
          onChange={event => {
            dispatch(setInputNote(event.target.value));
          }}
          placeholder="enter your note"
          onAnimationEnd={() => dispatch(stopBlinkNote())}
        />
        <Select
          className={`note-to-add__select ${blinkCategory}`}
          value={noteCategory}
          onChange={inputOnChange}
          onAnimationEnd={() => dispatch(stopBlinkCategory())}
        />
      </section>
    </div>
  );
};

export default InputsField;
