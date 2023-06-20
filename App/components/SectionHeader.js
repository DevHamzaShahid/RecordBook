import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '@common';
import { XLText } from '@Typography';
import { useNavigation } from '@react-navigation/native';

const SectionHeader = props => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'center', }}>
        {props.title == 'Edit Room' &&
          <Icon name='arrow-back' color={'#fff'} style={{ height: 20, width: 20 }} />}
      </TouchableOpacity>
      <XLText textStyle={styles.textStyle} bold>
        {props.title}
      </XLText>
      <View style={styles.iconContainer}>
        {props.icon1 && (
          <Icon
            containerStyle={styles.iconContainerStyle}
            name={props.icon1Name}
            color={Colors.white}
            type="material-community"
            size={25}
            onPress={props.onPressIcon1}
          />
        )}
        {props.icon2 && (
          <Icon
            name={props.icon2Name}
            containerStyle={styles.iconContainerStyle}
            color={Colors.white}
            type="material-community"
            size={25}
            onPress={props.onPressIcon2}
          />
        )}
      </View>
    </View>
  );
};
export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
