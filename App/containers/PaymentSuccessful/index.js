import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Image} from 'react-native';
import {Images} from '@common';
import {SolidButton} from '@Buttons';
import {RegularText, XLText} from '@Typography';
import Actions from '../MyBooking/reducer';
import AppActions from '../Root/reducer';

import styles from './styles';
import TopNav from '../../components/TopNav';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import colors from '../../common/colors';
import MediumText from '../../components/Typography/MediumText';
import moment from 'moment';
const PaymentSuccessful = ({navigation, route}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
        }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <Icon
          size={80}
          name={'checkmark-circle'}
          type={'ionicon'}
          color={colors.skyBlue01}
        />
        <XLText bold textStyle={styles.topTextStyle}>
          You’re Booked
        </XLText>
        <MediumText textStyle={styles.bottomTextStyle}>
          Your payment has been accepted.
        </MediumText>

        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={styles.bookingView}
          locations={[0, 1]}
          colors={['rgb(24,40,8)', 'rgb(48, 56, 78)']}>
          {route.params?.bookings?.map((b, index) => (
            <View key={String(index)}>
              <RegularText bold textStyle={{textAlign: 'center'}}>
                {moment(b.date).format('dddd, MMMM DD, YYYY') + '\n' + b.time}
              </RegularText>
            </View>
          ))}
        </LinearGradient>
        <SolidButton
          title="View All Bookings"
          onPress={navigate}
          buttonStyle={styles.bookingButton}
        />
      </LinearGradient>
    </View>
  );
};

export default PaymentSuccessful;
