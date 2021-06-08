import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockState from '../mock/mock.json';
import { Note } from '../models/Note';

const stateInit = mockState as Array<Note>;

const notesSlice = createSlice({
  name: 'notes',
  initialState: stateInit,
  reducers: {
    editNoteAction: (state, action: PayloadAction<Note>) => {
      state[action.payload.id].note = action.payload.note;
    },
    addNoteAction: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
  },
});

export const { editNoteAction, addNoteAction } = notesSlice.actions;
export default notesSlice.reducer;
