import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@common';
import {SmallText} from '@Typography';

const Badge = (props) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: props.selected ? Colors.red : Colors.tabBarColor},
      ]}>
      <SmallText>{props.count}</SmallText>
    </View>
  );
};
export default Badge;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
