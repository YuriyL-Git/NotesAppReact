import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stateInit = {
  isActiveNotes: true,
  blinkNoteClass: '',
  blinkCategoryClass: '',
  inputNote: '',
  inputCategory: '',
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

    blinkNote: state => {
      state.blinkNoteClass = 'blink-effect';
    },
    stopBlinkNote: state => {
      state.blinkNoteClass = '';
    },

    blinkCategory: state => {
      state.blinkCategoryClass = 'blink-effect';
    },
    stopBlinkCategory: state => {
      state.blinkCategoryClass = '';
    },

    setInputNote: (state, action: PayloadAction<string>) => {
      state.inputNote = action.payload;
    },
    setInputCategory: (state, action: PayloadAction<string>) => {
      state.inputCategory = action.payload;
    },
  },
});

export const {
  showActiveNotes,
  showArchiveNotes,
  blinkNote,
  stopBlinkNote,
  blinkCategory,
  stopBlinkCategory,
  setInputNote,
  setInputCategory,
} = appSlice.actions;
export default appSlice.reducer;
