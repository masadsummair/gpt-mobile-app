import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Theme from '../styles/Theme';
import GoogleIcon from '../components/googleIcon';
import { normalize } from '../styles/Style';
import { useDispatch } from 'react-redux';
import { appSlice } from '../store/slices/AppSlice';
import { register } from '../store/action/UserAction';
import Logo from "../../assets/logo.svg";

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handlRegister = async () => {
    if (firstName.length <= 0 || lastName.length <= 0) {
      dispatch(appSlice.actions.setAlert({ message: 'Please Enter Name' }));
    } else if (email.length <= 0) {
      dispatch(appSlice.actions.setAlert({ message: 'Please Enter Email' }));
    } else if (password.length < 6) {
      dispatch(appSlice.actions.setAlert({ message: 'Password to short' }));
    } else {
      dispatch(register({ firstName, lastName, email, password }));
    }
  };
  return (
    <Layout style={Style.container} level="2">
      <View style={Style.header}>
      <Logo width={normalize(200)} height={normalize(60)} />
        <View style={Style.subSection}>
          <Text category="h1" style={Style.title}>
            Register
          </Text>
          <Text appearance="hint">
            Navigating being a Mom, one question at a time
          </Text>
        </View>
      </View>
      <View style={Style.body}>
        <View style={Style.form}>
          <View style={[Style.subSection, Style.inputGroup]}>
            <Input
              value={firstName}
              label="First Name"
              placeholder="Lena"
              onChangeText={nextValue => setFirstName(nextValue)}
              style={Style.input}
            />
            <Input
              value={lastName}
              label="Last Name"
              placeholder="Nia"
              onChangeText={nextValue => setLastName(nextValue)}
              style={Style.input}
            />
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
          <Button
            onPress={handlRegister}
            style={Style.button}>
            Register
          </Button>
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
            style={Style.googleButton}>
            Sign in with Google
          </Button>
          <View style={Style.reDirectSignUp}>
            <Text appearance="hint">Already have an account? </Text>
            <Text
              onPress={() => {
                navigation.navigate('Login');
              }}
              category="h6">
              login
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
    gap: normalize(50),
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
  },
  reDirectSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
