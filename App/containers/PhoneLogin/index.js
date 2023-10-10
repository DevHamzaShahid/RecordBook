import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors, Images} from '@common';
import {SolidButton} from '@Buttons';
import Actions from '../Profile/reducer';
import {LargeText, MediumText} from '@Typography';
import microValidator from 'micro-validator';
import is from 'is_js';

import styles from './styles';
import TextInput from '../../components/TextInput';
import TopNav from '../../components/TopNav';
import {Icon} from 'react-native-elements';
import {goBack} from '../../utils/rNavigation';
import CountryPicker from 'react-native-country-picker-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';

const validationSchema = {
  phoneNumber: {
    required: {
      errorMsg: 'Please enter Phone number',
    },
    regex: {
      pattern:
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/im,
      errorMsg: 'Please enter a valid Phone Number',
    },
  },
  password: {
    required: {
      errorMsg: 'Please enter Password',
    },
    regex: {
      pattern: /(?=^.{8,}$)/im,
      errorMsg: 'Password length must be greater than 7',
    },
  },
};
const validationSchemaOPT = {
  phoneNumber: {
    required: {
      errorMsg: 'Please enter Phone number',
    },
    regex: {
      pattern:
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/im,
      errorMsg: 'Please enter a valid Phone Number',
    },
  },
};

const PhoneLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [phoneNumber, onChangePhone] = useState('');
  const [password, onChangePassword] = useState('');

  const [isCCModalVisible, setIsCCModalVisible] = useState(false);
  const [country, setCountry] = useState('1');

  useEffect(() => {
    setErrors({});
  }, [phoneNumber, password]);

  const onPressSignup = useCallback(() => {
    const error = microValidator.validate(validationSchema, {
      phoneNumber: phoneNumber,
      password: password,
    });
    if (!is.empty(error)) {
      setErrors(error);
      return;
    }

    //  let phone = phoneNumber.startsWith('+') ? phoneNumber : '+1' + phoneNumber;
    let phone = country.callingCode
      ? '+' + country.callingCode + phoneNumber
      : '+1' + phoneNumber;
    // alert(phone);
    // return;
    dispatch(Actions.loginWithPassword(phone, password));
    //dispatch(Actions.loginWithPassword('+919977147643', password));
  }, [phoneNumber, password, country]);

  const onPressOTPSignup = useCallback(() => {
    const error = microValidator.validate(validationSchemaOPT, {
      phoneNumber: phoneNumber,
    });
    if (!is.empty(error)) {
      setErrors(error);
      return;
    }

    // alert(phoneNumber);

    dispatch(
      Actions.verifyPhone(
        {
          phone: country + phoneNumber,
          //phone: phoneNumber.startsWith('+') ? phoneNumber : '+1' + phoneNumber,
          //phone: '+919977147643',
          otpSigIn: false,
        },
        'PhoneVerification',
      ),
    );
    // dispatch(Actions.loginWithPassword(phone, password));
  }, [phoneNumber, country]);

  const changePhone = useCallback((text) => {
    // const cleaned = ('' + text).replace(/\D/g, '');
    // const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    // if (match) {
    //   const intlCode = match[1] ? '+1 ' : '',
    //     number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
    //       '',
    //     );
    //   onChangePhone(number);
    // } else {
      onChangePhone(text);
    // }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image source={Images.signBG} style={styles.signBG} />
        <Pressable style={styles.goBack} onPress={navigation.goBack}>
          <SafeAreaView />
          <Icon
            name="chevron-left"
            color="white"
            size={30}
            type="material-community"
          />
        </Pressable>
        <Image
          source={Images.HitHouselogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <MediumText textStyle={styles.redTitle}>
          Sign In & Reserve a Recording Studio Now
        </MediumText>

        <TextInput
          error={errors.phoneNumber && errors.phoneNumber[0]}
          value={phoneNumber}
          onChangeText={changePhone}
          keyboardType={'numeric'}
          style={styles.textInput}
          title={'Mobile Phone:'}
          placeholder={'Enter phone number'}>
          {/* <LargeText>+1</LargeText> */}

          <TouchableOpacity
            onPress={() => {
              setIsCCModalVisible(true);
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CountryPicker
                withFilter
                withAlphaFilter
                visible={isCCModalVisible}
                renderFlagButton={(e) => {
                  return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <LargeText>
                        {country.callingCode ? '+' + country.callingCode : '+1'}
                      </LargeText>
                    </View>
                  );
                }}
                onSelect={(e) => {
                  setCountry(e);
                  console.log(JSON.stringify(e));
                }}
                onClose={() => {
                  setIsCCModalVisible(false);
                }}
              />
              <Image
                style={{marginStart: 5, height: 15, width: 15}}
                source={require('../../../assets/down_arrow.png')}></Image>
            </View>
          </TouchableOpacity>
        </TextInput>

        <TextInput
          secureTextEntry
          error={errors.password && errors.password[0]}
          value={password}
          onChangeText={onChangePassword}
          style={styles.textInput}
          title={'Password:'}
          placeholder={'Enter password'}
        />

        <View style={styles.buttonView}>
          <SolidButton
            buttonStyle={styles.buttonSignInStyle}
            onPress={onPressSignup}
            title={'SIGN IN'}
          />
          <SolidButton
            regular
            colors={[Colors.white, Colors.white]}
            buttonStyle={styles.buttonSignupStyle}
            textStyle={styles.textSignup}
            onPress={() => navigation.navigate('SignUp')}
            title={'Don’t have an account? Sign Up Now!'}
          />

          {/*<Pressable style={styles.otpView} onPress={onPressOTPSignup}>
            <MediumText bold textStyle={styles.textSignupOTP}>
              Sign in with OTP
            </MediumText>
          </Pressable>*/}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneLogin;
