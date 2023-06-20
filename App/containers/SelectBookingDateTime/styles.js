import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import colors from '../../common/colors';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wrapper: {
    backgroundColor: Colors.gray,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  view: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    marginBottom: 4,
  },
  bookButtonStyle: {
    marginBottom: 8,
    fontSize: 32,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  i_Icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  semiTransparent: {
    padding: 5,
    marginTop: '50%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: Colors.darkGray,
  },
  modalInnerView: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 16,
  },
  yourCardView: {
    margin: 16,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    minHeight: 130,
  },
  sessionItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: colors.offWhite,
    paddingVertical: 16,
  },
  dateText: {
    marginLeft: 16,
    minWidth: 110,
  },
  sessionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 40,
    marginRight: 16,
  },
  timeText: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  rateStyle: {
    fontFamily: fonts.type.medium,
    color: '#fff',
  },
  declineButtonStyle: {
    color: colors.black,
  },
});
