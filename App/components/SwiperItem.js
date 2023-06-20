import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {Fonts} from '@common';
import FastImage from 'react-native-fast-image';
import {Constant} from '../common';
import {Image} from 'react-native';

const SwiperItem = (props) => {
  return (
    <Pressable style={styles.cardStyle} onPress={props.onPress}>
      {/* <FastImage
        style={[styles.image, props.style]}
        source={{
          uri: props.imagePath,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      /> */}
      <Image
        style={[styles.image, props.style]}
        source={{
          uri: props.imagePath,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}></Image>
    </Pressable>
  );
};
export default SwiperItem;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 5,
    height: (Constant.screenWidth * 9) / 16,
    width: Constant.screenWidth,
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextStyle: {
    marginVertical: 8,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});
