import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Fonts, GlobalStyle} from '@common';
import {MediumText} from '@Typography';
import {Icon} from 'react-native-elements';

const IconButton = props => (
  <TouchableOpacity
    style={[styles.buttonStyle, props.buttonStyle]}
    onPress={props.onPress}>
    <Image source={props.source} style={styles.logo} resizeMode="contain" />
    <MediumText bold textStyle={[styles.textStyle, props.textStyle]}>
      {props.title}
    </MediumText>
  </TouchableOpacity>
);

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
};
IconButton.defaultProps = {
  title: 'Button',
};

export default IconButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.red,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainerStyle: {
    marginRight: 5,
    marginLeft: 20,
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
