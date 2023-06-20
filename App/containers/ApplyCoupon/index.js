import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Alert} from 'react-native';

import {SolidButton} from '@Buttons';
import functions from '@react-native-firebase/functions';
import {LargeText, MediumText, RegularText, SmallText} from '@Typography';
import moment from 'moment';
import {Container, Content} from 'native-base';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import {Notifications} from 'react-native-notifications';
import {useDispatch, useSelector} from 'react-redux';
import SectionHeader from '../../components/SectionHeader';
import TextField from '../../components/TextField';
import AppActions from '../Root/reducer';
import UserActions from '../Profile/reducer';

import BookingActions from '../MyBooking/reducer';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';
import {uploadImageAsPromise, uuidv4} from '../../utils/storage';
// Use a local emulator in development

const ApplyCoupon = ({navigation}) => {
  const dispatch = useDispatch();

  const studio = useSelector((state) => state.studio);
  const booking = useSelector((state) => state.booking);
  const user = useSelector((state) => state.user);

  const [promo, onChangePromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [couponApplied, applyCoupon] = useState(false);
  const [ct, setCT] = useState(null);
  const [bookingDates, setBookingDates] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [engDates, setEngDates] = useState('');
  const [totalEngSlots, setTotalEngSlots] = useState('');
  const [total, setTotal] = useState(0);
  const [firebaseBookings, setFirebaseBookings] = useState([]);

  useLayoutEffect(() => {
    console.log(booking.termsAccepted);
    if (booking.termsAccepted) {
      setTimeout(() => {
        initiatePayment();
      }, 3000);
    }
  }, [booking.termsAccepted]);

  useEffect(() => {
    dispatch(AppActions.loading(true));
    functions()
      .httpsCallable('getClientToken')(user)
      .then((response) => {
        // Alert.alert(response.data);
        setCT(response.data.token);
        if (!user.brainTreeCustomerId) {
          dispatch(
            UserActions.updateBio({
              brainTreeCustomerId: response.data.customerId,
            }),
          );
        }
        dispatch(AppActions.loading(false));
      })
      .catch((err) => {
        dispatch(AppActions.loading(false));
        console.log(err);
      });
  }, []);

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
        `${moment(aNewBooking.date).format(
          'ddd, MMM Do YYYY',
        )}\n${timeString}\n`;
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
        date: aBooking.date,
        time: '8:00 am - 8:00 pm',
        needEngineer: aBooking.needEngineer,
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
        date: aBooking.date,
        time: '8:00 pm - 8:00 am',
        needEngineer: aBooking.needEngineer,
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
    setFirebaseBookings((fBookings) => [...fBookings, ...fbBookings]);
  };

  const checkout = (booking) => {
    functions()
      .httpsCallable('checkout')(booking)
      .then((response) => {
        dispatch(AppActions.loading(false));

        booking.bookings.forEach((aBooking) => {
          const t = moment(aBooking.date).set('hour', 8).set('minute', 0);
          Notifications.postLocalNotification({
            //body: `Enjoy your session today from ${aBooking.time}at Recordbook! Remember you can check the “My Bookings” tab on the App to locate the address and door codes to your room!`,
            body: `This is a reminder for your studio session on ${aBooking.time} at RecordBook! Check the app for details!`,

            fireDate: t.local().toISOString(),
            title: 'RecordBook team',
            silent: false,
            category: 'SOME_CATEGORY',
            userInfo: {},
          });
        });

        functions().httpsCallable('sendEmail')({
          to: user.adminDetail.email,
          message: {
            subject: `RecordBook - ${user.user_name} has booked a studio time!`,
            text: `RecordBook Admin Notification:\n ${user.user_name} has booked the ${studio.selectedStudio.title}.\n\n-The RecordBook Team`,
            attachments: [
              {
                filename: 'aggement.pdf',
                path: booking.attachment,
              },
            ],
          },
        });

        functions().httpsCallable('sendEmail')({
          to: user.email,
          message: {
            subject: 'RecordBook - Your Studio Time is Booked!',
            text: `Thank you for booking the ${studio.selectedStudio.title}.\n\nYou will find the code to access the studio inside of the RecordBook app under My Bookings.\nPlease contact support in the app if you have questions.\n\nThank you.\n-The RecordBook Team`,
            attachments: [
              {
                filename: 'aggement.pdf',
                path: booking.attachment,
              },
            ],
          },
        });
        functions().httpsCallable('sendNotifications')({
          user_name: user.full_name,
          tokens: user.adminDetail.fcmToken,
          text: 'New Booking!',
        });
        navigation.navigate('PaymentSuccessful');
      })
      .catch((err) => {
        dispatch(AppActions.loading(false));
        console.log(err);
      });
  };

  const initiatePayment = () => {
    if (!ct) {
      return;
    }
    const orderTotal = memfees(total - discount);
    BraintreeDropIn.show({
      clientToken: ct,
      merchantIdentifier: 'merchant.com.hithouseStudios.app.debug',
      //merchantIdentifier: 'merchant.com.recordBook.ios.release',
      googlePayMerchantId: 'googlePayMerchantId',
      countryCode: 'US', //apple pay setting
      currencyCode: 'USD', //apple pay setting
      merchantName: `OMAR'S ROOM`,
      orderTotal: orderTotal.toString(),
      googlePay: true,
      applePay: true,
      venmo: true,
      vaultManager: true,
      darkTheme: true,
    })
      .then((result) => {
        console.log(result);
        dispatch(AppActions.loading(true));
        var CheckoutObj = {
          amount: orderTotal,
          bookings: firebaseBookings,
          paymentMethodNonce: result.nonce,
          paymentMethod: result.type,
        };
        sendSignature(CheckoutObj);
        console.log(result);
        dispatch(BookingActions.setTermsAccepted(false));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(BookingActions.setTermsAccepted(false));
        if (error.code === 'USER_CANCELLATION') {
          // update your UI to handle cancellation
        } else {
          // update your UI to handle other errors
        }
      });
  };

  const sendSignature = (checkoutObj) => {
    // Custom API call this takes user information and signature.png and convert it in to
    // Signed agreement .

    dispatch(AppActions.loading(true));
    const path = RNFS.TemporaryDirectoryPath + '/signature.png';
    const pathpdf = RNFS.TemporaryDirectoryPath + '/signature.pdf';
    let date = '',
      dayTimeSlot = true;

    if (Array.isArray(booking.newBookings)) {
      if (booking.newBookings.length > 0) {
        date = booking.newBookings[0].date;
        dayTimeSlot = booking.newBookings[0].dayTimeSlot;
      }
    }

    const params = {
      name: user.full_name,
      email: user.email,
      address: {
        number: '',
        street: user.address,
        city: user.city,
      },
      studio_name: studio.selectedStudio.title,
      booking_date: date,
      slot: dayTimeSlot ? '8am-8pm' : '8pm-8am',
      booking_dates: firebaseBookings.map((aBooking) => {
        return {
          date: aBooking.date,
          slot: aBooking.time,
        };
      }),
    };
    RNFetchBlob.fetch(
      'POST',
      'https://recordbook.live/pdf',
      {
        responseType: 'blob',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'params', data: JSON.stringify(params)},
        {
          name: 'sign',
          filename: 'signature.png',
          type: 'image/png',
          data: RNFetchBlob.wrap(path),
        },
      ],
    )
      .then((res) => {
        // Singed rental agreement saved in pathpdf folder .
        RNFS.writeFile(pathpdf, res.data, 'base64')
          .then((success) => {
            // upload pdf to storage
            ///get download url
            //save download url to firestore
            //email with attachment
            let uid = uuidv4();
            uploadImageAsPromise(`agreements/${uid}.pdf`, pathpdf).then(
              (attachment) => {
                var bookingWithAttachment = checkoutObj.bookings.map(
                  (aBooking) => {
                    return {...aBooking, attachment: attachment};
                  },
                );
                checkout({
                  ...checkoutObj,
                  attachment: attachment,
                  bookings: bookingWithAttachment,
                });
              },
            );
          })
          .catch((err) => {
            dispatch(AppActions.loading(false));
            console.log('err', err);
          });
      })
      .catch((err) => {
        dispatch(AppActions.loading(false));
        console.log(err);
      });
  };

  const applyCouponPressed = () => {
    const matchingPromo = studio.selectedStudio.promo.find(
      (aPromo) => aPromo.code === promo,
    );

    if (matchingPromo) {
      setError('');
      var amount = 0;
      if (matchingPromo.discount_type === 'percentage') {
        amount =
          (matchingPromo.value / 100) *
          (studio.selectedStudio.price * totalSlots);
      } else {
        amount = matchingPromo.value * totalSlots;
      }
      setDiscount(amount);
      applyCoupon(!couponApplied);
      setFirebaseBookings(
        firebaseBookings.map((item) =>
          Object.assign({}, item, {
            promo: matchingPromo,
            discount: amount / totalSlots,
          }),
        ),
      );
    } else {
      setError('Please enter correct promo code');
    }
  };

  const continueToPayment = () => {
    navigation.navigate('RentalAgreement', {});
  };

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

  return (
    <Container style={styles.container}>
      <SectionHeader title="Booking Details" />
      <Content>
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
        {/* <View style={styles.viewContainer}>
          <View style={styles.left}>
            <LargeText bold textStyle={styles.margin}>
              Studio Engineer
            </LargeText>
            <MediumText textStyle={styles.margin}>{engDates}</MediumText>
          </View>
          <View style={styles.right}>
            <MediumText textStyle={styles.margin}>
              ${studio.selectedStudio.engineerPrice}/Session
            </MediumText>
            <MediumText bold textStyle={styles.margin}>
              Total
            </MediumText>
            <RegularText bold>
              {studio.selectedStudio.engineerPrice * totalEngSlots}
            </RegularText>
          </View>
        </View> */}
        <View style={styles.lightViewContainer}>
          <View style={styles.left}>
            <LargeText bold textStyle={styles.margin}>
              Fees
            </LargeText>
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
            <SmallText bold textStyle={styles.margin}>
              ${fees(studio.selectedStudio.price * totalSlots)}
            </SmallText>
            <RegularText bold textStyle={styles.margin}>
              ${memfees(studio.selectedStudio.price * totalSlots)}
            </RegularText>
            {couponApplied && (
              <>
                <RegularText>-{discount}</RegularText>
                <RegularText bold>${total - discount}</RegularText>
              </>
            )}
          </View>
        </View>
        {!couponApplied && (
          <>
            <View style={styles.btnContainer}>
              <TextField
                placeHolder="Got a Coupon?"
                containerStyle={{flex: 1}}
                onChangeText={(text) => {
                  onChangePromo(text);
                  setError('');
                }}
              />
              <SolidButton
                title="Apply"
                buttonStyle={styles.acceptButtonStyle}
                onPress={applyCouponPressed}
              />
            </View>
            <SmallText textStyle={styles.error} bold>
              {error}
            </SmallText>
          </>
        )}
        <SolidButton
          title="Pay & Book"
          buttonStyle={styles.declineButtonStyle}
          onPress={continueToPayment}
        />
      </Content>
    </Container>
  );
};

export default ApplyCoupon;
