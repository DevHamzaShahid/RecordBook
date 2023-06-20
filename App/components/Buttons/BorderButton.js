import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '@common';
import {SmallText} from '@Typography';

const BorderButton = props => (
  <TouchableOpacity
    style={[styles.buttonStyle, props.buttonStyle]}
    onPress={props.onPress}>
    <SmallText textStyle={props.textStyle}>{props.title}</SmallText>
  </TouchableOpacity>
);

BorderButton.propTypes = {
  title: PropTypes.string.isRequired,
};
BorderButton.defaultProps = {
  title: 'Button',
};

export default BorderButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.red,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
