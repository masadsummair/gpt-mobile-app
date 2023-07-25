import {
  Button,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Logo from "../../assets/logo.svg";
import Theme from '../styles/Theme';
import { normalize } from '../styles/Style';
import CustomButton from '../components/Button';
import AnimatedLottieView from 'lottie-react-native';




export default function OnBoarding({ navigation }) {
  return (
    <Layout style={Style.container} level="2">
      <View style={Style.header}>
        {/* <Image style={Style.logo} source={require('../../assets/logo.svg')} /> */}
        <Logo width={normalize(200)} height={normalize(60)} />
        <View style={Style.subSection}>
          <Text category="h2" style={Style.title}>
            Support every mom deserves
          </Text>
        </View>
      </View>
      <AnimatedLottieView source={require("../../assets/mobile-animation.json")} style={{ height: normalize(400) }} autoPlay loop />
      <View style={Style.buttonGroup} >
        <CustomButton
          onPress={() => {
            navigation.navigate('Register');
          }}
          text="Register"
          backgroundColor={Theme.color.MediumBlack}
        />

        <CustomButton
          onPress={() => {
            navigation.navigate('Login');
          }}
          text="Login"
          backgroundColor={Theme.color.white}
          color={Theme.color.MediumBlack}
        />
      </View>
    </Layout>
  );
}
const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: normalize(20),
    paddingBottom: normalize(20),
  },
  logo: {},
  icon: {
    width: normalize(24),
    height: normalize(24),
  },
  buttonGroup:{
    justifyContent:"center",
    width:"100%",
    alignItems:"center",
    gap:normalize(16),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  subSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Theme.color.MediumBlack,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 5,
  },
  button: {
    borderRadius: 10,
    width: '80%',

  },
  avatar: {
    flexDirection: 'row',
    padding: 20,
  },
  lena: { width: 150, height: 150, position: 'absolute', top: 5, right: 0 },
  nia: { width: 155, height: 155, position: 'absolute', top: 0 },
});
