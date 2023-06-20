import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from './reducer';
import AppActions from '../Root/reducer';
import {GlobalStyle} from '@common';
import SectionHeader from '../../components/SectionHeader';
import FaqItem from '../../components/FaqItem';
import ListHeader from '../../components/ListHeader';
import TopicItem from '../../components/TopicItem';
import ConversationModal from '../../components/ConversationModal';

import styles from './styles';
const Support = ({navigation}) => {
  const dispatch = useDispatch();
  const faq = useSelector(state => state.faq);

  useEffect(() => {
    dispatch(Actions.getFAQS());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(AppActions.newMessage(false));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const onPressQuestion = item => {
    dispatch(Actions.setSelectedFaq(item));
    navigation.navigate('FAQDetail');
  };

  const renderItem = ({item}) => (
    <FaqItem
      isAdmin={false}
      item={item}
      onPress={() => onPressQuestion(item)}
    />
  );
  const keyExtractor = k => k.id;

  const renderTopicItem = ({item}) => <TopicItem title={item.title} />;

  return (
    <Container style={styles.container}>
      <SectionHeader title="Got a Question ?" />
      <Content>
        <ListHeader title="Frequently Asked Questions" />
        <FlatList
          horizontal
          contentContainerStyle={GlobalStyle.style.flatListStyle}
          data={faq.faqs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        {/* <View style={styles.line} />
        <ListHeader title="Topic" /> */}
      </Content>
      <ConversationModal />
    </Container>
  );
};

export default Support;

// <FlatList
// contentContainerStyle={GlobalStyle.style.flatListStyle}
// data={faq.faqs}
// keyExtractor={keyExtractor}
// renderItem={renderTopicItem}
// />
