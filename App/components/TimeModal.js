import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
  Text,
} from 'react-native';
import {Colors} from '@common';
import {RegularText, XLText, SmallText} from '@Typography';
import {SolidButton} from '@Buttons';
import DateCard from './DateCard';
import CheckBoxTitle from './CheckBoxTitle';
import moment from 'moment';
import fonts from '../common/Fonts';

const TimeModal = (props) => {
  const [modalVisible, onChangeModalVisible] = useState(false);
  const [dayTimeSlot, onChangeDayTimeSlot] = useState(false);
  const [nightTimeSlot, onChangeNightTimeSlot] = useState(false);
  const [needEngineer, onChangeNeedEngineer] = useState(false);
  const [error, setError] = useState('');

  const disableStatus = (slot) => {
    if (props.disableTimeSlot) {
      if (slot === 'am') {
        return props.disableTimeSlot === '8:00 am - 8:00 pm';
      }
      if (slot === 'pm') {
        return props.disableTimeSlot === '8:00 pm - 8:00 am';
      }
      return false;
    }
    return false;
  };

  const selectPressed = () => {
    if (!dayTimeSlot && !nightTimeSlot) {
      setError('Please select time slot');
      return;
    }
    props.timeSelected({
      time: dayTimeSlot ? '8:00 am - 8:00 pm' : '8:00 pm - 8:00 am',
      needEngineer: needEngineer,
    });
    onChangeModalVisible(false);
  };

  const dayTimeChanged = () => {
    if (nightTimeSlot) {
      onChangeNightTimeSlot(false);
    }
    setError('');
    onChangeDayTimeSlot(!dayTimeSlot);
  };

  const nightTimeChanged = () => {
    if (dayTimeSlot) {
      onChangeDayTimeSlot(false);
    }
    setError('');
    onChangeNightTimeSlot(!nightTimeSlot);
  };

  return (
    <View style={styles.container}>
      <XLText>Choose Time</XLText>
      <TouchableOpacity
        style={styles.dataContainer}
        onPress={() => onChangeModalVisible(true)}>
        <DateCard title="8" />
        <Text style={styles.dots}>:</Text>
        <DateCard title="00" />
        <DateCard title={dayTimeSlot ? 'am' : 'pm'} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableHighlight
          style={styles.backgroundContainer}
          onPress={() => onChangeModalVisible(false)}>
          <View style={styles.calendarContainer}>
            <XLText textStyle={styles.bookButtonStyle}>Choose Time Slot</XLText>
            <CheckBoxTitle
              disable={disableStatus('am')}
              title="8 AM to 8 PM"
              checked={dayTimeSlot}
              onPress={() => dayTimeChanged()}
            />
            <CheckBoxTitle
              disable={disableStatus('pm')}
              title="8 PM to 8 AM"
              checked={nightTimeSlot}
              onPress={() => nightTimeChanged()}
            />
            <SmallText textStyle={styles.error} bold>
              {error}
            </SmallText>
            {!props.hideEngineer && (
              <>
                <RegularText textStyle={styles.bookButtonStyle}>
                  Do you need an engineer ?
                </RegularText>
                <CheckBoxTitle
                  title="Yes"
                  checked={needEngineer}
                  onPress={() => onChangeNeedEngineer(!needEngineer)}
                />
              </>
            )}
            <SolidButton
              title="Select"
              buttonStyle={styles.bookButtonStyle}
              onPress={selectPressed}
            />
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};
export default TimeModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    width: '90%',
  },
  dataContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.semiTransparent,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  calendarContainer: {
    marginHorizontal: 10,
    backgroundColor: Colors.tabBarColor,
    paddingVertical: 20,
  },
  bookButtonStyle: {
    margin: 20,
  },
  dots: {
    fontSize: 80,
    fontFamily: fonts.type.regular,
    color: Colors.white,
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
