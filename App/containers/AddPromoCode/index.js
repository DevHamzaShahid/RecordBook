import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Image, TouchableOpacity, View, Button, ScrollView, SafeAreaView, Switch } from 'react-native';
import { Container, Content, ListItem, Left, Body } from 'native-base';
import { GlobalStyle, Images, Colors } from '@common';
import { SolidButton } from '@Buttons';
import { SmallText, LargeText } from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import TextField from '../../components/TextField';
import Actions from '../AddRoom/reducer';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import { Icon } from 'react-native-elements';

const AddPromoCode = ({ route, navigation }) => {
  const { editMode } = route.params;
  const user = useSelector(state => state.user);
  const room = useSelector(state => state.room);
  const promo = editMode ? room.editPromo : room.promo;

  const [title, onChangeTitle] = useState(promo ? promo.code : '');
  const [titleError, setTitleError] = useState('');
  const [percentage, onChangePercentage] = useState(
    promo ? (promo.discount_type === 'percentage' ? promo.value : '') : '',
  );
  const [percentageError, setPercentageError] = useState('');

  const [price, onChangePrice] = useState(
    promo ? (promo.discount_type === 'price' ? promo.value : '') : '',
  );
  const [checkPrice, onCheckPrice] = useState(false);
  const [priceError, setPriceError] = useState('');
  const [date, setDate] = useState(new Date())
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => { });

  const clearErrors = () => {
    setPriceError('');
    setPercentageError('');
    setTitleError('');
  };

  const discountPreference = () => {
    onCheckPrice(!checkPrice);
    clearErrors();
    if (checkPrice) {
      onChangePrice('');
    } else {
      onChangePercentage('');
    }
  };
  const add = () => {
    if (title === '') {
      setTitleError('Please enter promo code');
    }
    if (checkPrice) {
      if (price === '') {
        setPriceError('Please enter price');
      }
    } else {
      if (percentage === '') {
        setPercentageError('Please enter percentage');
      }
    }
    if (title === '') {
      return;
    }
    if (checkPrice) {
      if (price === '') {
        return;
      }
    } else {
      if (percentage === '') {
        return;
      }
    }

    let newPromo = {
      id: `${Date.now()}`,
      code: title,
      discount_type: checkPrice ? 'price' : 'percentage',
      value: checkPrice ? price : percentage,
      valid_until: date.toString(),
      ...(isEnabled ? { singleUserOneTmPromo: true } : {}),
    };

    dispatch(
      editMode
        ? Actions.addEditPromoCode(newPromo)
        : Actions.addPromoCode(newPromo),
    );
    navigation.goBack();
  };
  console.log("isenabled", isEnabled);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#000000'
    }}>
      <Container style={styles.container}>
        <SectionHeader title={`${promo ? 'Edit' : 'Add'}  Promo Code`} />
        <Content padder>
          <TextField
            value={title}
            placeHolder="Promo Code Value"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => {
              onChangeTitle(text);
              clearErrors();
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {titleError}
          </SmallText>
          <CheckBoxTitle
            title="Percentage Discount"
            checked={!checkPrice}
            onPress={() => discountPreference()}
          />
          <View style={styles.price}>
            <LargeText bold textStyle={styles.margin}>
              Value
            </LargeText>
            <TextField
              autoCorrect={false}
              autoCapitalize="none"
              value={percentage}
              keyboardType="decimal-pad"
              editable={!checkPrice}
              textInputStyle={styles.valueText}
              onChangeText={text => {
                onChangePercentage(text);
                clearErrors();
              }}
            />
            <LargeText bold textStyle={styles.margin}>
              %
            </LargeText>
          </View>
          <SmallText textStyle={styles.error} bold>
            {percentageError}
          </SmallText>
          <CheckBoxTitle
            title="Price Discount"
            checked={checkPrice}
            onPress={() => discountPreference()}
          />
          <View style={styles.price}>
            <LargeText bold textStyle={styles.margin}>
              Value $
            </LargeText>
            <TextField
              autoCorrect={false}
              autoCapitalize="none"
              value={price}
              keyboardType="decimal-pad"
              textInputStyle={styles.valueText}
              editable={checkPrice}
              onChangeText={text => {
                onChangePrice(text);
                clearErrors();
              }}
            />

          </View>
          <SmallText textStyle={styles.error} bold>
            {priceError}
          </SmallText>

          <View style={styles.price}>
            <LargeText bold textStyle={styles.margin}>
              Valid until
            </LargeText>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.validContainer}>
              <Text style={styles.validText}>{date.toLocaleDateString()}</Text>
              <Icon name='keyboard-arrow-down' color={'#fff'} />
            </TouchableOpacity>
          </View>
          <View style={styles.price}>
            <LargeText bold textStyle={styles.margin}>
              Single user coupon
            </LargeText>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <DatePicker
            modal
            mode='date'
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

          <SolidButton
            title="Add"
            buttonStyle={styles.btnStyle}
            textStyle={styles.btnTextStyle}
            onPress={add}
          />
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default AddPromoCode;
