import { StyleSheet } from 'react-native';
import { Colors, Constant } from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  margin: {
    marginVertical: 15,
  },
  price: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginHorizontal: 30,
    width: 100,
  },
  btnStyle: {
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
