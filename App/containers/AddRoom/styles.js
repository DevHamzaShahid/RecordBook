import {StyleSheet} from 'react-native';
import {Colors, Constant} from '@common';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  margin: {
    marginTop:20,
  },
  titleDescContainer: {
    borderColor: 'white',
    backgroundColor: Colors.tabBarColor,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 3,
    marginVertical: 3,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginVertical: 2,
  },
  addTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    marginHorizontal: 10,
    width: 80,
    height:40,
  },
  btnStyle: {
    width: '50%',
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 50,
    marginHorizontal: 10,

  },
});
