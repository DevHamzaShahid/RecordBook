import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  addCategory: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: Colors.tabBarColor,
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    width: '30%',
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  cardStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  textColor: {
    marginVertical: 5,
  },
});
