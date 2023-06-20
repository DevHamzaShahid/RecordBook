import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  ScrollView,
  Alert,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Container} from 'native-base';
import {Colors} from '@common';
import {SolidButton} from '@Buttons';
import {LargeText, MediumText} from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import moment from 'moment';
import Actions from '../MyBooking/reducer';
import StudioActions from '../Studio/reducer';
import FastImage from 'react-native-fast-image';

import styles from './styles';
const BookingDetail = ({route, navigation}) => {
  const {adminMode} = route.params;
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

  const callNumber = (phone) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container style={styles.container}>
      <SectionHeader
        title={adminMode ? 'Booking Request' : 'Booking Details'}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.topImageContainer}>
          <FastImage
            style={styles.topImage}
            source={{uri: banner, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <LargeText bold textStyle={styles.margin}>
          {booking.selectedBooking.associatedStudio.title}
        </LargeText>
        <View style={styles.btnContainer}>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              {adminMode ? 'Booked by' : 'Location'}
            </MediumText>
            <MediumText>
              {adminMode
                ? associatedUser.full_name
                : booking.selectedBooking.associatedStudio.location}
            </MediumText>
          </View>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              Email
            </MediumText>
            <MediumText>
              {associatedUser.email ? associatedUser.email : ''}
            </MediumText>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              Studio pin
            </MediumText>
            <MediumText>
              {booking.selectedBooking.associatedStudio.studioPin}
            </MediumText>
          </View>
          <TouchableOpacity
            style={[styles.flex, styles.margin]}
            onPress={() => callNumber(associatedUser.phone)}>
            <MediumText bold textStyle={styles.margin}>
              Phone
            </MediumText>
            <MediumText>{associatedUser.phone}</MediumText>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              Date
            </MediumText>
            <MediumText textStyle={styles.margin}>
              {moment(booking.selectedBooking.date).format('LL')}
            </MediumText>
          </View>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              Time
            </MediumText>
            <MediumText textStyle={styles.margin}>
              {booking.selectedBooking.time}
            </MediumText>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              Cost
            </MediumText>
            <MediumText textStyle={styles.margin}>
              $
              {booking.selectedBooking.amount -
                booking.selectedBooking.discount}
            </MediumText>
          </View>
          <View style={[styles.flex, styles.margin]}>
            <MediumText bold textStyle={styles.margin}>
              Payment method
            </MediumText>
            <MediumText textStyle={styles.margin}>
              {booking.selectedBooking.paymentMethod}
            </MediumText>
          </View>
        </View>
        <View style={[styles.btnContainer, {alignItems: 'center'}]}>
          <MediumText bold textStyle={[styles.margin, {marginRight: 10}]}>
            Engineer
          </MediumText>
          <Icon
            name={
              booking.selectedBooking.needEngineer ? 'check-circle' : 'cancel'
            }
            color={
              booking.selectedBooking.needEngineer
                ? Colors.greenDark
                : Colors.red
            }
          />
        </View>
        <View style={styles.btnContainer}>
          {!adminMode && (
            <SolidButton
              title="Receipt"
              buttonStyle={styles.receipt}
              textStyle={styles.receiptText}
              onPress={() => navigation.navigate('Receipt')}
            />
          )}
          {booking.selectedBooking.attachment && (
            <SolidButton
              title="Agreement"
              buttonStyle={styles.receipt}
              textStyle={styles.receiptText}
              onPress={() =>
                navigation.navigate('TOS', {
                  title: 'Rental Agreement',
                  link: booking.selectedBooking.attachment,
                })
              }
            />
          )}
        </View>
      </ScrollView>
      {!booking.selectedBooking.inPast && (
        <View style={styles.btnContainer}>
          <SolidButton
            title="Reschedule"
            buttonStyle={styles.acceptButtonStyle}
            textStyle={{color: 'black'}}
            onPress={rescheduleBooking}
          />
          {adminMode && (
            <SolidButton
              title="Cancel"
              buttonStyle={styles.declineButtonStyle}
              onPress={deleteBookingPressed}
            />
          )}
        </View>
      )}
    </Container>
  );
};

export default BookingDetail;
