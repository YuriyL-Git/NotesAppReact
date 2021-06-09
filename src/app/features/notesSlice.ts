import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockState from '../mock/mock.json';
import Note from '../models/Note';
import NoteInput from '../models/NoteInput';
import NoteEdit from '../models/NoteEdit';

const FIND_DATES_REGEX = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;

const stateInit = mockState as Array<Note>;

const getNote = (noteText: string, noteCategory: string): Note => {
  const creationDate = new Date()
    .toJSON()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('/');

  const dates = noteText.match(FIND_DATES_REGEX);
  let datesInNote = '';
  if (dates) datesInNote = dates.join(' ');
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

const notesSlice = createSlice({
  name: 'notes',
  initialState: stateInit,
  reducers: {
    addNoteAction: (state, action: PayloadAction<NoteInput>) => {
      const noteToAdd = getNote(
        action.payload.noteText,
        action.payload.noteCategory,
      );
      state.push(noteToAdd);
    },

    updateNoteAction: (state, action: PayloadAction<NoteEdit>) => {
      const updatedNote = getNote(
        action.payload.noteText,
        action.payload.noteCategory,
      );

      updatedNote.id = action.payload.id;
      const index = state.findIndex(note => note.id === action.payload.id);
      state[index] = updatedNote;
    },

    archiveNoteAction: (state, action: PayloadAction<number>) => {
      state
        .filter(note => note.id === action.payload)
        .forEach(note => {
          note.isActive = false;
        });
    },
  },
});

export const { updateNoteAction, addNoteAction, archiveNoteAction } =
  notesSlice.actions;
export default notesSlice.reducer;
