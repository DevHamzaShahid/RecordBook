import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Constant, Fonts, Colors} from '@common';
import {LargeText, SmallText} from '@Typography';
import SwiperItem from '../components/SwiperItem';
import Swiper from 'react-native-swiper';

const StudioItem = (props) => {
  return (
    <View style={styles.cardStyle}>
      <Swiper
        style={styles.wrapper}
        dotColor="white"
        removeClippedSubviews={false}
        activeDotColor={Colors.red}>
        {props.imageUrls.map((aImage, index) => {
          return (
            <SwiperItem
              key={index}
              imagePath={aImage}
              onPress={props.onPress}
            />
          );
        })}
      </Swiper>
      <TouchableOpacity style={styles.btnStyle} onPress={props.onPress}>
        <View style={styles.container}>
          <LargeText textStyle={styles.textStyle}>{props.title}</LargeText>
          <SmallText textStyle={styles.subTextStyle}>
            {props.subtitle.split('.').join('.\n')}
          </SmallText>
        </View>
        <LargeText textStyle={styles.rateStyle}>{props.rate}</LargeText>
      </TouchableOpacity>
    </View>
  );
};
export default StudioItem;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  btnStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  rateStyle: {
    fontFamily: Fonts.type.medium,
    textAlign: 'right',
  },
  subTextStyle: {
    marginVertical: 8,
    fontFamily: Fonts.type.italic,
  },
  image: {
    flex: 1,
    height: '100%',
    borderRadius: 8,
  },
  container: {
    flex: 2,
  },
  imageContainer: {
    flex: 1,
    height: Constant.screenWidth / 2,
    width: '100%',
  },
  wrapper: {
    height: Constant.screenWidth / 2,
  },
});
