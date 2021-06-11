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

const notesSlice = createSlice({
  name: 'notes',
  initialState: stateInit,
  reducers: {
    addNote: (state, action: PayloadAction<NoteInput>) => {
      const noteToAdd = getNote(
        action.payload.noteText,
        action.payload.noteCategory,
      );
      state.push(noteToAdd);
    },

    updateNote: (state, action: PayloadAction<NoteEdit>) => {
      const updatedNote = getNote(
        action.payload.noteText,
        action.payload.noteCategory,
      );

      const noteIndex = state.findIndex(note => note.id === action.payload.id);
      updatedNote.id = action.payload.id;
      updatedNote.isActive = state[noteIndex].isActive;
      state[noteIndex] = updatedNote;
    },

    archiveNote: (state, action: PayloadAction<number>) => {
      const noteIndex = state.findIndex(note => note.id === action.payload);
      state[noteIndex].isActive = false;
    },

    unArchiveNote: (state, action: PayloadAction<number>) => {
      const noteIndex = state.findIndex(note => note.id === action.payload);
      state[noteIndex].isActive = true;
    },

    deleteNote: (state, action: PayloadAction<number>) =>
      state.filter(note => note.id !== action.payload),
  },
});

export const { updateNote, addNote, archiveNote, unArchiveNote, deleteNote } =
  notesSlice.actions;
export default notesSlice.reducer;
