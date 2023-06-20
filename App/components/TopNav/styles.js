import {StyleSheet} from 'react-native';
import colors from '../../common/colors';
import {Fonts} from '../../common';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 170,
    height: 20,
  },
  goBack: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
    marginHorizontal: 8,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: Fonts.size.regular,
  },
});
