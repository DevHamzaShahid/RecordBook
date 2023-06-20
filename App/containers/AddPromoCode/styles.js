import { StyleSheet } from 'react-native';
import { Colors, Constant } from '@common';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  margin: {
    marginVertical: 15,
    marginHorizontal:5
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
  validContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: 40, borderRadius: 5, width: '50%', borderWidth: 1, borderColor: '#fff', marginHorizontal: 50 },
  validText: { color: '#fff', fontSize: 16 },
  btnStyle: {
    marginTop: 50,
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
