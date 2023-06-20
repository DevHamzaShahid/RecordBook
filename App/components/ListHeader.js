import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@common';
import {LargeText} from '@Typography';

const ListHeader = (props) => {
  return (
    <View style={styles.container}>
      <LargeText textStyle={styles.textStyle}>{props.title}</LargeText>
    </View>
  );
};
export default ListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.black,
  },
  textStyle: {
    color: Colors.white,
  },
});
