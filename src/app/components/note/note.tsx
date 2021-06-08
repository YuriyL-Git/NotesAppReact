import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArchive, faTrash } from '@fortawesome/free-solid-svg-icons';
import Note from '../../models/Note';
import './_note.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { archiveNoteAction } from '../../features/notesSlice';

const NoteComponent = ({
  id,
  date,
  note,
  category,
  datesInNote,
}: Note): ReactElement => {
  /*  const [noteId, setNoteId] = useState(0);
  const [noteActive, setNoteActive] = useState(true);
  if (!noteId) setNoteId(id); */

  const dispatch = useAppDispatch();

  const handleClick = () => {
    console.log('clicked', id);
  };

  const onArchive = () => {
    console.log('clicked', id);
    dispatch(archiveNoteAction(id));
  };

  return (
    <div className="note" key={id}>
      <div className="note__creation-time">{date}</div>
      <div className="note__content">
        {note}
        <div className="note__controls-wrapper">
          <FontAwesomeIcon
            className="icon-note icon-note--edit"
            icon={faEdit}
            onClick={handleClick}
          />
          <FontAwesomeIcon
            className="icon-note icon-note--archive"
            icon={faArchive}
            onClick={onArchive}
          />
          <FontAwesomeIcon
            className="icon-note icon-note--delete"
            icon={faTrash}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="note__category">{category}</div>
      <div className="note__dates-in-note">{datesInNote}</div>
    </div>
  );
};

export default NoteComponent;
