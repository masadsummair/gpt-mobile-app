import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import Theme from '../styles/Theme';
import { normalize } from '../styles/Style';

export default function Loader() {
  return (
    <View style={styles.container}>
      <View style={styles.controlContainer}>
      <ActivityIndicator color={Theme.color.secondary} size={"large"}  />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 15,
    zIndex: 2,
    height:"100%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    
  },
  controlContainer: {
    borderRadius: 16,
    padding: normalize(20),
    backgroundColor: Theme.color.lightBlack,
  },
});