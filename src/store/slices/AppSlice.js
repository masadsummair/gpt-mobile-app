import {createSlice} from '@reduxjs/toolkit';
import appActions from '../action/AppActions';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    alert: false,
    alertMessage: 'Something went wrong!',
    mode: 'danger',
  },
  reducers: appActions,
});

export default appSlice.reducer;
