import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notesSlice';
import appReducer from '../features/appSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppSubscribe = typeof store.subscribe;
export type RootState = ReturnType<typeof store.getState>;
