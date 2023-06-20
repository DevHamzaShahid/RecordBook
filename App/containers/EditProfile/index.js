import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from '../Profile/reducer';
import {SolidButton} from '@Buttons';
import {SmallText} from '@Typography';
import styles from './styles';
import is from 'is_js';
import microValidator from 'micro-validator';
import TopNav from '../../components/TopNav';
import TextInput from '../../components/TextInput';
import colors from '../../common/colors';
import {Colors} from '../../common';
import LinearGradient from 'react-native-linear-gradient';

const passwordValidationSchema = {
  password: {
    required: {
      errorMsg: 'Please enter Password',
    },
    regex: {
      pattern: /(?=^.{3,}$)/im,
      errorMsg: 'Password length must be greater than 2',
    },
  },
  newPassword: {
    required: {
      errorMsg: 'Please enter Password',
    },
    regex: {
      pattern: /(?=^.{3,}$)/im,
      errorMsg: 'Password length must be greater than 2',
    },
  },
};

const validationSchema = {
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

const EditProfile = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [lastName, onChangeLastName] = useState(user.last_name);
  const [firstName, onChangeFirstName] = useState(user.first_name);
  const [email, onChangeEmail] = useState(user.email);
  const [insta, onChangeInsta] = useState(user.insta);
  const [tikTok, onChangeTikTok] = useState(user.tikTok);
  const [spotify, onChangeSpotify] = useState(user.spotify);
  const [password, onChangePassword] = useState('');
  const [newPassword, onChangeNewPassword] = useState('');
  const [address, onChangeAddress] = useState(user.address);
  const dispatch = useDispatch();

  const save = () => {
    let updatePassword = password;
    const Errors = microValidator.validate(validationSchema, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
    });
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }

    if ((password !== '' || newPassword !== '') && user.password !== '') {
      const passErrors = microValidator.validate(passwordValidationSchema, {
        newPassword: newPassword,
        password: password,
      });

      if (!is.empty(passErrors)) {
        setErrors(passErrors);
        return;
      } else if (password === user.password) {
        updatePassword = newPassword;
      } else {
        Alert.alert('Password incorrect');
        return;
      }
    }
    if (user.password === '') {
      updatePassword = newPassword;
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
          address: address,
          email: email,
          insta: insta,
          tikTok: tikTok,
          spotify: spotify,
          password: updatePassword || user.password,
        },
        'Profile',
      ),
    );
  };

  return (
    <Container style={styles.container}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={{flex: 1}}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <TopNav
          showBack
          rightComp={() => (
            <Text style={styles.saveText} onPress={save}>
              Save
            </Text>
          )}
        />
        <Content style={styles.wrapper}>
          <Text style={styles.edit}>Edit Personal Info</Text>
          <TextInput
            title={'First Name'}
            value={firstName}
            error={errors.firstName && errors.firstName[0]}
            onChangeText={(text) => {
              onChangeFirstName(text);
              setErrors({});
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
            autoComplete="name"
            editable={false}
          />

          <TextInput
            title={'Last Name'}
            value={lastName}
            error={errors.lastName && errors.lastName[0]}
            onChangeText={(text) => {
              onChangeLastName(text);
              setErrors({});
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
            autoComplete="family-name"
            editable={false}
          />

          <TextInput
            // editable={user.admin}
            title={'Email Address'}
            value={email}
            error={errors.email && errors.email[0]}
            onChangeText={(text) => {
              onChangeEmail(text);
              setErrors({});
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
            autoComplete="email"
          />

          <TextInput
            title={'Address'}
            value={address}
            error={errors.address && errors.address[0]}
            onChangeText={(text) => {
              onChangeAddress(text);
              setErrors({});
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
            autoComplete="address-line1"
          />

          <TextInput
            title={'Instagram Username'}
            value={insta}
            onChangeText={(text) => {
              onChangeInsta(text);
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
          />

          <TextInput
            title={'TikTok Username'}
            value={tikTok}
            onChangeText={(text) => {
              onChangeTikTok(text);
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
          />

          <TextInput
            title={'Spotify Username'}
            value={spotify}
            onChangeText={(text) => {
              onChangeSpotify(text);
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
          />

          {!!user.password && (
            <TextInput
              secureTextEntry
              title={'Password'}
              value={password}
              error={errors.password && errors.password[0]}
              onChangeText={(text) => {
                onChangePassword(text);
                setErrors({});
              }}
              borderActiveColor={colors.skyBlue01}
              borderColor={Colors.lightGray}
              borderBottomWidth={2}
            />
          )}

          <TextInput
            secureTextEntry
            title={'New Password'}
            value={newPassword}
            error={errors.password && errors.password[0]}
            onChangeText={(text) => {
              onChangeNewPassword(text);
              setErrors({});
            }}
            borderActiveColor={colors.skyBlue01}
            borderColor={Colors.lightGray}
            borderBottomWidth={2}
          />

          <View style={styles.view} />
        </Content>
      </LinearGradient>
    </Container>
  );
};

export default EditProfile;
