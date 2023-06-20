import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Actions from '../Profile/reducer';
import {SolidButton} from '@Buttons';
import {MediumText, RegularText, XLText, SmallText} from '@Typography';
import styles from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const PhoneVerification = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [errors, setErrors] = useState('');
  const [code, setCode] = useState('');
  const continuePressed = () => {
    if (code === '') {
      setErrors('Please enter correct verification code');
      return;
    }
    dispatch(Actions.verifyCode(code));
  };

  const resend = () => {
    dispatch(Actions.login(user.phone));
  };

  useEffect(() => {});
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <XLText bold textStyle={styles.topTextStyle}>
          Phone Verification
        </XLText>
        <RegularText textStyle={styles.bottomTextStyle}>
          The verification code was send to your provided phone number{'\n'}
          {user.phone}
        </RegularText>
        <View style={styles.verification}>
          <OTPInputView
            style={{width: '100%', height: 100}}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={codeEntered => {
              console.log(`Code is ${codeEntered}, you are good to go!`);
              setCode(codeEntered);
            }}
          />
        </View>
        <SmallText textStyle={styles.error} bold>
          {errors}
        </SmallText>
        <MediumText textStyle={styles.topTextStyle}>
          Didn't get the code?
        </MediumText>
        <TouchableOpacity onPress={resend}>
          <RegularText textStyle={styles.resendBtn}>Resend</RegularText>
        </TouchableOpacity>
        <SolidButton title="Continue" onPress={continuePressed} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneVerification;
