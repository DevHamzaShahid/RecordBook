import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {GlobalStyle, Images, Colors, Fonts} from '@common';

const XLText = (props) => (
  <Text
    style={[
      styles.textStyle,
      props.textStyle,
      {fontWeight: props.bold ? '600' : '400'},
    ]}
    {...props}>
    {props.children}
  </Text>
);

XLText.propTypes = {
  bold: PropTypes.bool,
};
XLText.defaultProps = {
  bold: false,
};
export default memo(XLText);
const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
    fontSize: Fonts.size.xl,
    fontFamily: Fonts.type.semibold,
  },
});
