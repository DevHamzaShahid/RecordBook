import {SolidButton} from '@Buttons';
import {Images} from '@common';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import {RegularText, MediumText} from '@Typography';
import {Body, Container, Content, Left, ListItem} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import ListHeader from '../../components/ListHeader';
import SectionHeader from '../../components/SectionHeader';
import Actions from './reducer';
import styles from './styles';

const Profile = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const [subscribe, onCheckSubscribe] = useState(user.subscribed_newsletter);

  const dispatch = useDispatch();

  const onSubscribe = () => {
    if (!subscribe) {
      messaging()
        .subscribeToTopic('updates_discounts')
        .then(() => console.log('Subscribed to topic!'));
    } else {
      messaging()
        .unsubscribeFromTopic('updates_discounts')
        .then(() => console.log('Unsubscribed fom the topic!'));
    }
    dispatch(
      Actions.updateNewsLetterSubscription({
        subscribed_newsletter: !subscribe,
      }),
    );
    onCheckSubscribe(!subscribe);
  };

  const dummyNotification = () => {
    functions().httpsCallable('sendNotifications')({
      tokens: user.fcmToken,
      text:
        "Thanks for filling out an application to join the RecordBook community! You're application is currently under review and you will be notified when you are approved to schedule bookings!",
    });
  };

  useEffect(() => {
    if (user.avatar) {
      dispatch(Actions.downloadProfileImage());
    }
  }, []);

  const logout = () => {
    dispatch(Actions.logout());
  };
  const edit = () => {
    navigation.navigate('EditProfile');
  };

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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        dispatch(Actions.uploadProfileImage(source));
        dispatch(
          Actions.setUser({
            avatar: response.uri,
          }),
        );
      }
    });
  };

  return (
    <Container style={styles.container}>
      <SectionHeader
        title="Profile"
        icon1
        icon2
        onPressIcon1={edit}
        icon1Name="pencil"
        icon2Name="logout"
        onPressIcon2={logout}
      />
      <Content padder>
        <View style={styles.imageContainer}>
          <Image
            source={user.avatar ? {uri: user.avatar} : Images.user}
            style={styles.centerImage}
          />
          <TouchableOpacity onPress={changeImage}>
            <RegularText bold textStyle={styles.changeImageBtn}>
              Change Image
            </RegularText>
          </TouchableOpacity>
          <RegularText bold>{user.full_name}</RegularText>
        </View>
        <ListHeader title="Account Details" />
        <ListItem>
          <Left>
            <MediumText bold>Email</MediumText>
          </Left>
          <Body>
            <MediumText>{user.email}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>Username</MediumText>
          </Left>
          <Body>
            <MediumText>{user.user_name}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>Address</MediumText>
          </Left>
          <Body>
            <MediumText>{user.address}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>City</MediumText>
          </Left>
          <Body>
            <MediumText>{user.city}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>Zip Code</MediumText>
          </Left>
          <Body>
            <MediumText>{user.zip}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>Instagram</MediumText>
          </Left>
          <Body>
            <MediumText>{user.insta}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>TikTok</MediumText>
          </Left>
          <Body>
            <MediumText>{user.tikTok}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <MediumText bold>Spotify</MediumText>
          </Left>
          <Body>
            <MediumText>{user.spotify}</MediumText>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBoxTitle
            title="Check this box to receive last minute discounts, studio availability, and updates."
            checked={subscribe}
            onPress={() => onSubscribe()}
          />
        </ListItem>
        <SolidButton
          title="My Bookings"
          buttonStyle={styles.declineButtonStyle}
          onPress={() => navigation.navigate('My Bookings')}
          //onPress={() => dummyNotification()}
        />
      </Content>
    </Container>
  );
};

export default Profile;
