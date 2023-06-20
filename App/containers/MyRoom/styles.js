import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.black
  },
  redContainer: {
    flex: 1,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  blackContainer: {
    flex: 2.5,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
  },
  redTitle: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  blackTitle: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.semiBold,
    marginBottom: 140,
  },
  logo: {
    height: 70,
    marginBottom: 20,
  },
});
