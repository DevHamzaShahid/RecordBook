import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SectionList, Image, View, ScrollView} from 'react-native';
import {Container, Content} from 'native-base';
import AppActions from '../Root/reducer';
import {Colors, Images} from '@common';
import {SolidButton} from '@Buttons';
import {LargeText, RegularText, MediumText, SmallText} from '@Typography';
import {Icon} from 'react-native-elements';
import styles from './styles';
const Receipt = ({navigation}) => {
  const dispatch = useDispatch();
  const booking = useSelector(state => state.booking);

  const [couponApplied, applyCoupon] = useState(false);

  const applyCouponPressed = () => {
    applyCoupon(!couponApplied);
  };

  useEffect(() => {});
  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.whiteContainer}>
          <View style={styles.iconHolder}></View>
          <Icon
            raised
            name="check"
            size={50}
            color={Colors.greenDark}
            containerStyle={styles.iconContainer}
          />
          <View style={styles.viewContainer}>
            <View style={styles.left}>
              <LargeText bold textStyle={styles.margin}>
                {booking.selectedBooking.associatedStudio.title}
              </LargeText>
              <MediumText textStyle={styles.margin}>
                {booking.selectedBooking.associatedStudio.location}
              </MediumText>
            </View>
            <View style={styles.right}>
              <MediumText textStyle={styles.margin}>
                ${booking.selectedBooking.price}/Session
              </MediumText>
              <MediumText bold textStyle={styles.margin}>
                Total
              </MediumText>
              <RegularText bold>${booking.selectedBooking.price}</RegularText>
            </View>
          </View>
          {/* <View style={styles.viewContainer}>
            <View style={styles.left}>
              <LargeText bold textStyle={styles.margin}>
                Studio Engineer
              </LargeText>
            </View>
            <View style={styles.right}>
              <MediumText textStyle={styles.margin}>
                ${booking.selectedBooking.engineerPrice}/Session
              </MediumText>

              <MediumText bold textStyle={styles.margin}>
                Total
              </MediumText>
              <RegularText bold>
                ${booking.selectedBooking.engineerPrice}
              </RegularText>
            </View>
          </View> */}
          <View style={styles.lightViewContainer}>
            <View style={styles.left}>
              <LargeText bold textStyle={styles.margin}>
                {booking.selectedBooking.promo ? 'Subtotal' : 'Total'}
              </LargeText>
              {booking.selectedBooking.promo && (
                <RegularText>Promo</RegularText>
              )}
              {booking.selectedBooking.promo && (
                <RegularText bold>
                  {booking.selectedBooking.promo.code}
                </RegularText>
              )}
            </View>
            <View style={styles.right}>
              <RegularText bold textStyle={styles.margin}>
                $
                {booking.selectedBooking.promo
                  ? booking.selectedBooking.amount +
                    booking.selectedBooking.engineerPrice
                  : booking.selectedBooking.amount}
              </RegularText>
              {booking.selectedBooking.promo && (
                <RegularText>-{booking.selectedBooking.discount}</RegularText>
              )}
              {booking.selectedBooking.promo && (
                <RegularText bold>
                  $
                  {booking.selectedBooking.amount -
                    booking.selectedBooking.discount}
                </RegularText>
              )}
            </View>
          </View>
        </View>
        <MediumText textStyle={styles.noteTextStyle}>
          ** The last 30 minutes of every session are used to clean for the next
          client. Please use this time to collect your things and export/save
          any files you need to take with you.
        </MediumText>
      </Content>
    </Container>
  );
};

export default Receipt;
