import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  createRef,
} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
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
import NavigationViewExample from '../../components/TextInput/NavigationViewExample';

import {Appearance} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    placeholder: 'Enter first name',
    keyboardType: 'default',
    autoComplete: 'givenName',
  },
  {
    placeholder: 'Enter last name',
    keyboardType: 'default',
    autoComplete: 'familyName',
  },
  {
    keyboardType: 'default',
    placeholder: 'Enter address',
    autoComplete: 'fullStreetAddress',
  },
  {
    //keyboardType: 'phone-pad',
    keyboardType: 'default',
    //keyboardType: 'email-address',

    autoComplete: 'emailAddress',
    placeholder: 'Enter email address',
  },
  {
    keyboardType: 'numeric',
    autoComplete: 'telephoneNumber',
    placeholder: 'Enter phone number',
  },

  {
    keyboardType: 'default',
    autoComplete: 'none',
    placeholder: 'Create Password',
  },
  {
    keyboardType: 'default',
    autoComplete: 'none',
    placeholder: 'Enter Instagram username',
  },
];

const SignUp = ({navigation}) => {
  const refs = useRef(inputs.map(() => React.createRef()));
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
          // phone: phoneNumber,
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
    // const cleaned = ('' + text).replace(/\D/g, '');
    // const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    // if (match) {
    //   const intlCode = match[1] ? '+1 ' : '',
    //     number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
    //       '',
    //     );
    //   onChangePhoneNumber(number);
    // } else {
      onChangePhoneNumber(text);
    // }
  }, []);

  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [buttonsHidden, setButtonsHidden] = useState(false);

  const handleFocus = (index) => () => {
    setNextFocusDisabled(index === inputs.length - 1);
    setPreviousFocusDisabled(index === 0);
    setActiveInputIndex(index);
  };

  const handleFocusNext = () => {
    if (nextFocusDisabled) {
      return;
    }
    refs.current[activeInputIndex + 1].current.focus();
  };

  const handleFocusPrevious = () => {
    if (previousFocusDisabled) {
      return;
    }
    refs.current[activeInputIndex - 1].current.focus();
  };

  return (
    <View style={{flex: 1}}>
      {/* <View style={{flex: 1}}> */}

      <Container style={styles.container}>
        <Image source={Images.signBGBlur} style={styles.signBG} />
        <KeyboardAvoidingView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={Images.HitHouselogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <MediumText textStyle={styles.redTitle}>
              Sign In & Reserve a Recording Studio Now
            </MediumText>

            {inputs.map(
              ({placeholder, keyboardType, ref, autoComplete}, index) => (
                <TextInput
                  key={`input_${index}`}
                  ref={refs.current[index]}
                  style={styles.textInput}
                  inputStyle={styles.inputStyle}
                  underlineColorAndroid="transparent"
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  blurOnSubmit={false}
                  //autoCapitalize={autoCapitalize}
                  onFocus={handleFocus(index)}
                  secureTextEntry={index == 5 ? true : false}
                  value={
                    index == 0
                      ? firstName
                      : index == 1
                      ? lastName
                      : index == 2
                      ? address
                      : index == 4
                      ? phoneNumber
                      : index == 3
                      ? email
                      : index == 5
                      ? password
                      : insta
                  }
                  autoComplete={autoComplete}
                  error={
                    index == 0
                      ? errors.firstName && errors.firstName[0]
                      : index == 1
                      ? errors.lastName && errors.lastName[0]
                      : index == 2
                      ? errors.address && errors.address[0]
                      : index == 4
                      ? errors.phoneNumber && errors.phoneNumber[0]
                      : index == 3
                      ? errors.email && errors.email[0]
                      : index == 5
                      ? errors.password && errors.password[0]
                      : null
                  }
                  onChangeText={(text) => {
                    if (index == 0) {
                      if (text.length - firstName.length > 2) {
                        handleFocusNext();
                      }
                      onChangeFirstName(text), setErrors({});
                    } else if (index == 1) {
                      if (text.length - lastName.length > 2) {
                        handleFocusNext();
                      }
                      onChangeLastName(text), setErrors({});
                    } else if (index == 2) {
                      if (text.length - address.length > 2) {
                        handleFocusNext();
                      }
                      onChangeAddress(text);
                      setErrors({});
                    } else if (index == 4) {
                      if (text.length - phoneNumber.length > 2) {
                        handleFocusNext();
                      }
                      changePhone(text);
                    } else if (index == 3) {
                      //onChangeEmail(text.replace(/ /g, ''));
                      if (text.length - email.length > 2) {
                        handleFocusNext();
                      }
                      onChangeEmail(text);
                      setErrors({});
                    } else if (index == 5) {
                      onChangePassword(text);
                    } else if (index == 6) {
                      onChangeInsta(text);
                    }
                  }}
                  submit={(text) => {
                    alert(text);
                  }}>
                  {index == 4 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsCCModalVisible(true);
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  ) : index == 3 ? (
                    <Image
                      source={Images.email}
                      style={styles.icon}
                      resizeMode={'contain'}
                    />
                  ) : index == 5 ? (
                    <Image
                      source={Images.lock}
                      style={styles.icon}
                      resizeMode={'contain'}
                    />
                  ) : index == 6 ? (
                    <Image
                      source={Images.instagram}
                      style={styles.icon}
                      resizeMode={'contain'}
                    />
                  ) : null}
                </TextInput>
              ),
            )}

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
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
      {/* </View> */}

      <KeyboardAccessoryNavigation
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        nextHidden={buttonsHidden}
        previousHidden={buttonsHidden}
        onNext={handleFocusNext}
        onPrevious={handleFocusPrevious}
        avoidKeyboard
        androidAdjustResize
        style={{
          backgroundColor:
            Appearance.getColorScheme() === 'dark' ? '#232322' : 'white',
        }}
      />
    </View>
  );
};

export default SignUp;
// import { View, Text } from 'react-native'
// import React from 'react'

// import auth from '@react-native-firebase/auth';
// const index = () => {


// auth()
//   .createUserWithEmailAndPassword('jane.doe@example1.com', 'SuperSecretPassword!')
//   .then(() => {
//     console.log('User account created & signed in!');
//   })
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//     }

//     console.error(error);
//   });
//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   )
// }

// export default index