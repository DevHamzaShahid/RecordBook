import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  redContainer: {
    flex: 1.5,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingBottom: 20,
  },
  blackContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
  },
  bookButtonStyle: {
    marginVertical: 10,
  },
});
