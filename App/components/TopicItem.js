import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Right, Left, Body} from 'native-base';
import {Icon} from 'react-native-elements';
import {Colors} from '@common';
import {MediumText} from '@Typography';

const TopicItem = props => {
  return (
    <ListItem style={styles.container} noBorder>
      <Left>
        <Icon name="dialpad" type="material" color="white" />
        <MediumText textStyle={styles.textStyle}>{props.title}</MediumText>
      </Left>
    </ListItem>
  );
};
export default TopicItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: Colors.tabBarColor,
  },
  textStyle: {
    color: Colors.white,
    marginHorizontal: 10,
  },
});
