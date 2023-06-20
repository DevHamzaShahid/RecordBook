const type = {
  black: 'Montserrat-Black',
  blackItalic: 'Montserrat-BlackItalic',
  bold: 'Montserrat-Bold',
  boldItalic: 'Montserrat-BoldItalic',
  extraBold: 'Montserrat-ExtraBold',
  extraBoldItalic: 'Montserrat-ExtraBoldItalic',
  extraLight: 'Montserrat-ExtraLight',
  extraLightItalic: 'Montserrat-ExtraLightItalic',
  italic: 'Montserrat-Italic',
  light: 'Montserrat-Light',
  lightItalic: 'Montserrat-LightItalic',
  medium: 'Montserrat-Medium',
  mediumItalic: 'Montserrat-MediumItalic',
  regular: 'Montserrat-Regular',
  semiBold: 'Montserrat-SemiBold',
  semiBoldItalic: 'Montserrat-SemiBoldItalic',
  thin: 'Montserrat-Thin',
  thinItalic: 'Montserrat-ThinItalic',
};

const size = {
  xl: 30,
  xx: 24,
  large: 20,
  regular: 18,
  medium: 15,
  small: 12,
};

const style = {
  lightHeader: {
    fontFamily: type.light,
    fontSize: size.regular,
  },
  medium: {
    fontFamily: type.regular,
    fontSize: size.medium,
  },
  regular: {
    fontFamily: type.regular,
    fontSize: size.regular,
  },
  regularSpace: {
    fontFamily: type.regular,
    fontSize: size.regular,
    letterSpacing: 4,
  },
  small: {
    fontFamily: type.regular,
    fontSize: size.small,
  },
};

export default {
  type,
  size,
  style,
};
