import { SolidButton } from '@Buttons';
import { Images } from '@common';
import functions from '@react-native-firebase/functions';
import { RegularText } from '@Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../Profile/reducer';
import BerbixSdk from 'berbix-react-native';
import styles from './styles';
import TopNav from '../../components/TopNav';
import MediumText from '../../components/Typography/MediumText';
import UploadImageButton from './UploadImageButton';
import { Content } from 'native-base';
import colors from '../../common/colors';
import ExampleImage from './ExampleImage';
import AppActions from '../Root/reducer';
import ImagePickerBox from '../../components/ImagePickerBox';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
// import { PERMISSIONS, request } from 'react-native-permissions';
import { Berbix } from 'berbix-react-native'
if (__DEV__) {
  functions().useFunctionsEmulator('http://localhost:5001');
}

const UploadProfileImage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showExampleImage, setShowExampleImage] = useState(false);
  //picker
  // const {selectedImages, setIsImagesModified} = props;
  const [imageList, setImageList] = useState([]);
  const [selfie, setSelfie] = useState([]);
  const [isValue, setIsValue] = useState(false);


  const user = useSelector((state) => state.user);
  const userRefreshToken = useRef('');
  const [config, setConfig] = useState({});

  const saveRefreshToken = useCallback(() => {
    dispatch(
      Actions.updateBio({
        userBerbixRefreshToken: userRefreshToken.current,
      }),
    );
  }, []);
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };
  const changeImage = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri, id: `${imageList.length}`, name: response.fileName, type: response.type };
        // selectedImages([...imageList, source]);
        console.log('imageresp', response);
        setImageList([source]);
        setIsValue(!isValue);
        // setIsImagesModified(true);
      }
    });
  };
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri, id: `${imageList.length}`, name: response.fileName, type: response.type };
        console.log('responseselfie', JSON.stringify(response));
        setSelfie([source])
      }
    });
  }
  async function requestCameraPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          cameraLaunch()
        } else {
          console.log('Camera permission denied');
        }
      } else {
        console.log('Camera permission not required on iOS');
      }
    } catch (err) {
      console.warn('Failed to request camera permission:', err);
    }
  }
  // dummy data
  // {
  //   full_name: user?.full_name,
  //   last_name: user?.last_name,
  //   email: user?.email
  // }
  const payload = {
    idCardPhoto: imageList,
    // selfiePhoto: selfie,
    // Additional user information
    name: user?.first_name,
    email: user?.email
  };

  const testBerbix = () => {
    if (imageList?.length == 0 || selfie.length == 0) {
      alert('please upload id card or selfie you are missing')
    }
    else {
      alert('docs sent')
    }
  }

  // useEffect(() => {
  //   dispatch(AppActions.loading(true));
  // functions()
  //   .httpsCallable('getBerbixClientToken')(user)
  //     .then((response) => {
  //       console.log("response berbix", response);
  //       userRefreshToken.current = response.data.refreshToken;
  //       saveRefreshToken();
  //       setConfig({ clientToken: response.data.clientToken });
  //       dispatch(AppActions.loading(false));
  //       alert(JSON.stringify(response));
  //     })
  //     .catch((err) => {
  //       dispatch(AppActions.loading(false));
  //       console.error(err, 'berbix');
  //       // alert(response.data.clientToken);
  //     });
  // }, []);

  // const saveAndContinue = () => {
  //   // Mail to admin.
  //   // functions().httpsCallable('sendEmail')({
  //   //   to: user.adminDetail.email,
  //   //   message: {
  //   //     subject: `RecordBook - Approval request for ${user.user_name}`,
  //   //     text: `RecordBook Admin Notification:\n\n${user.user_name} has requested approval for the app. Please review and approve in the admin panel.\n\n-The RecordBook Team`,
  //   //   },
  //   // });
  //   // Mail to user.
  //   functions().httpsCallable('sendEmail')({
  //     to: user.email,
  //     message: {
  //       subject: 'RecordBook - Thank you for registering!',
  //       text: 'Thank you for registering on the RecordBook app. Your registration is being reviewed and you will be approved shortly.\n\n\nThank you.\n-The RecordBook Team',
  //     },
  //   });
  //   functions().httpsCallable('sendNotifications')({
  //     user_name: 'New user',
  //     tokens: user.adminDetail.fcmToken,
  //     text: 'You have a new applicant waiting to be approved!',
  //   });
  //   functions().httpsCallable('sendNotifications')({
  //     tokens: user.fcmToken,
  //     text: "Thanks for filling out an application to join the RecordBook community! You're application is currently under review and you will be notified when you are approved to schedule bookings!",
  //   });

  //   dispatch(Actions.uploadProfileImage('', 'HomeTab'));
  // };

  // const startFlow = useCallback(async () => {
  //   try {
  //     await BerbixSdk.startFlow(config);
  //     saveAndContinue();
  //   } catch (err) {
  //     console.error(err.domain || err.message);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.signBGBlur} style={styles.signBG} />
      <TopNav title={'Photo ID Required'} />

      <Content style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <RegularText bold textStyle={styles.topTextStyle}>
          Photo ID
        </RegularText>
        <MediumText textStyle={styles.descText}>
          We require a photo of the front of your ID to verify your
          identification through Berbix in the event of any incidentals.
        </MediumText>
        <UploadImageButton imageList={imageList} onPress={() => { imageList && changeImage() }} title={'Upload image of ID'} />
        <View style={styles.separator} />
        <RegularText bold textStyle={styles.topTextStyle}>
          Selfie with Photo ID
        </RegularText>
        <MediumText textStyle={styles.descText}>
          Let’s make sure it’s really you. We require an additional photo of
          you, holding up your ID to verify you are the person on the ID. Please
          remove any sunglasses or hats.{' '}
          <Text
            style={styles.exampleImage}
            onPress={() => setShowExampleImage(true)}>
            Example Image
          </Text>
        </MediumText>
        <UploadImageButton imageList={selfie} onPress={requestCameraPermission} title={'Upload Selfie with ID'} />
      </Content>

      <SafeAreaView style={styles.viewButton}>
        <SolidButton
          colors={[colors.offWhite, colors.offWhite]}
          buttonStyle={styles.laterButton}
          textStyle={styles.laterText}
          title="Do this later"
          onPress={() => {
            navigation.popToTop();
            navigation.navigate('HomeTab');
          }}
        />
        <SolidButton
          buttonStyle={styles.submitButton}
          title="Submit"
          onPress={testBerbix}
        />
      </SafeAreaView>

      <ExampleImage
        isVisible={showExampleImage}
        onClose={() => setShowExampleImage(false)}
      />
    </View>
  );
};

export default UploadProfileImage;
