import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import Constants from '../../common/Constant';

export default StyleSheet.create({
  goBack: {
    position: 'absolute',
    top: 0,
    left: 10,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  redContainer: {
    flex: 1,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingVertical: 40,
  },
  textStyle: {
    color: 'white',
    fontFamily: Fonts.type.bold,
  },
  plusOne: {
    flex: 0.15,
    marginRight: 10,
  },
  blackContainer: {
    flex: 3,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
  },
  redTitle: {
    textAlign: 'center',
    marginBottom: 60,
  },
  blackTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.semiBold,
    marginBottom: 60,
  },
  logo: {
    height: 40,
    width: '70%',
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 20,
  },
  link: {color: '#00B2EE', textDecorationLine: 'underline'},
  signBG: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.screenWidth,
    height: Constants.screenHeight,
  },
  textInput: {
    width: Constants.screenWidth,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  buttonView: {
    marginTop: 80,
  },
  buttonSignInStyle: {
    width: Constants.screenWidth - 24 * 2,
    marginVertical: 0,
    backgroundColor: 'red',
  },
  buttonSignupStyle: {
    width: Constants.screenWidth - 24 * 2,
  },
  textSignup: {
    color: Colors.black,
  },
  textSignupOTP: {
    color: Colors.white,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  otpView: {
    padding: 20,
    alignSelf: 'center',
  },
});
