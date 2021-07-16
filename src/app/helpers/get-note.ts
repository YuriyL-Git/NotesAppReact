import Note from '../models/Note';

const FIND_DATES_REGEX = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;

const getNote = (noteText: string, noteCategory: string): Note => {
  const creationDate = new Date()
    .toJSON()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('/');

  const dates = noteText.match(FIND_DATES_REGEX);
  let datesInNote = '';
  if (dates) datesInNote = dates.join('\r\n');
  const noteId = Date.now();

  return {
    id: noteId,
    note: noteText,
    category: noteCategory,
    date: creationDate,
    datesInNote,
    isActive: true,
  };
};

export default getNote;
