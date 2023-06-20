import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View, Platform, KeyboardAvoidingView} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from './reducer';
import {Colors} from '@common';
import {RegularText} from '@Typography';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import {ListItem, Thumbnail, Left, Body, Right} from 'native-base';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import FcmApi from '../../services/fcmApi';


import styles from './styles';
const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const faq = useSelector(state => state.faq);
  const user = useSelector(state => state.user);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesListener = firestore()
      .collection('messages')
      .doc(faq.selectedUser.userId)
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  async function onSend(messageArray) {
    const text = messageArray[0].text;

    firestore()
      .collection('messages')
      .doc(faq.selectedUser.userId)
      .collection('chat')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          phone: user.phone,
        },
      });
    await firestore()
      .collection('messages')
      .doc(faq.selectedUser.userId)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
    functions().httpsCallable('sendNotifications')({
      user_name: 'Support',
      tokens: faq.selectedUser.fcmToken,
      text: text,
    });
  }

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.red,
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <Icon name="send" raised color="black" size={20} />
      </Send>
    );
  };

  const renderInputToolbar = props => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.containerStyle}
        renderComposer={props1 => (
          <Composer {...props1} textInputStyle={styles.textInputStyle} />
        )}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <ListItem avatar noBorder>
        <Body>
          <RegularText>{faq.selectedUser.latestMessage.senderName}</RegularText>
        </Body>
      </ListItem>
      <View style={styles.line} />
      <GiftedChat
        alwaysShowSend
        scrollToBottom
        messages={messages}
        renderBubble={renderBubble}
        renderSend={renderSend}
        placeholder="Type a message"
        textInputStyle={styles.textInputStyle}
        renderInputToolbar={renderInputToolbar}
        onSend={onSend}
        minInputToolbarHeight={70}
        renderAvatar={null}
        user={{
          _id: user.uid,
        }}
      />
    </Container>
  );
};

export default Chat;
