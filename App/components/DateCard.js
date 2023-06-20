import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '@common';

const DateCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </View>
  );
};
export default DateCard;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tabBarColor,
    margin: 10,
    shadowOpacity: 0.3,
    shadowRadius: 0,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: 5 },
  },
  textStyle: {
    fontSize: 40,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
});
