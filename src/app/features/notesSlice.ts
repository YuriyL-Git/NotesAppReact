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
    editNote: (state, action) => {
      state[action.payload.noteId].note = action.payload.noteText;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
  },
});

export const { editNote, addNote } = notesSlice.actions;
export default notesSlice.reducer;
