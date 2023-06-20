import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '@common';
import {XLText} from '@Typography';

const SectionHeaderCenterTitle = props => {
  return (
    <View style={styles.container}>
      <XLText textStyle={styles.textStyle} bold>
        {props.title}
      </XLText>
    </View>
  );
};
export default SectionHeaderCenterTitle;

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
   // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: Colors.black,
  },
  textStyle: {
    color: Colors.white,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconContainerStyle: {
    marginHorizontal: 10,
  },
});
