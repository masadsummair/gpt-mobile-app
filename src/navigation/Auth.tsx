import React from 'react';
import Register from '../screen/Register';
import Login from '../screen/login';
import OnBoarding from '../screen/onBoarding';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

export type AuthStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Welcome: undefined;

};

const Stack = createStackNavigator<AuthStackParamList>();


export default function AuthStack() {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        animated={true}
      />
      <Stack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
      </Stack.Navigator></>
  );
}
