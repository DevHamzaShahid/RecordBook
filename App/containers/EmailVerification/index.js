import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Actions from '../Profile/reducer';
import {Container, Content} from 'native-base';
import {SolidButton} from '@Buttons';
import {XLText, SmallText, RegularText} from '@Typography';
import TextField from '../../components/TextField';
import microValidator from 'micro-validator';
import is from 'is_js';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const validationSchema = {
  email: {
    required: {
      errorMsg: `Email is required`,
    },
    email: {
      errorMsg: `Enter a valid email`,
    },
  },
};

const EmailVerification = ({navigation}) => {
  const [errors, setErrors] = useState({});
  const [email, onChangeEmail] = useState('');
  const [showMessage, onChangeMessage] = useState(false);
  const dispatch = useDispatch();

   const sendLink = async () => {
    const Errors = microValidator.validate(validationSchema, {
      email: email,
    });
    if (!is.empty(Errors)) {
      setErrors(Errors);
      console.log("email error", Errors)
      return;
    }
    await AsyncStorage.setItem('emailForSignIn', email);

    dispatch(Actions.verifyEmail(email));
    onChangeMessage(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container style={styles.container}>
        <XLText bold textStyle={styles.topTextStyle}>
          Verify Email Address
        </XLText>
        {showMessage && (
          <RegularText>
            Please click on the link that has just been sent to your email
            account to verfiy your email and continue the registration process.
          </RegularText>
        )}
        {!showMessage && (
          <TextField
            placeHolder="Email Address"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              onChangeEmail(text);
              console.log("email text", text)
              setErrors({});
            }}
          />
        )}
        {!showMessage && (
          <SmallText textStyle={styles.error} bold>
            {errors.email && errors.email[0]}
          </SmallText>
        )}
        {!showMessage && <SolidButton onPress={sendLink} title="Verify" />}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default EmailVerification;
