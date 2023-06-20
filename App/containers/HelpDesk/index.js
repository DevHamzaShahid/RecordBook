import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {Container, Thumbnail} from 'native-base';
import {Icon} from 'react-native-elements';
import Actions from '../Support/reducer';
import {GlobalStyle, Images, Colors} from '@common';
import {RegularText} from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import ChatItem from '../../components/ChatItem';
import ListHeader from '../../components/ListHeader';
import firestore from '@react-native-firebase/firestore';
import {SwipeListView} from 'react-native-swipe-list-view';
import SwipeCellButton from '../../components/SwipeCellButton';
import AppActions from '../Root/reducer';
import functions from '@react-native-firebase/functions';

import styles from './styles';

const HelpDesk = ({navigation}) => {
  const dispatch = useDispatch();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(AppActions.newMessage(false));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  const onPress = item => {
    dispatch(Actions.setSelectedUser(item));
    navigation.navigate('Chat');
  };
  const deleteChatPressed = item => {
    dispatch(Actions.deleteChat(item));
  };

  const renderItem = ({item}) => (
    <ChatItem item={item} onPress={() => onPress(item)} />
  );
  const renderHiddenItem = (data, rowMap) => (
    <SwipeCellButton
      key={`${data.index}`}
      showIcon
      onPress={() => {
        deleteChatPressed(data.item);
        rowMap[data.item.key].closeRow();
      }}
    />
  );

  const showNewsLetter = () => {
    navigation.navigate('NewsLetter');
  };

  const keyExtractor = k => `${k.id}`;

  return (
    <Container style={styles.container}>
      <SectionHeader
        title="Helpdesk"
        icon1
        onPressIcon1={showNewsLetter}
        icon1Name="bell"
      />
      <ListHeader title="Latest Requests" />
      <SwipeListView
        contentContainerStyle={GlobalStyle.style.flatListStyle}
        data={threads}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
      />
      <View style={styles.line} />
      <ListHeader title="Frequently Asked Questions" />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('MyArticles')}>
          <Thumbnail square small source={Images.support} />
          <RegularText>My Article</RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Category')}>
          <Thumbnail square small source={Images.support} />
          <RegularText>Category</RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('FAQ')}>
          <Icon name="add" color={Colors.white} size={40} />
          <RegularText>Add New</RegularText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default HelpDesk;
