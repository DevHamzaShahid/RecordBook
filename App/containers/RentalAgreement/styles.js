import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontFamily: fonts.type.bold,
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
  btnContainer: {
    paddingTop: 20,
  },
  acceptButtonStyle: {
    margin: 10,
  },
  saveButtonStyle: {
    margin: 10,
    flex: 1.2,
    backgroundColor: Colors.greenDark,
  },
  cancelButtonStyle: {
    margin: 10,
    flex: 1.2,
    backgroundColor: Colors.red,
  },
  agreementButtonStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resetButtonStyle: {
    margin: 10,
    flex: 1.2,
    backgroundColor: Colors.yellow,
  },
  acceptButtonDisabledStyle: {
    margin: 10,
    backgroundColor: Colors.lightGray,
  },
  eSignature: {
    margin: 10,
  },
  declineButtonStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  link: {color: '#00B2EE', textDecorationLine: 'underline'},
  signature: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
