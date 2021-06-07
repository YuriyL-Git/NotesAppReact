import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockState from '../../mock/mock.json';

export interface Note {
  date: string;
  note: string;
  isActive: boolean;
}

const stateInit = mockState as Array<Note>;

const notesSlice = createSlice({
  name: 'notes',
  initialState: stateInit,
  reducers: {
    edited: (state, action) => {
      state[action.payload.noteId].note = action.payload.noteText;
    },
    added: (state, action: PayloadAction<Note>) => {
      const note: Note = {
        note: action.payload.note,
        date: action.payload.date,
        isActive: action.payload.isActive,
      };
      state.push(note);
    },
  },
});

export const { edited, added } = notesSlice.actions;
export default notesSlice.reducer;
