import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faArchive,
  faTrashAlt,
  faCheck,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {
  updateNote,
  archiveNote,
  unArchiveNote,
  deleteNote,
} from '../../features/notesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Select from '../select/select';
import Note from '../../models/Note';
import './_note.scss';

const NoteComponent = ({
  id,
  date,
  note,
  category,
  datesInNote,
  isActive,
}: Note): ReactElement => {
  const dispatch = useAppDispatch();
  const [blinkNote, setBlinkNote] = useState('');
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedNote, setEditedNote] = useState(note);

  const [hiddenIfEditOff, setHiddenIfEditOff] = useState('hidden');
  const [hiddenIfEditOn, setHiddenIfEditOn] = useState('');
  const allCategories = useAppSelector(state => state.app.categories);

  if (!allCategories.includes(editedCategory) && allCategories.length > 0)
    setEditedCategory(allCategories[0]);

  const showEditMode = () => {
    setHiddenIfEditOff('');
    setHiddenIfEditOn('hidden');
  };

  const showViewMode = () => {
    setHiddenIfEditOff('hidden');
    setHiddenIfEditOn('');
  };

  const onEdit = () => {
    showEditMode();
  };

  const onSave = () => {
    if (!editedNote) {
      setBlinkNote('blink-effect');
      return;
    }
    const updatedNote = {
      id,
      noteText: editedNote,
      noteCategory: editedCategory,
    };
    dispatch(updateNote(updatedNote));
    showViewMode();
  };

  const onReject = () => {
    showViewMode();
    setEditedNote(note);
    setEditedCategory(category);
  };

  const onArchive = () => {
    dispatch(archiveNote(id));
  };

  const onUnArchive = () => {
    dispatch(unArchiveNote(id));
  };

  const onDelete = () => {
    dispatch(deleteNote(id));
  };

  const noteAnimationEnd = () => {
    setBlinkNote('');
  };

  return (
    <div className={`note ${isActive ? '' : 'note--archived'}`} key={id}>
      <div className="note__creation-time">{date}</div>
      <div className="note__content">
        <div className={`${hiddenIfEditOn}`}>{note}</div>
        <textarea
          className={`note-edit__input ${blinkNote} ${hiddenIfEditOff}`}
          value={editedNote}
          onChange={event => setEditedNote(event.target.value)}
          onAnimationEnd={noteAnimationEnd}
          placeholder="enter your note"
        />
        <div className={`note__controls-wrapper ${hiddenIfEditOn}`}>
          <FontAwesomeIcon
            className="icon-note icon-note--edit"
            icon={faEdit}
            onClick={onEdit}
          />
          <FontAwesomeIcon
            className={`icon-note icon-note--archive ${
              isActive ? '' : 'hidden'
            }`}
            icon={faArchive}
            onClick={onArchive}
          />
          <FontAwesomeIcon
            className={`icon-note icon-note--un-archive ${
              isActive ? 'hidden' : ''
            }`}
            icon={faUndo}
            onClick={onUnArchive}
          />
          <FontAwesomeIcon
            className="icon-note icon-note--delete"
            icon={faTrashAlt}
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="note__category">
        <div className={`${hiddenIfEditOn}`}>{category}</div>
        <Select
          onChange={event => setEditedCategory(event.target.value)}
          className={`note-edit__select  ${hiddenIfEditOff}`}
          value={editedCategory}
          options={allCategories}
          onAnimationEnd={() => {}}
        />
      </div>
      <div className="note__dates-in-note">
        <div className={`btn-confirm__wrapper ${hiddenIfEditOff}`}>
          <FontAwesomeIcon
            className="icon-on-edit icon-note--confirm"
            icon={faCheck}
            onClick={onSave}
          />
          <FontAwesomeIcon
            className="icon-on-edit icon-note--reject"
            icon={faTimes}
            onClick={onReject}
          />
        </div>
        <div className={`${hiddenIfEditOn}`}>{datesInNote}</div>
      </div>
    </div>
  );
};

export default NoteComponent;
