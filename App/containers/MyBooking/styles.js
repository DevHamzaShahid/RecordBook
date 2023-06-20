import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import colors from '../../common/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  indicatorStyle: {backgroundColor: colors.pink},
  taBar: {backgroundColor: colors.black},
  labelTab: {
    marginHorizontal: 8,
    marginTop: 8,
    fontWeight: 'bold',
  },
});
