import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  acceptButtonStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.green,
  },
  declineButtonStyle: {
    flex: 1,
    margin: 10,
  },
  topImage: {
    width: '100%',
    height: 220,
  },
  topImageContainer: {
    width: '100%',
    height: 220,
  },
  scrollContainer: {
    backgroundColor: Colors.black,
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
  editBtnStyle: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: Colors.greenDark,
  },
  btnStyle: {
    flex: 1,
    marginHorizontal: 10,
  },
});
