import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  calendarContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
  },
  timeContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
  },
  bookButtonStyle: {
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
