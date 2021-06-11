import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stateInit = {
  isActiveNotes: true,
  blinkNoteClass: '',
  blinkCategoryClass: '',
  textareaNote: '',
  selectCategory: '',
  categories: ['Random Thought', 'Idea', 'Task'],
};

interface UpdateCategory {
  oldValue: string;
  newValue: string;
}

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

    setTextareaNote: (state, action: PayloadAction<string>) => {
      state.textareaNote = action.payload;
    },

    setSelectCategory: (state, action: PayloadAction<string>) => {
      state.selectCategory = action.payload;
    },

    updateCategory: (state, action: PayloadAction<UpdateCategory>) => {
      if (state.categories.includes(action.payload.newValue)) return;

      if (action.payload.newValue.length > 0) {
        if (!action.payload.oldValue) {
          state.categories.push(action.payload.newValue);
          state.selectCategory = action.payload.newValue;
          return;
        }

        const index = state.categories.findIndex(
          cat => cat === action.payload.oldValue,
        );
        if (index !== -1) {
          state.categories[index] = action.payload.newValue;
          state.selectCategory = action.payload.newValue;
        }
      }
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      const index = state.categories.findIndex(cat => cat === action.payload);
      if (index === -1) return;
      state.categories.splice(index, 1);
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
  setTextareaNote,
  setSelectCategory,
  updateCategory,
  removeCategory,
} = appSlice.actions;

export default appSlice.reducer;
