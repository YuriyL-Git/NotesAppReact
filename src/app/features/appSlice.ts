import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stateInit = {
  isActiveNotes: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState: stateInit,
  reducers: {
    showActiveNotes: state => {
      state.isActiveNotes = true;
    },
    showArchiveNotes: state => {
      state.isActiveNotes = false;
    },
  },
});

export const { showActiveNotes, showArchiveNotes } = appSlice.actions;
export default appSlice.reducer;
