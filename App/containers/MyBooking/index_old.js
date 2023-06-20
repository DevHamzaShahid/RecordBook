import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SectionList, Alert} from 'react-native';
import {Container} from 'native-base';
import {GlobalStyle} from '@common';
import Actions from './reducer';
import SectionHeader from '../../components/SectionHeader';
import BookingItem from '../../components/BookingItem';
import ListHeader from '../../components/ListHeader';
import EmptyComponent from '../../components/EmptyComponent';
import moment from 'moment';

import styles from './styles';

const MyBooking = ({navigation}) => {
  const dispatch = useDispatch();
  const booking = useSelector(state => state.booking);
  const studio = useSelector(state => state.studio);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(Actions.getBookings());
    });
    return unsubscribe;
  }, [navigation]);

  const keyExtractor = k => k.bookingId;

  const onBookingPressed = (item, associatedStudio) => {
    dispatch(
      Actions.setSelectedBooking({
        ...item,
        associatedStudio: associatedStudio,
      }),
    );
    navigation.navigate('BookingDetail');
  };

  const deleteBookingPressed = (item) => {
    let today = moment();
    let bookingDate = moment(item.date);
    if (bookingDate.diff(today, 'days') > 2) {
      dispatch(Actions.deleteBooking(item, false, false));
    } else {
      Alert.alert(
        'The bookings can only be canceled before 2 days of booking date.',
      );
    }
  };

  const renderItem = ({item}) => {
    const associatedStudio = studio.studios.find(
      aStudio => aStudio.docId === item.studioId,
    );
    return (
      <BookingItem
        item={item}
        banner={associatedStudio.banner}
        studio={associatedStudio}
        onPress={() => onBookingPressed(item, associatedStudio)}
        onPressDelete={() => deleteBookingPressed(item)}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <SectionHeader title="My Bookings" />
      <SectionList
        contentContainerStyle={GlobalStyle.style.flatListStyle}
        sections={booking.myBookings}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <ListHeader title={title} />
        )}
        ListEmptyComponent={<EmptyComponent title="You have no bookings" />}
      />
    </Container>
  );
};

export default MyBooking;
