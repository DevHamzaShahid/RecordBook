import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Constants = {
  screenWidth: width,
  screenHeight: height,
};

export default Constants;
