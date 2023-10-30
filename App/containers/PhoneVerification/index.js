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
import { addUserToMailchimp } from '../../utils/helper';

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

  useEffect(() => {
    const data = route?.params;
    console.log("datatttat>>>>>>>>>>>>>>>>>>>>>>>>>>>",data);
    if (userRegisteredSuccesfully) {
      addUserToMailchimp(data?.email, data?.first_name, data?.last_name, data?.phone, data?.address)
        .then(() => {
          // Mailchimp operation succeeded, navigate to the next screen
          alert('success')// Replace 'NextScreen' with your actual screen name
        })
        .catch((error) => {
          // Handle Mailchimp operation failure if necessary
          console.error('Mailchimp Error:', error);
        });
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
            autoFocu
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
