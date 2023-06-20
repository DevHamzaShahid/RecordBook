import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import Actions from '../Profile/reducer';
import {Container, Content} from 'native-base';
import {SolidButton} from '@Buttons';
import {XLText, SmallText} from '@Typography';
import TextField from '../../components/TextField';
import Badge from '../../components/Badge';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import microValidator from 'micro-validator';
import messaging from '@react-native-firebase/messaging';
import is from 'is_js';
import styles from './styles';

const validationSchema = {
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
  userName: {
    required: {
      errorMsg: `UserName is required`,
    },
  },
  address: {
    required: {
      errorMsg: `Address is required`,
    },
  },
  city: {
    required: {
      errorMsg: `City is required`,
    },
  },
  zipCode: {
    required: {
      errorMsg: `ZipCode is required`,
    },
  },
};

const Bio = ({navigation}) => {
  const [errors, setErrors] = useState({});
  const [fullName, onChangeFullName] = useState('');
  const [userName, onChangeUsername] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [firstName, onChangeFirstName] = useState('');
  const [insta, onChangeInsta] = useState('');
  const [tikTok, onChangeTikTok] = useState('');
  const [spotify, onChangeSpotify] = useState('');
  const [address, onChangeAddress] = useState('');
  const [city, onChangeCity] = useState('');
  const [zipCode, onChangeZipCode] = useState('');
  const [subscribe, onCheckSubscribe] = useState(false);

  const dispatch = useDispatch();

  const save = () => {
    const Errors = microValidator.validate(validationSchema, {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      address: address,
      city,
      zipCode,
    });
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }
    dispatch(
      Actions.updateBio(
        {
          first_name: firstName,
          last_name: lastName,
          full_name: firstName
            ? firstName
            : '' + ' ' + lastName
            ? lastName
            : '',
          user_name: userName,
          address: address,
          city: city,
          zip: zipCode,
          insta: insta,
          tikTok: tikTok,
          spotify: spotify,
          subscribed_newsletter: subscribe,
        },
        'UploadProfileImage',
      ),
    );
  };

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
    onCheckSubscribe(!subscribe);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.badgeContainer}>
          <Badge count="1" />
          <Badge count="2" selected />
          <Badge count="3" />
        </View>
        <XLText bold textStyle={styles.topTextStyle}>
          Add Bio
        </XLText>
        <View>
          <TextField
            placeHolder="First name"
            autoCorrect={false}
            value={firstName}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeFirstName(text);
              setErrors({});
            }}
          />
          {errors.firstName && (
            <SmallText textStyle={styles.error} bold>
              {errors.firstName && errors.firstName[0]}
            </SmallText>
          )}
          <TextField
            placeHolder="Last name"
            autoCorrect={false}
            value={lastName}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeLastName(text);
              setErrors({});
            }}
          />
          {errors.lastName && (
            <SmallText textStyle={styles.error} bold>
              {errors.lastName && errors.lastName[0]}
            </SmallText>
          )}
          <TextField
            placeHolder="Username"
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={10}
            value={userName}
            onChangeText={(text) => {
              onChangeUsername(text);
              setErrors({});
            }}
          />
          {errors.userName && (
            <SmallText textStyle={styles.error} bold>
              {errors.userName && errors.userName[0]}
            </SmallText>
          )}
          <TextField
            placeHolder="Address"
            autoCorrect={false}
            maxLength={25}
            autoCapitalize="none"
            value={address}
            onChangeText={(text) => {
              onChangeAddress(text);
              setErrors({});
            }}
          />
          {errors.address && (
            <SmallText textStyle={styles.error} bold>
              {errors.address && errors.address[0]}
            </SmallText>
          )}
          <TextField
            placeHolder="City"
            autoCorrect={false}
            autoCapitalize="none"
            value={city}
            onChangeText={(text) => {
              onChangeCity(text);
              setErrors({});
            }}
          />
          {errors.city && (
            <SmallText textStyle={styles.error} bold>
              {errors.city && errors.city[0]}
            </SmallText>
          )}
          <TextField
            placeHolder="ZipCode"
            autoCorrect={false}
            keyboardType={'number-pad'}
            autoCapitalize="none"
            value={zipCode}
            onChangeText={(text) => {
              onChangeZipCode(text);
              setErrors({});
            }}
          />
          {errors.zipCode && (
            <SmallText textStyle={styles.error} bold>
              {errors.zipCode && errors.zipCode[0]}
            </SmallText>
          )}
          <TextField
            placeHolder="Instagram user name"
            autoCorrect={false}
            value={insta}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeInsta(text);
              setErrors({});
            }}
          />
          <TextField
            placeHolder="TikTok user name"
            autoCorrect={false}
            value={tikTok}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeTikTok(text);
              setErrors({});
            }}
          />
          <TextField
            placeHolder="Spotify user name"
            autoCorrect={false}
            value={spotify}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeSpotify(text);
              setErrors({});
            }}
          />

          <CheckBoxTitle
            title="Enable this for the latest RecordBook deals!"
            checked={subscribe}
            onPress={() => onSubscribe()}
          />
        </View>
      </Content>
      <SolidButton onPress={save} title="Save" />
    </Container>
  );
};

export default Bio;
