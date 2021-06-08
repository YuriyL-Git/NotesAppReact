import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockState from '../mock/mock.json';
import Note from '../models/Note';
import NoteInput from '../models/NoteInput';

const FIND_DATES_REGEX = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;

const stateInit = mockState as Array<Note>;

const notesSlice = createSlice({
  name: 'notes',
  initialState: stateInit,
  reducers: {
    editNoteAction: (state, action: PayloadAction<Note>) => {
      state[action.payload.key].note = action.payload.note;
    },

    addNoteAction: (state, action: PayloadAction<NoteInput>) => {
      const creationDate = new Date()
        .toJSON()
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('/');
      const dates = action.payload.noteText.match(FIND_DATES_REGEX);
      let datesInNote = '';
      if (dates) datesInNote = dates.join(' ');
      const key = Date.now();
      const noteToAdd: Note = {
        key,
        note: action.payload.noteText,
        category: action.payload.noteCategory,
        date: creationDate,
        datesInNote,
        isActive: true,
      };

      state.push(noteToAdd);
    },
  },
});

export const { editNoteAction, addNoteAction } = notesSlice.actions;
export default notesSlice.reducer;
