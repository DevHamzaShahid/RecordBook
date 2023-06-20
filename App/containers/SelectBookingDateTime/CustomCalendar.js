import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {Colors} from '../../common';
import colors from '../../common/colors';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['SU', 'MO', 'TW', 'WE', 'TH', 'FR', 'SA'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const markedToday = moment().format('yyyy-MM-DD');

const theme = {
  textSectionTitleColor: 'rgba(255, 255, 255, 0.8)',
  calendarBackground: Colors.gray,
  selectedDayTextColor: 'white',
  todayTextColor: '#00adf5',
  selectedDayBackgroundColor: colors.skyBlue01,
  dayTextColor: '#fff',
  arrowColor: Colors.white,
  monthTextColor: Colors.white,
  textMonthFontWeight: 'bold',
  textDisabledColor: 'rgba(255, 255, 255, 0.4)',
  'stylesheet.calendar.header': {
    week: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingTop: 10,
      marginHorizontal: 10,
      borderTopWidth: 1,
      borderColor: '#fff',
    },
  },
};

function CustomCalendar({markedDates, dateSelected}) {
  return (
    <Calendar
      style={{
        paddingHorizontal: 8,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#fff',
      }}
      theme={theme}
      markedDates={markedDates}
      minDate={markedToday}
      onDayPress={dateSelected}
    />
  );
}

export default CustomCalendar;
