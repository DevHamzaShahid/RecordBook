import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Image} from 'react-native';
import {Images} from '@common';
import {SolidButton} from '@Buttons';
import {RegularText, XLText} from '@Typography';
import Actions from '../MyBooking/reducer';
import AppActions from '../Root/reducer';

import styles from './styles';
const PaymentSuccessful = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {});

  const navigate = () => {
    dispatch(AppActions.loading(true));
    navigation.popToTop();
    dispatch(
      Actions.getBookings(user.admin ? 'Manage Bookings' : 'My Bookings'),
    );
    dispatch(AppActions.loading(false));
  };

  return (
    <View style={styles.container}>
      <Image
        source={Images.celebration}
        style={styles.centerImage}
        resizeMode="contain"
      />
      <XLText bold textStyle={styles.topTextStyle}>
        Payment{'\n'}Successful
      </XLText>
      <RegularText textStyle={styles.bottomTextStyle}>
        Payment successfully done. {'\n'}your booking is now being processed
      </RegularText>
      <SolidButton title="My Bookings" onPress={navigate} />
    </View>
  );
};

export default PaymentSuccessful;
