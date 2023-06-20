import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {GlobalStyle, Colors, Fonts, Images} from '@common';
import {LargeText, SmallText} from '@Typography';
import Label from './Label';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const AdminBookingItem = (props) => {
  return (
    <TouchableHighlight style={styles.cardStyle} onPress={props.onPress}>
      <>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{uri: props.banner, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.titlePriceContainer}>
            <LargeText textStyle={styles.textStyle}>
              {props.studio.title}
            </LargeText>
            <LargeText>${props.item.amount - props.item.discount}</LargeText>
          </View>
          <SmallText textStyle={styles.subTextStyle}>
            By: {props.user}
          </SmallText>
          <View style={styles.titlePriceContainer}>
            <Label title={moment(props.item.date).format('LL')} />
            <Label title={props.item.time} />
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};
export default AdminBookingItem;

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: Colors.tabBarColor,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextStyle: {
    marginVertical: 8,
    marginLeft: 5,
  },
  image: {
    flex: 1,
    height: '100%',
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    height: '100%',
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
