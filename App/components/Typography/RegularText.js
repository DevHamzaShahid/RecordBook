import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import PropTypes from 'prop-types';

const RegularText = (props) => (
  <Text
    style={[
      styles.textStyle,
      props.textStyle,
      {fontWeight: props.bold ? '700' : '400'},
    ]}
    {...props}>
    {props.children}
  </Text>
);

RegularText.propTypes = {
  bold: PropTypes.bool,
};
RegularText.defaultProps = {
  bold: false,
};

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.semiBold,
  },
});
export default memo(RegularText);
