import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Fonts, Colors} from '@common';
import {RegularText, SmallText} from '@Typography';
import moment from 'moment';

const UserItem = props => {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.cardStyle}>
        <RegularText textStyle={styles.textColor}>
          {props.item.full_name}
        </RegularText>
        <SmallText textStyle={styles.textColor}>
          {props.item.user_approved ? 'User Approved' : 'Pending for Approval'}
        </SmallText>
      </View>
    </TouchableHighlight>
  );
};
export default UserItem;

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
  dateText: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
});
