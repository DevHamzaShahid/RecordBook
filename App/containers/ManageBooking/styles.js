import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
import fonts from '../../common/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  listContainer: {
    flex: 1,
  },
  greenView: {
    width: '100%',
    backgroundColor: Colors.green,
    alignItems: 'center',
  },
  greenViewText: {
    fontSize: 8,
    color: 'gray',
    fontWeight: 'bold',
    fontFamily: fonts.type.bold,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: Colors.black,
    color: 'white',
    textTransform: 'capitalize',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
    fontFamily: fonts.type.regular,
  },
});
