 import React, {useState} from 'react';
import {TouchableOpacity, FlatList, Text, StyleSheet} from 'react-native';
import {List, ListItem, Right, Body} from 'native-base';
import {Icon} from 'react-native-elements';

import {Colors} from '@common';
// import styles from './styles';

const DropDown = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(null);
  const {dropdownItems, title, containerStyle, onSelection} = props;

  const _handlePress = () => {
    setExpanded(!expanded);
  };
  const _handleSelection = (item) => {
    props.onSelection(item);
    setValue(item.docId);
    setExpanded(!expanded);
  };

  const _keyExtractor = (item, index) => item.docId;

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.docId}
        onPress={() => _handleSelection(item)}
        style={styles.listItemStyle}>
        <Text
          bold={value === item.docId}
          style={styles.listText}
          textStyle={
            value === item.docId
              ? styles.itemTextSelectedStyle
              : styles.itemTextStyle
          }>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <List style={[styles.container, containerStyle]}>
      <ListItem
        noIndent
        underlayColor="transparent"
        onPress={() => _handlePress()}>
        <Body>
          <Text style={styles.title}>{title}</Text>
        </Body>
        <Right>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            color={Colors.white}
            type="material-community"
          />
        </Right>
      </ListItem>
      {expanded && (
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={[
            styles.flatListStyle,
            {height: dropdownItems.length > 5 ? 220 : null},
          ]}
          data={dropdownItems}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
        />
      )}
    </List>
  );
};
export default DropDown;
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: Colors.tabBarColor,
    borderRadius: 10,
  },
  title: {
    color: Colors.white,
  },
  listText: {
    color: Colors.white,
  },
  itemTextStyle: {
    textAlign: 'left',
    color: Colors.white,
  },
  itemTextSelectedStyle: {
    textAlign: 'left',
    color: Colors.white,
  },
  listItemStyle: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  flatListStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
});
