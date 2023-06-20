import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Constant, Fonts, Images} from '@common';
import {LargeText, SmallText} from '@Typography';
import {SolidButton} from '@Buttons';
import FastImage from 'react-native-fast-image';

const RoomItem = (props) => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={props.onPress}>
      <FastImage
        style={styles.image}
        source={{uri: props.banner, priority: FastImage.priority.normal}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LargeText textStyle={styles.textStyle}>{props.title}</LargeText>
      <SmallText textStyle={styles.subTextStyle}>{props.subtitle}</SmallText>
      <View style={styles.buttonContainer}>
        <SolidButton
          title="Edit"
          buttonStyle={styles.editBtnStyle}
          textStyle={styles.btnTextStyle}
          onPress={props.onPressEdit}
        />
        <SolidButton
          title="Delete"
          buttonStyle={styles.btnStyle}
          textStyle={styles.btnTextStyle}
          onPress={props.onPressDelete}
        />
        <SolidButton
          title="Book"
          buttonStyle={styles.bookBtnStyle}
          textStyle={styles.btnTextStyle}
          onPress={props.onPressBook}
        />
      </View>
    </TouchableOpacity>
  );
};
export default RoomItem;

const styles = StyleSheet.create({
  cardStyle: {
    // flexDirection: 'row',
    flex: 1,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.black,
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextStyle: {
    marginVertical: 4,
  },
  imageContainer: {
    flex: 1,
    height: '100%',
    width: Constant.screenWidth / 3,
  },
  image: {
    flex: 1,
    height: Constant.screenWidth / 2.5,
    width: Constant.screenWidth,
    borderRadius: 8,
    marginBottom: 5,
  },
  container: {
    flex: 2,
    padding: 5,
    marginLeft: 15,
  },
  editBtnStyle: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.greenDark,
  },
  bookBtnStyle: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.orange,
  },
  btnStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
