import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, GlobalStyle} from '@common';
import {MediumText} from '@Typography';
import LinearGradient from 'react-native-linear-gradient';

const SolidButton = (props) => (
  <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
    <LinearGradient
      colors={
        props.disabled
          ? [Colors.lightGray, Colors.lightGray]
          : props.colors || [Colors.skyBlue01, Colors.skyBlue02]
      }
      style={[styles.buttonStyle, props.buttonStyle]}>
      <MediumText
        bold={!props.regular}
        textStyle={[GlobalStyle.style.whiteText, props.textStyle]}>
        {props.title}
      </MediumText>
    </LinearGradient>
  </TouchableOpacity>
);

SolidButton.propTypes = {
  title: PropTypes.string.isRequired,
};
SolidButton.defaultProps = {
  title: 'Button',
};

export default React.memo(SolidButton);

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 15,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerStyle: {
    marginRight: 5,
    marginLeft: 20,
  },
});
