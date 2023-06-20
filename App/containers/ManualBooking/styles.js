import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
  },
  acceptButtonStyle: {
    marginLeft: 10,
    backgroundColor: Colors.greenDark,
  },
  declineButtonStyle: {
    margin: 10,
  },
  topImage: {
    width: '100%',
    height: 180,
  },
  viewContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBarColor,
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  lightViewContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  margin:{
    marginVertical: 10,
  },
  left: {
    borderRightColor: 'white',
    borderRightWidth: 2,
    marginRight: 5,
    flex: 2,
    marginVertical: 10,
  },
  right: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  error: {
    color: Colors.red,
    textAlign: 'left',
    marginBottom: 20,
  },
});
