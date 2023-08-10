import {Image} from 'react-native';
import {normalize} from '../styles/Style';
import React from 'react';
export default function GoogleIcon() {
  return (
    <Image
      style={{width: normalize(20), height: normalize(20)}}
      source={require('../../assets/google-icon.png')}
    />
  );
}
