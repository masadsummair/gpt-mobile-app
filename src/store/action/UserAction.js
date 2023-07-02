import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { appSlice } from '../slices/AppSlice';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { userApi } from '../../api/user';

GoogleSignin.configure({
  webClientId: '1068878917959-qjst8gcag3t46nmsaeqhb5baid4l8lhi.apps.googleusercontent.com',
});

export const getToken = createAsyncThunk('userSlice/getToken', async (_, { rejectWithValue }) => {
  try {
    const user = await new Promise(resolve => {
      const unsubscribe = auth().onAuthStateChanged(async (data) => {
        unsubscribe();
        resolve(data);
      });
    });
    const userData = await firestore().collection('users').doc(user.uid).get();
    if (!user) {
      return {
        isAuthenticated: false,
        user: null,
      }
    } else {

      return {
        isAuthenticated: true,
        user: {
          id: user.uid, emailVerified: user.emailVerified, firstname: user.displayName?.split(" ")[0], lastname: user.displayName?.split(" ")[1], email: user.email, ...userData.data()
        }
      };
    }
  } catch (error) {
    console.log(error)
    return rejectWithValue('Something went worng');
  }
});

export const login = createAsyncThunk('userSlice/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    const userData = await firestore().collection('users').doc(user.uid).get();
    if (user) {
      return {
        isAuthenticated: true,
        user: {
          id: user.uid, emailVerified: user.emailVerified, firstname: user.displayName?.split(" ")[0], lastname: user.displayName?.split(" ")[1], email: user.email, ...userData.data()
        }
      };
    } else {
      return {
        isAuthenticated: false,
        user: null
      };
    }
  } catch (error) {
    console.log(error)
    let message = 'Something went wrong!';
    if (error.code === 'credential not found') {
      message = 'Please Enter your credentials!';
    } else if (
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/user-not-found'
    ) {
      message = 'Email is invalid!';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Wrong password!';
    } else if (error.code === 'recaptcha was invalid') {
      message = 'Recaptcha was invalid!';
    }
    dispatch(appSlice.actions.setAlert({ message }));
    return rejectWithValue('Something went worng');
  }
});

export const register = createAsyncThunk(
  'userSlice/register',
  async ({ firstName, lastName, password, email, url }, { rejectWithValue, dispatch }) => {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('users').doc(user.user.uid).set({ verify: false })


      if (!user.user) {
        return {
          isAuthenticated: false,
          user: null
        };
      } else {
        await userApi.sendVerificationEmail(email,url);
        dispatch(appSlice.actions.setAlert({ message: "Check your email Inbox", mode: "sucess" }));
        await user.user.updateProfile({ displayName: firstName + " " + lastName });
        return {
          isAuthenticated: true,
          user: {
            id: user.user.uid, emailVerified: user.emailVerified, firstname: firstName, lastname: lastName, email: email, verify: false
          }
        };
      }
    } catch (error) {
      console.log(error)
      let message = 'Something went wrong!';
      if (error.code === 'credential not found') {
        message = 'Please Enter your credentials!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email is invalid!';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters!';
      } else if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use!';
      }
      dispatch(appSlice.actions.setAlert({ message }));
      return rejectWithValue('Something went worng');
    }
  },
);

export const googleSignIn = createAsyncThunk(
  'userSlice/googleSignIn',
  async ({url}, { rejectWithValue, dispatch }) => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);
      const data = await firestore().collection('users').doc(user.uid).get();
      if (data.exists && user) {
        return {
          isAuthenticated: true,
          user: {
            id: user.uid, emailVerified: user.emailVerified, firstname: user.displayName?.split(" ")[0], lastname: user.displayName?.split(" ")[1], email: user.email, ...data.data()
          }
        };
      }
      else if (user) {
        await userApi.sendWelcomeEmail(user.email,url);
        await firestore().collection('users').doc(user.uid).set({ verify: false })
        return {
          isAuthenticated: true,
          user: {
            id: user.uid, emailVerified: user.emailVerified, firstname: user.displayName?.split(" ")[0], lastname: user.displayName?.split(" ")[1], email: user.email, verify: false
          }
        };
      } else {
        return {
          isAuthenticated: false,
          user: null
        };
      }

    } catch (error) {
      console.log(error)
      let message = 'Something went wrong!';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      dispatch(appSlice.actions.setAlert({ message }));
      return rejectWithValue('Something went worng');
    }
  },
);


export const logout = createAsyncThunk(
  'userSlice/logout',
  async (_, { rejectWithValue }) => {
    try {
      await auth().signOut();
      console.log('User signed out!');
      await GoogleSignin.signOut();
      return {
        isAuthenticated: false,
        user: null
      };
    } catch (error) {
      console.log(error)
      return rejectWithValue('Something went worng');
    }
  },
);

export const onboardingVerification = createAsyncThunk(
  "userSlice/onboardingVerification",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userSlice: { user } } = getState();
      const currentUser = await new Promise(resolve => {
        const unsubscribe = auth().onAuthStateChanged(async (data) => {
          unsubscribe();
          resolve(data);
        });
      });
      await firestore().collection('users').doc(user.id).set({ verify: true, ...data })
      return data;
    } catch (error) {
      console.log(error)
      return rejectWithValue("Something went wrong");
    }
  }
);

function updateEmailVerifiedStatus(state, action) {
  state.user.emailVerified = true;
}

const userActions = { updateEmailVerifiedStatus };

export default userActions;