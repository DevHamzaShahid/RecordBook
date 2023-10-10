import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';
import fonts from '../../common/Fonts';
import colors from '../../common/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heightView: {
    opacity: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  wrapper: {
    backgroundColor: 'rgba(33, 33, 33, 1)',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    // paddingHorizontal: 24,
  },
  acceptButtonStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.green,
  },
  declineButtonStyle: {
    color: colors.black,
  },
  noAuthButtonStyle: {
    marginHorizontal: 24,
  },
  topImage: {
    width: '100%',
    height: 220,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  topImageContainer: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: '#000',
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 10,
  },
  margin: {
    marginVertical: 10,
  },
  flex: {
    flex: 1,
  },
  image: {
    height: (Constant.screenWidth * 9) / 16,
    width: Constant.screenWidth,
  },
  headerTitle: {
    fontSize: fonts.size.regular,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
    marginRight: 8 + 25,
  },
  titleView: {
    backgroundColor: '#000',
    borderRadius:32
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.type.bold,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 24,
  },
  subTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  subTextStyle: {
    fontSize: fonts.size.medium,
    marginLeft: 4,
  },
  iconView: {
    width: 30,
    marginLeft: 20,
  },
  amenitiesView: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  amenitiesInfoView: {
    marginHorizontal: 24,
    flex: 1,
  },
  detailText: {
    lineHeight: 20,
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonView: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  rateStyle: {
    fontFamily: fonts.type.medium,
    color: '#fff',
  },
});
