import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import Anser from 'anser';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  question: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  answer: {
    paddingHorizontal: 10,
  },
});
