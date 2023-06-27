import React, { useEffect, useState, useLayoutEffect, useMemo } from 'react';
import { View, Alert } from 'react-native';

import { SolidButton } from '@Buttons';
import functions from '@react-native-firebase/functions';
import { LargeText, MediumText, RegularText, SmallText } from '@Typography';
import moment from 'moment';
import { Container, Content } from 'native-base';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import { Notifications } from 'react-native-notifications';
import { useDispatch, useSelector } from 'react-redux';
import AppActions from '../Root/reducer';
import UserActions from '../Profile/reducer';
import BookingActions from '../MyBooking/reducer';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';
import { uploadImageAsPromise, uuidv4 } from '../../utils/storage';
import TextInput from '../../components/TextInput';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import TopNav from '../../components/TopNav';
import { Icon } from 'react-native-elements';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import { isMidnightDealTime } from '../../utils/helper';
import { update } from 'seamless-immutable';

// Use a local emulator in development

if (__DEV__) {
  functions().useFunctionsEmulator('http://localhost:5001');
}

function getSessionTime(booking) {
  // if (booking.dayTimeSlot && booking.nightTimeSlot) {
  //   return '8 am - 8 am (All Day)';
  // } else if (booking.dayTimeSlot) {
  //   return '8 am - 8 pm (Day)';
  // } else if (booking.nightTimeSlot) {
  //   return '8 pm - 8 am (Night)';
  // }
  // else if (booking.morningSlot) {
  //   return '8 pm - 8 am (morning)';
  // }
  // else if (booking.eveningSlot) {
  //   return '2 pm - 8 pm (evening)';
  // }
  const sessionTimes = [];
  if (booking.dayTimeSlot) {
    sessionTimes.push('8am - 8pm (Day)');
  }
  if (booking.nightTimeSlot) {
    sessionTimes.push('8pm - 8am (Night)');
  }
  if (booking.morningSlot) {
    sessionTimes.push('8am - 12pm (Morning)');
  }
  if (booking.eveningSlot) {
    sessionTimes.push('2pm - 8pm (Afternoon)');
  }

  return sessionTimes;
}

const ConfirmPay = ({ navigation }) => {
  const dispatch = useDispatch();

  const studio = useSelector((state) => state.studio);
  const booking = useSelector((state) => state.booking);
  const user = useSelector((state) => state.user);

  const [promo, onChangePromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [ct, setCT] = useState(null);
  const [bookingDates, setBookingDates] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [engDates, setEngDates] = useState('');
  const [totalEngSlots, setTotalEngSlots] = useState('');
  const [total, setTotal] = useState(0);
  const [firebaseBookings, setFirebaseBookings] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState(0)
  const [isMidnight, setMidnight] = useState(false)

  // console.log('firebaseBookings', firebaseBookings);

  useEffect(() => {
    const midnight = isMidnightDealTime()
    setMidnight(midnight)
  }, [])
  useEffect(() => {
    if (isMidnight == true) {
      // if (studio.selectedStudio.twelveHrPrice == 200) {
      //   setUpdatedPrice(150)
      // }
      // else if (studio.selectedStudio.twelveHrPrice == 300) {
      //   setUpdatedPrice(200)
      // }
      // else {
      //   setUpdatedPrice(studio.selectedStudio.twelveHrPrice)
      // }
      setUpdatedPrice(studio.selectedStudio.dealPrice)
    }
    else {
      setUpdatedPrice(studio.selectedStudio.twelveHrPrice)
    }
  }, [isMidnight])
  useEffect(() => {
    console.log("updated price", updatedPrice);
    console.log("priceSessionBooking", priceSessionBooking);
  }, [updatedPrice])

  const { priceSessionBooking } = useMemo(() => {
    let price = 0;
    console.log("price", price);
    console.log("updatedPrice", updatedPrice);
    booking.newBookings?.forEach((booking) => {
      if (booking.dayTimeSlot && booking.nightTimeSlot) {
        price = price + (isMidnight == false ? Number(studio.selectedStudio.twelveHrPrice) : updatedPrice) * 2;
        return
      }
      if (booking.dayTimeSlot || booking.nightTimeSlot) {
        price = price + (isMidnight == false ? Number(studio.selectedStudio.twelveHrPrice) : updatedPrice);
        return
      }
      if (booking.morningSlot && booking.eveningSlot) {
        price = price + Number(studio.selectedStudio.sixHrPrice) * 2;
        return
      }
      if (booking.morningSlot || booking.eveningSlot) {
        price = price + Number(studio.selectedStudio.sixHrPrice);
        return
      }
      else {
        price = price + (isMidnight == false ? Number(studio.selectedStudio.twelveHrPrice) : updatedPrice);
      }
    });
    return { priceSessionBooking: price };
  }, [firebaseBookings, updatedPrice]);
  // const { priceSessionBooking } = useMemo(() => {
  //   let price = 0;
  //   console.log("price", price);
  //   console.log("updatedPrice", updatedPrice);
  //   firebaseBookings.forEach((booking) => {
  //     if (booking.dayTimeSlot && booking.nightTimeSlot) {
  //       price = price + Number(updatedPrice) * 2;
  //     }
  //     if (booking.morningSlot && booking.eveningSlot) {
  //       price = price + Number(updatedPrice) * 2;
  //     }
  //     else {
  //       price = price + Number(updatedPrice);
  //     }
  //   });
  //   return { priceSessionBooking: price };
  // }, [firebaseBookings, updatedPrice]);
  // useLayoutEffect(() => {
  //   console.log(booking.termsAccepted);
  //   if (booking.termsAccepted) {
  //     setTimeout(() => {
  //       initiatePayment();
  //     }, 3000);
  //   }
  // }, [booking.termsAccepted]);

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
    let allDateText = '';
    let allEngineerDateText = '';
    let slots = 0;
    let engSlots = 0;
    booking.newBookings.forEach((aNewBooking, index) => {
      let timeString = '';
      if (aNewBooking.dayTimeSlot) {
        timeString = timeString + `8:00am - 8:00pm ${'\n'}`;
        slots = slots + 1;
      }
      if (aNewBooking.nightTimeSlot) {
        timeString = timeString + `8:00pm - 8:00am ${'\n'}`;
        slots = slots + 1;
      }
      if (aNewBooking.morningSlot) {
        timeString = timeString + `8:00am - 2:00pm ${'\n'}`;
        slots = slots + 1;
      }
      if (aNewBooking.eveningSlot) {
        timeString = timeString + `2:00pm - 8:00pm ${'\n'}`;
        slots = slots + 1;
      }

      allDateText =
        allDateText +
        `${moment(aNewBooking.date).format(
          'ddd, MMM Do YYYY',
        )}\n${timeString}\n`;
      setBookingDates(allDateText);
      setTotalSlots(slots);

      let engString = '';
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
      updatedPrice * slots,
    );
  }, []);

  const createBooking = (aBooking, index) => {
    console.log("all bookings", aBooking);
    const fbBookings = [];
    if (aBooking.dayTimeSlot) {
      fbBookings.push({
        bookingId: `day${Date.now() + index}`,
        studioId: studio.selectedStudio.docId,
        userId: user.uid,
        date: aBooking.date,
        time: '8:00am - 8:00pm',
        needEngineer: aBooking.needEngineer,
        price: updatedPrice,
        engineerPrice: aBooking.nightEngineer
          ? studio.selectedStudio.engineerPrice
          : 0,
        discount: 0,
        amount:
          parseInt(updatedPrice) +
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
        time: '8:00pm - 8:00am',
        needEngineer: aBooking.needEngineer,
        price: updatedPrice,
        engineerPrice: aBooking.nightEngineer
          ? studio.selectedStudio.engineerPrice
          : 0,
        discount: 0,
        amount:
          parseInt(updatedPrice) +
          (aBooking.nightEngineer
            ? parseInt(studio.selectedStudio.engineerPrice)
            : 0),
      });
    }
    if (aBooking.morningSlot) {
      fbBookings.push({
        bookingId: `day${Date.now() + index}`,
        studioId: studio.selectedStudio.docId,
        userId: user.uid,
        date: aBooking.date,
        time: '8:00am - 2:00pm',
        needEngineer: aBooking.needEngineer,
        price: updatedPrice / 2,
        engineerPrice: aBooking.nightEngineer
          ? studio.selectedStudio.engineerPrice
          : 0,
        discount: 0,
        amount:
          parseInt(updatedPrice / 2) +
          (aBooking.nightEngineer
            ? parseInt(studio.selectedStudio.engineerPrice)
            : 0),
      });
    }
    if (aBooking.eveningSlot) {
      fbBookings.push({
        bookingId: `day${Date.now() + index}`,
        studioId: studio.selectedStudio.docId,
        userId: user.uid,
        date: aBooking.date,
        time: '2:00pm - 8:00pm',
        needEngineer: aBooking.needEngineer,
        price: updatedPrice / 2,
        engineerPrice: aBooking.nightEngineer
          ? studio.selectedStudio.engineerPrice
          : 0,
        discount: 0,
        amount:
          parseInt(updatedPrice / 2) +
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
      })
      .catch((err) => {
        dispatch(AppActions.loading(false));
        console.log(err);
        Alert.alert('', JSON.stringify(err));
      })
      .finally(() => {
        navigation.replace('PaymentSuccessful', { bookings: booking.bookings });
      });
  };

  const initiatePayment = async () => {
    // if (!ct) {
    // if (studio.selectedStudio.promo !== undefined) {
    //   try {
    //     const matchingPromo = studio?.selectedStudio?.promo?.find((aPromo) => aPromo?.code === promo);
    //     const docId = studio.selectedStudio.docId;
    //     const docRef = firestore().collection('Studio').doc(docId);

    //     if (matchingPromo !== undefined) {
    //       const snapshot = await docRef.get();
    //       const matchingPromoCode = snapshot.data().promo.find((el) => el?.code === promo);

    //       if (matchingPromoCode.hasOwnProperty('singleUserOneTmPromo')) {
    //         const snapshot = await docRef.get();
    //         const promoArray = snapshot.data().promo;
    //         const index = promoArray.findIndex((el) => el.singleUserOneTmPromo && !el.used);

    //         if (index !== -1) {
    //           promoArray[index] = { ...promoArray[index], used: true };
    //           await docRef.update({ promo: promoArray });
    //           alert('singleUser coupon has been successfully applied');
    //           setError('');
    //           let amount = 0;

    //           if (matchingPromoCode.discount_type === 'percentage') {
    //             amount = (matchingPromoCode.value / 100) * priceSessionBooking;
    //           } else {
    //             amount = matchingPromoCode.value * totalSlots;
    //           }

    //           setDiscount(amount);
    //         } else {
    //           setError("This coupon was one-time, it has already been used!");
    //         }
    //       } else {
    //         if (matchingPromoCode.hasOwnProperty('usedBy')) {
    //           const alreadyUsed = matchingPromoCode.usedBy.some((element) => element.user === user.docId);

    //           if (alreadyUsed) {
    //             setError("You have used this coupon before");
    //             return;
    //           } else {
    //             matchingPromoCode.usedBy.push({ user: user.docId });
    //           }
    //         } else {
    //           alert("promo successfully applied");
    //           matchingPromoCode.usedBy = [{ user: user.docId }];
    //         }

    //         await docRef.update({ promo: snapshot.data().promo });
    //         console.log('UsedBy key added in Firestore.');
    //       }
    //     } else {
    //       alert("No promo used, navigate to the payment method");
    //       setDiscount(0);
    //     }
    //   } catch (error) {
    //     console.error('Error applying promo:', error);
    //   }
    //   return;
    // }
    if (studio.selectedStudio.promo !== undefined) {
      try {
        const matchingPromo = studio?.selectedStudio?.promo?.find((aPromo) => aPromo?.code === promo);
        const docId = studio.selectedStudio.docId;
        const docRef = firestore().collection('Studio').doc(docId);

        if (matchingPromo !== undefined) {
          const snapshot = await docRef.get();
          const matchingPromoCode = snapshot.data().promo.find((el) => el?.code === promo);

          if (matchingPromoCode.hasOwnProperty('singleUserOneTmPromo')) {
            const snapshot = await docRef.get();
            const promoArray = snapshot.data().promo;
            const index = promoArray.findIndex((el) => el.singleUserOneTmPromo && !el.used);

            if (index !== -1) {
              promoArray[index] = { ...promoArray[index], used: true };
              await docRef.update({ promo: promoArray });
              alert('singleUser coupon has been successfully applied');
              setError('');
              let amount = 0;

              if (matchingPromoCode.discount_type === 'percentage') {
                amount = (matchingPromoCode.value / 100) * priceSessionBooking;
              } else {
                amount = matchingPromoCode.value * totalSlots;
              }

              setDiscount(amount);
            } else {
              setError("This coupon was one-time, it has already been used!");
              setDiscount(0)
            }
          } else {
            if (matchingPromoCode.hasOwnProperty('usedBy')) {
              const alreadyUsed = matchingPromoCode.usedBy.some((element) => element.user === user.docId);

              if (alreadyUsed) {
                setError("You have used this coupon before");
                return;
              } else {
                matchingPromoCode.usedBy.push({ user: user.docId });
              }
            } else {
              alert("promo successfully applied");
              matchingPromoCode.usedBy = [{ user: user.docId }];
            }

            await docRef.update({ promo: snapshot.data().promo });
            console.log('UsedBy key added in Firestore.');
          }
        } else {
          alert("No promo used, navigate to the payment method");
          setDiscount(0);
        }
      } catch (error) {
        console.error('Error applying promo:', error);
      }
      return;
    }
    // }
    // const orderTotal = memfees(total - discount);
    // BraintreeDropIn.show({
    //   clientToken: ct,
    //   merchantIdentifier: 'merchant.com.hithouseStudios.app.debug',
    //   //merchantIdentifier: 'merchant.com.recordBook.ios.release',
    //   googlePayMerchantId: 'googlePayMerchantId',
    //   countryCode: 'US', //apple pay setting
    //   currencyCode: 'USD', //apple pay setting
    //   merchantName: studio.selectedStudio.title,
    //   orderTotal: orderTotal.toString(),
    //   googlePay: true,
    //   applePay: true,
    //   venmo: true,
    //   vaultManager: true,
    //   darkTheme: true,
    // })
    //   .then((result) => {
    //     dispatch(AppActions.loading(true));
    //     const CheckoutObj = {
    //       amount: orderTotal,
    //       bookings: firebaseBookings,
    //       paymentMethodNonce: result.nonce,
    //       paymentMethod: result.type,
    //     };
    //     sendSignature(CheckoutObj);
    //     dispatch(BookingActions.setTermsAccepted(false));
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     dispatch(BookingActions.setTermsAccepted(false));
    //     if (error.code === 'USER_CANCELLATION') {
    //       // update your UI to handle cancellation
    //     } else {
    //       // update your UI to handle other errors
    //     }
    //   });
    sendSignature({ amout: memfees(total - discount) })
  };

  const sendSignature = (checkoutObj) => {
    // Custom API call this tasendSkes user information and signature.png and convert it in to
    // Signed agreement .

    dispatch(AppActions.loading(true));
    const path = RNFS.TemporaryDirectoryPath + 'signature.png';
    const pathpdf = RNFS.TemporaryDirectoryPath + 'signature.pdf';
    let date = '',
      dayTimeSlot = true;
    // if (Array.isArray(booking.newBookings)) {
    //   if (booking.newBookings.length > 0) {
    //     date = booking.newBookings[0].date;
    //     dayTimeSlot = booking.newBookings[0].dayTimeSlot;
    //     console.log("checkslots",dayTimeSlot);
    //   }
    // }
    let slots = {}
    if (Array.isArray(booking.newBookings)) {
      if (booking.newBookings.length > 0) {
        date = booking.newBookings[0].date;
        slots = booking.newBookings[0];
      }
    }
    console.log("slots", slots);
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
      // slot: dayTimeSlot ? '8am-8pm' : '8pm-8am',
      slot: "",
      booking_dates: firebaseBookings.map((aBooking) => {
        return {
          date: aBooking.date,
          slot: aBooking.time,
        };
      }),
    };

    if (slots.dayTimeSlot) {
      params.slot = "8am - 8pm";
    }

    if (slots.nightTimeSlot) {
      params.slot = params.slot ? params.slot + ", 8pm - 8am" : "8pm - 8am";
    }

    if (slots.morningSlot) {
      params.slot = params.slot ? params.slot + ", 8am - 2pm" : "8am - 2pm";
    }

    if (slots.eveningSlot) {
      params.slot = params.slot ? params.slot + ", 2pm - 8pm" : "2pm - 8pm";
    }

    console.log('checkoutObj params', params);

    // RNFetchBlob.config({ trusty: true })
    //   .fetch(
    //     'POST',
    //     'https://recordbook.live/pdf',
    //     {
    //       responseType: 'blob',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     [
    //       { name: 'params', data: JSON.stringify(params) },
    //       {
    //         name: 'sign',
    //         filename: 'signature.png',
    //         type: 'image/png',
    //         data: RNFetchBlob.wrap(path),
    //       },
    //     ],
    //   )
    //   .then((res) => {
    //     console.log('checkoutObj res', res);

    //     // Singed rental agreement saved in pathpdf folder .
    //     RNFS.writeFile(pathpdf, res.data, 'base64')
    //       .then((success) => {
    //         console.log('success', success);
    //         // upload pdf to storage
    //         ///get download url
    //         //save download url to firestore
    //         //email with attachment
    //         let uid = uuidv4();
    //         uploadImageAsPromise(`agreements/${uid}.pdf`, pathpdf)
    //           .then((attachment) => {
    //             const bookingWithAttachment = checkoutObj.bookings.map(
    //               (aBooking) => {
    //                 return { ...aBooking, attachment: attachment };
    //               },
    //             );
    //             checkout({
    //               ...checkoutObj,
    //               attachment: attachment,
    //               bookings: bookingWithAttachment,
    //             });
    //           })
    //           .catch(() => {
    //             const bookingWithAttachment = checkoutObj.bookings.map(
    //               (aBooking) => {
    //                 return { ...aBooking, attachment: null };
    //               },
    //             );
    //             checkout({
    //               ...checkoutObj,
    //               attachment: null,
    //               bookings: bookingWithAttachment,
    //             });
    //           });
    //       })
    //       .catch((err) => {
    //         dispatch(AppActions.loading(false));
    //         console.log('err', err);
    //       });
    //   })
    //   .catch((err) => {
    //     dispatch(AppActions.loading(false));
    //     console.log('POST', err);
    //   });
  };

  // Function to check promo code validity
  function isPromoCodeValid(valid_until) {
    const currentDate = new Date();
    const validUntilDate = valid_until
    console.log("unitilll", validUntilDate);
    console.log("current date", currentDate);
    // Compare the current date with the valid_until date
    if (currentDate <= validUntilDate) {
      return true;
    } else {
      return false;
    }
  }
  const applyCouponPressed = async () => {
    setDisableButton(false)
    // check if singleonetime exist or not if yes then go down 
    if (studio.selectedStudio.promo !== undefined) {
      const matchingPromo = studio?.selectedStudio?.promo?.find(
        (aPromo) => aPromo.code === promo,
      );
      const isValid = isPromoCodeValid(new Date(matchingPromo?.valid_until))
      // console.log("singleuseronetime coupon", matchingPromo.hasOwnProperty('singleUserOneTmPromo'));
      console.log("singleuseronetime coupon", matchingPromo);

      if (matchingPromo) {
        if (isValid) {
          //is it singleuser onetime coupon?
          if (matchingPromo.hasOwnProperty('singleUserOneTmPromo')) {
            const docId = studio.selectedStudio.docId;
            const docRef = firestore().collection('Studio').doc(docId);
            docRef
              .get()
              .then((snapshot) => {
                const promoArray = snapshot.data().promo;
                const index = promoArray.findIndex((el) => el.singleUserOneTmPromo && !el.used);
                if (index !== -1) {
                  // promoArray[index] = { ...promoArray[index], used: true };
                  // Update the document in the database with the modified promo array
                  // docRef.update({ promo: promoArray });

                  setError('');
                  let amount = 0;
                  if (matchingPromo.discount_type === 'percentage') {
                    amount =
                      (matchingPromo.value / 100) *
                      (priceSessionBooking);
                  } else {
                    amount = matchingPromo.value * totalSlots;
                  }
                  setDiscount(amount);
                } else {
                  setError("This coupon was one-time, it has already been used!");
                  setDiscount(0)
                }
              });
          }

          else {
            setError('');
            let amount = 0;
            if (matchingPromo.discount_type === 'percentage') {
              amount =
                (matchingPromo.value / 100) *
                (priceSessionBooking);
            } else {
              amount = matchingPromo.value * totalSlots;
            }
            console.log("data after afternoon", matchingPromo.value, totalSlots);
            setDiscount(amount);
          }
          // setFirebaseBookings(
          //   firebaseBookings.map((item) =>
          //     Object.assign({}, item, {
          //       promo: matchingPromo,
          //       discount: amount / totalSlots,
          //     }),
          //   ),
          // );
        }
        else {
          setError('This promo code has expired.');
          setDisableButton(true)
          setDiscount(0)
        }
      } else {
        setDiscount(0);
        if (promo.length) {
          setDisableButton(true)
          setError('Please enter correct promo code')
        }
      }

      // Onetimesingle user coupon
      // const docId = studio.selectedStudio.docId;
      // const docRef = firestore().collection('Studio').doc(docId);
      // docRef
      //   .get()
      //   .then((snapshot) => {
      //     const promoArray = snapshot.data().promo;
      //     const index = promoArray.findIndex((el) => el.singleUserOneTmPromo && !el.used);
      //     if (index !== -1) {
      //       promoArray[index] = { ...promoArray[index], used: true };
      //       // Update the document in the database with the modified promo array
      //       docRef.update({ promo: promoArray });
      //     } else {
      //       setError("This coupon was one-time, it has already been used!");
      //     }
      //     // Rest of your code...
      //   });
    }
    else {
      //when no promo craeted by the admin
      if (promo.length) {
        setDisableButton(true)
        setError('Please enter correct promo code')
      }
      setDiscount(0);
    }

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
    <View style={styles.container}>
      <TopNav showBack title={'Confirm & Pay'} />
      <View style={styles.indicatorView}>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{ flex: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <Content>
          <View style={styles.titleView}>
            <View style={styles.titleWrapper}>
              <RegularText bold>{studio.selectedStudio.title}</RegularText>
              <View style={styles.subTextView}>
                <Icon
                  name="location"
                  type={'ionicon'}
                  color={colors.skyBlue02}
                  size={14}
                />
                <SmallText textStyle={styles.subTextStyle}>
                  {studio.selectedStudio.location}
                </SmallText>
              </View>
            </View>

            <FastImage
              style={styles.image}
              source={{
                uri: studio.selectedStudio.banner,
                priority: FastImage.priority.normal,
              }}
            />
          </View>

          <View style={styles.bodyView}>
            <RegularText bold>Your Booking</RegularText>
            <View key={booking.date} style={{ flexDirection: 'row' }}>
              <MediumText bold textStyle={styles.dateText}>
                Date
              </MediumText>
              <MediumText bold textStyle={styles.dateText}>
                Time
              </MediumText>
            </View>
            {
              booking.newBookings.map((booking) => (
                <View
                  key={booking.date}
                  style={{ flexDirection: 'row', marginTop: 4 }}>
                  <MediumText textStyle={{ flex: 1 }}>
                    {moment(booking.date).format('ddd MMM DD, YYYY')}
                  </MediumText>
                  <MediumText textStyle={{ flex: 1 }}>
                    {getSessionTime(booking).map((time, index) => (
                      <React.Fragment key={index}>
                        {time}
                        {'\n'}
                      </React.Fragment>
                    ))}
                  </MediumText>
                  {/* <MediumText textStyle={{ flex: 1 }}>
                  {getSessionTime(booking)}
                </MediumText> */}
                </View>
              ))}
          </View>

          <View style={styles.bodyView}>
            <RegularText bold>Pricing Details</RegularText>
            <View style={styles.sessionView}>
              <MediumText>{studio.selectedStudio.title}</MediumText>
              <MediumText>${priceSessionBooking}</MediumText>
            </View>
            {discount > 0 && (
              <View style={styles.sessionView}>
                <MediumText>Discount</MediumText>
                <MediumText>${discount}</MediumText>
              </View>
            )}

            <View style={styles.sessionView}>
              <MediumText>Fees</MediumText>
              <MediumText>${fees(priceSessionBooking - discount)}</MediumText>
            </View>

            <View style={styles.totalView}>
              <LargeText bold>Total</LargeText>
              <LargeText bold>
                ${memfees(priceSessionBooking - discount)}
              </LargeText>
            </View>
          </View>

          <View style={[styles.bodyView, { marginBottom: 8 }]}>
            <RegularText bold>Add Promo Code</RegularText>
            <TextInput
              style={{ marginTop: 16 }}
              placeholder={'Enter Promo Code'}
              value={promo}
              onChangeText={(text) => {
                onChangePromo(text);
                setError('');
              }}
              onBlur={applyCouponPressed}
              error={error}
              autoCapitliz={'none'}
            />
          </View>

          {
            !disableButton &&
            <View style={styles.bodyView}>
              <SolidButton
                title={'Confirm Booking & Pay'}
                onPress={initiatePayment}
              />
            </View>
          }
        </Content>
      </LinearGradient>
    </View>
  );
};

export default ConfirmPay;
