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




export default function OnBoarding({ navigation }) {
  return (
    <Layout style={Style.container} level="2">
      <View style={Style.header}>
        {/* <Image style={Style.logo} source={require('../../assets/logo.svg')} /> */}
        <Logo  width={normalize(200)} height={normalize(60)} />
        <View style={Style.subSection}>
          <Text category="h2" style={Style.title}>
            Support every mom deserves
          </Text>
          <Text style={Style.text} appearance="hint">
            Lena&Nia is your go-to source for pregnancy and parenting support.
            Our experienced midwives and parenting experts are here to answer
            your questions, help you express your feelings, and provide advice
            every step of the way. Join our community today!
          </Text>
        </View>
        <View style={Style.avatar}>
          <Image style={Style.lena} source={require('../../assets/lena.png')} />
          <Image style={Style.nia} source={require('../../assets/nia.png')} />
        </View>
      </View>
      <Button
        onPress={() => {
          navigation.navigate('Login');
        }}
        size="large"
        accessoryRight={() => (<Icon style={Style.icon}
          fill={Theme.color.white} name="arrow-forward-outline" />)}
        style={Style.button}>
        Continue

      </Button>
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
    width: normalize(26),
    height: normalize(26),
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
