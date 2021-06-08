import React, { ReactElement, useState } from 'react';
import Note from '../../models/Note';
import './_note.scss';

const NoteComponent = ({
  key,
  date,
  note,
  category,
  datesInNote,
  isActive,
}: Note): ReactElement => {
  const [noteKey, setNoteKey] = useState(0);
  const [noteActive, setNoteActive] = useState(true);

  if (noteKey === 0) setNoteKey(key);
  return (
    <div className="note">
      <div className="note__creation-time">{date}</div>
      <div className="note__content">{note}</div>
      <div className="note__category">{category}</div>
      <div className="note__dates-in-note">{datesInNote}</div>
    </div>
  );
};

export default NoteComponent;
