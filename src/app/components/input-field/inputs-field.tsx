import React, { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  stopBlinkNote,
  stopBlinkCategory,
  setInputNote,
  setInputCategory,
} from '../../features/appSlice';
import './_inputs-field.scss';

const InputsField = (): ReactElement => {
  const dispatch = useAppDispatch();

  const blinkNote = useAppSelector(state => state.app.blinkNoteClass);
  const blinkCategory = useAppSelector(state => state.app.blinkCategoryClass);
  const noteText = useAppSelector(state => state.app.inputNote);
  const noteCategory = useAppSelector(state => state.app.inputCategory);

  return (
    <div className="note-to-add__wrapper">
      <section className="note-to-add">
        <textarea
          className={`note-to-add__input ${blinkNote}`}
          id=""
          cols={30}
          rows={10}
          value={noteText}
          onChange={event => {
            dispatch(setInputNote(event.target.value));
          }}
          placeholder="enter your note"
          onAnimationEnd={() => dispatch(stopBlinkNote())}
        />
        <select
          className={`note-to-add__select ${blinkCategory}`}
          value={noteCategory}
          onChange={event => {
            dispatch(setInputCategory(event.target.value));
          }}
          onAnimationEnd={() => dispatch(stopBlinkCategory())}
        >
          <option hidden disabled value="">
            category
          </option>
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </section>
    </div>
  );
};

export default InputsField;
