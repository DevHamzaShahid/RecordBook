import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import colors from '../../common/colors';
import {Constant} from '../../common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerImage: {
    width: '70%',
    height: '30%',
    alignSelf: 'center',
    marginVertical: 30,
  },
  bottomTextStyle: {
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 8,
    color: colors.lightGray,
  },
  topTextStyle: {
    textAlign: 'center',
    marginTop: 20,
  },
  bookingView: {
    backgroundColor: 'rgba(0,0,0,1)',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  bookingButton: {
    marginTop: 60,
    width: Constant.screenWidth - 40,
  },
});
