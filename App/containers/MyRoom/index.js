import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, SafeAreaView } from 'react-native';
import { Container } from 'native-base';
import { SolidButton } from '@Buttons';
import Actions from '../Studio/reducer';
import AddRoomActions from '../AddRoom/reducer';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { GlobalStyle } from '@common';
import SectionHeader from '../../components/SectionHeader';
import RoomItem from '../../components/RoomItem';
import EmptyComponent from '../../components/EmptyComponent';

import styles from './styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MAILCHIMP_APIKEY } from '../../utils/helper';
import axios from 'axios';
const MyRoom = ({ navigation }) => {
  const dispatch = useDispatch();
  const studio = useSelector((state) => state.studio);
  const [orderActive, setOrderActive] = useState(false);
  const [sortedStudio, setSortedStudio] = useState([]);




  useEffect(() => {
    dispatch(Actions.getStudios());
  }, []);

  const keyExtractor = (k) => k.id;

  const onPressRoom = (item) => {
    dispatch(Actions.setSelectedStudio(item));
    navigation.navigate('RoomDetail');
  };

  const onPressDelete = (item) => {
    dispatch(AddRoomActions.deleteRoom(item));
  };

  const onPressBook = (item) => {
    dispatch(Actions.setSelectedStudio(item));
    navigation.navigate('ManualDateTime');
  };

  const onPressEdit = (item) => {
    dispatch(Actions.setSelectedStudio(item));
    dispatch(AddRoomActions.setEditRoomTitleDesc(item.aminities));
    dispatch(AddRoomActions.setEditPromoCode(item.promo));
    navigation.navigate('EditRoom');
  };


  // useEffect(() => {
  //   const desiredTitles = ['OMAR’S ROOM', 'Twin Room A', 'Twin Room B', 'GAME ROOM', 'Unit 5', 'Internal ROOM'];
  //   console.log("unsorted", studio?.studios);
  //   const sortedItems = desiredTitles.flatMap((title) =>
  //     studio?.studios?.filter((item) => item.title === title)
  //   );
  //   setSortedStudio(sortedItems);
  // }, [studio]);

  useEffect(() => {
    const desiredTitles = ['OMAR’S ROOM', 'Twin Room A', 'Twin Room B', 'GAME ROOM', 'Unit 5', 'Internal ROOM'];

    // Filter items with desired titles
    const sortedItems = desiredTitles.flatMap((title) =>
      studio?.studios?.filter((item) => item.title === title)
    );
    // Concatenate the remaining items
    const remainingItems = studio?.studios?.filter((item) => !desiredTitles.includes(item.title));
    const finalSortedItems = sortedItems.concat(remainingItems);

    setSortedStudio(finalSortedItems);
  }, [studio]);

  const renderStudiosItem = useCallback(
    ({ item, index, drag, isActive }) => {
      return (
        <RoomItem
          title={item.title}
          subtitle={item.location}
          banner={item.banner}
          onPress={() => onPressRoom(item)}
          onPressDelete={() => onPressDelete(item)}
          onPressEdit={() => onPressEdit(item)}
          onPressBook={() => onPressBook(item)}
          onLongPress={drag}
        />
      );
    },
    [],
  );


  const showProfile = () => {
    navigation.navigate('Profile');
  };

  const addRoom = () => {
    dispatch(AddRoomActions.resetPromoCode());
    dispatch(AddRoomActions.resetRoomTitleDesc());
    navigation.navigate('AddRoom');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <Container style={styles.container}>
        <SectionHeader
          title="My Rooms"
          icon1
          icon2
          onPressIcon1={showProfile}
          onPressIcon2={addRoom}
          icon1Name="face"
          icon2Name="plus"
        />
        <DraggableFlatList
          contentContainerStyle={GlobalStyle.style.flatListStyle}
          data={sortedStudio}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          // keyExtractor={keyExtractor}
          renderItem={renderStudiosItem}
          onDragEnd={({ data }) => {
            console.log(data);
          }}
          ListEmptyComponent={<EmptyComponent title="You have no Studio room" />}
        />
        {/* <SolidButton
        title={orderActive ? 'Apply order' : 'Display order'}
        buttonStyle={styles.btnStyle}
        textStyle={styles.btnTextStyle}
        onPress={() => setOrderActive(!orderActive)}
      /> */}
      </Container>
    </SafeAreaView>
  );
};

export default MyRoom;
