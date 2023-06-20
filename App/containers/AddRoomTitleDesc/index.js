import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content } from 'native-base';
import { SolidButton } from '@Buttons';
import { SmallText } from '@Typography';

import SectionHeader from '../../components/SectionHeader';
import TextField from '../../components/TextField';
import microValidator from 'micro-validator';
import is from 'is_js';
import Actions from '../AddRoom/reducer';

import styles from './styles';
import { SafeAreaView } from 'react-native';
import { Colors } from '../../common';

const validationSchema = {
  header: {
    required: {
      errorMsg: 'Please enter header',
    },
  },
  detail: {
    required: {
      errorMsg: 'Please enter detail',
    },
  },
};

const AddRoomTitleDesc = ({ route, navigation }) => {
  const { editMode } = route.params;
  const user = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  useEffect(() => { });

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
    formData['id'] = `${Date.now()}`;

    dispatch(
      editMode
        ? Actions.addEditRoomTitleDesc(formData)
        : Actions.addRoomTitleDesc(formData),
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: Colors.black,
    }}>
      <Container style={styles.container}>
        <SectionHeader title="Description" />
        <Content padder>
          <TextField
            placeHolder="Header"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => {
              handleChange(text, 'header');
              setErrors({});
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {errors.header && errors.header[0]}
          </SmallText>
          <TextField
            placeHolder="Detail"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            textInputStyle={styles.description}
            onChangeText={text => {
              handleChange(text, 'detail');
              setErrors({});
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {errors.detail && errors.detail[0]}
          </SmallText>
          <SolidButton
            title="Save"
            textStyle={styles.btnTextStyle}
            onPress={save}
          />
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default AddRoomTitleDesc;
