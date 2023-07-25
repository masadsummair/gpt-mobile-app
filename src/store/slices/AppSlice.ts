import { createSlice } from '@reduxjs/toolkit';
import appActions from '../action/AppActions';

export interface IAlert {
  message: string;
  mode?: string
}

export interface IAppSlice extends IAlert {
  alert: boolean;
}

const initialState: IAppSlice = {
  alert: false,
  message: 'Something went wrong!',
  mode: 'danger',
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: appActions,
});

export default appSlice.reducer;
