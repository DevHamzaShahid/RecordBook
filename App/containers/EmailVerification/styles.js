import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    padding: 20,
  },
  topTextStyle: {
    textAlign: 'center',
    marginBottom: 50,
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 50,
  },
});