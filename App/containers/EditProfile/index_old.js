import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, TouchableOpacity, View} from 'react-native';
import {Container, ListItem, Left, Body, Content} from 'native-base';
import Actions from '../Profile/reducer';
import {Images} from '@common';
import {SolidButton} from '@Buttons';
import {RegularText, SmallText} from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import styles from './styles';
import TextField from '../../components/TextField';
import is from 'is_js';
import microValidator from 'micro-validator';

const validationSchema = {
  email: {
    required: {
      errorMsg: `Email is required`,
    },
    email: {
      errorMsg: `Enter a valid email`,
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

const EditProfile = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [fullName, onChangeFullName] = useState(user.full_name);
  const [userName, onChangeUsername] = useState(user.user_name);
  const [lastName, onChangeLastName] = useState(user.last_name);
  const [firstName, onChangeFirstName] = useState(user.first_name);
  const [email, onChangeEmail] = useState(user.email);
  const [insta, onChangeInsta] = useState(user.insta);
  const [tikTok, onChangeTikTok] = useState(user.tikTok);
  const [spotify, onChangeSpotify] = useState(user.spotify);
  const [address, onChangeAddress] = useState(user.address);
  const [city, onChangeCity] = useState(user.city);
  const [zipCode, onChangeZipCode] = useState(user.zipCode);
  const dispatch = useDispatch();
  const save = () => {
    const Errors = microValidator.validate(validationSchema, {
      email: email,
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
      Actions.updateBio({
        first_name: firstName,
        last_name: lastName,
        full_name: firstName ? firstName : '' + ' ' + lastName ? lastName : '',
        user_name: userName,
        address: address,
        city: city,
        zip: zipCode,
        email: email,
        insta: insta,
        tikTok: tikTok,
        spotify: spotify,
      }),
    );
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <SectionHeader title="Edit Profile" />
      <Content padder>
        <View>
          <TextField
            placeHolder="First Name*"
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
            placeHolder="Last Name*"
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
            placeHolder="Username*"
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
            placeHolder="Email Address*"
            autoCorrect={false}
            editable={user.admin}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              onChangeEmail(text);
              setErrors({});
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {errors.email && errors.email[0]}
          </SmallText>
          <TextField
            placeHolder="Address*"
            autoCorrect={false}
            maxLength={25}
            // editable={user.admin}
            autoCapitalize="none"
            value={address}
            onChangeText={(text) => {
              onChangeAddress(text);
              setErrors({});
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {errors.address && errors.address[0]}
          </SmallText>
          <TextField
            placeHolder="City*"
            autoCorrect={false}
            // editable={user.admin}
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
            placeHolder="Zip Code*"
            autoCorrect={false}
            keyboardType={'number-pad'}
            // editable={user.admin}
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
            placeHolder="Instagram Username"
            autoCorrect={false}
            value={insta}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeInsta(text);
              setErrors({});
            }}
          />
          <TextField
            placeHolder="TikTok Username"
            autoCorrect={false}
            value={tikTok}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeTikTok(text);
              setErrors({});
            }}
          />
          <TextField
            placeHolder="Spotify Username"
            autoCorrect={false}
            value={spotify}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeSpotify(text);
              setErrors({});
            }}
          />
        </View>
      </Content>
      <SmallText
        textStyle={[styles.declineButtonStyle, {textAlign: 'center'}]}
        bold>
        For Quicker Approval Fill Out All Fields
      </SmallText>
      <SolidButton
        title="Save"
        buttonStyle={styles.declineButtonStyle}
        onPress={save}
      />
    </Container>
  );
};

export default EditProfile;
