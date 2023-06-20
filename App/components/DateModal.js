import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Colors} from '@common';
import {RegularText, XLText} from '@Typography';
import {SolidButton} from '@Buttons';
import DateCard from './DateCard';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const DateModal = props => {
  const [modalVisible, onChangeModalVisible] = useState(false);
  const [highlightedDate, setHighlightedDate] = useState(props.date._d);

  const getMarkedDates = () => {
    var marker = {
      [highlightedDate]: {selected: true},
    };
    let findDuplicates = arr =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    findDuplicates(props.bookedStudioDates).map(aDate => {
      var dateString = moment(aDate).format('YYYY-MM-DD');
      marker[dateString] = {
        disabled: true,
        disableTouchEvent: true,
      };
      return dateString;
    });
    return marker;
  };

  const selectPressed = () => {
    props.dateSelected(moment(highlightedDate));
    onChangeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <XLText>Choose Date</XLText>
      <TouchableOpacity
        style={styles.dataContainer}
        onPress={() => {
          onChangeModalVisible(true);
        }}>
        <DateCard title={moment(props.date).format('DD')} />
        <DateCard title={moment(props.date).format('MM')} />
        <DateCard title={moment(props.date).format('YY')} />
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
            <XLText textStyle={styles.bookButtonStyle}>Choose Date</XLText>
            <Calendar
              theme={{
                calendarBackground: Colors.tabBarColor,
                selectedDayTextColor: 'white',
                selectedDayBackgroundColor: Colors.red,
                selectedDotColor: Colors.red,
                todayTextColor: 'red',
                dayTextColor: '#d9e1e8',
                textDisabledColor: '#333',
                arrowColor: Colors.white,
                monthTextColor: Colors.white,
              }}
              markedDates={getMarkedDates()}
              current={highlightedDate}
              minDate={new Date()}
              onDayPress={day => {
                console.log('selected day', day);
                setHighlightedDate(day.dateString);
              }}
            />
            <RegularText textStyle={styles.bookButtonStyle}>
              The dates in red are unavailable for booking
            </RegularText>
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
export default DateModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    width: '90%',
  },
  dataContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.semiTransparent,
    justifyContent: 'center',
  },
  calendarContainer: {
    marginHorizontal: 10,
    backgroundColor: Colors.tabBarColor,
    paddingVertical: 30,
  },
  bookButtonStyle: {
    margin: 20,
  },
});
