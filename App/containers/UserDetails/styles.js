import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  centerImage: {
    height: Constant.screenWidth,
    width: Constant.screenWidth,
    marginVertical: 20,
    backgroundColor: Colors.tabBarColor,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 15,
  },
  changeImageBtn: {color: Colors.red, marginVertical: 10},
  acceptButtonStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.greenDark,
  },
  declineButtonStyle: {
    flex: 1,
    margin: 10,
  },
  btnContainer: {
    flexDirection: 'row',
  },
});
