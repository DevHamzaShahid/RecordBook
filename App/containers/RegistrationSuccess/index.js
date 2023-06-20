import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Image} from 'react-native';
import Actions from '../Profile/reducer';
import {Images, Constant} from '@common';
import {SolidButton} from '@Buttons';
import {RegularText, XLText} from '@Typography';

import styles from './styles';
const RegistrationSuccess = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // useEffect(() => {
  //   dispatch(Actions.getProfile());
  // },[]);

  const navigate = () => {
    navigation.navigate(
      user.phone === user.adminDetail.phone ? 'AdminHomeTab' : 'HomeTab',
    );
  };

  return (
    <View style={styles.container}>
      <XLText bold textStyle={styles.topTextStyle}>
        {user.user_approved
          ? `Nice to see ${'\n'}you ${user.full_name.toUpperCase()}! `
          : 'Registration Successful!'}
      </XLText>
      <Image
        source={
          user.user_approved ? Images.celebration : Images.undraw_check_boxes
        }
        style={styles.centerImage}
        resizeMode="contain"
      />
      <RegularText textStyle={styles.bottomTextStyle}>
        {user.user_approved
          ? `Tap continue to start ${'\n'} your quest for a studio.`
          : `Your Registration has ${'\n'}been received. ${'\n'} We will notify you once it has been processed and approved.`}
      </RegularText>
      {user.user_approved && (
        <SolidButton title="Continue" onPress={navigate} />
      )}
    </View>
  );
};

export default RegistrationSuccess;
