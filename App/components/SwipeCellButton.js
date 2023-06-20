import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '@common';
import {MediumText} from '@Typography';
import {Icon} from 'react-native-elements';

const SwipeCellButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Icon name="cancel" color="white" size={30} />
        {props.showIcon && <MediumText bold>Cancel</MediumText>}
      </TouchableOpacity>
    </View>
  );
};
export default SwipeCellButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.red,
    height: '80%',
    width: 75,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
