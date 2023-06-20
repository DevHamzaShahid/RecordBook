import {StyleSheet} from 'react-native';
import colors from '../../common/colors';
import {Constant} from '../../common';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  indicatorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  indicator: {
    backgroundColor: colors.skyBlue02,
    height: 4,
    width: Constant.screenWidth / 3,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  titleView: {
    flexDirection: 'row',
    margin: 24,
  },
  titleWrapper: {
    flex: 1,
    marginRight: 16,
  },
  subTextView: {
    marginTop: 16,
    flexDirection: 'row',
  },
  subTextStyle: {
    fontSize: fonts.size.medium,
    marginLeft: 8,
  },
  image: {
    width: 160,
    height: 90,
    borderRadius: 8,
  },
  bodyView: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 24,
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  dateText: {
    flex: 1,
    marginTop: 16,
    marginBottom: 4,
  },
  sessionView: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalView: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
