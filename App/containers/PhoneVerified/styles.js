import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    padding: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  topTextStyle: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
