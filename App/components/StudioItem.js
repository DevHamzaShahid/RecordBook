import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Image, Text } from 'react-native';
import { Constant, Fonts } from '@common';
import { LargeText, SmallText } from '@Typography';
import { Icon } from 'react-native-elements';
import colors from '../common/colors';
import MediumText from './Typography/MediumText';
import fonts from '../common/Fonts';
import RegularText from './Typography/RegularText';
import SwipperGalleryModal from './SwipperGalleryModal';
import Moment from 'moment-timezone';
import { isMidnightDealTime } from '../utils/helper';

const StudioItem = (props) => {
  const [isMidnight, setMidnight] = useState(false)
  const isBetween8PMand8AM = () => {
    const currentTime = Moment().tz('America/Los_Angeles').format('HH:MM a');
    //const currentTime = Moment().tz('Asia/Kolkata').format('HH:MM a');

    const timeHour = currentTime.split(':')[0];
    //alert(timeHour);
    //const currentDate = new Date();
    //const currentHour = currentTime.getHours();
    return timeHour >= 20 || timeHour < 8;
  };

  const isWithinTimeFrame = isBetween8PMand8AM();

  useEffect(() => {
    const midnight = isMidnightDealTime()
    setMidnight(midnight)
  }, [])
  useEffect(() => {
    console.log("mignight", isMidnight);
  }, [isMidnight])
  // console.log("is the current time is midnight?", ismidnight === false ? "no" : "yes");
  return (
    <Pressable onPress={props.onPress} style={styles.cardStyle}>
      {isMidnight && <Image style={{ height: 70, width: 60, zIndex: 9999, right: 50, position: 'absolute', top: -8 }} source={require('../../assets/LMDEAL.png')} />}
      <View style={{ borderRadius: 10, overflow: 'hidden' }}>
        <SwipperGalleryModal
          disableClick={true}
          onPress={props.onPress}
          images={props.imageUrls}
          style={{
            height: ((Constant.screenWidth - 24 * 2) * 9) / 16,
            width: Constant.screenWidth - 24 * 2,
          }}
          styleImage={{
            height: ((Constant.screenWidth - 24 * 2) * 9) / 16,
            width: Constant.screenWidth - 24 * 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        />
      </View>
      <LargeText textStyle={styles.textStyle}>
        {props?.title?.toUpperCase()}
      </LargeText>

      <View style={styles.subTextView}>
        <Icon name="location" type={'ionicon'} color={colors.pink} size={14} />
        <SmallText textStyle={styles.subTextStyle}>{props.subtitle}</SmallText>
      </View>
      {/* {isWithinTimeFrame ? ( */}
      <MediumText textStyle={styles.rateStyle}>
        {isMidnight &&
          <>
            <RegularText textStyle={styles.rateStyleDecoration} bold>
              ${parseFloat(props.twelveHrPrice)}
              {/* regular */}
            </RegularText>
            <Text style={{ color: '#fff', fontSize: 14, textDecorationLine: 'line-through', fontWeight: 'bold' }}>/12hrs</Text>
            {'  '}
          </>
        }
        {/* <RegularText textStyle={styles.rateStyle} bold>
            {props.rate == 300
              ? '$200'
              : props.rate == 200
              ? '$150'
              : '$' + props.rate}
          </RegularText>{' '}
          / {props.hours}hrs{' '} */}

        {isMidnight
          ?
          <RegularText textStyle={styles.rateStyle} bold>
            ${props.dealPrice}/Now until 8am!
          </RegularText> :
          <RegularText textStyle={styles.orignalRateStyle} bold>
            ${props.twelveHrPrice}/<Text style={{ fontSize: 13 }}>{props.hours}hrs </Text> ${props.sixHrPrice ? props.sixHrPrice : 0}/<Text style={{ fontSize: 13 }}>{props.hours / 2}hrs</Text>
          </RegularText>
          // <RegularText textStyle={styles.rateStyle} bold>
          //   ${props.twelveHrPrice == 200 ? "150/Now until 8am!" : props.twelveHrPrice == 300 ? "200/Now until 8am!" : props.twelveHrPrice + "/" + `${props.hours}` + "hrs"}
          // </RegularText>
          // :
          // <RegularText textStyle={styles.orignalRateStyle} bold>
          //   ${props.twelveHrPrice}/<Text style={{ fontSize: 13 }}>{props.hours}hrs </Text> ${props.sixHrPrice ? props.sixHrPrice : 0}/<Text style={{ fontSize: 13 }}>{props.hours / 2}hrs</Text>
          // </RegularText>

        }
        {' '}

        {/* <Image
            source={Images.night_star}
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
          /> */}
      </MediumText>
      {/* ) : ( */}
      {/* <MediumText textStyle={styles.rateStyle}> */}
      {/* <RegularText bold>${props.rate}</RegularText> / {props.hours}hrs */}
      {/* </MediumText> */}
      {/* )} */}
    </Pressable>
  );
};
export default StudioItem;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  btnStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  textStyle: {
    fontFamily: Fonts.type.bold,
    marginTop: 8,
  },
  rateStyle: {
    fontFamily: Fonts.type.medium,
    textAlign: 'right',
    fontSize: 16,
    color: 'red'
  },
  orignalRateStyle: {
    fontFamily: Fonts.type.medium,
    textAlign: 'right',
    fontSize: 16,
    color: '#ffffff'
  },
  rateStyleDecoration: {
    fontFamily: Fonts.type.medium,
    textAlign: 'right',
    textDecorationLine: 'line-through',
  },
  subTextView: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTextStyle: {
    fontSize: fonts.size.medium,
    marginHorizontal: 4,
  },
  image: {
    height: ((Constant.screenWidth - 24 * 2) * 9) / 16,
    width: Constant.screenWidth - 24 * 2,
    borderRadius: 12,
  },
  container: {
    flex: 2,
  },
  imageContainer: {
    flex: 1,
    height: Constant.screenWidth / 2,
    width: '100%',
  },
  wrapper: {
    height: Constant.screenWidth / 2,
  },
});
