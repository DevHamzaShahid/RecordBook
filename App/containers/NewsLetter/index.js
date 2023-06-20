import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Content} from 'native-base';
import {SolidButton} from '@Buttons';
import {SmallText} from '@Typography';

import SectionHeader from '../../components/SectionHeader';
import TextField from '../../components/TextField';
import microValidator from 'micro-validator';
import is from 'is_js';
import functions from '@react-native-firebase/functions';
import styles from './styles';
// Use a local emulator in development
// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }
const validationSchema = {
  title: {
    required: {
      errorMsg: 'Please enter title',
    },
  },
  text: {
    required: {
      errorMsg: 'Please enter message',
    },
  },
};

const NewsLetter = ({navigation}) => {
  const user = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {});

  const handleChange = (event, key) => {
    formData[key] = event;
    setFormData(formData);
  };

  const save = () => {
    const Errors = microValidator.validate(validationSchema, formData);
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }
    functions().httpsCallable('sendNotificationsToAll')(formData);
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <SectionHeader title="Send Newsletter" />
      <Content padder>
        <TextField
          placeHolder="Title"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => {
            handleChange(text, 'title');
            setErrors({});
          }}
        />
        <SmallText textStyle={styles.error} bold>
          {errors.header && errors.header[0]}
        </SmallText>
        <TextField
          placeHolder="Message"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          textInputStyle={styles.description}
          onChangeText={text => {
            handleChange(text, 'text');
            setErrors({});
          }}
        />
        <SmallText textStyle={styles.error} bold>
          {errors.detail && errors.detail[0]}
        </SmallText>
        <SolidButton
          title="Send"
          textStyle={styles.btnTextStyle}
          onPress={save}
        />
      </Content>
    </Container>
  );
};

export default NewsLetter;
