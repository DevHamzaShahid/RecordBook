import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {GlobalStyle, Colors, Fonts} from '@common';

const LargeText = props => (
  <Text style={[styles.textStyle, props.textStyle]} {...props}>
    {props.children}
  </Text>
);

export default memo(LargeText);

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.semiBold,
  },
});
