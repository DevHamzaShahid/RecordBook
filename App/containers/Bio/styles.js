import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    padding: 20,
  },
  topTextStyle: {
    textAlign: 'center',
    marginVertical: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 70,
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  btnStyle: {backgroundColor: 'white'},
  btnTextStyle: {color: 'black'},
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 20,
  },
});
