import { TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { normalize } from '../styles/Style';
import Theme from '../styles/Theme';
import {
  Icon,
  Layout,
  Text,
  Button
} from '@ui-kitten/components';
import { logout } from '../store/action/UserAction';
import { useAppDispatch } from '../store/Store';


export default function Setting() {
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    dispatch(logout());
  }
  return (
    <Layout style={Style.container} level="2">
      <Text category="h2">Account Setting</Text>
      <View style={Style.cards} >
        <TouchableOpacity style={Style.card} >
          <Text>Terms and Conditions</Text>
          <Icon
            style={Style.icon}
            fill={Theme.color.MediumBlack}
            name="arrow-ios-forward-outline"
          />
        </TouchableOpacity>
        <TouchableOpacity style={Style.card} >
          <Text>Privacy Policy</Text>
          <Icon
            style={Style.icon}
            fill={Theme.color.MediumBlack}
            name="arrow-ios-forward-outline"
          />
        </TouchableOpacity>
        <TouchableOpacity style={Style.card} onPress={handleLogOut} >
          <Text >Log out</Text>
          <Icon
            style={Style.icon}
            fill={Theme.color.MediumBlack}
            name="arrow-ios-forward-outline"
          />
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: normalize(20),

  },
  cards: {
    paddingVertical: normalize(20),
    flexDirection: "column",
    gap: normalize(20),
    width: "85%",
  },
  card: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.color.MediumBlack,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  icon: {
    width: normalize(28),
    height: normalize(28),
  },
});
