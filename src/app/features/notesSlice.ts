import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockState from '../mock/mock.json';
import Note from '../models/Note';
import NoteInput from '../models/NoteInput';
import NoteEdit from '../models/NoteEdit';
import getNote from '../helpers/get-note';

const stateInit = mockState as Array<Note>;

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
