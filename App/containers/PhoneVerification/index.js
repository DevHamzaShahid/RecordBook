import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Actions from '../Profile/reducer';
import { BorderButton, SolidButton } from '@Buttons';
import { MediumText, XLText } from '@Typography';
import styles from './styles';
import { Images } from '../../common';
import TopNav from '../../components/TopNav';
import TextInput from '../../components/TextInput';
import colors from '../../common/colors';
import { MAILCHIMP_APIKEY } from '../../utils/helper';
import axios from 'axios';
import { apply } from 'redux-saga/effects';

const PhoneVerification = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userRegisteredSuccesfully = useSelector((state) => state.user.registration_successful)
  console.log("check user registration status", userRegisteredSuccesfully);
  const [errors, setErrors] = useState('');
  const [code, setCode] = useState('');

  const continuePressed = useCallback(async() => {
    if (code === '') {
      setErrors('Please enter correct verification code');
      return;
    }
    await dispatch(Actions.verifyCode(code, route.params));

  }, [route.params, code]);

  const resend = useCallback(() => {
    dispatch(Actions.login(route.params.phone));
  }, [route.params.phone]);
  useEffect(() => {
    dispatch(Actions.login(route.params.phone));
  }, []);

  useEffect(() => {
    if (code.length === 6) {
      continuePressed();
    }
  }, [code]);

  const data1 = route?.params;
  useEffect(() => {
    const dataR = {
      email_address: data1?.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data1?.first_name,
        LNAME: data1?.last_name,
        PHONE: data1?.phone,
        ADDRESS: {
          addr1: data1?.address,
          city: '.',
          state: '.',
          zip: '.',
          country: '.'
        }
      },
      tags: ['customer']
    };

    if (userRegisteredSuccesfully) {
      const listId = '6c9c0c76f1'; //audiance id is basically the listID
    (async () => {
      const apikey = MAILCHIMP_APIKEY
      try {
        const response = await axios.post(
          `https://us9.api.mailchimp.com/3.0/lists/${listId}/members`,
          dataR,
          {
            headers: {
              Authorization: `Bearer ${apikey}`
            }
          }
        );
        console.log('User added to Mailchimp successfully:', response.data);
      } catch (error) {
        alert(error.response.data)
        console.error('Error adding user to Mailchimp:', error.response.data);
      }
    })()
    }
  }, [userRegisteredSuccesfully, route.params, navigation]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          source={Images.signBG}
          style={styles.signBG}
          resizeMode={'contain'}
        />
        <TopNav showBack showLogo />

        <View style={styles.wrapper}>
          <XLText bold textStyle={styles.topTextStyle}>
            Verify Your Mobile Number
          </XLText>
          <MediumText textStyle={styles.bottomTextStyle}>
            Enter the 6-digit code we sent to {route.params.phone} to verify
            your account.
          </MediumText>

          <MediumText bold>Verification Code:</MediumText>

          <TextInput
            autoFocus
            maxLength={6}
            borderColor={colors.skyBlue01}
            borderBottomWidth={2}
            style={styles.textInput}
            keyboardType={'number-pad'}
            placeholder={'6-digit code'}
            error={errors}
            value={code}
            onChangeText={(text) => {
              setCode(text);
              setErrors('');
            }}
          />

          <BorderButton
            onPress={resend}
            title="Resend Code"
            textStyle={styles.resendText}
            buttonStyle={styles.resendBtn}
          />
          <SolidButton
            buttonStyle={styles.verifyButton}
            title="Verify"
            onPress={continuePressed}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneVerification;
