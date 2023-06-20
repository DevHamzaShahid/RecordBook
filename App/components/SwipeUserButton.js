import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '@common';
import {MediumText} from '@Typography';
import {Icon} from 'react-native-elements';

const SwipeUserButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPressCancel}>
        <Icon name="cancel" color="white" size={30} />
        {props.showIcon && <MediumText bold>Cancel</MediumText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: Colors.greenDark}]}
        onPress={props.onPressApprove}>
        <Icon name="check" color="white" size={30} />
        {props.showIcon && <MediumText bold>Approve</MediumText>}
      </TouchableOpacity>
    </View>
  );
};
export default SwipeUserButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.red,
    height: '90%',
    width: 75,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
