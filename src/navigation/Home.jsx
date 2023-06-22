import React, { useEffect, useState } from 'react';
import Chat from '../screen/Chat';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../components/Header';
import { SCREEN_WIDTH, normalize } from '../styles/Style';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import Theme from '../styles/Theme';
import { StatusBar } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@ui-kitten/components';
import Setting from '../screen/Setting';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screen/Welcome';
import { initChats } from '../store/action/ChatAction';


const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const navigationState = useNavigationState((state) => state);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (navigationState && navigationState.history) {
      setIsDrawerOpen(
        navigationState.history?.some(
          (route) => route.type === 'drawer' && route.status === 'open',
        ),
      );
    }
  }, [navigationState]);
  const chat = useSelector(({ chatSlice }) => chatSlice);
  useEffect(() => {
    dispatch(initChats());

  }, []);


  return (
    <>
      <StatusBar
        barStyle={isDrawerOpen ? 'light-content' : 'dark-content'}
        animated={true}
        backgroundColor={
          isDrawerOpen ? Theme.color.MediumBlack : Theme.color.secondary
        }
      />
      <Drawer.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
          drawerStyle: {
            width: SCREEN_WIDTH,
            backgroundColor: Theme.color.MediumBlack,
          },
          drawerItemStyle: {
            backgroundColor: Theme.color.darkGray,
            paddingVertical: 10,
            marginVertical: 10,
            borderRadius: 20,
            paddingLeft: 20,
          },
          drawerLabelStyle: {
            color: Theme.color.secondary,
          },
          drawerIcon: ({ focused, size }) => (
            <Icon
              style={{
                width: normalize(size),
                height: normalize(size),
              }}
              fill={focused ? Theme.color.secondary : Theme.color.MediumBlack}
              name="message-circle"
            />
          ),
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        initialRouteName="Home">
        {chat.chat.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={'chat-' + index}
            label={
              item[1][0] && item[1][0].message
                ? item[1][0].message.substr(0, 30) + '...'
                : 'This chat'
            }
            component={Chat}
          />
        ))}
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </>
  );
}
const Stack = createStackNavigator();
function WelcomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

export default function Home() {
  const { verify } = useSelector(({ userSlice }) =>
    userSlice.user,
  );
  if (verify) {
    return (<DrawerNavigation />);
  } else {
    return <WelcomeStack />
  }
}
