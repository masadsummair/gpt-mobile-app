import React, {useEffect} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {ZoomInEasyUp, ZoomOutEasyUp} from 'react-native-reanimated';

import Theme from '../styles/Theme';
import {normalize} from '../styles/Style';
import {appSlice} from '../store/slices/AppSlice';


function CustomButton({onPress}) {


  return (
    <Button
    onPress={onPress}
    >
        
    </Button>
  );
}

const Style = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 15,
    zIndex: 2,
    width: '90%',
    alignItems: 'center',
    top: normalize(40),
    borderRadius: 20,
    borderWidth: 1.5,
  },
  text: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default Alert;