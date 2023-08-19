import React, { useEffect, useState } from 'react';
import Chat from '../screen/Chat';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../components/Header';
import { SCREEN_WIDTH, normalize } from '../styles/Style';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import Theme from '../styles/Theme';
import { StatusBar } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import Setting from '../screen/Setting';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screen/Welcome';
import { initChats } from '../store/action/ChatAction';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { IThreat } from '../store/slices/ChatSlice';
import Loader from '../components/Loader';

export type ChatItemName = `chat-${number}`;

export type ChatRouteParams = {
  chatItem: IThreat;
};

export type HomeDrawerParamList = {
  Home: undefined;
  Setting: undefined;
} & { [key in ChatItemName]: ChatRouteParams };

type HistoryEntry = {
  type: string; // Replace 'string' with the actual type of 'type'
  status: string; // Replace 'string' with the actual type of 'status'
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export interface IChatNavigationItems { name: ChatItemName; chatItem: IThreat }

function generateChatNavigationItems(chatData: IThreat[]): IChatNavigationItems[] {
  return chatData.map((chatItem, index) => ({
    name: `chat-${index}` as ChatItemName,
    chatItem,
  }));
}

function DrawerNavigation({ chatNavigationItems }: { chatNavigationItems: IChatNavigationItems[] }) {
  const navigationState = useNavigationState((state) => state as { history: HistoryEntry[]; });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navigationState && navigationState.history) {
      setIsDrawerOpen(
        navigationState.history.some(
          (route) => route.type === 'drawer' && route.status === 'open',
        ),
      );
    }
  }, [navigationState]);
  const chat = useAppSelector(({ chatSlice }) => chatSlice.chat);
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
        {chatNavigationItems.map(({ name, chatItem }, index) => (
          <Drawer.Screen
            key={index}
            name={name}
            options={({ route }) => ({
              drawerLabel: chat[1][1][0].message ? `${chat[1][1][0].message.substring(0, 30)}...` : 'This chat',
              // Customize other screen options as needed...
            })}
            component={Chat}
          />
        ))}
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </>
  );
}

export type WelcomeStackParamList = {
  Welcome: undefined;
};

const Stack = createStackNavigator<WelcomeStackParamList>();


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
  const { verify } = useAppSelector(({ userSlice }) =>
    ({ verify: userSlice.user, loading: userSlice.loading, isAuthenticated: userSlice.isAuthenticated }),
  );

  const chat = useAppSelector(({ chatSlice }) => chatSlice.chat);
  const dispatch = useAppDispatch();
  const [isChatInitialized, setIsChatInitialized] = useState(false);

  useEffect(() => {
    dispatch(initChats()).then(() => {
      setIsChatInitialized(true);
    });
  }, []);

  if (verify) {
    if (!isChatInitialized || chat === undefined) {
      // Add a loading state or placeholder here while the chat data is being initialized
      return <Loader />;
    }

    const chatNavigationItems = generateChatNavigationItems(chat);

    return <DrawerNavigation chatNavigationItems={chatNavigationItems} />;
  } else {
    return <WelcomeStack />;
  }
}
