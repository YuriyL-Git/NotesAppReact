import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faArchive,
  faTrash,
  faCheck,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';

import {
  updateNoteAction,
  archiveNoteAction,
  unArchiveNoteAction,
} from '../../features/notesSlice';

import { useAppDispatch } from '../../hooks/hooks';
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
    dispatch(updateNoteAction(updatedNote));
    showViewMode();
  };
  const onReject = () => {
    showViewMode();
    setEditedNote(note);
    setEditedCategory(category);
  };

  const onArchive = () => {
    dispatch(archiveNoteAction(id));
  };

  const onUnArchive = () => {
    dispatch(unArchiveNoteAction(id));
  };

  const onDelete = () => {
    console.log('delete');
  };

  const noteAnimationEnd = () => {
    setBlinkNote('');
  };

  return (
    <div className="note" key={id}>
      <div className="note__creation-time">
        <div className={`${hiddenIfEditOn}`}>{date}</div>
      </div>
      <div className="note__content">
        {note}
        <textarea
          className={`note-edit__input ${blinkNote} ${hiddenIfEditOff}`}
          value={editedNote}
          onChange={event => setEditedNote(event.target.value)}
          onAnimationEnd={noteAnimationEnd}
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
            className={`icon-note icon-note--unArchive ${
              isActive ? 'hidden' : ''
            }`}
            icon={faUndo}
            onClick={onUnArchive}
          />
          <FontAwesomeIcon
            className="icon-note icon-note--delete"
            icon={faTrash}
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="note__category">
        {category}
        <Select
          onChange={event => setEditedCategory(event.target.value)}
          className={`note-edit__select  ${hiddenIfEditOff}`}
          value={editedCategory}
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
