import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Item, Input } from 'native-base';
import { GlobalStyle, Fonts, Colors } from '@common';
import { SmallText } from '@Typography';
import { Icon } from 'react-native-elements';

class TextField extends Component {
  render() {
    const {
      placeHolder,
      image,
      inputAccessoryViewID,
      onChangeText,
      autoCorrect,
      autoCapitalize,
      showRightButton,
      onPressRightIcon,
      value,
      innerPlaceHolder,
      keyboardType,
      multiline,
      textInputStyle,
      containerStyle,
      editable,
      maxLength = 100,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {placeHolder && <Text style={styles.textStyle}>{placeHolder}</Text>}
        <TextInput
          editable={editable}
          value={value}
          maxLength={maxLength}
          style={[styles.textInput, textInputStyle]}
          placeholderTextColor={Colors.lightGray}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          placeholder={innerPlaceHolder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          multiline={multiline}
        />
      </View>
    );
  }
}

TextField.propTypes = {
  placeHolder: PropTypes.string,
  image: PropTypes.number,
  onChangeText: PropTypes.func,
  onPressRightIcon: PropTypes.func,
  showRightButton: PropTypes.bool,
};
TextField.defaultProps = {
  placeHolder: null,
  image: null,
  showRightButton: false,
};
export default TextField;

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontFamily: Fonts.type.bold,
  },
  textInput: {
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.regular,
    padding: 8,
    marginVertical: 8,
    backgroundColor: Colors.darkGray,
  },
  container: {
    paddingVertical: 10,
  },
});
