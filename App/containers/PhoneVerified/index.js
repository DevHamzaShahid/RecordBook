import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import AppActions from '../Root/reducer';
import {GlobalStyle, Images} from '@common';
import {SolidButton} from '@Buttons';
import {LargeText, RegularText, XLText} from '@Typography';
import TextField from '../../components/TextField';
import Badge from '../../components/Badge';

import styles from './styles';
const PhoneVerified = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <Badge count="1" selected />
        <Badge count="2" />
        <Badge count="3" />
      </View>
      <XLText bold textStyle={styles.topTextStyle}>
        Verification Complete!
      </XLText>
      <Image
        source={Images.celebration}
        style={styles.centerImage}
        resizeMode="contain"
      />
      <RegularText textStyle={styles.bottomTextStyle}>
        Congratulations!
      </RegularText>
      <SolidButton
        title="Continue"
        onPress={() => navigation.navigate('Bio')}
      />
    </View>
  );
};

export default PhoneVerified;
