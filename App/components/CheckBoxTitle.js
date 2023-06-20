import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import {CheckBox} from 'react-native-elements';

const CheckBoxTitle = (props) => {
  return (
    <CheckBox
      size={props.size ? props.size : 20}
      checkedIcon="checkbox-blank"
      uncheckedIcon="checkbox-blank"
      iconType="material-community"
      wrapperStyle={{alignItems: 'flex-start'}}
      checkedColor={Colors.green}
      uncheckedColor={props.disable ? Colors.red : Colors.lightGray}
      containerStyle={styles.containerStyle}
      textStyle={props.disable ? styles.disableTextStyle : styles.textStyle}
      title={props.title}
      checked={props.checked}
      onPress={props.disable ? null : props.onPress}
    />
  );
};
export default CheckBoxTitle;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    padding: 2,
  },
  textStyle: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    fontWeight: '400',
  },
  disableTextStyle: {
    color: Colors.red,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    fontWeight: '400',
  },
});
