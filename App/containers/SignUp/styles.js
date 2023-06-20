import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import Constants from '../../common/Constant';

export default StyleSheet.create({
  link: {
    color: '#00B2EE',
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.regular,
  },
  textInput: {
    marginTop: 0,
  },
  inputStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    height: 35,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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
    height: 40,
    width: '70%',
    alignSelf: 'center',
    marginTop: 50,
  },
  redTitle: {
    textAlign: 'center',
    marginBottom: 24,
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
  signBG: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.screenWidth,
    height: Constants.screenHeight,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
