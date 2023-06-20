import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import Constants from '../../common/Constant';
import colors from '../../common/colors';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  wrapper: {
    marginHorizontal: 24,
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: Colors.white,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.white,
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 20,
  },
  centerImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  bottomTextStyle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  topTextStyle: {
    marginTop: 32,
  },
  descText: {
    marginTop: 8,
    marginBottom: 32,
  },
  imageContainer: {
    backgroundColor: Colors.tabBarColor,
    width: 150,
    height: 150,
    marginVertical: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  chooseFileBtn: {width: '50%', alignSelf: 'center'},
  takePicture: {backgroundColor: 'white', width: '50%', alignSelf: 'center'},
  badgeContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signBG: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.screenWidth,
    height: Constants.screenHeight,
  },
  separator: {
    marginTop: 32,
    width: Constants.screenWidth - 24,
    marginLeft: -12,
    height: 1,
    backgroundColor: colors.white,
  },
  viewButton: {
    flexDirection: 'row',
    width: Constants.screenWidth,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  submitButton: {
    width: Constants.screenWidth / 2 - 12 - 8,
    marginHorizontal: 4,
  },
  laterButton: {
    width: Constants.screenWidth / 2 - 12 - 8,
    marginHorizontal: 4,
  },
  laterText: {
    color: colors.black,
  },
  exampleImage: {
    color: colors.skyBlue01,
    fontWeight: '500',
    fontFamily: fonts.type.regular,
    textDecorationLine: 'underline',
  },
});
