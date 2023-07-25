import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContent,
} from '@react-navigation/drawer';
import {
  ScrollView,
  Linking,
  View,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import Theme from '../styles/Theme';
import { normalize } from '../styles/Style';
import { useDispatch, useSelector } from 'react-redux';
import { chatSlice } from '../store/slices/ChatSlice';
import Logo from "../../assets/logo-white.svg";
import { logout } from '../store/action/UserAction';
export default function CustomSidebarMenu({ navigation, ...props }) {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  const dispatch = useDispatch();
  const { chat } = useSelector(({ chatSlice }) => chatSlice);
  const handleLogOut = async () => {
    dispatch(logout());
  }
  return (
    <DrawerContentScrollView>
      <View style={Style.header}>
        <Logo width={normalize(120)} height={normalize(50)} />
        <Pressable onPress={toggleDrawer}>
          <Icon
            style={Style.Icon}
            fill={Theme.color.secondary}
            name="close-outline"
          />
        </Pressable>
      </View>

      <DrawerContentScrollView style={Style.Threats}>
        {chat.map((item, index) => {
          const route = 'chat-' + index;
          return (
            <DrawerItem
              key={route}
              style={Style.ChatDrawer}
              label={({ focused }) => (
                <View style={Style.ChatDrawerItem}>
                  <Icon
                    style={Style.Icon}
                    fill={Theme.color.secondary}
                    name="message-circle"
                  />
                  <Text style={Style.ChatDrawerText}>
                    {item[1][0] && item[1][0].message
                      ? item[1][0].message.substr(0, 30) + '...'
                      : 'This chat'}
                  </Text>
                </View>
              )}
              onPress={() => {
                dispatch(chatSlice.actions.setSelectedThreat(index))
                navigation.navigate(route, { index });
              }}
            />
          );
        })}
      </DrawerContentScrollView>

      <View style={Style.line} />
      <DrawerItem
        style={Style.BottomDrawer}
        label={() => (
          <View style={Style.BottomDrawerItem}>
            <Icon
              style={Style.Icon}
              fill={Theme.color.secondary}
              name="star-outline"
            />
            <Text style={Style.BottomDrawerText}>Improve Lena&Nia</Text>
          </View>
        )}
        onPress={() => Linking.openURL('https://forms.gle/KHUWNP7PZrqrgrXk8')}
      />
      <DrawerItem
        style={Style.BottomDrawer}
        label={() => (
          <View style={Style.BottomDrawerItem}>
            <Icon
              style={Style.Icon}
              fill={Theme.color.secondary}
              name="question-mark-circle-outline"
            />
            <Text style={Style.BottomDrawerText}>Support</Text>
          </View>
        )}
        onPress={() => Linking.openURL('https://lenania.com/contact')}
      />
      <DrawerItem
        style={Style.BottomDrawer}
        label={() => (
          <View style={Style.BottomDrawerItem}>
            <Icon
              style={Style.Icon}
              fill={Theme.color.secondary}
              name="log-out-outline"
            />
            <Text style={Style.BottomDrawerText}>Log out</Text>
          </View>
        )}
        onPress={handleLogOut}
      />
    </DrawerContentScrollView>
  );
}

const Style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: normalize(15),
  },
  logo: {},
  Icon: {
    width: normalize(30),
    height: normalize(30),
  },
  line: {
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderBottomColor: Theme.color.secondary,
  },
  Threats: {
    height: normalize(400),
    marginBottom: 10,
  },
  BottomDrawer: {},
  BottomDrawerText: {
    color: Theme.color.secondary,
    alignSelf: 'center',
    fontSize: normalize(18),
  },
  BottomDrawerItem: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
    paddingLeft: 10,
  },
  ChatDrawer: {
    backgroundColor: Theme.color.lightBlack,
    borderRadius: 20
  },
  ChatDrawerText: {
    color: Theme.color.secondary,
    alignSelf: 'center',
    fontSize: normalize(18),
  },
  ChatDrawerItem: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
    paddingLeft: 10,
  },
});
