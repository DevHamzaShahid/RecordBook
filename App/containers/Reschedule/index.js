import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Alert} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from '../MyBooking/reducer';
import {Colors} from '@common';
import {SolidButton} from '@Buttons';
import {LargeText} from '@Typography';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import functions from '@react-native-firebase/functions';
import moment from 'moment';
import styles from './styles';
import {Calendar} from 'react-native-calendars';

const Reschedule = ({navigation}) => {
  const studio = useSelector(state => state.studio);
  const user = useSelector(state => state.user);
  const booking = useSelector(state => state.booking);
  const [date, setDate] = useState(booking.selectedBooking.date);
  const [dayTimeSlot, onChangeDayTimeSlot] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getStudioBookings(studio.selectedStudio.docId));
  }, []);

  const rescheduleNow = () => {
    if (dayTimeSlot == undefined) {
      Alert.alert('Please select Date and time slot to reschedule.');
      return;
    }
    const newtime = dayTimeSlot ? '8:00 am - 8:00 pm' : '8:00 pm - 8:00 am';
    Alert.alert(
      `You have rescheduled session from ${moment(
        booking.selectedBooking.date,
      ).format('DD:MM:YY')} - ${booking.selectedBooking.time}  to  ${moment(
        date,
      ).format('DD:MM:YY')} - ${newtime}`,
    );
    dispatch(
      Actions.updateBooking(
        {
          docId: booking.selectedBooking.docId,
          date: date,
          time: newtime,
        },
        user.admin,
      ),
    );
    functions().httpsCallable('sendNotifications')({
      user_name: user.full_name,
      tokens: user.adminDetail.fcmToken,
      text: `${user.full_name}  has rescheduled their session from ${moment(
        booking.selectedBooking.date,
      ).format('DD:MM:YY')} - ${booking.selectedBooking.time}  to  ${moment(
        date,
      ).format('DD:MM:YY')} - ${newtime}`,
    });
  };

  const getBookingDateStatus = () => {
    const bookedOn = booking.studioBookings;
    return bookedOn.map(aBooking => {
      return aBooking.date;
    });
  };

  const getMarkedDates = () => {
    var marker = {};
    marker[date] = {
      selected: true,
    };
    let bookedStudioDates = getBookingDateStatus();
    // two Dot case
    let findDuplicates = arr =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    findDuplicates(bookedStudioDates).map(aDate => {
      var dateString = moment(aDate).format('YYYY-MM-DD');
      marker[dateString] = {
        disabled: true,
        disableTouchEvent: true,
      };
      return dateString;
    });
    return marker;
  };

  const dateSelected = day => {
    console.log('selected day', day);
    setDate(day.dateString);
    resetTimeSelected();
  };

  ///////////////////////////// Time //////////////////////////////////////////

  const getBookingTimeStatus = () => {
    if (!date) {
      return null;
    }
    const bookedOn = booking.studioBookings;
    const found = bookedOn.find(element => element.date === date);
    if (found) {
      return found.time;
    }
    return null;
  };

  const disableStatus = slot => {
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

  const setTimeSlot = type => {
    if (!disableStatus(type)) {
      onChangeDayTimeSlot(type === 'am');
    }
  };

  const resetTimeSelected = () => {
    onChangeDayTimeSlot(undefined);
  };

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
          minDate={new Date()}
          current={date}
          onDayPress={day => dateSelected(day)}
        />
        {date && (
          <>
            <LargeText textStyle={styles.bookButtonStyle}>
              Choose Time Slot
            </LargeText>
            <View style={styles.checkboxContainer}>
              <CheckBoxTitle
                disable={disableStatus('am')}
                title="8 AM to 8 PM"
                checked={dayTimeSlot == undefined ? false : dayTimeSlot}
                onPress={() => setTimeSlot('am')}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBoxTitle
                disable={disableStatus('pm')}
                title="8 PM to 8 AM"
                checked={dayTimeSlot == undefined ? false : !dayTimeSlot}
                onPress={() => setTimeSlot('pm')}
              />
            </View>
          </>
        )}
      </Content>
      <SolidButton
        title="Reschedule Now"
        buttonStyle={styles.bookButtonStyle}
        onPress={rescheduleNow}
      />
    </Container>
  );
};

export default Reschedule;
