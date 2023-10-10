import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Container } from 'native-base';
import Actions from '../MyBooking/reducer';
import { LargeText, MediumText } from '@Typography';

import moment from 'moment';
import styles from './styles';
import { Icon } from 'react-native-elements';
import CustomCalendar from './CustomCalendar';
import RegularText from '../../components/Typography/RegularText';
import BottomSheet from '@gorhom/bottom-sheet';
import SelectSession from './SelectSession';
import Constants from '../../common/Constant';
import CustomBackdrop from './CustomBackdrop';
import colors from '../../common/colors';
import SolidButton from '../../components/Buttons/SolidButton';
import { isMidnightDealTime } from '../../utils/helper';
import { ScrollView } from 'react-native-gesture-handler';

export function generatorBookingSession(session = {}) {
  return {
    date: '',
    dayTimeSlot: false,
    nightTimeSlot: false,
    morningSlot: false,
    eveningSlot: false,
    needEngineer: false,
    selected: true,
    ...session,
  };
}

function ListEmptyComponent() {
  return (
    <View style={styles.emptyView}>
      <Icon name={'cart-outline'} type={'ionicon'} color={'#fff'} size={40} />
      <RegularText bold>Your Cart is Empty</RegularText>
      <MediumText>Select a date to fill your cart.</MediumText>
    </View>
  );
}

function RenderBookingDate({ item, onRemove = () => { } }) {
  const sessionTime = useMemo(() => {
    if (item.dayTimeSlot && item.nightTimeSlot) {
      return '8am - 8am';
    } else if (item.dayTimeSlot) {
      return '8am - 8pm';
    } else if (item.nightTimeSlot) {
      return '8pm - 8am';
    }
    else if (item.morningSlot) {
      return '8am - 2pm'
    }
    else if (item.eveningSlot) {
      return '2pm - 8pm'
    }
  }, [item]);

  return (
    <View style={styles.sessionItemView}>
      <Icon name={'calendar'} type={'font-awesome'} color={'#fff'} size={15} />
      <MediumText textStyle={styles.dateText}>
        {moment(item.date).format('MMM DD, YYYY')}
      </MediumText>

      <View style={styles.sessionIcon}>
        {item.dayTimeSlot && (
          <Icon
            name={'sun'}
            type={'font-awesome-5'}
            color={colors.yellow}
            size={15}
          />
        )}

        {item.nightTimeSlot && (
          <Icon
            name={'moon'}
            type={'ionicon'}
            color={colors.skyBlue02}
            size={15}
          />
        )}
        {item.morningSlot && (
          <Icon
            name={'sun'}
            type={'font-awesome-5'}
            color={colors.yellow}
            size={15}
          />
        )}

        {item.eveningSlot && (
          <Icon
            name={'sun'}
            type={'font-awesome-5'}
            color={colors.yellow}
            size={15}
          />
        )}
      </View>

      <MediumText textStyle={styles.timeText}>{sessionTime}</MediumText>
      <Pressable hitSlop={10} onPress={onRemove}>
        <Icon name={'close'} type={'antdesign'} color={'#fff'} />
      </Pressable>
    </View>
  );
}

const snapPoints = [0, 680];

const SelectBookingDateTime = ({ navigation }) => {
  const dispatch = useDispatch();
  const { studio, user } = useSelector((state) => state);

  const [isShowSelectSection, setShowSelectSection] = useState(false);
  const [curSelectSection, setCurSelectSection] = useState(
    generatorBookingSession(),
  );
  const [bookingsInfo, setBookingsInfo] = useState({});
  const [isMidnight, setMidnight] = useState(false)
  const [updatedPrice, setUpdatedPrice] = useState(0)

  useEffect(() => {
    const midnight = isMidnightDealTime()
    setMidnight(midnight)
  }, [])

  // useEffect(() => {
  //   if (isMidnight == true) {
  //     if (studio.selectedStudio.twelveHrPrice == 200) {
  //       setUpdatedPrice(150)
  //     }
  //     else if (studio.selectedStudio.twelveHrPrice == 300) {
  //       setUpdatedPrice(200)
  //     }
  //     else {
  //       setUpdatedPrice(studio.selectedStudio.twelveHrPrice)
  //     }
  //   }
  //   else {
  //     setUpdatedPrice(studio.selectedStudio.twelveHrPrice)
  //   }
  // }, [isMidnight])
  useEffect(() => {
    if (isMidnight == true) {
      // if (studio.selectedStudio.twelveHrPrice == 200) {
      //   setUpdatedPrice(150)
      // }
      // else if (studio.selectedStudio.twelveHrPrice == 300) {
      //   setUpdatedPrice(200)
      // }
      // else {
      //   setUpdatedPrice(studio.selectedStudio.twelveHrPrice)
      // }
      setUpdatedPrice(studio.selectedStudio.dealPrice)
    }
    else {
      setUpdatedPrice(studio.selectedStudio.twelveHrPrice)
    }
  }, [isMidnight])

  useEffect(() => {
    console.log("updated price>>?>>", updatedPrice);
  }, [updatedPrice])

  console.log("cehck prices 6hr", studio.selectedStudio.sixHrPrice);
  console.log("cehck prices 12hr", studio.selectedStudio.twelveHrPrice);

  const { listSessionBooking, priceSessionBooking } = useMemo(() => {
    const list = Object.values(bookingsInfo);
    const priceSessionBooking = { price: 0, hours: 0 };
    list.forEach((l) => {
      if (l.dayTimeSlot && l.nightTimeSlot) {
        console.log('priceSessionBooking', priceSessionBooking);
        console.log(' Number(updatedPrice) ', Number(updatedPrice));
        priceSessionBooking.price =
          priceSessionBooking.price + (isMidnight == false ? Number(studio.selectedStudio.twelveHrPrice) : updatedPrice) * 2;
        priceSessionBooking.hours = priceSessionBooking.hours + 12 * 2;
      }
      if (l.morningSlot && l.eveningSlot) {
        priceSessionBooking.price =
          priceSessionBooking.price + Number(studio.selectedStudio.sixHrPrice) * 2;
        priceSessionBooking.hours = priceSessionBooking.hours + 6 * 2;
      }
      // if (l.dayTimeSlot && l.nightTimeSlot && isMidnight == true) {
      //   console.log('priceSessionBooking', priceSessionBooking);
      //   console.log(' Number(updatedPrice) ', Number(updatedPrice));
      //   priceSessionBooking.price =
      //     priceSessionBooking.price + Number(updatedPrice) * 2;
      //   priceSessionBooking.hours = priceSessionBooking.hours + 12 * 2;
      // }
      //problem was that when one the below pair is true then it again check the other || conditions below
      if (l.dayTimeSlot && l.nightTimeSlot || l.morningSlot && l.eveningSlot) {
        return
      } else {
        if (l.dayTimeSlot || l.nightTimeSlot) {
          priceSessionBooking.price =
            priceSessionBooking.price + (isMidnight == false ? Number(studio.selectedStudio.twelveHrPrice) : updatedPrice);
          priceSessionBooking.hours = priceSessionBooking.hours + 12;
        }
        if (l.morningSlot || l.eveningSlot) {
          priceSessionBooking.price =
            priceSessionBooking.price + Number(studio.selectedStudio.sixHrPrice);
          priceSessionBooking.hours = priceSessionBooking.hours + 6;
        }
      }
    });

    return { listSessionBooking: list, priceSessionBooking };
  }, [bookingsInfo]);
  const selectDate = useCallback(
    (date) => {
      const keys = Object.keys(bookingsInfo);
      const cur = bookingsInfo[date.dateString] ?? {};

      if (keys.length > 2 && !cur.selected) {
        Alert.alert('', 'You can only choose up to 3 sessions');
        return;
      }

      setCurSelectSection(
        generatorBookingSession({
          ...cur,
          date: date.dateString,
        }),
      );
      bottomSheetRef.current.snapTo(1);
    },
    [bookingsInfo],
  );

  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback((index) => {
    setShowSelectSection(index !== 0);
  }, []);

  useEffect(() => {
    dispatch(Actions.getStudioBookings(studio.selectedStudio.docId));
  }, []);
  return (
    <>
      <Container style={styles.container}>
        <SafeAreaView />
        <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.view}>
            <Pressable
              hitSlop={10}
              onPress={navigation.goBack}
              style={styles.closeButton}>
              <Icon name={'close'} type={'antdesign'} color={'#fff'} />
            </Pressable>
            <LargeText textStyle={styles.bookButtonStyle}>
              Select a date
            </LargeText>
            <MediumText>Choose up to 3 sessions.</MediumText>
          </View>

          <CustomCalendar
            dateSelected={selectDate}
            markedDates={bookingsInfo}
          />
        </View>
        <View style={styles.yourCardView}>
          <RegularText bold>Your Cart</RegularText>
        </View>
        <FlatList
          data={listSessionBooking}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <RenderBookingDate
              item={item}
              onRemove={() => {
                const newBookingsInfo = { ...bookingsInfo };
                delete newBookingsInfo[item.date];
                setBookingsInfo(newBookingsInfo);
              }}
            />
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
       </ScrollView>
        {listSessionBooking.length > 0 && (
          <SafeAreaView>
            <View style={styles.btnContainer}>
              <Text style={styles.rateStyle}>
                <LargeText bold>${priceSessionBooking.price}</LargeText>
                {` / ${priceSessionBooking.hours}hrs`}
              </Text>
              <SolidButton
                title="Book Studio"
                onPress={() => {
                  dispatch(Actions.setNewBookings(listSessionBooking));
                  navigation.navigate(
                    user.admin ? 'ManualBooking' : 'AgreementSignature',
                  );
                }}
              />
            </View>
          </SafeAreaView>
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={() => null}
          backgroundComponent={() => null}
          backdropComponent={({ animatedIndex, style }) => (
            // clicking outside the sheet will hide the sheet
            <CustomBackdrop
              style={style}
              animatedIndex={animatedIndex}
              isShowSelectSection={isShowSelectSection}
              onPress={() => bottomSheetRef.current.close()}
            />
          )}
        >
          <SelectSession
            info={curSelectSection}
            onSelected={(session) => {
              setBookingsInfo({
                ...bookingsInfo,
                [session.date]: session,
              });
              bottomSheetRef.current.close();
            }}
          />
        </BottomSheet>
      </Container>
    </>
  );
};

export default SelectBookingDateTime;
