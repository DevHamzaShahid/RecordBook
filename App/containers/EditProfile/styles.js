import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  wrapper: {
    paddingHorizontal: 24,
    padding: 32,
  },
  centerImage: {
    height: Constant.screenWidth / 3,
    width: Constant.screenWidth / 3,
    borderRadius: (Constant.screenWidth * 2) / 3,
    marginVertical: 20,
    backgroundColor: Colors.tabBarColor,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 15,
  },
  changeImageBtn: {
    color: Colors.red,
    marginVertical: 10,
  },
  declineButtonStyle: {
    margin: 10,
  },
  BottomText: {
    position: 'absolute',
    bottom: 10,
  },
  error: {
    marginBottom: 1,
    color: Colors.red,
  },
  saveText: {
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.medium,
    color: '#fff',
    fontWeight: '600',
  },
  edit: {
    fontFamily: fonts.type.regular,
    fontSize: fonts.size.large,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 32,
  },
  view: {
    height: 52,
  },
});
