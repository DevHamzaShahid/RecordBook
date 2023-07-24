import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Pressable, Text, View} from 'react-native';
import {Container} from 'native-base';
import Actions from '../Support/reducer';
import SwipeCellButton from '../../components/SwipeCellButton';
import FaqItem from '../../components/FaqItem';
import styles from './styles';
import TopNav from '../../components/TopNav';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import MediumText from '../../components/Typography/MediumText';
 
function FAQItem({item}) {
  const [isShow, setShow] = useState(false);
  return (
    <Pressable onPress={() => setShow(!isShow)} style={styles.sectionItemView}>
      <View style={styles.sectionItemWrapper}>
        <MediumText bold textStyle={styles.contentText}>
          {item.question}
        </MediumText>
        <View style={{transform: [{rotate: isShow ? '90deg' : '0deg'}]}}>
          <Icon type={'antdesign'} name={'right'} color={'#fff'} />
        </View>
      </View>
      {isShow && <Text style={styles.answerText}>{item.answer}</Text>}
    </Pressable>
  );
}

const FAQs = ({navigation}) => {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(Actions.getFAQS());
  }, []);

  console.log('faq', faq);
  const keyExtractor = (k) => `${k.id}`;

  const onPressQuestion = (item) => {
    dispatch(Actions.setSelectedFaq(item));
    navigation.navigate('FAQDetail');
  };

  const deleteFAQPressed = (item) => {
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
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={{flex: 1}}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <TopNav showBack />
        <Text style={styles.faqs}>FAQs</Text>

        <FlatList
          style={styles.flatList}
          keyExtractor={(item, index) => String(index)}
          data={faq.faqs}
          renderItem={({item}) => <FAQItem item={item} />}
        />
      </LinearGradient>
    </Container>
  );
};

export default FAQs;
