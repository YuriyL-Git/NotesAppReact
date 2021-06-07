import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockState from '../mock/mock.json';

export interface Note {
  id: number;
  date: string;
  note: string;
  datesInNote: string;
  isActive: boolean;
}

const stateInit = mockState as Array<Note>;

const notesSlice = createSlice({
  name: 'notes',
  initialState: stateInit,
  reducers: {
    editNoteAction: (state, action) => {
      state[action.payload.noteId].note = action.payload.noteText;
    },
    addNoteAction: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
  },
});

export const { editNoteAction, addNoteAction } = notesSlice.actions;
export default notesSlice.reducer;
