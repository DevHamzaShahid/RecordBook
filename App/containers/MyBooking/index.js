import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionList, Alert, View } from 'react-native';
import { Container } from 'native-base';
import { GlobalStyle } from '@common';
import Actions from './reducer';
import SectionHeader from '../../components/SectionHeader';
import BookingItem from '../../components/BookingItem';
import ListHeader from '../../components/ListHeader';
import EmptyComponent from '../../components/EmptyComponent';
import moment from 'moment';

import styles from './styles';
import TopNav from '../../components/TopNav';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../common/Constant';
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView,
} from 'react-native-tab-view';
import All from '../Studio/All';
import Today from '../Studio/Today';
import List from './List';
import colors from '../../common/colors';
import MediumText from '../../components/Typography/MediumText';

const RenderScene = SceneMap({
  Upcoming: () => <List upcoming />,
  Past: () => <List />,
});

const routes = [
  { key: 'Upcoming', title: 'Upcoming' },
  { key: 'Past', title: 'Past' },
];

const RenderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.taBar}
    activeColor={colors.pink}
    inactiveColor={colors.white}
    renderLabel={({ route, focused, color }) => (
      <MediumText textStyle={[styles.labelTab, { color }]}>
        {route.title}
      </MediumText>
    )}
    renderIndicator={(props) => (
      <TabBarIndicator
        {...props}
        style={{ backgroundColor: colors.pink, height: 3 }}
      />
    )}
  />
);

const MyBooking = ({ navigation }) => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const studio = useSelector((state) => state.studio);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(Actions.getBookings());
    });
    return unsubscribe;
  }, [navigation]);

  // const renderItem = ({item}) => {
  //   const associatedStudio = studio.studios.find(
  //     (aStudio) => aStudio.docId === item.studioId,
  //   );
  //   return (
  //     <BookingItem
  //       item={item}
  //       banner={associatedStudio.banner}
  //       studio={associatedStudio}
  //       onPress={() => onBookingPressed(item, associatedStudio)}
  //       onPressDelete={() => deleteBookingPressed(item)}
  //     />
  //   );
  // };

  return (
    <View style={styles.container}>
      <TopNav title={'My Bookings'} />
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={RenderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Constants.screenWidth }}
          renderTabBar={RenderTabBar}
        />
        {/*<SectionList
          sections={booking.myBookings}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyComponent title="You have no bookings" />}
        />*/}
      </LinearGradient>
    </View>
  );
};

export default MyBooking;
