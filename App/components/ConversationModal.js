import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import {ListItem, Thumbnail, Left, Body, Right} from 'native-base';
import {Fonts, Images, Colors} from '@common';
import {RegularText} from '@Typography';
import {Icon} from 'react-native-elements';
import {getDownloadURL} from '../utils/storage';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
// Use a local emulator in development
// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }

const ConversationModal = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [adminAvatar, setAdminAvatar] = useState(null);

  useEffect(() => {
    getAdminImage();

    const messagesListener = firestore()
      .collection('messages')
      .doc(user.uid)
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
      .doc(user.uid)
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
      .doc(user.uid)
      .set(
        {
          userId: user.uid,
          fcmToken: firestore.FieldValue.arrayUnion(user.fcmToken),
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
            senderName: user.full_name,
          },
        },
        {merge: true},
      );
    functions().httpsCallable('sendNotifications')({
      user_name: user.full_name,
      tokens: user.adminDetail.fcmToken,
      text: text,
    });
  }

  const getAdminImage = async () => {
    if (user.adminDetail.avatar) {
      await getDownloadURL(`profile/${user.adminDetail.avatar}`)
        .then(downloadURL => {
          setAdminAvatar({uri: downloadURL});
        })
        .catch(error => {
          setAdminAvatar(null);
        });
    }
  };

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
    <SafeAreaView>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setModalVisible(!modalVisible)}>
        <Image source={Images.chat} style={styles.logo} resizeMode="contain" />
        <RegularText bold textStyle={styles.textStyle}>
          Start a conversation
        </RegularText>
        <Icon name="keyboard-arrow-up" color="white" size={30} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.semiTransparent} />
        <View style={styles.container}>
          <ListItem avatar noBorder>
            <Left>
              <Thumbnail
                source={adminAvatar ? adminAvatar : Images.HitHouselogo}
              />
            </Left>
            <Body>
              <RegularText bold>
                {user.adminDetail && user.adminDetail.name}
              </RegularText>
              <RegularText>How may I help you ?</RegularText>
            </Body>
            <Right style={{justifyContent: 'center'}}>
              <Icon
                name="keyboard-arrow-down"
                color="white"
                size={40}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </Right>
          </ListItem>
          <View style={styles.line} />
          <GiftedChat
            alwaysShowSend
            messages={messages}
            renderBubble={renderBubble}
            renderSend={renderSend}
            minInputToolbarHeight={70}
            placeholder="Type a message"
            textInputStyle={styles.textInputStyle}
            renderInputToolbar={renderInputToolbar}
            onSend={onSend}
            renderAvatar={null}
            user={{
              _id: user.uid,
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ConversationModal;

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 5,
    backgroundColor: Colors.red,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    margin: 5,
  },
  textStyle: {
    marginRight: 20,
  },
  semiTransparent: {
    flex: 1,
    backgroundColor: Colors.semiTransparent,
  },
  container: {
    flex: 5,
    backgroundColor: Colors.tabBarColor,
  },
  line: {
    marginHorizontal: 15,
    marginVertical: 10,
    height: 1,
    backgroundColor: Colors.white,
  },
  send: {
    backgroundColor: Colors.mediumGray,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInputStyle: {
    backgroundColor: 'white',
    fontFamily: Fonts.type.Regular,
    fontSize: 17,
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
