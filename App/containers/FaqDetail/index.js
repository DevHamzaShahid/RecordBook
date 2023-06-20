import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { GlobalStyle } from '@common';
import { LargeText, RegularText } from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import RoomItem from '../../components/RoomItem';
import ImageItem from '../../components/ImageItem';
import { BorderButton } from '@Buttons';
import styles from './styles';
const FaqDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq);

  const renderImageItem = ({ item }) => <ImageItem imagePath={item} />;
  const renderPDFItem = ({ item, index }) => (
    <BorderButton
      title={`Document ${index + 1}`}
      onPress={() =>
        navigation.navigate('TOS', {
          title: 'Document',
          link: item,
        })
      }
    />
  );

  const keyExtractor = (k, index) => `${index}`;
  return (
    <Container style={styles.container}>
      <SectionHeader title="FAQ" />
      <Content>
        <LargeText textStyle={styles.question}>Question</LargeText>
        <RegularText textStyle={styles.answer}>
          {faq.selectedFaq.question}
        </RegularText>
        <LargeText textStyle={styles.question}>Category</LargeText>
        <RegularText textStyle={styles.answer}>
          {faq.selectedFaq.category.title}
        </RegularText>

        <LargeText textStyle={styles.question}>Answer</LargeText>
        <RegularText textStyle={styles.answer}>
          {faq.selectedFaq.answer}
        </RegularText>
        {faq.selectedFaq.images && (
          <LargeText textStyle={styles.question}>Gallery</LargeText>
        )}
        <FlatList
          horizontal
          contentContainerStyle={GlobalStyle.style.flatListStyle}
          data={faq.selectedFaq.images}
          keyExtractor={keyExtractor}
          renderItem={renderImageItem}
        />
        {faq.selectedFaq.pdf && (
          <LargeText textStyle={styles.question}>Documents</LargeText>
        )}
        <FlatList
          horizontal
          contentContainerStyle={GlobalStyle.style.flatListStyle}
          data={faq.selectedFaq.pdf}
          keyExtractor={keyExtractor}
          renderItem={renderPDFItem}
        />
      </Content>
    </Container>
  );
};

export default FaqDetail;
