import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import Actions, { booking } from '../MyBooking/reducer';
import { GlobalStyle, Colors } from '@common';
import ProfileActions from '../Profile/reducer';
import EmptyComponent from '../../components/EmptyComponent';
import AdminBookingItem from '../../components/AdminBookingItem';
import SwipeCellButton from '../../components/SwipeCellButton';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './styles';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import SectionHeader from '../../components/SectionHeader';
import FilterStudioModal from '../../components/FilterStudioModal';

const ManageBooking = ({ navigation }) => {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.booking.bookings);
  const bookingDeleted = useSelector(state => state.booking.bookingDeleted);
  const studio = useSelector(state => state.studio);
  const user = useSelector(state => state.user);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFilter, setShowFilter] = useState(false);
  const [filteredStudio, setFilteredStudios] = useState([]);

  useEffect(() => {
    dispatch(ProfileActions.getAllUsers());
  }, []);

  useEffect(() => {
    if (bookingDeleted) {
      refreshDatasoruce(selectedDate);
      dispatch(Actions.setBookingDeleted(false));
    }
  }, [bookingDeleted]);

  useEffect(() => {
    refreshDatasoruce(selectedDate);
  }, [filteredStudio]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(Actions.getBookingsForAdmin());
    });
    return unsubscribe;
  }, [navigation]);

  const getBookingDateStatus = () => {
    if (filteredStudio.length > 0) {
      var filterdBookings = bookings.filter(aBooking => {
        const found = filteredStudio.find(
          studio => studio.docId == aBooking.studioId,
        );
        return found ? found : null;
      });
      return filterdBookings.map(aBookings => {
        return aBookings.date;
      });
    }
    return bookings.map(aBooking => {
      return aBooking.date;
    });
  };

  const getMarkedDates = () => {
    var marker = {};
    marker[selectedDate] = {
      selected: true,
    };
    let bookedStudioDates = getBookingDateStatus();
    bookedStudioDates.map(aDate => {
      var dateString = moment(aDate).format('YYYY-MM-DD');
      var totalOccurence = bookedStudioDates.filter(v => v === aDate).length;
      var reddots = [];
      var whiteDots = [];
      for (let i = 0; i < totalOccurence; i++) {
        reddots.push({
          key: `red${i}`,
          color: Colors.red,
          selectedDotColor: 'white',
        });
        whiteDots.push({
          key: `white${i}`,
          color: Colors.white,
          selectedDotColor: 'white',
        });
      }

      marker[dateString] = {
        marked: true,
        selected: selectedDate === dateString,
        dots: selectedDate === dateString ? whiteDots : reddots,
      };
    });
    return marker;
  };

  const dateSelected = day => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
    refreshDatasoruce(day.dateString);
  };

  const refreshDatasoruce = dateString => {
    var dateBookings = bookings.filter(obj => obj.date === dateString);

    if (filteredStudio.length > 0) {
      var filterdBookings = dateBookings.filter(aBooking => {
        const found = filteredStudio.find(
          studio => studio.docId == aBooking.studioId,
        );
        return found ? found : null;
      });
      setSelectedDateBookings(filterdBookings);
      return;
    }
    setSelectedDateBookings(dateBookings);
  };

  const keyExtractor = k => `${k.bookingId}`;
  const onBookingPressed = (item, associatedStudio) => {
    dispatch(
      Actions.setSelectedBooking({
        ...item,
        associatedStudio: associatedStudio,
      }),
    );
    navigation.navigate('ManageBookingDetail');
  };
  const deleteBookingPressed = item => {
    dispatch(Actions.deleteBooking(item, false, true));
  };

  const renderItem = ({ item }) => {
    const associatedStudio = studio.studios.find(
      aStudio => aStudio.docId === item.studioId,
    );
    const associatedUser = user.allUsers.find(
      aUser => aUser.docId === item.userId,
    );

    var userName = associatedUser ? associatedUser.full_name : '';
    if (item.userName) {
      userName = item.userName;
    }

    return (
      <AdminBookingItem
        key={`${item.id}`}
        item={item}
        banner={associatedStudio.banner}
        studio={associatedStudio}
        user={userName}
        onPress={() => onBookingPressed(item, associatedStudio)}
      />
    );
  };
  const renderHiddenItem = (data, rowMap) => {
    if (moment(data.item.date).isBefore(new Date())) {
      return <View />;
    } else {
      return (
        <SwipeCellButton
          key={`${data.index}`}
          showIcon
          onPress={() => {
            deleteBookingPressed(data.item);
            //  rowMap[data.item.key].closeRow();
          }}
        />
      );
    }
  };
  return (
    <Container style={styles.container}>
      <SectionHeader
        title=""
        icon1
        icon1Name="filter"
        onPressIcon1={() => setShowFilter(true)}
      />
      {filteredStudio.length > 0 && (
        <View style={styles.greenView}>
          <Text style={styles.greenViewText}>Filter applied</Text>
        </View>
      )}
      <Calendar
        markingType={'multi-dot'}
        theme={{
          calendarBackground: Colors.tabBarColor,
          selectedDayBackgroundColor: Colors.red,
          // selectedDotColor: Colors.white,
          selectedDayTextColor: 'white',
          todayTextColor: Colors.greenDark,
          dayTextColor: '#d9e1e8',
          textDisabledColor: '#333',
          arrowColor: Colors.white,
          monthTextColor: Colors.white,
        }}
        markedDates={getMarkedDates()}
        onDayPress={day => dateSelected(day)}
      />
      <View style={styles.listContainer}>
        <SwipeListView
          contentContainerStyle={GlobalStyle.style.flatListStyle}
          data={selectedDateBookings}
          extraData={[selectedDateBookings, bookings]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          renderHiddenItem={renderHiddenItem}
          ListEmptyComponent={
            <EmptyComponent title="You have no bookings for selected date." />
          }
          rightOpenValue={-75}
        />
      </View>
      <FilterStudioModal
        dismiss={selectedStudios => {
          setFilteredStudios(selectedStudios);
          setShowFilter(false);
        }}
        visible={showFilter}
      />
    </Container>
  );
};

export default ManageBooking;
