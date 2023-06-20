import { createSlice } from '@reduxjs/toolkit';
import userActions, { getToken, googleSignIn, login, logout, onboardingVerification, register } from '../action/UserAction';



const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: userActions,
    extraReducers: builder => {
        builder.addCase(getToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getToken.fulfilled, (state, action) => {
            console.log(action)
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            console.log("as",action.payload.user)
        });
        builder.addCase(getToken.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            console.log(action.payload.user)
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            console.log(action.payload.user)
        });
        builder.addCase(register.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(googleSignIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(googleSignIn.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        });
        builder.addCase(googleSignIn.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        });
        builder.addCase(logout.rejected, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
        });
        builder.addCase(onboardingVerification.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(onboardingVerification.fulfilled, (state, action) => {
            state.loading = false;
            state.user =  {...state.user,verify:true,...action.payload};
        });
        builder.addCase(onboardingVerification.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { AdminOff, AdminOn, AddToCart } = userSlice.actions;

export default userSlice.reducer;