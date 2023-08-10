import { createSlice } from '@reduxjs/toolkit';
import userActions, { getToken, googleSignIn, login, logout, onboardingVerification, register } from '../action/UserAction';


export interface IUser extends Partial<IWelcomeInfo> {
    id: string;
    emailVerified: boolean;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    verify?: boolean;
}

export interface IWelcomeInfo {
    expert: 'lena' | 'nia';
    question1: string;
    question2: string;
}

export interface IUserSlice {
    user: IUser | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}
export interface IRegisterCredentials extends ILoginCredentials {
    firstName: string;
    lastName: string;
    url: string;
}

const initialState: IUserSlice = {
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
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
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
            if (state.user)
                state.user = { ...state.user, verify: true, ...action.payload };
        });
        builder.addCase(onboardingVerification.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { updateEmailVerifiedStatus } = userSlice.actions;

export default userSlice.reducer;