import React, {useMemo} from 'react';
import {Alert, FlatList, View} from 'react-native';
import BookingItem from '../../components/BookingItem';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Actions from './reducer';
import {useNavigation} from '@react-navigation/native';

const RenderItem = ({item, onBookingPressed, deleteBookingPressed}) => {
  const studio = useSelector((state) => state.studio);
  const associatedStudio = studio.studios.find(
    (aStudio) => aStudio.docId === item.studioId,
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

function List({upcoming}) {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const navigation = useNavigation();

  const list = useMemo(() => {
    console.log('booking', booking);
    const bookingList = booking.myBookings.find((b) => {
      if (upcoming) {
        return b.title === 'List bookings';
      } else {
        return b.title === 'Past bookings';
      }
    });
    console.log('bookingList', bookingList);
    return bookingList?.data ?? [];
  }, [booking.myBookings, upcoming]);

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
  return (
    <View>
      <FlatList
        keyExtractor={(k) => String(upcoming) + k.bookingId}
        data={list}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            onBookingPressed={onBookingPressed}
            deleteBookingPressed={deleteBookingPressed}
          />
        )}
      />
    </View>
  );
}

export default List;
