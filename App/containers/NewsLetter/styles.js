import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  description: {
    height: 180,
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
