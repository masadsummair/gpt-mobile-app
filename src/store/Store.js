import {configureStore, combineReducers} from '@reduxjs/toolkit';

import appSlice from './slices/AppSlice';
import chatSlice from './slices/ChatSlice';
import userSlice from './slices/UserSlice'
const reducers = combineReducers({
  appSlice,
  chatSlice,
  userSlice
});

export const store = configureStore({
  reducer: reducers,
});

