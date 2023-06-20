import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, View, Text} from 'react-native';
import {Container} from 'native-base';
import Actions from '../MyBooking/reducer';
import ProfileActions from '../Profile/reducer';
import AdminBookingItem from '../../components/AdminBookingItem';
import styles from './styles';
import {Colors} from '@common';
import {
  ExpandableCalendar,
  AgendaList,
  Calendar,
  CalendarProvider,
} from 'react-native-calendars';

const ManageBooking = ({navigation}) => {
  const dispatch = useDispatch();
  const booking = useSelector(state => state.booking);
  const studio = useSelector(state => state.studio);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(ProfileActions.getAllUsers());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(Actions.getBookingsForAdmin());
    });
    return unsubscribe;
  }, [navigation]);


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

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    if (!item) {
      return renderEmptyItem();
    }
    const associatedStudio = studio.studios.find(
      aStudio => aStudio.docId === item.studioId,
    );
    const associatedUser = user.allUsers.find(
      aUser => aUser.docId === item.userId,
    );
    return (
      <AdminBookingItem
        key={`${item.id}`}
        item={item}
        banner={associatedStudio.banner}
        studio={associatedStudio}
        user={associatedUser}
        onPress={() => onBookingPressed(item, associatedStudio)}
      />
    );
  };

  // this gives an object with dates as keys
  const groups = booking.bookings.reduce((groups, game) => {
    const title = game.date.split('T')[0];
    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(game);
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map(title => {
    return {
      title,
      data: groups[title],
    };
  });

  const getMarkedDates = () => {
    const marked = {};
    groupArrays.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !item.data[0]) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
  };

  return (
    <Container style={styles.container}>
      <CalendarProvider
        date={groupArrays.length > 0 ? groupArrays[0].title : []}
        disabledOpacity={0.6}>
        <ExpandableCalendar
          testID="expandableCalendar"
          firstDay={1}
          markedDates={getMarkedDates}
          
          theme={{
            calendarBackground: Colors.tabBarColor,
            selectedDayTextColor: 'white',
            selectedDayBackgroundColor: Colors.red,
            // selectedDotColor: Colors.red,
            todayTextColor: 'red',
            dayTextColor: '#d9e1e8',
            textDisabledColor: '#333',
            arrowColor: Colors.white,
            monthTextColor: Colors.white,
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff'
          }}
        />
        <AgendaList
          sections={groupArrays}
          extraData={this.state}
          renderItem={renderItem}
          sectionStyle={styles.section}
        />
      </CalendarProvider>
    </Container>
  );
};

export default ManageBooking;
