import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Fonts} from '@common';
import moment from 'moment';

import {SmallText} from '@Typography';
import FastImage from 'react-native-fast-image';
import RegularText from './Typography/RegularText';
import {Icon} from 'react-native-elements';
import colors from '../common/colors';

const BookingItem = (props) => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={props.onPress}>
      <FastImage
        style={styles.image}
        source={{uri: props.banner, priority: FastImage.priority.normal}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.container}>
        <RegularText bold textStyle={styles.textStyle}>
          {props.studio.title}
        </RegularText>
        <View style={styles.subTextView}>
          <Icon
            name="location"
            type={'ionicon'}
            color={colors.pink}
            size={12}
          />
          <SmallText textStyle={styles.subTextStyle}>
            {props.studio.location}
          </SmallText>
        </View>
        <View style={styles.subTextView}>
          <Icon
            name="calendar"
            type={'font-awesome'}
            color={colors.pink}
            size={12}
          />
          <SmallText textStyle={styles.subTextStyle}>
            {moment(props.item.date).format('MMM DD, YYYY')}
          </SmallText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BookingItem;

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextStyle: {
    marginLeft: 5,
    flex: 1,
  },
  image: {
    width: 142,
    height: 102,
    margin: 16,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    height: '100%',
  },
  imageContainerLoading: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginRight: 16,
    flex: 1,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  btnStyle: {
    borderRadius: 15,
    marginHorizontal: 8,
    marginVertical: 0,
    padding: 10,
  },
  btnTextStyle: {
    fontFamily: Fonts.type.medium,
  },
  subTextView: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
