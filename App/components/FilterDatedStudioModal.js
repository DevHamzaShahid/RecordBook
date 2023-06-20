import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, Modal, SafeAreaView} from 'react-native';
import {ListItem, Body, Right} from 'native-base';
import {Colors} from '@common';
import {SolidButton} from '@Buttons';
import {RegularText} from '@Typography';
import {Icon} from 'react-native-elements';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Actions from '../containers/Studio/reducer';

const FilterDatedStudioModal = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);
  const dateSelected = (day) => {
    console.log('selected day', day);
    setDate(day.dateString);
  };

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {}}>
        <View style={styles.semiTransparent} />
        <View style={styles.container}>
          <ListItem itemHeader>
            <Body>
              <RegularText bold>Filter Session Date</RegularText>
            </Body>
            <Right style={styles.cancel}>
              <Icon
                name="cancel"
                color="white"
                size={30}
                onPress={props.dismiss}
              />
            </Right>
          </ListItem>
          <Calendar
            theme={{
              calendarBackground: Colors.tabBarColor,
              selectedDayTextColor: 'white',
              selectedDayBackgroundColor: Colors.red,
              selectedDotColor: Colors.red,
              todayTextColor: Colors.white,
              dayTextColor: '#d9e1e8',
              textDisabledColor: '#333',
              arrowColor: Colors.white,
              monthTextColor: Colors.white,
            }}
            markedDates={{
              [date]: {
                selected: true,
              },
            }}
            minDate={moment().format('YYYY-MM-DD')}
            onDayPress={(day) => dateSelected(day)}
          />
          <SolidButton
            title="Search"
            buttonStyle={styles.search}
            onPress={() => {
              dispatch(Actions.getStudiosByDate(date));
              props.dismiss(date);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FilterDatedStudioModal;

const styles = StyleSheet.create({
  semiTransparent: {
    flex: 1,
    backgroundColor: Colors.semiTransparent,
  },
  container: {
    flex: 5,
    backgroundColor: Colors.tabBarColor,
  },
  cancel: {justifyContent: 'center'},
  search: {
    marginHorizontal: 10,
    marginTop: 20,
  },
});
