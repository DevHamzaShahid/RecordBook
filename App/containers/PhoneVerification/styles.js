import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import Constants from '../../common/Constant';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  wrapper: {
    marginHorizontal: 24,
  },
  bottomTextStyle: {
    marginBottom: 40,
    marginTop: 4,
  },
  topTextStyle: {
    marginTop: 40,
    fontSize: Fonts.size.xx,
  },
  verification: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 40,
  },
  verificationTF: {
    flex: 1,
    backgroundColor: 'white',
    // borderColor: 'white',
    // borderWidth: 1,
    borderRadius: 5,
    color: Colors.darkGray,
    paddingVertical: 10,
    marginHorizontal: 3,
    fontSize: Fonts.size.xl,
  },
  badgeContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendBtn: {
    borderColor: Colors.white,
    borderRadius: 4,
    alignSelf: 'center',
  },
  verifyButton: {
    width: Constants.screenWidth - 24 * 2,
    marginTop: 40,
  },
  resendText: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  error: {
    color: Colors.red,
    textAlign: 'center',
    marginBottom: 20,
  },
  underlineStyleBase: {
    borderRadius: 5,
    backgroundColor: 'white',
    color: Colors.darkGray,
    fontSize: Fonts.size.xl,
    marginLeft: 1,
    marginRight: 1,
  },

  underlineStyleHighLighted: {
    //borderColor: "#03DAC6",
  },
  signBG: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    bottom: -2,
    left: -2,
    right: -2,
    width: Constants.screenWidth + 5,
    height: Constants.screenHeight + 5,
    backgroundColor: '#000',
  },
  textInput: {
    marginTop: 4,
  },
});
