import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import functions from '@react-native-firebase/functions';
import { Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, ListItem, Left, Body } from 'native-base';
import { GlobalStyle, Images, Colors } from '@common';
import { SolidButton } from '@Buttons';
import { SmallText, LargeText } from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import TextField from '../../components/TextField';
import Actions from '../AddRoom/reducer';
import styles from './styles';
import FcmApi from '../../services/fcmApi';

const SendNotification = ({ route, navigation }) => {
  const { editMode } = route.params;
  const user = useSelector((state) => state.user.selectedUser);
  const room = useSelector(state => state.room);
  const promo = editMode ? room.editPromo : room.promo;

  const [title, onChangeTitle] = useState(promo ? promo.code : '');
  const [titleError, setTitleError] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => { });

  const clearErrors = () => {
    setMessageError('');
    setTitleError('');
  };


  const send = async () => {
    if (title === '') {
      setTitleError('Please enter title');
      return;
    }

    if (message === '') {
      setMessageError('Please enter Message');
      return;
    };
    console.log(user.fcmToken, "user.fcmToken,")
    functions().httpsCallable('sendNotifications')({
      user_name: title,
      tokens: user.fcmToken,
      text: message,
    });
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <SectionHeader title={`Send Notication`} />
      <Content padder onPress={() => Keyboard.dismiss()}>
        <TextField
          value={title}
          placeHolder="Title"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => {
            onChangeTitle(text);
            clearErrors();
          }}
        />
        <SmallText textStyle={styles.error} bold>
          {titleError}
        </SmallText>
        <TextField
          textInputStyle={{ minHeight: 150 }}
          value={message}
          multiline={true}
          placeHolder="Message"
          numberOfLines={5}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => {
            setMessage(text);
            clearErrors();
          }}
        />


        <SmallText textStyle={styles.error} bold>
          {messageError}
        </SmallText>

      </Content>
      <SolidButton
        title="Send"
        buttonStyle={styles.btnStyle}
        textStyle={styles.btnTextStyle}
        onPress={send}
      />
    </Container>
  );
};

export default SendNotification;
