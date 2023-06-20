import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@common';
import {RegularText} from '@Typography';

const EmptyComponent = props => {
  return (
    <View style={styles.container}>
      <RegularText>{props.title}</RegularText>
    </View>
  );
};
export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
