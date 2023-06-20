import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View, Text} from 'react-native';
import {Container} from 'native-base';
import Actions from '../Support/reducer';

import SectionHeader from '../../components/SectionHeader';
import SwipeCellButton from '../../components/SwipeCellButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import FaqItem from '../../components/FaqItem';
import {SolidButton} from '@Buttons';
import {RegularText, SmallText} from '@Typography';
import styles from './styles';

const MyArticles = ({navigation}) => {
  const dispatch = useDispatch();
  const faq = useSelector(state => state.faq);

  useEffect(() => {
    dispatch(Actions.getFAQS());
  }, []);

  const keyExtractor = k => `${k.id}`;

  const onPressQuestion = item => {
    dispatch(Actions.setSelectedFaq(item));
    navigation.navigate('FAQDetail');
  };

  const deleteFAQPressed = item => {
    dispatch(Actions.deleteFAQ(item));
  };

  const renderItem = ({item}) => (
    <FaqItem isAdmin item={item} onPress={() => onPressQuestion(item)} />
  );

  const renderHiddenItem = (data, rowMap) => (
    <SwipeCellButton
      key={`${data.index}`}
      onPress={() => {
        deleteFAQPressed(data.item);
       // rowMap[data.item.key].closeRow();
      }}
    />
  );
  return (
    <Container style={styles.container}>
      <SectionHeader title="My Articles" />
      <SwipeListView
        data={faq.faqs}
        extraData={faq}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
      />
    </Container>
  );
};

export default MyArticles;
