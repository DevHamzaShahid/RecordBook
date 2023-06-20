import {StyleSheet} from 'react-native';
import fonts from '../../common/Fonts';
import colors from '../../common/colors';

export default StyleSheet.create({
  flatList: {
    paddingHorizontal: 24,
  },
  faqs: {
    fontFamily: fonts.type.regular,
    fontSize: fonts.size.large,
    color: '#fff',
    fontWeight: '700',
    marginVertical: 18,
    marginHorizontal: 24,
  },
  wrapper: {
    marginHorizontal: 12,
  },
  sectionItemView: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  sectionItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {
    fontFamily: fonts.type.regular,
    fontWeight: '700',
    fontSize: fonts.size.medium,
    color: colors.white,
    flex: 1,
  },
  answerText: {
    fontFamily: fonts.type.regular,
    fontSize: 14,
    color: colors.offWhite,
    marginTop: 8,
  },
});
