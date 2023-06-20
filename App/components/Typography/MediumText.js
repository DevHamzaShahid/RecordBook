import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

const MediumText = props => (
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

MediumText.propTypes = {
  bold: PropTypes.bool,
};
MediumText.defaultProps = {
  bold: false,
};

export default memo(MediumText);

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
  },
});
