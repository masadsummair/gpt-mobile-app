import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated, {ZoomInEasyUp, ZoomOutEasyUp} from 'react-native-reanimated';

import Theme from '../styles/Theme';
import {normalize} from '../styles/Style';
import {appSlice} from '../store/slices/AppSlice';
import { useAppDispatch, useAppSelector } from '../store/Store';


function Alert() {
  const dispatch = useAppDispatch();
  const {alert, message, mode} = useAppSelector(
    (state) => state.appSlice,
  );

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        dispatch(appSlice.actions.AlertOff());
      }, 3000);
    }
  }, [alert, dispatch]);

  return (
    <Animated.View
      style={[
        Style.container,
        {
          backgroundColor:
            mode === 'danger'
              ? Theme.color.redLite
              : mode === 'warning'
              ? Theme.color.YellowLite
              : Theme.color.GreenLiteLight,
          borderColor:
            mode === 'danger'
              ? Theme.color.red
              : mode === 'warning'
              ? Theme.color.Yellow
              : Theme.color.Green,
        },
      ]}
      entering={ZoomInEasyUp}
      exiting={ZoomOutEasyUp}>
      <Text
        style={[
          Style.text,
          {
            color:
              mode === 'danger'
                ? Theme.color.red
                : mode === 'warning'
                ? Theme.color.Yellow
                : Theme.color.Green,
          },
        ]}>
        {message + ' '}
      </Text>
    </Animated.View>
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