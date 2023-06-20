import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {GlobalStyle, Constant, Fonts, Images} from '@common';
import FastImage from 'react-native-fast-image';

const ImageItem = (props) => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={props.onPress}>
      <FastImage
        style={styles.image}
        source={{uri: props.imagePath, priority: FastImage.priority.normal}}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};
export default ImageItem;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    margin: 10,
    height: Constant.screenWidth / 3,
    width: Constant.screenWidth / 3,
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextStyle: {
    marginVertical: 8,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    height: Constant.screenWidth / 3,
    width: Constant.screenWidth / 3,
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
