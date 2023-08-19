import { Image, View, StyleSheet, Pressable } from 'react-native';
import { normalize } from '../styles/Style';
import { Icon } from '@ui-kitten/components';
import React from 'react';
import Theme from '../styles/Theme';

import { chatSlice } from '../store/slices/ChatSlice';
import Logo from "../../assets/logo.svg";
import { useAppDispatch } from '../store/Store';
import { DrawerHeaderProps } from '@react-navigation/drawer';


export default function Header({ navigation }:DrawerHeaderProps) {
  const dispatch=useAppDispatch();
  return (
    <View style={Style.header}>
      <Pressable
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Icon
          style={Style.MenuIcon}
          fill={Theme.color.MediumBlack}
          name="menu-outline"
        />
      </Pressable>
      <Logo width={normalize(200)} height={normalize(50)} />
      <Pressable
        onPress={() => { dispatch(chatSlice.actions.createNewThreat());navigation.navigate('chat-0', {index:0}); }}
      >
        <Icon
          style={Style.PlusIcon}
          fill={Theme.color.MediumBlack}
          name="plus-square"
        />
      </Pressable>
    </View>
  );
}
const Style = StyleSheet.create({
  logo: {
    width: '40%',
    height: '40%',
  },
  MenuIcon: {
    width: 30,
    height: 30,
  },
  PlusIcon: {
    width: 40,
    height: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: normalize(15),
    paddingTop: normalize(25),
    backgroundColor: Theme.color.secondary,
  },
});
