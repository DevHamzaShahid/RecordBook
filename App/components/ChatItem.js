import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Fonts, Colors} from '@common';
import {RegularText, SmallText} from '@Typography';
import moment from 'moment';

const ChatItem = props => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={props.onPress}>
      <SmallText textStyle={styles.dateText}>
        {moment(props.item.latestMessage.createdAt).format('LLL')}
      </SmallText>
      <RegularText textStyle={styles.textColor}>
        {props.item.latestMessage.senderName}
      </RegularText>
      <SmallText textStyle={styles.textColor}>
        {props.item.latestMessage.text}
      </SmallText>
    </TouchableOpacity>
  );
};
export default ChatItem;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextStyle: {
    marginVertical: 8,
  },
  container: {
    flex: 2.5,
    padding: 8,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  btnStyle: {
    borderRadius: 15,
    marginHorizontal: 8,
    marginVertical: 0,
    padding: 10,
  },
  btnTextStyle: {
    fontFamily: Fonts.type.medium,
  },
  textColor: {
    color: 'black',
    marginVertical: 5,
  },
  dateText:{
    color: 'gray',
    alignSelf: 'flex-end',
  }
});
