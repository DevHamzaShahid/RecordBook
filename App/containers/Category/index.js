import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View, Alert} from 'react-native';
import {Container} from 'native-base';
import {Icon} from 'react-native-elements';
import Actions from './reducer';
import SectionHeader from '../../components/SectionHeader';
import SwipeCellButton from '../../components/SwipeCellButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import TextField from '../../components/TextField';
import {SolidButton} from '@Buttons';
import {Colors} from '@common';
import {RegularText, SmallText} from '@Typography';
import styles from './styles';

const Category = ({navigation}) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    dispatch(Actions.getCategories());
  }, []);

  const keyExtractor = (k) => `${k.id}`;

  const saveNewCategory = () => {
    if (newCategory == '') {
      Alert.alert('Please enter category name');
      return;
    }
    let color = '#' + (((1 << 24) * Math.random()) | 0).toString(16);
    dispatch(Actions.createCategory({title: newCategory, color: color}));
    setNewCategory('');
  };

  const deleteCategoryPressed = (item) => {
    dispatch(Actions.deleteCategory(item));
  };

  const renderItem = ({item}) => {
    return (
      <View style={[styles.cardStyle, {backgroundColor: item.color}]}>
        <RegularText textStyle={styles.textColor}>{item.title}</RegularText>
      </View>
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <SwipeCellButton
      key={`${data.id}`}
      onPress={() => {
        deleteCategoryPressed(data.item);
        rowMap[data.item.key].closeRow();
      }}
    />
  );
  return (
    <Container style={styles.container}>
      <SectionHeader title="Category" />
      <TextField
        placeHolder="Create new Category"
        value={newCategory}
        autoCorrect={false}
        autoCapitalize="none"
        textInputStyle={styles.addCategory}
        onChangeText={(text) => {
          setNewCategory(text);
        }}
      />
      <SolidButton
        title="Create"
        buttonStyle={styles.buttonStyle}
        onPress={saveNewCategory}
      />
      <SwipeListView
        data={category.categories}
        extraData={category}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
      />
    </Container>
  );
};

export default Category;
