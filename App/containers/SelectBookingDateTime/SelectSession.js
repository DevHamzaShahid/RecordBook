import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import LargeText from '../../components/Typography/LargeText';
import RegularText from '../../components/Typography/RegularText';
import MediumText from '../../components/Typography/MediumText';
import SmallText from '../../components/Typography/SmallText';
import { Icon } from 'react-native-elements';
import SolidButton from '../../components/Buttons/SolidButton';
import colors from '../../common/colors';
import { generatorBookingSession } from './index';
import { useSelector } from 'react-redux';
import moment from 'moment';

function SelectSession({
  info = {
    date: '',
    dayTimeSlot: false,
    nightTimeSlot: false,
    morningSlot: false,
    eveningSlot: false,
    needEngineer: false,
  },
  onSelected = () => { },
}) {
  const { studioBookings } = useSelector((state) => state.booking);

  const [isShow, setShow] = useState(false);
  const [sync, setSync] = useState(2);
  const [alreadyBooking, setAlreadyBooking] = useState({
    dayTimeSlot: false,
    nightTimeSlot: false,
    morningSlot: false,
    eveningSlot: false,
  });
  const [curSelectSection, setCurSelectSection] = useState(
    generatorBookingSession(),
  );

  useEffect(() => {
    setCurSelectSection(info);
    setShow(false);
    const listStudioBook = studioBookings.filter((b) => b.date === info.date);
    const alreadyB = { dayTimeSlot: false, nightTimeSlot: false, morningSlot: false, eveningSlot: false, };
    if (listStudioBook.length > 0) {
      if (listStudioBook.some((l) => l.time === '8:00 am - 8:00 pm')) {
        alreadyB.dayTimeSlot = true;
      } else if (listStudioBook.some((l) => l.time === '8:00 pm - 8:00 am')) {
        alreadyB.nightTimeSlot = true;
      }
      else if (listStudioBook.some((l) => l.time === '8:00 am - 2:00 pm')) {
        alreadyB.morningSlot = true;
      }
      else if (listStudioBook.some((l) => l.time === '2:00 pm - 8:00 pm')) {
        alreadyB.eveningSlot = true;
      }

      if (listStudioBook.length === 4) {
        alreadyB.dayTimeSlot = true;
        alreadyB.nightTimeSlot = true;
        alreadyB.morningSlot = true;
        alreadyB.eveningSlot = true;
      }
      setAlreadyBooking(alreadyB);
    } else {
      setAlreadyBooking({ dayTimeSlot: false, nightTimeSlot: false, morningSlot: false, eveningSlot: false });
    }
  }, [info, studioBookings]);

  useEffect(() => {
    console.log("selection", curSelectSection);
    if (curSelectSection.dayTimeSlot && curSelectSection.morningSlot) {
      alert("you either can select morning or day time slot")
      setCurSelectSection({
        ...curSelectSection,
        dayTimeSlot: !curSelectSection.dayTimeSlot,
      })
    }
    if (curSelectSection.nightTimeSlot && curSelectSection.eveningSlot) {
      alert("you either can select night time or afternoon slot")
      setCurSelectSection({
        ...curSelectSection,
        nightTimeSlot: !curSelectSection.nightTimeSlot,
      })
    }
    if (curSelectSection.dayTimeSlot && curSelectSection.eveningSlot) {
      alert("you can select night time only with day time slot")
      setCurSelectSection({
        ...curSelectSection,
        dayTimeSlot: !curSelectSection.dayTimeSlot,
      })
    }
    if (curSelectSection.morningSlot && curSelectSection.nightTimeSlot) {
      alert("you can select afternoon slot only with morning slot")
      setCurSelectSection({
        ...curSelectSection,
        morningSlot: !curSelectSection.morningSlot,
      })
    }
  }, [curSelectSection])
  return (
        <LinearGradient
      style={styles.contentContainer}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={['#061D2B', '#020e14', '#061D2B']}>
      <ScrollView contentContainerStyle={{paddingBottom:100}}>
      <View style={styles.wrapper}>
          <LargeText>Select Session Block</LargeText>
          <MediumText textStyle={styles.descText}>
            We offer two set 12 hour session blocks per day in all rooms.
            RecordBook staff will use the first and last 15 minutes of every
            session block to prepare the studio for the next reservation.
          </MediumText>
          <RegularText bold textStyle={{ marginTop: 32 }}>
            {moment(curSelectSection.date).format('MMM DD, YYYY')}
          </RegularText>
        </View>
        {/* Day 12hrs slot */}
        <Pressable
          disabled={alreadyBooking.dayTimeSlot}
          style={[styles.textView, alreadyBooking.dayTimeSlot && { opacity: 0.4 }]}
          onPress={() =>
            setCurSelectSection({
              ...curSelectSection,
              dayTimeSlot: !curSelectSection.dayTimeSlot,
            })
          }>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {curSelectSection.dayTimeSlot && (
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: colors.skyBlue02,
                }}
              />
            )}
          </View>
          <View style={styles.textWrapper}>
            <LargeText>8am - 8pm</LargeText>
            <SmallText> (Day)</SmallText>
          </View>
        </Pressable>
        {/* night 12hrs slot */}
        <Pressable
          disabled={alreadyBooking.nightTimeSlot}
          style={[
            styles.textView,
            alreadyBooking.nightTimeSlot && { opacity: 0.4 },
          ]}
          onPress={() =>
            setCurSelectSection({
              ...curSelectSection,
              nightTimeSlot: !curSelectSection.nightTimeSlot,
            })
          }>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {curSelectSection.nightTimeSlot && (
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: colors.skyBlue02,
                }}
              />
            )}
          </View>
          <View style={styles.textWrapper}>
            <LargeText>8pm - 8am</LargeText>
            <SmallText> (Night)</SmallText>
          </View>
        </Pressable>
        {/* morning 6hhrs slot */}
        <Pressable
          disabled={alreadyBooking.morningSlot}
          style={[styles.textView, alreadyBooking.morningSlot && { opacity: 0.4 }]}
          onPress={() =>
            setCurSelectSection({
              ...curSelectSection,
              morningSlot: !curSelectSection.morningSlot,
            })
          }>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {curSelectSection.morningSlot && (
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: colors.skyBlue02,
                }}
              />
            )}
          </View>
          <View style={styles.textWrapper}>
            <LargeText>8am - 2pm</LargeText>
            <SmallText> (Morning)</SmallText>
          </View>
        </Pressable>
        {/* evening 6hrs slot */}
        <Pressable
          disabled={alreadyBooking.eveningSlot}
          style={[styles.textView, alreadyBooking.eveningSlot && { opacity: 0.4 }]}
          onPress={() =>
            setCurSelectSection({
              ...curSelectSection,
              eveningSlot: !curSelectSection.eveningSlot,
            })
          }>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {curSelectSection.eveningSlot && (
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: colors.skyBlue02,
                }}
              />
            )}
          </View>
          <View style={styles.textWrapper}>
            <LargeText>2pm - 8pm</LargeText>
            <SmallText> (Afternoon)</SmallText>
          </View>
        </Pressable>
        {/* <Pressable
        disabled={alreadyBooking.nightTimeSlot && alreadyBooking.dayTimeSlot}
        style={[
          styles.textView,
          (alreadyBooking.nightTimeSlot || alreadyBooking.dayTimeSlot) && {
            opacity: 0.4,
          },
        ]}
        onPress={() =>
          setCurSelectSection({
            ...curSelectSection,
            dayTimeSlot: true,
            nightTimeSlot: true,
          })
        }>
        <View style={styles.textWrapper}>
          <RegularText>8 am - 8 am</RegularText>
          <SmallText> (All Day)</SmallText>
        </View>
        {curSelectSection.dayTimeSlot && curSelectSection.nightTimeSlot && (
          <Icon name={'check'} color={colors.skyBlue02} />
        )}
      </Pressable>*/}
        {/* 6hr slots */}
        <Pressable
          style={styles.audioEngineerView}
          onPress={() => {
            setCurSelectSection({
              ...curSelectSection,
              needEngineer: !curSelectSection.needEngineer,
            });
            setShow(true);
          }}>
          <View
            style={
              curSelectSection.needEngineer
                ? styles.viewCheck
                : styles.viewUnCheck
            }
          />
          <View style={styles.audioEngineerWrapper}>
            <MediumText bold>I need an Audio Engineer</MediumText>
            {isShow && (
              <MediumText textStyle={styles.descText}>
                Cool! One of our staff members will reach out to help schedule an
                engineer for your session!
              </MediumText>
            )}
          </View>
          <Pressable hitSlop={10} onPress={() => setShow(!isShow)}>
            <Icon
              name={isShow ? 'chevron-down' : 'chevron-right'}
              type={'entypo'}
              color={'#fff'}
              size={20}
            />
          </Pressable>
        </Pressable>

        <View style={styles.flex} />
        <SolidButton
          onPress={() => onSelected(curSelectSection)}
          title={'Save Selection'}
          buttonStyle={styles.buttonStyle}
          disabled={
            !(curSelectSection.nightTimeSlot || curSelectSection.dayTimeSlot || curSelectSection.morningSlot || curSelectSection.eveningSlot)
          }
          />
          </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  viewUnCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  viewCheck: {
    width: 20,
    height: 20,
    backgroundColor: colors.skyBlue02,
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
  },
  wrapper: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: colors.offWhite,
  },
  descText: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
    marginLeft: 16,
  },
  textView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.offWhite,
    paddingVertical: 10,
  },
  audioEngineerView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderColor: colors.offWhite,
  },
  audioEngineerWrapper: { flex: 1, marginLeft: 16 },
  flex: {
    flex: 1,
  },
  buttonStyle: {
    marginHorizontal: 16,
  },
});

export default SelectSession;
