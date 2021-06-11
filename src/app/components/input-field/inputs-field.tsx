import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  stopBlinkNote,
  stopBlinkCategory,
  setTextareaNote,
  setSelectCategory,
  updateCategory,
  removeCategory,
} from '../../features/appSlice';
import './_inputs-field.scss';
import Select from '../select/select';

const InputsField = (): ReactElement => {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(state => state.app.categories);

  const blinkNote = useAppSelector(state => state.app.blinkNoteClass);
  const blinkCategory = useAppSelector(state => state.app.blinkCategoryClass);
  const noteText = useAppSelector(state => state.app.textareaNote);
  const noteCategory = useAppSelector(state => state.app.selectCategory);

  const [hiddenIfEditOff, setHiddenIfEditOff] = useState('hidden');
  const [hiddenIfEditOn, setHiddenIfEditOn] = useState('');
  const [scaleBtns, setScaleBtns] = useState('');

  const [categoryInput, setCategoryInput] = useState('');

  const showEditMode = () => {
    setHiddenIfEditOff('');
    setHiddenIfEditOn('hidden');
    setScaleBtns('scale-normal');
  };

  const showViewMode = () => {
    setHiddenIfEditOff('hidden');
    setHiddenIfEditOn('');
    setScaleBtns('');
  };

  const onEdit = () => {
    showEditMode();
    setCategoryInput(noteCategory);
  };

  const onAdd = () => {
    showEditMode();
    setCategoryInput('');
    dispatch(setSelectCategory(''));
  };

  const onRemove = () => {
    console.log('noteCategory', noteCategory);
    dispatch(removeCategory(noteCategory));
    dispatch(setSelectCategory(''));
  };

  const onConfirm = () => {
    showViewMode();
    dispatch(
      updateCategory({ oldValue: noteCategory, newValue: categoryInput }),
    );
    dispatch(setSelectCategory(categoryInput));
  };

  const onReject = () => {
    showViewMode();
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target) return;
    const inputValue = event.target.value;
    dispatch(setSelectCategory(inputValue));
  };

  return (
    <div className="note-to-add__wrapper">
      <section className="note-to-add">
        <textarea
          className={`note-to-add__textarea ${blinkNote}`}
          cols={30}
          rows={10}
          value={noteText}
          onChange={event => {
            dispatch(setTextareaNote(event.target.value));
          }}
          placeholder="enter your note"
          onAnimationEnd={() => dispatch(stopBlinkNote())}
        />
        <div className="select-category__wrapper">
          <input
            className={`select-category__input ${hiddenIfEditOff}`}
            type="text"
            placeholder="category"
            value={categoryInput}
            onChange={event => {
              setCategoryInput(event.target.value);
            }}
          />
          <Select
            className={`select-category__select ${blinkCategory}`}
            value={noteCategory}
            options={allCategories}
            onChange={inputOnChange}
            onAnimationEnd={() => dispatch(stopBlinkCategory())}
          />
        </div>

        <div className={`select-category__btn-wrapper ${scaleBtns}`}>
          <FontAwesomeIcon
            className={`select-category__btn select-category__btn--green ${hiddenIfEditOn}`}
            icon={faPlus}
            onClick={onAdd}
          />

          <FontAwesomeIcon
            className={`select-category__btn select-category__btn--green ${hiddenIfEditOn}`}
            icon={faEdit}
            onClick={onEdit}
          />

          <FontAwesomeIcon
            className={`select-category__btn select-category__btn--red ${hiddenIfEditOn}`}
            icon={faTrashAlt}
            onClick={onRemove}
          />

          <FontAwesomeIcon
            className={`select-category__btn select-category__btn--green ${hiddenIfEditOff}`}
            icon={faCheck}
            onClick={onConfirm}
          />
          <FontAwesomeIcon
            className={`select-category__btn select-category__btn--red ${hiddenIfEditOff}`}
            icon={faTimes}
            onClick={onReject}
          />
        </div>
      </section>
    </div>
  );
};

export default InputsField;
