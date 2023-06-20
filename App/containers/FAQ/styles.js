import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    padding: 10,
  },
  addNewText: {
    marginTop: 10,
    marginBottom: 15,
  },
  centerImage: {
    height: Constant.screenWidth / 3,
    width: Constant.screenWidth / 3,
    borderRadius: (Constant.screenWidth * 2) / 3,
    marginVertical: 20,
    backgroundColor: Colors.tabBarColor,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 15,
  },
  changeImageBtn: {color: Colors.red, marginVertical: 10},
  answer: {
    height: 180,
  },
  margin: {
    marginVertical: 10,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    marginHorizontal: 10,
    width: 60,
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  questions: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: Colors.tabBarColor,
    backgroundColor: 'transparent',
  },

});
