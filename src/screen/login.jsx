import { Input, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, View, Text as RText, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Theme from '../styles/Theme';
import { normalize } from '../styles/Style';
import { googleSignIn, login } from '../store/action/UserAction';
import { useDispatch } from 'react-redux';
import { appSlice } from '../store/slices/AppSlice';
import CustomButton from '../components/Button';
import { generateDeepLink } from '../helper/generateDeepLink';

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
    const url = await generateDeepLink();
    dispatch(googleSignIn({ url }));
  }
  return (
    <Layout style={Style.container} level="2">
      <View style={Style.header}>
        {/* <Logo width={normalize(200)} height={normalize(60)} /> */}
        <View style={Style.subSection}>
          <Text category="h2" style={Style.title}>
            Discover the Journey of Motherhood
          </Text>
          <Text style={{ textAlign: "center" }} >Our experienced midwives are here to provide support, answer your questions, and offer advice every step of the way.</Text>
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
          <CustomButton
            onPress={handleLogin}
            text="Login "
          />
        </View>
        <View style={Style.lineSection}>
          <View style={Style.line} />
          <Text style={Style.lineText}>or</Text>
          <View style={Style.line} />
        </View>
        <View style={Style.footer}>
          <CustomButton
            onPress={onGoogleButtonPress}
            text="Sign in with Google"
            GoogleIconLeft={true}
            backgroundColor={Theme.color.white}
            color={Theme.color.darkGray}
            fontSize={16}
          />
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
    justifyContent: "center"
  },
  logo: {},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    gap: normalize(20),
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
    textAlign: "center",
    paddingBottom: 5
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
    fontFamily: "Nunito-Regular"
  },
  buttonText: {
    fontFamily: "Nunito-Bold",

  },
  reDirectSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
