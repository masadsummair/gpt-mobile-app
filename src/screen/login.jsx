import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet, View,Text as RText, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Theme from '../styles/Theme';
import GoogleIcon from '../components/googleIcon';
import { normalize } from '../styles/Style';
import { googleSignIn, login } from '../store/action/UserAction';
import { useDispatch } from 'react-redux';
import { appSlice } from '../store/slices/AppSlice';
import Logo from "../../assets/logo.svg";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    Keyboard.dismiss();
    if (email.length <= 0) {
      dispatch(appSlice.actions.setAlert({ message: 'Please Enter Email' }));
    } else if (password.length < 6) {
      dispatch(appSlice.actions.setAlert({ message: 'Password to short' }));
    } else {
      dispatch(login({ email, password }));
    }
  }
  const onGoogleButtonPress = async () => {
    dispatch(googleSignIn());
  }
  return (
    <Layout style={Style.container} level="2">
      <View style={Style.header}>
        <Logo width={normalize(200)} height={normalize(60)} />
        <View style={Style.subSection}>
          <Text category="h1" style={Style.title}>
            Login
          </Text>
          <Text appearance="hint">Empowering Moms through dialogue</Text>
        </View>
      </View>
      <View style={Style.body}>
        <View style={Style.form}>
          <View style={[Style.subSection, Style.inputGroup]}>
            <Input
              value={email}
              label="Email"
              placeholder="Lena@gmail.com"
              onChangeText={nextValue => setEmail(nextValue)}
              style={Style.input}
              keyboardType="email-address"
            />
            <Input
              value={password}
              label="Password"
              placeholder="••••••••••••"
              onChangeText={nextValue => setPassword(nextValue)}
              style={Style.input}
              secureTextEntry={true}
            />
          </View>
          <Button onPress={handleLogin} style={Style.button}>Login</Button>
        </View>
        <View style={Style.lineSection}>
          <View style={Style.line} />
          <Text style={Style.lineText}>or</Text>
          <View style={Style.line} />
        </View>
        <View style={Style.footer}>
          <Button
            accessoryLeft={GoogleIcon}
            status="basic"
            style={Style.googleButton}
            textStyle={Style.buttonText} 
            onPress={onGoogleButtonPress}>

            <RText style={Style.buttonText} >Sign in with Google</RText>
          </Button>
          <View style={Style.reDirectSignUp}>
            <Text appearance="hint">Don't have an account? </Text>
            <Text
              onPress={() => {
                navigation.navigate('Register');
              }}
              category="h6">
              sign up
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}
const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: normalize(20),
    flexDirection: 'column',
    gap: normalize(60),
  },
  logo: {},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    gap: normalize(30),
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    gap: normalize(20),
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    gap: normalize(20),
  },
  subSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Theme.color.MediumBlack,
  },
  inputGroup: {
    width: '90%',
    flexDirection: 'column',
    gap: normalize(10),
  },
  input: {
    backgroundColor: Theme.color.white,
    borderRadius: 10,
    borderWidth: 0,
  },
  button: {
    borderRadius: 10,
    width: '50%',
  },
  lineSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  lineText: {
    color: Theme.color.gray,
  },
  line: {
    borderBottomWidth: 1,
    width: '40%',
    borderBottomColor: Theme.color.gray,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: '100%',
  },
  googleButton: {
    backgroundColor: Theme.color.white,
    width: '80%',
    borderRadius: 10,
    borderWidth: 0,
    color: Theme.color.darkGray,
    fontFamily:"Nunito-Regular"
  },
  buttonText:{
    fontFamily:"Nunito-Bold",
    
  },
  reDirectSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
