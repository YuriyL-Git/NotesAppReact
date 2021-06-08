import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stateInit = {
  isActiveNotes: true,
  blinkNoteClass: '',
  blinkCategoryClass: '',
  inputNote: '',
  inputCategory: '',
  showNotesActiveClass: 'btn-active',
  showArchiveActiveClass: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState: stateInit,
  reducers: {
    showActiveNotes: state => {
      state.isActiveNotes = true;
      state.showNotesActiveClass = 'btn-active';
      state.showArchiveActiveClass = '';
    },
    showArchiveNotes: state => {
      state.isActiveNotes = false;
      state.showArchiveActiveClass = 'btn-active';
      state.showNotesActiveClass = '';
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
