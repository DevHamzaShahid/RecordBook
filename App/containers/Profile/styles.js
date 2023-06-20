import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';
import fonts from '../../common/Fonts';
import colors from '../../common/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: 24,
  },
  section: {
    paddingTop: 50,
  },
  sectionItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  titleText: {
    marginTop: 48,
    marginBottom: 16,
    fontFamily: fonts.type.regular,
    fontWeight: '700',
    fontSize: fonts.size.large,
    color: colors.white,
  },
  verification: {
    color: colors.red,
    marginLeft: 4,
    fontFamily: fonts.type.regular,
  },
  verificationView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  contentText: {
    fontFamily: fonts.type.regular,
    fontWeight: '700',
    fontSize: fonts.size.medium,
    color: colors.white,
    flex: 1,
    marginLeft: 8,
  },
  centerImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.tabBarColor,
    marginTop: 50,
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 15,
  },
  changeImageBtn: {color: Colors.red, marginVertical: 10},
  declineButtonStyle: {
    margin: 10,
  },
  logoutText: {
    fontSize: fonts.size.medium,
    fontFamily: fonts.type.medium,
    fontWeight: '600',
    color: colors.white,
    marginVertical: 80,
  },
});
