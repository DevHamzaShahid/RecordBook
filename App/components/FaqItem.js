import React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {GlobalStyle, Constant, Fonts, Images} from '@common';
import {Card} from 'native-base';
import {Icon} from 'react-native-elements';

import {LargeText, SmallText} from '@Typography';
import {SolidButton} from '@Buttons';
import Label from './Label';

const FaqItem = props => {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View
        style={[
          props.isAdmin ? styles.fullCardStyle : styles.cardStyle,
          {backgroundColor: props.item.color},
        ]}>
        <LargeText>{props.item.question}</LargeText>
      </View>
    </TouchableHighlight>
  );
};
export default FaqItem;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    margin: 10,
    width: Constant.screenWidth / 3,
    height: Constant.screenWidth / 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 8,
  },
  fullCardStyle: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingVertical: 10,
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
});
