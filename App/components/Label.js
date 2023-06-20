import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Colors, Fonts, GlobalStyle} from '@common';
import {MediumText, SmallText} from '@Typography';

const Label = (props) => (
  <View style={[styles.buttonStyle, props.buttonStyle]}>
    <SmallText textStyle={[GlobalStyle.style.blackText, props.textStyle]}>
      {props.title}
    </SmallText>
  </View>
);

Label.propTypes = {
  title: PropTypes.string.isRequired,
};
Label.defaultProps = {
  title: 'Button',
};

export default Label;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingVertical: 8,
    justifyContent: 'center',
  },
});
