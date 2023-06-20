import React, {useCallback, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import {SolidButton} from '@Buttons';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import microValidator from 'micro-validator';
import messaging from '@react-native-firebase/messaging';
import is from 'is_js';
import styles from './styles';
import {Fonts, Images} from '../../common';
import MediumText from '../../components/Typography/MediumText';
import TextInput from '../../components/TextInput';
import {useDispatch} from 'react-redux';
import Actions from '../Profile/reducer';
import BorderButton from '../../components/Buttons/BorderButton';
import colors from '../../common/colors';
import CountryPicker from 'react-native-country-picker-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

const validationSchema = {
  password: {
    required: {
      errorMsg: 'Please enter Password',
    },
    regex: {
      pattern: /(?=^.{8,}$)/im,
      errorMsg: 'Password length must be greater than 7',
    },
  },
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
  email: {
    required: {
      errorMsg: `Email name is required`,
    },
    regex: {
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
      errorMsg: 'Please enter a valid Email',
    },
  },
  firstName: {
    required: {
      errorMsg: `First name is required`,
    },
  },
  lastName: {
    required: {
      errorMsg: `Last name is required`,
    },
  },
  address: {
    required: {
      errorMsg: `Address is required`,
    },
  },
};

let inputs = [
  {
    placeholder: 'Dummy Text Input',
  },
  {
    keyboardType: 'email-address',
    placeholder: 'Dummy Text Input Email',
  },
  {
    keyboardType: 'numeric',
    placeholder: 'Dummy Text Input Numeric',
  },
  {
    placeholder: 'Dummy Text Input',
  },
  {
    keyboardType: 'email-address',
    placeholder: 'Dummy Text Input Email',
  },
  {
    keyboardType: 'numeric',
    placeholder: 'Dummy Text Input Numeric',
  },
];

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [firstName, onChangeFirstName] = useState('');
  const [insta, onChangeInsta] = useState('');
  const [address, onChangeAddress] = useState('');
  const [subscribe, onCheckSubscribe] = useState(false);
  const [termAccept, setTermsAccepted] = useState(false);
  const [isCCModalVisible, setIsCCModalVisible] = useState(false);
  const [country, setCountry] = useState('1');

  const save = () => {
    const Errors = microValidator.validate(validationSchema, {
      password: password,
      phoneNumber: phoneNumber,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
    });
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }
    if (!termAccept) {
      Alert.alert('You need to accept Terms of service');
      return;
    }

    dispatch(
      Actions.verifyPhone(
        {
          password,
          email,
          phone: country.callingCode
            ? '+' + country.callingCode + phoneNumber
            : '+1' + phoneNumber,
          //phone: phoneNumber.startsWith('+') ? phoneNumber : '+1' + phoneNumber,
          //phone: '+919977147643',
          first_name: firstName,
          last_name: lastName,
          full_name: firstName ? firstName : ' ' + lastName ? lastName : '',
          address: address,
          insta: insta,
          subscribed_newsletter: subscribe,
        },
        'PhoneVerification',
      ),
    );
  };

  const onSubscribe = useCallback(() => {
    if (!subscribe) {
      messaging()
        .subscribeToTopic('updates_discounts')
        .then(() => console.log('Subscribed to topic!'));
    } else {
      messaging()
        .unsubscribeFromTopic('updates_discounts')
        .then(() => console.log('Unsubscribed fom the topic!'));
    }
    onCheckSubscribe(!subscribe);
  }, [subscribe]);

  const changePhone = useCallback((text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '',
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          '',
        );
      onChangePhoneNumber(number);
    } else {
      onChangePhoneNumber(text);
    }
  }, []);

  inputs = inputs.map((input) => ({
    ref: React.createRef(),
    ...input,
  }));

  this.state = {
    activeInputIndex: 0,
    nextFocusDisabled: false,
    previousFocusDisabled: false,
    buttonsDisabled: false,
    buttonsHidden: false,
  };

  const handleFocus = (index) => () => {
    this.setState({
      nextFocusDisabled: index === inputs.length - 1,
      previousFocusDisabled: index === 0,
      activeInputIndex: index,
    });
  };

  handleFocusNext = () => {
    const {nextFocusDisabled, activeInputIndex} = this.state;
    if (nextFocusDisabled) {
      return;
    }

    inputs[activeInputIndex + 1].ref.current.focus();
  };

  handleFocusPrevious = () => {
    const {previousFocusDisabled, activeInputIndex} = this.state;
    if (previousFocusDisabled) {
      return;
    }

    inputs[activeInputIndex - 1].ref.current.focus();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Container style={styles.container}>
          <Image source={Images.signBGBlur} style={styles.signBG} />

          <Content showsVerticalScrollIndicator={false}>
            <Image
              source={Images.HitHouselogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <MediumText textStyle={styles.redTitle}>
              Sign In & Reserve a Recording Studio Now
            </MediumText>

            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              placeholder={'Enter first name'}
              error={errors.firstName && errors.firstName[0]}
              value={firstName}
              onChangeText={(text) => {
                onChangeFirstName(text);
                setErrors({});
              }}
              autoComplete={'name'}
            />

            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              placeholder={'Enter last name'}
              value={lastName}
              error={errors.lastName && errors.lastName[0]}
              onChangeText={(text) => {
                onChangeLastName(text);
                setErrors({});
              }}
              autoComplete={'family-name'}
            />

            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              placeholder={'Enter address'}
              value={address}
              error={errors.address && errors.address[0]}
              onChangeText={(text) => {
                onChangeAddress(text);
                setErrors({});
              }}
              autoComplete={'address-line1'}
            />

            <TextInput
              error={errors.phoneNumber && errors.phoneNumber[0]}
              value={phoneNumber}
              onChangeText={changePhone}
              keyboardType={'numeric'}
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              autoComplete={'address-line1'}
              placeholder={'Enter phone number'}>
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
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <MediumText>
                            {country.callingCode
                              ? '+' + country.callingCode
                              : '+1'}
                          </MediumText>
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
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              placeholder={'Enter email address'}
              value={email}
              error={errors.email && errors.email[0]}
              autoComplete={'email'}
              onChangeText={(text) => {
                onChangeEmail(text.replace(/ /g, ''));
                setErrors({});
              }}>
              <Image
                source={Images.email}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TextInput>

            <TextInput
              secureTextEntry
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              placeholder={'Create Password'}
              value={password}
              error={errors.password && errors.password[0]}
              onChangeText={onChangePassword}>
              <Image
                source={Images.lock}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TextInput>

            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              placeholder={'Enter Instagram username'}
              error={errors.insta && errors.insta[0]}
              value={insta}
              onChangeText={onChangeInsta}>
              <Image
                source={Images.instagram}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TextInput>

            <CheckBoxTitle
              title="I would like to receive texts about last-minute discounted sessions!"
              checked={subscribe}
              onPress={onSubscribe}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                marginVertical: 10,
              }}>
              <CheckBoxTitle
                checked={termAccept}
                onPress={() => setTermsAccepted(!termAccept)}
                title=""
              />
              <MediumText>
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
                {' and '}
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
              </MediumText>
            </View>
            <SolidButton onPress={save} title="Create Account" />
            <BorderButton
              buttonStyle={{
                borderColor: colors.skyBlue02,
                borderRadius: 5,
                padding: 20,
              }}
              textStyle={{
                fontFamily: Fonts.type.regular,
                fontSize: Fonts.size.regular,
              }}
              onPress={navigation.goBack}
              title="Cancel"
            />
          </Content>
        </Container>
      </View>

      <KeyboardAccessoryNavigation />
    </View>
  );
};

export default SignUp;
