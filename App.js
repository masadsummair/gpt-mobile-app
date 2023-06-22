import 'react-native-gesture-handler';
import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from './theme.json';
import {default as mapping} from './mapping.json';
import uiKittenMappingForAndroid from './src/helper/uiKittenMappingForAndroid';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Style, { normalize } from './src/styles/Style';
import {Provider} from 'react-redux';
import MainApp from './src/MainApp';
import {store} from './src/store/Store';
import Theme from './src/styles/Theme';
import { useFont } from './src/hooks/useFont';
import { Logs } from 'expo'
Logs.enableExpoCliLogging()
export default () => {
  const isLoadingComplete = useFont();
  if (!isLoadingComplete) {
    return null;
  } 
  return (
  <GestureHandlerRootView style={Style.container}>
    <SafeAreaView edges={['top', 'left', 'right']} style={Style.container}>
      <StatusBar
        animated={true}
        backgroundColor={Theme.color.secondary}
        style='auto'
      />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={{...eva.mapping, ...uiKittenMappingForAndroid(mapping)}}
        theme={{...eva.light, ...theme}}>
        <Provider store={store}>
          <MainApp />
        </Provider>
      </ApplicationProvider>
    </SafeAreaView>
  </GestureHandlerRootView>
);
  }