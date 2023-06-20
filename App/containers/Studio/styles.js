import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import colors from '../../common/colors';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  wrapper: {
    backgroundColor: Colors.black,
    paddingBottom: 8,
  },
  redContainer: {
    flex: 1,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  blackContainer: {
    flex: 2.5,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
  },
  redTitle: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  blackTitle: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.semiBold,
    marginBottom: 140,
  },
  logo: {
    height: 70,
    marginBottom: 20,
  },
  today: {
    marginHorizontal: 10,
  },
  selected: {
    marginHorizontal: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendar: {
    backgroundColor: Colors.orange,
    margin: 10,
    padding: 11,
    borderRadius: 5,
  },
  calendarSelected: {
    backgroundColor: Colors.greenDark,
    margin: 10,
    padding: 11,
    borderRadius: 5,
  },
  indicatorStyle: {backgroundColor: colors.skyBlue01},
  taBar: {backgroundColor: colors.black},
  labelTab: {
    width: 70,
    marginHorizontal: 8,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
