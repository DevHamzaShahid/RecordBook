import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {GlobalStyle} from '../../common';
import RenderStudiosItem from './RenderStudiosItem';
import hitHouseApi from '../../services/hitHouseApi';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

function Tomorrow(props) {
  const studio = useSelector((state) => state.studio);

  const [bookings, setBooking] = useState([]);
  const fetch = useCallback(() => {
    const func = async () => {
      const b = await hitHouseApi.getBookings();
      if (b?.length > 0) {
        const bookingsForDate = b.filter((booking) =>
          moment().add(1, 'days').isSame(booking.date, 'day'),
        );

        const dateCollection = bookingsForDate.map((booking) => {
          return booking.studioId;
        });

        let fullyBookedStudioIds = [];
        let findDuplicates = (arr) =>
          arr.filter((item, index) => arr.indexOf(item) !== index);
        findDuplicates(dateCollection).map((aStudio) => {
          fullyBookedStudioIds.push(aStudio);
        });
        setBooking(fullyBookedStudioIds);
      }
    };
    func().catch();
  }, []);

  useFocusEffect(fetch);

  return (
    <FlatList
      style={styles.container}
      data={studio.studios.filter((s) => !bookings.includes(s.docId))}
      renderItem={({item}) => <RenderStudiosItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
});
export default Tomorrow;
