import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {GlobalStyle, Colors, Fonts} from '@common';

const SmallText = props => (
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

SmallText.propTypes = {
  bold: PropTypes.bool,
};
SmallText.defaultProps = {
  bold: false,
};
export default memo(SmallText);
const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
    fontSize: Fonts.size.small,
  },
});
