import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from '../MyBooking/reducer';
import {GlobalStyle, Colors, Images} from '@common';
import {SolidButton} from '@Buttons';
import {MediumText, RegularText, SmallText, LargeText} from '@Typography';
import InfoModal from '../../components/InfoModal';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import {Icon} from 'react-native-elements';

import moment from 'moment';
import styles from './styles';
import {Calendar} from 'react-native-calendars';

const BookingText1 =
  'We offer two set 12 hour session blocks per day in all rooms. 8AM to 8PM or 8PM to 8AM. RecordBook staff will use the first and last fifteen minutes of every session block to prepare the studio for the next reservation.';
const BookingText2 =
  'If you’d like to hire one of our audio engineers there is an additional $30/hr fee with a minimum of 4hrs. Once booking payment is finalized upon checkout, we will assign you with a RecordBook audio engineer for your session and send you a confirmation message with all the details!';

const SelectBookingDateTime = ({navigation}) => {
  const studio = useSelector((state) => state.studio);
  const user = useSelector((state) => state.user);

  const [date, setDate] = useState(new Date());
  const [initiateBookings, setInitiatedBookings] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [engineer, setEngineer] = useState(false);
  const [dayTimeSlot, onChangeDayTimeSlot] = useState(false);

  const [nightTimeSlot, onChangeNightTimeSlot] = useState(false);

  const booking = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getStudioBookings(studio.selectedStudio.docId));
  }, []);

  const getBookingDateStatus = () => {
    const bookedOn = booking.studioBookings;
    return bookedOn.map((aBooking) => {
      return aBooking.date;
    });
  };

  const getMarkedDates = () => {
    var marker = {};
    // const red = {key: 'red', color: Colors.red, selectedDotColor: 'white'};
    // const red1 = {key: 'red1', color: Colors.red, selectedDotColor: 'white'};
    // const white = {
    //   key: 'white',
    //   color: Colors.white,
    //   selectedDotColor: 'white',
    // };
    // const white1 = {
    //   key: 'white1',
    //   color: Colors.white,
    //   selectedDotColor: 'white',
    // };

    initiateBookings.forEach((selectedDate) => {
      marker[selectedDate.date] = {
        selected: true,
        color: selectedDate.date === date ? Colors.tabBarColor : '#FAFAFA',
      };
    });

    let bookedStudioDates = getBookingDateStatus();
    // // Single Dot case
    // let findSingle = arr =>
    //   arr.filter(i => arr.filter(j => i === j).length === 1);
    // findSingle(bookedStudioDates).map(aDate => {
    //   var dateString = moment(aDate).format('YYYY-MM-DD');
    //   marker[dateString] = {
    //     marked: true,
    //     selected: date._i === dateString,
    //     dots: date._i === dateString ? [white] : [red],
    //   };
    //   return dateString;
    // });

    // two Dot case
    let findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    findDuplicates(bookedStudioDates).map((aDate) => {
      var dateString = moment(aDate).format('YYYY-MM-DD');
      marker[dateString] = {
        disabled: true,
        disableTouchEvent: true,
      };
      return dateString;
    });
    return marker;
  };

  const dateSelected = (day) => {
    console.log('selected day', day);

    const index = initiateBookings.findIndex(
      (obj) => obj.date === day.dateString,
    );
    if (index !== -1) {
      let arr = initiateBookings.filter((e) => e.date !== day.dateString);
      if (arr.count > 0) {
        setDate(arr[0].date);
      }
      setInitiatedBookings(arr);
    } else {
      var arr = [];
      if (date) {
        let aBooking = initiateBookings.find((e) => e.date === date._i);
        if (aBooking) {
          if (!aBooking.dayTimeSlot && !aBooking.nightTimeSlot) {
            arr = initiateBookings.filter((e) => e.date !== aBooking.date);
          } else {
            arr = initiateBookings;
          }
        } else {
          arr = initiateBookings;
        }
      }
      setDate(moment(day.dateString));
      resetTimeSelected();
      arr.push({
        date: day.dateString,
        dayTimeSlot: false,
        nightTimeSlot: false,
        needEngineer: false,
      });
      setInitiatedBookings(arr);
    }
  };

  ///////////////////////////// Time //////////////////////////////////////////

  const getBookingTimeStatus = () => {
    if (!date) {
      return null;
    }
    const bookedOn = booking.studioBookings;
    const found = bookedOn.find((element) => element.date === date._i);
    if (found) {
      return found.time;
    }
    return null;
  };

  const disableStatus = (slot) => {
    let disableTimeSlot = getBookingTimeStatus();
    if (disableTimeSlot) {
      if (slot === 'am') {
        return disableTimeSlot === '8:00 am - 8:00 pm';
      }
      if (slot === 'pm') {
        return disableTimeSlot === '8:00 pm - 8:00 am';
      }
      return false;
    }
    return false;
  };

  const setTimeSlot = (type) => {
    if (type === 'am') {
      onChangeDayTimeSlot(!dayTimeSlot);
    } else if (type === 'pm') {
      onChangeNightTimeSlot(!nightTimeSlot);
    }

    var foundIndex = initiateBookings.findIndex((x) => x.date === date._i);
    initiateBookings[foundIndex] = {
      date: date._i,
      dayTimeSlot: type === 'am' ? !dayTimeSlot : dayTimeSlot,
      nightTimeSlot: type === 'pm' ? !nightTimeSlot : nightTimeSlot,
      needEngineer: engineer,
    };
  };

  const resetTimeSelected = () => {
    onChangeDayTimeSlot(false);
    onChangeNightTimeSlot(false);
    setEngineer(false);
  };

  const setEngineerSlot = () => {
    setEngineer(!engineer);
    var foundIndex = initiateBookings.findIndex((x) => x.date === date._i);
    initiateBookings[foundIndex] = {
      date: date._i,
      dayTimeSlot: dayTimeSlot,
      needEngineer: !engineer,
      nightTimeSlot: nightTimeSlot,
    };
  };

  //////////////////////////// Process Booking ///////////////////////////////////////////

  const bookNow = () => {
    if (initiateBookings.length === 0) {
      Alert.alert('Please select Date and time slot to continue booking');
      return;
    }

    if (initiateBookings.length > 0) {
      let first = initiateBookings[0];
      if (!first.dayTimeSlot && !first.nightTimeSlot) {
        Alert.alert(
          'Please select time slot for selcted date to continue booking',
        );
        return;
      }
    }
    console.log('initiateBookings', initiateBookings);
    dispatch(Actions.setNewBookings(initiateBookings));
    navigation.navigate(user.admin ? 'ManualBooking' : 'ApplyCoupon');
  };

  const dismiss = () => {
    setShowModal(false);
  };

  const today = new Date();
  return (
    <Container style={styles.container}>
      <Content padder>
        <LargeText textStyle={styles.bookButtonStyle}>Choose Date</LargeText>
        <Calendar
          theme={{
            calendarBackground: Colors.tabBarColor,
            selectedDayTextColor: 'white',
            selectedDayBackgroundColor: Colors.red,
            selectedDotColor: Colors.red,
            todayTextColor: Colors.white,
            dayTextColor: '#d9e1e8',
            textDisabledColor: '#333',
            arrowColor: Colors.white,
            monthTextColor: Colors.white,
          }}
          markedDates={getMarkedDates()}
          minDate={today.setDate(today.getDate() - 1)}
          onDayPress={(day) => dateSelected(day)}
        />
        {date && (
          <>
            <View style={[styles.checkboxContainer, {marginLeft: 10}]}>
              <LargeText textStyle={styles.bookButtonStyle}>
                Choose Time Slot
              </LargeText>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  setModalText(BookingText1);
                  setShowModal(true);
                }}>
                <Image
                  source={Images.i_Icon}
                  resizeMode={'contain'}
                  style={[styles.i_Icon]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBoxTitle
                disable={disableStatus('am')}
                title="8 AM to 8 PM"
                checked={dayTimeSlot}
                onPress={() => setTimeSlot('am')}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBoxTitle
                disable={disableStatus('pm')}
                title="8 PM to 8 AM"
                checked={nightTimeSlot}
                onPress={() => setTimeSlot('pm')}
              />
            </View>
            <View style={[styles.checkboxContainer, {alignItem: 'center'}]}>
              <CheckBoxTitle
                title={
                  user.admin
                    ? 'Add Engineer Option'
                    : 'Would you like to hire an engineer?'
                }
                checked={engineer}
                onPress={setEngineerSlot}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalText(BookingText2);
                  setShowModal(true);
                }}>
                <Image
                  source={Images.i_Icon}
                  resizeMode={'contain'}
                  style={[styles.i_Icon, {marginLeft: -10}]}
                />
              </TouchableOpacity>
            </View>
            {engineer && !user.admin && (
              <MediumText>“Okay! We will contact you shortly!”</MediumText>
            )}
          </>
        )}
      </Content>
      <InfoModal
        visible={showModal}
        dismiss={() => setShowModal(false)}
        modalText={modalText}
      />

      <SolidButton
        title="Book Now"
        buttonStyle={styles.bookButtonStyle}
        onPress={bookNow}
      />
    </Container>
  );
};

export default SelectBookingDateTime;
