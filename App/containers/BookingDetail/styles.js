import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import fonts from '../../common/Fonts';
import colors from '../../common/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  subTextView: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTextStyle: {
    fontSize: fonts.size.medium,
    marginHorizontal: 4,
  },
  btnContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  acceptButtonStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.green,
  },
  declineButtonStyle: {
    flex: 1,
    margin: 10,
  },
  topImage: {
    height: 65,
    width: 90,
    borderRadius: 10,
  },
  topImageContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    borderRadius: 8,
    marginVertical: 5,
  },
  margin: {
    marginVertical: 8,
  },
  pricingDetailsView: {
    padding: 20,
  },
  pricingDetailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  pricingTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingBottom: 16,
  },
  flex: {
    flex: 1,
  },
  receipt: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: 10,
  },
  receiptText: {
    color: 'black',
    fontSize: 13,
  },
  agreementView: {
    padding: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  agreementText: {
    color: colors.skyBlue02,
  },
});
