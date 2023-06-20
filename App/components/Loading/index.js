import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import styles from './styles';
import { Colors } from '@common';
var Spinner = require('react-native-spinkit');

export default () => (
  <View style={styles.container}>
    <View style={styles.innerView}>
      {/* <Spinner style={styles.spinner} isVisible={true} size={37} type={"ChasingDots"} color={Colors.white} /> */}
      {/* <Spinner
        style={styles.spinner}
        isVisible={true}
        size={55}
        type={'Wave'}
        color={'white'}
      /> */}
      <Image
        source={require('../../../assets/loaderaudioWaveFinal.gif')}
        style={{ width: 100, height: 80 }}
      />
      {/* <ActivityIndicator size="large" color={Colors.black} /> */}
    </View>
  </View>
);
