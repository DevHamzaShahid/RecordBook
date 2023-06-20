import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import functions from '@react-native-firebase/functions';
import { View } from 'react-native';
import { Container, Content } from 'native-base';
import Actions from '../MyBooking/reducer';
import AppActions from '../Root/reducer';

import { SolidButton } from '@Buttons';
import { LargeText, RegularText, MediumText, SmallText } from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import TextField from '../../components/TextField';
import moment from 'moment';
import styles from './styles';
// Use a local emulator in development
// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }

const ManualBooking = ({ navigation }) => {
  const studio = useSelector(state => state.studio);
  const booking = useSelector(state => state.booking);
  const [name, setName] = useState('');
  const [promo, onChangePromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [couponApplied, applyCoupon] = useState(false);
  const [ct, setCT] = useState(null);
  const dispatch = useDispatch();
  const [bookingDates, setBookingDates] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [engDates, setEngDates] = useState('');
  const [totalEngSlots, setTotalEngSlots] = useState('');
  const [total, setTotal] = useState(0);
  const [firebaseBookings, setFirebaseBookings] = useState([]);

  const user = useSelector(state => state.user);
  useEffect(() => {
    var allDateText = '';
    var allEngineerDateText = '';
    var slots = 0;
    var engSlots = 0;
    booking.newBookings.forEach((aNewBooking, index) => {
      var timeString = '';
      if (aNewBooking.dayTimeSlot) {
        timeString = timeString + `8:00 am - 8:00 pm ${'\n'}`;
        slots = slots + 1;
      }
      if (aNewBooking.nightTimeSlot) {
        timeString = timeString + `8:00 pm - 8:00 am ${'\n'}`;
        slots = slots + 1;
      }

      allDateText =
        allDateText +
        `${moment(aNewBooking.date).format('LL')}\n${timeString}\n`;
      setBookingDates(allDateText);
      setTotalSlots(slots);

      var engString = '';
      if (aNewBooking.dayEngineer && aNewBooking.nightEngineer) {
        engString = '- (24 hrs)';
        engSlots = engSlots + 2;
      } else if (aNewBooking.dayEngineer || aNewBooking.nightEngineer) {
        engString = '- (12 hrs)';
        engSlots = engSlots + 1;
      } else {
        engString = '- NA';
      }
      allEngineerDateText =
        allEngineerDateText +
        `${moment(aNewBooking.date).format('LL')} ${engString}\n`;

      createBooking(aNewBooking, index);
    });
    setEngDates(allEngineerDateText);
    setTotalEngSlots(engSlots);

    setTotal(
      studio.selectedStudio.engineerPrice * engSlots +
      studio.selectedStudio.price * slots,
    );
  }, []);

  const createBooking = (aBooking, index) => {
    var fbBookings = [];

    if (aBooking.dayTimeSlot) {
      fbBookings.push({
        bookingId: `day${Date.now() + index}`,
        studioId: studio.selectedStudio.docId,
        userId: user.uid,
        userName: name,
        date: aBooking.date,
        time: '8:00 am - 8:00 pm',
        needEngineer: aBooking.dayEngineer,
        price: studio.selectedStudio.price,
        engineerPrice: aBooking.nightEngineer
          ? studio.selectedStudio.engineerPrice
          : 0,
        discount: 0,
        amount:
          parseInt(studio.selectedStudio.price) +
          (aBooking.nightEngineer
            ? parseInt(studio.selectedStudio.engineerPrice)
            : 0),
      });
    }
    if (aBooking.nightTimeSlot) {
      fbBookings.push({
        bookingId: `night${Date.now() + index}`,
        studioId: studio.selectedStudio.docId,
        userId: user.uid,
        userName: name,
        date: aBooking.date,
        time: '8:00 pm - 8:00 am',
        needEngineer: aBooking.nightEngineer,
        price: studio.selectedStudio.price,
        engineerPrice: aBooking.nightEngineer
          ? studio.selectedStudio.engineerPrice
          : 0,
        discount: 0,
        amount:
          parseInt(studio.selectedStudio.price) +
          (aBooking.nightEngineer
            ? parseInt(studio.selectedStudio.engineerPrice)
            : 0),
      });
    }
    setFirebaseBookings(fBookings => [...fBookings, ...fbBookings]);
  };

  const checkout = booking => {
    functions()
      .httpsCallable('checkout')(booking)
      .then(response => {
        dispatch(AppActions.loading(false));
        navigation.navigate('ManualBookingSuccessful');
      })
      .catch(err => {
        dispatch(AppActions.loading(false));
        console.log(err);
      });
  };
  const continueToPayment = () => {
    dispatch(AppActions.loading(true));
    var nameAddedBookings = [];
    firebaseBookings.forEach(abooking => {
      nameAddedBookings.push({ ...abooking, userName: name });
    });
    checkout({
      amount: total,
      bookings: nameAddedBookings,
      paymentMethodNonce: null,
      paymentMethod: 'Cash',
    });
  };

  return (
    <Container style={styles.container}>
      <SectionHeader title="Booking Details" />
      <Content>
        <TextField
          placeHolder="Name"
          autoCorrect={false}
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <View style={styles.viewContainer}>
          <View style={styles.left}>
            <LargeText bold textStyle={styles.margin}>
              {studio.selectedStudio.title}
            </LargeText>
            <MediumText textStyle={styles.margin}>{bookingDates}</MediumText>
          </View>
          <View style={styles.right}>
            <MediumText textStyle={styles.margin}>
              ${studio.selectedStudio.price}/Session
            </MediumText>
            <MediumText bold textStyle={styles.margin}>
              Total
            </MediumText>
            <RegularText bold>
              ${studio.selectedStudio.price * totalSlots}
            </RegularText>
          </View>
        </View>
        <View style={styles.lightViewContainer}>
          <View style={styles.left}>
            <LargeText bold textStyle={styles.margin}>
              Total
            </LargeText>
            {couponApplied && (
              <>
                <RegularText>Promo</RegularText>
                <RegularText bold>
                  {studio.selectedStudio.promo.code}
                </RegularText>
              </>
            )}
          </View>
          <View style={styles.right}>
            <RegularText bold textStyle={styles.margin}>
              ${total}
            </RegularText>
          </View>
        </View>
        <SolidButton
          title="Manual Book"
          buttonStyle={styles.declineButtonStyle}
          onPress={continueToPayment}
        />
      </Content>
    </Container>
  );
};

export default ManualBooking;
