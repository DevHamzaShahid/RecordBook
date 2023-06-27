import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Animated,
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
} from 'react-native';
import { Container } from 'native-base';
import { SolidButton } from '@Buttons';
import { MediumText, SmallText } from '@Typography';
import SwipperGalleryModal from '../../components/SwipperGalleryModal';
import styles from './styles';
import { Icon } from 'react-native-elements';
import colors from '../../common/colors';
import LargeText from '../../components/Typography/LargeText';
import { Constant } from '../../common';
import { isMidnightDealTime } from '../../utils/helper';

const ICON_AMENITIES = {
  COMPUTER: () => <Icon name={'desktop'} type="font-awesome" color={'#fff'} />,
  'RECORDING GEAR': () => (
    <Icon name={'microphone-alt'} type="font-awesome-5" color={'#fff'} />
  ),
  MONITORS: () => (
    <Icon name={'monitor-speaker'} type="material-community" color={'#fff'} />
  ),
  SOFTWARE: () => <Icon name={'browser'} type="entypo" color={'#fff'} />,
  MISCELLANEOUS: () => (
    <Icon name={'asterisk'} type="font-awesome-5" color={'#fff'} />
  ),
};

const IMAGE_HEIGHT = (Constant.screenWidth * 9) / 16;

function Amenities({ item }) {
  console.log(JSON.stringify(item));
  const Value = item.detail.replaceAll('\\n', '\n');
  return (
    <View style={styles.amenitiesView}>
      <View style={styles.iconView}>
        {ICON_AMENITIES[item.header]?.() ?? (
          <Icon name={'desktop'} type="font-awesome" color={'#fff'} />
        )}
      </View>
      <View style={styles.amenitiesInfoView}>
        <MediumText bold>{item.header}</MediumText>
        <MediumText textStyle={styles.detailText}>{Value}</MediumText>
      </View>
    </View>
  );
}

const StudioDetail = ({ navigation }) => {
  const studio = useSelector((state) => state.studio);
  const { auth, user_approved } = useSelector((state) => state.user);
  const animation = useRef(new Animated.Value(0)).current;
  const [isMidnight, setMidnight] = useState(false)

  useEffect(() => {
    const midnight = isMidnightDealTime()
    setMidnight(midnight)
  }, [])
  useEffect(() => {
    // console.log("ismidnight", isMidnight);
  }, [isMidnight])
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#000' }} />
      <Container style={styles.container}>
        <Animated.FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: animation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          // bounces={true}
          style={styles.wrapper}
          ListHeaderComponent={
            <View style={styles.titleView}>
              <SwipperGalleryModal images={studio.selectedStudio.imageUrls} />
              <View style={styles.wrapper}>
                <Text bold style={styles.title}>
                  {studio.selectedStudio.title}
                </Text>

                <View style={styles.subTextView}>
                  <Icon
                    name="location"
                    type={'ionicon'}
                    color={colors.pink}
                    size={14}
                  />
                  <SmallText textStyle={styles.subTextStyle}>
                    {studio.selectedStudio.location}
                  </SmallText>
                </View>
              </View>
            </View>
          }
          data={studio?.selectedStudio?.aminities ?? []}
          renderItem={Amenities}
        />

        <Pressable
          hitSlop={10}
          onPress={navigation.goBack}
          style={styles.closeButtonView}>
          <View style={styles.closeButton}>
            <Icon
              name={'closecircle'}
              type={'antdesign'}
              color={'#fff'}
              size={25}
            />
          </View>
        </Pressable>

        <Animated.View
          style={[
            styles.heightView,
            {
              opacity: animation.interpolate({
                inputRange: [0, IMAGE_HEIGHT - 45, IMAGE_HEIGHT],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Pressable
            hitSlop={10}
            onPress={navigation.goBack}
            style={[styles.closeButton, { marginLeft: 8, marginTop: 4 }]}>
            <Icon name={'close'} type={'antdesign'} color={'#fff'} size={25} />
          </Pressable>
          <Text bold style={styles.headerTitle}>
            {studio.selectedStudio.title}
          </Text>
        </Animated.View>

        <SafeAreaView>
          {auth && user_approved ? (
            <View style={styles.btnContainer}>
              {isMidnight ?
                <Text style={styles.rateStyle}>
                  {/* <LargeText bold>${studio.selectedStudio.twelveHrPrice == 300 ? '200' : studio.selectedStudio.twelveHrPrice == 200 ? "150" : studio.selectedStudio.twelveHrPrice}</LargeText>/12hrs */}
                  <LargeText bold>${studio.selectedStudio.dealPrice}</LargeText>/12hrs
                  {' '}{' '}
                  <LargeText bold>${studio.selectedStudio.sixHrPrice}</LargeText>/6hrs
                  {/* <LargeText>
                    {studio.selectedStudio.twelveHrPrice == 300 ?  : studio.selectedStudio.price == 200 ? '$75':null}
                  </LargeText>/6hrs */}
                </Text>
                : <Text style={styles.rateStyle}>
                  <LargeText bold>${studio.selectedStudio.twelveHrPrice}</LargeText>/12hrs
                  {' '} <LargeText bold>${studio.selectedStudio.sixHrPrice}</LargeText>/6hrs
                </Text>}
              <SolidButton
                colors={['#fff', '#fff']}
                title="Check Availability"
                textStyle={styles.declineButtonStyle}
                onPress={() => navigation.navigate('ConfirmBooking')}
              />
            </View>
          ) : (
            <SolidButton
              colors={['#fff', '#fff']}
              title={
                !auth
                  ? 'Sign In or Create Account to Book'
                  : 'Complete ID Verification to Book'
              }
              textStyle={styles.declineButtonStyle}
              buttonStyle={styles.noAuthButtonStyle}
              onPress={() =>
                auth
                  ? navigation.navigate('UploadProfileImage')
                  : navigation.navigate('PhoneLogin')
              }
            />
          )}
        </SafeAreaView>
      </Container>
    </>
  );
};

export default StudioDetail;
