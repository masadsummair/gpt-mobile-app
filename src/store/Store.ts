import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector