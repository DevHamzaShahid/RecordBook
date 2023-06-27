import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Container } from 'native-base';
import { SolidButton } from '@Buttons';
import { LargeText, MediumText, SmallText } from '@Typography';
import moment from 'moment';
import Actions from '../MyBooking/reducer';
import StudioActions from '../Studio/reducer';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import TopNav from '../../components/TopNav';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../common/colors';
import RegularText from '../../components/Typography/RegularText';

const memfees = (amount) => {
  amount += 0.3;
  let finalAmount = amount / (1 - 0.029);
  return finalAmount.toFixed(2);
};

const fees = (amount) => {
  amount += 0.3;
  let finalAmount = amount / (1 - 0.029);
  let _total = finalAmount.toFixed(2) - amount.toFixed(0);
  return _total.toFixed(2);
};

const BookingDetail = ({ route, navigation }) => {
  const { adminMode } = route.params;
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const user = useSelector((state) => state.user);
  const associatedUser = user.allUsers.find(
    (aUser) => aUser.docId === booking.selectedBooking.userId,
  );
  const banner = booking.selectedBooking.associatedStudio.banner;
  const deleteBookingPressed = () => {
    let today = moment();
    let bookingDate = moment(booking.selectedBooking.date);
    if (adminMode || bookingDate.diff(today, 'days') > 2) {
      dispatch(Actions.deleteBooking(booking.selectedBooking, true, false));
    } else {
      Alert.alert(
        'The bookings can only be canceled before 2 days of booking date.',
      );
    }
  };
 
  const rescheduleBooking = () => {
    let today = moment();
    let bookingDate = moment(booking.selectedBooking.date);
    if (adminMode || bookingDate.diff(today, 'days') > 2) {
      dispatch(
        StudioActions.setSelectedStudio(
          booking.selectedBooking.associatedStudio,
        ),
      );
      navigation.navigate('Reschedule');
    } else {
      Alert.alert(
        'The bookings can only be reschedule before 2 days of booking date.',
      );
    }
  };

  return (
    <Container style={styles.container}>
      <TopNav showBack title={adminMode ? 'Booking Request' : 'My Bookings'} />
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.topImageContainer}>
            <FastImage
              style={styles.topImage}
              source={{ uri: banner, priority: FastImage.priority.normal }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ justifyContent: 'center', marginLeft: 16 }}>
              <LargeText bold>
                {booking.selectedBooking.associatedStudio.title}
              </LargeText>
              <View style={styles.subTextView}>
                <Icon
                  name="location"
                  type={'ionicon'}
                  color={colors.pink}
                  size={12}
                />
                <SmallText textStyle={styles.subTextStyle}>
                  {adminMode
                    ? associatedUser.full_name
                    : booking.selectedBooking.associatedStudio.location}
                </SmallText>
              </View>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <RegularText bold textStyle={styles.margin}>
              Booking Details
            </RegularText>
            <MediumText textStyle={styles.margin}>
              {moment(booking.selectedBooking.date).format(
                'dddd MMM DD, YYYY',
              ) +
                '\n' +
                booking.selectedBooking.time}
            </MediumText>
          </View>

          <View style={styles.btnContainer}>
            <RegularText bold textStyle={styles.margin}>
              Studio Details
            </RegularText>
            <MediumText>
              {booking.selectedBooking.associatedStudio.studioPin}
            </MediumText>
          </View>

          {booking.selectedBooking.attachment && (
            <Pressable
              onPress={() =>
                navigation.navigate('TOS', {
                  title: 'Rental Agreement',
                  link: booking.selectedBooking.attachment,
                })
              }
              style={styles.agreementView}>
              <MediumText textStyle={styles.agreementText}>
                View Rental Agreement
              </MediumText>
            </Pressable>
          )}

          <View style={styles.pricingDetailsView}>
            <RegularText bold textStyle={styles.margin}>
              Pricing Details
            </RegularText>

            <View style={styles.pricingDetailsWrapper}>
              <MediumText>
                {booking.selectedBooking.associatedStudio.title}
              </MediumText>
              <MediumText>
                $
                {booking.selectedBooking.amount -
                  booking.selectedBooking.discount}
              </MediumText>
            </View>
            <View style={styles.pricingDetailsWrapper}>
              <MediumText>Fees</MediumText>
              <MediumText>
                $
                {fees(
                  booking.selectedBooking.amount -
                  booking.selectedBooking.discount,
                )}
              </MediumText>
            </View>

            <View style={styles.pricingTotal}>
              <RegularText bold>Total</RegularText>
              <RegularText bold>
                $
                {memfees(
                  booking.selectedBooking.amount -
                  booking.selectedBooking.discount,
                )}
              </RegularText>
            </View>
          </View>

          <View style={styles.btnContainer}>
            {adminMode && (
              <SolidButton
                title="Receipt"
                buttonStyle={styles.receipt}
                onPress={() => navigation.navigate('Receipt')}
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default BookingDetail;
