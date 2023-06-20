import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  line: {
    marginHorizontal: 15,
    marginVertical: 20,
    height: 3,
    backgroundColor: Colors.tabBarColor,
  },
  buttonStyle: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 5,
    backgroundColor: Colors.red,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    margin: 5,
  },
  textStyle: {
    marginRight: 20,
  },
});
