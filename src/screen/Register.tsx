import { Input, Layout, Text } from '@ui-kitten/components';
import { Keyboard, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Theme from '../styles/Theme';
import { normalize } from '../styles/Style';
import { appSlice } from '../store/slices/AppSlice';
import { googleSignIn, register } from '../store/action/UserAction';
import CustomButton from '../components/Button';
import { generateDeepLink } from '../helper/generateDeepLink';
import { useAppDispatch } from '../store/Store';
import { AuthStackParamList } from '../navigation/Auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const handlRegister = async () => {
    Keyboard.dismiss();
    if (firstName.length <= 0 || lastName.length <= 0) {
      dispatch(appSlice.actions.setAlert({ message: 'Please Enter Name' }));
    } else if (email.length <= 0) {
      dispatch(appSlice.actions.setAlert({ message: 'Please Enter Email' }));
    } else if (password.length < 6) {
      dispatch(appSlice.actions.setAlert({ message: 'Password to short' }));
    } else {
      const url = await generateDeepLink();
      if (url)
        dispatch(register({ firstName, lastName, email, password, url }));
    }
  };
  const onGoogleButtonPress = async () => {
    const url = await generateDeepLink();
    if (url)
      dispatch(googleSignIn({ url }));
  }
  return (
    <Layout style={Style.container} level="2">
      <View style={Style.header}>
        {/* <Logo width={normalize(200)} height={normalize(60)} /> */}
        <View style={Style.subSection}>
          <Text category="h2" style={Style.title}>
            Connect with Moms like You
          </Text>
          <Text style={{ textAlign: "center" }} >
            Join our community of mothers and get access to valuable resources and expert advice.
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
          <CustomButton
            onPress={handlRegister}
            text="Register "
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
    paddingBottom: 5,
    paddingHorizontal: normalize(40)
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
