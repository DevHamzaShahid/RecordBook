import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  line: {
    marginHorizontal: 15,
    marginVertical: 10,
    height: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 40,
    height: 40,
    margin: 5,
  },
  send: {
    backgroundColor: Colors.mediumGray,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  keyboardContainer: {flex: 5},
  textInputStyle: {
    backgroundColor: 'white',
    fontFamily: Fonts.type.Regular,
    fontSize: 17,
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
