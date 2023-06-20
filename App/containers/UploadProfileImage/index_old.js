import {SolidButton} from '@Buttons';
import {Images} from '@common';
import functions from '@react-native-firebase/functions';
import {RegularText, XLText} from '@Typography';
import React, {useEffect, useState, useRef} from 'react';
import {Alert, Image, View, Text, Button, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import AppActions from '../Root/reducer';
import Badge from '../../components/Badge';
import Actions from '../Profile/reducer';
import BerbixSdk from 'berbix-react-native';
import styles from './styles';

// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }

const UploadProfileImage = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userRefreshToken = useRef('');
  const [config, setConfig] = useState({});
  useEffect(() => {
    dispatch(AppActions.loading(true));
    functions()
      .httpsCallable('getBerbixClientToken')(user)
      .then((response) => {
        userRefreshToken.current = response.data.refreshToken;
        saveRefreshToken();
        setConfig({clientToken: response.data.clientToken});
        dispatch(AppActions.loading(false));
      })
      .catch((err) => {
        dispatch(AppActions.loading(false));
        console.error(err, 'berbix');
      });
  }, []);

  function saveRefreshToken() {
    dispatch(
      Actions.updateBio({
        userBerbixRefreshToken: userRefreshToken.current,
      }),
    );
  }

  const saveAndContinue = () => {
    // Mail to admin.
    functions().httpsCallable('sendEmail')({
      to: user.adminDetail.email,
      message: {
        subject: `RecordBook - Approval request for ${user.user_name}`,
        text: `RecordBook Admin Notification:\n\n${user.user_name} has requested approval for the app. Please review and approve in the admin panel.\n\n-The RecordBook Team`,
      },
    });
    // Mail to user.
    functions().httpsCallable('sendEmail')({
      to: user.email,
      message: {
        subject: 'RecordBook - Thank you for registering!',
        text: 'Thank you for registering on the RecordBook app. Your registration is being reviewed and you will be approved shortly.\n\n\nThank you.\n-The RecordBook Team',
      },
    });
    functions().httpsCallable('sendNotifications')({
      user_name: 'New user',
      tokens: user.adminDetail.fcmToken,
      text: 'You have a new applicant waiting to be approved!',
    });
    functions().httpsCallable('sendNotifications')({
      tokens: user.fcmToken,
      text: "Thanks for filling out an application to join the RecordBook community! You're application is currently under review and you will be notified when you are approved to schedule bookings!",
    });
    dispatch(Actions.uploadProfileImage('', 'RegistrationSuccess'));
  };

  const startFlow = async () => {
    try {
      await BerbixSdk.startFlow(config);
      saveAndContinue();
    } catch (err) {
      console.error(err.domain || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <Badge count="1" />
        <Badge count="2" />
        <Badge count="3" selected />
      </View>
      <XLText bold textStyle={styles.topTextStyle}>
        Upload Your {'\n'} ID
      </XLText>
      <RegularText textStyle={styles.bottomTextStyle}>
        You don't have to share everything but {'\n'} only if you'd like to.
      </RegularText>
      <SolidButton title="Upload id" onPress={startFlow} />
    </View>
  );
};

export default UploadProfileImage;
