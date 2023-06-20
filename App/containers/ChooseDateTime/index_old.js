import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SectionList, Text, View, Alert} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from '../MyBooking/reducer';
import {GlobalStyle, Images} from '@common';
import {SolidButton} from '@Buttons';
import {LargeText, RegularText} from '@Typography';
import DateModal from '../../components/DateModal';
import TimeModal from '../../components/TimeModal';
import StudioItem from '../../components/StudioItem';
import moment from 'moment';
import styles from './styles';

const ChooseDateTime = ({navigation}) => {
  const studio = useSelector((state) => state.studio);
  const user = useSelector((state) => state.user);
  const booking = useSelector((state) => state.booking);

  const [date, setDate] = useState(moment());
  const [needEngineer, setNeedEngineer] = useState(false);
  const [time, setTime] = useState('');

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

  const getBookingTimeStatus = () => {
    const bookedOn = booking.studioBookings;
    const found = bookedOn.find((element) => element.date === date.format());
    if (found) {
      return found.time;
    }
    return null;
  };

  const bookNow = () => {
    if (time === '') {
      Alert.alert('Please select Date and time slot to continue booking');
      return;
    }
    dispatch(Actions.setTermsAccepted(false));

    dispatch(
      Actions.setNewBooking({
        bookingId: `${Date.now()}`,
        studioId: studio.selectedStudio.docId,
        userId: user.uid,
        date: date.format(),
        time: time,
        needEngineer: needEngineer,
      }),
    );
    navigation.navigate('ApplyCoupon');
  };

  return (
    <Container style={styles.container}>
      <View style={styles.redContainer}>
        <DateModal
          date={date}
          bookedStudioDates={getBookingDateStatus()}
          dateSelected={(selectedDate) => setDate(selectedDate)}
        />
        <TimeModal
          disableTimeSlot={getBookingTimeStatus()}
          timeSelected={(timeSelected) => {
            setNeedEngineer(timeSelected.needEngineer);
            setTime(timeSelected.time);
          }}
        />
      </View>
      <View style={styles.blackContainer}>
        <StudioItem
          profileImage={studio.selectedStudio.banner}
          title={studio.selectedStudio.title}
          subtitle={studio.selectedStudio.location}
        />
        <SolidButton
          title="Book Now"
          buttonStyle={styles.bookButtonStyle}
          onPress={bookNow}
        />
      </View>
    </Container>
  );
};

export default ChooseDateTime;
