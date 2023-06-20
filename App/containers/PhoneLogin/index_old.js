import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Linking,
  Alert,
} from 'react-native';
import {Images, Colors} from '@common';
import {SolidButton} from '@Buttons';
import Actions from '../Profile/reducer';
import {LargeText, RegularText, SmallText} from '@Typography';
import TextField from '../../components/TextField';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import microValidator from 'micro-validator';
import is from 'is_js';

import styles from './styles';

const validationSchema = {
  phoneNumber: {
    required: {
      errorMsg: 'Please enter Phone number',
    },
    regex: {
      pattern: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/im,
      errorMsg: 'Please enter a valid Phone Number',
    },
  },
};

const PhoneLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [phoneNumber, onChangePhone] = useState('');
  const [termAccept, setTermsAccepted] = useState(false);

  useEffect(() => {});

  const onPressSignup = () => {
    const error = microValidator.validate(validationSchema, {
      phoneNumber: phoneNumber,
    });
    if (!is.empty(error)) {
      setErrors(error);
      return;
    }
    if (!termAccept) {
      Alert.alert('You need to accept Terms of service');
      return;
    }
    let phone = phoneNumber.startsWith('+') ? phoneNumber : '+1' + phoneNumber;
    onChangePhone('');
    dispatch(Actions.login(phone)); 
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.redContainer}>
          <Image
            source={Images.HitHouselogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <LargeText textStyle={styles.redTitle}>
            Major Label Quality {'\n'}
            Independent Prices
          </LargeText>
        </View>
        <View style={styles.blackContainer}>
          <RegularText bold textStyle={styles.blackTitle}>
            Sign Up & Reserve a {'\n'}Recording Studio Now
          </RegularText>
          <Text style={styles.textStyle}>Phone Number</Text>
          <View style={{flexDirection: 'row'}}>
            <TextField
              value="+1"
              editable={false}
              containerStyle={styles.plusOne}
              textInputStyle={{borderWidth: 2}}
            />
            <TextField
              containerStyle={{flex: 1}}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              innerPlaceHolder="6506506500"
              textInputStyle={{borderWidth: 2}}
              value={phoneNumber}
              onChangeText={(text) => {
                var cleaned = ('' + text).replace(/\D/g, '');
                var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
                if (match) {
                  var intlCode = match[1] ? '+1 ' : '',
                    number = [
                      intlCode,
                      '(',
                      match[2],
                      ') ',
                      match[3],
                      '-',
                      match[4],
                    ].join('');

                  onChangePhone(number);
                  return;
                }
                onChangePhone(text);
                setErrors({});
              }}
            />
          </View>
          <SmallText textStyle={styles.error} bold>
            {errors.phoneNumber && errors.phoneNumber[0]}
          </SmallText>

          <View
            style={{flexDirection: 'row', width: '80%', marginVertical: 10}}>
            <CheckBoxTitle
              checked={termAccept}
              onPress={() => setTermsAccepted(!termAccept)}
              title=""
            />
            <SmallText>
              By checking this box you agree to the{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  navigation.navigate('TOS', {
                    title: 'Terms of Service',
                    link: 'http://recordbookstudios.com/privacy-policy',
                  })
                }>
                Terms of Service
              </Text>
              <SmallText>, and </SmallText>
              <Text
                style={styles.link}
                onPress={() =>
                  navigation.navigate('TOS', {
                    title: 'Terms of Service',
                    link: 'http://recordbookstudios.com/privacy-policy',
                  })
                }>
                Privacy Policy
              </Text>
            </SmallText>
          </View>
          <SolidButton
            buttonStyle={styles.buttonStyle}
            onPress={onPressSignup}
            title="Sign up"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneLogin;
