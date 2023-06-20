import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {Images, Colors} from '@common';
import {SolidButton} from '@Buttons';
import {SmallText} from '@Typography';

const SwiperList = (props) => {
  const {data} = props;
  return (
    <SwipeListView
      data={data}
      renderItem={(data, rowMap) => (
        <View style={styles.rowFront}>
          <Image source={data.item.image} style={styles.imageStyle} />
          <View style={styles.centerText}>
            <SmallText bold textStyle={styles.headingStyles}>
              {data.item.name}
            </SmallText>
            <View style={styles.centerView}>
              <Image source={data.item.usericon} style={styles.profileIcon} />
              <SmallText bold textStyle={styles.userName}>
                {data.item.username}
              </SmallText>
            </View>
            <View style={styles.bottomButtons}>
              <SolidButton
                title={data.item.starttime}
                buttonStyle={styles.btnStyle}
                textStyle={styles.btnTextStyle}
              />
              <SolidButton
                title={data.item.endTime}
                buttonStyle={styles.btnStyle}
                textStyle={styles.btnTextStyle}
              />
            </View>
          </View>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.leftButton}>
            <Image source={Images.tick} style={styles.tickImage} />
            <SmallText bold textStyle={styles.swipeButtons}>
              Approve
            </SmallText>
          </TouchableOpacity>
          <View style={styles.center}></View>
          <TouchableOpacity style={styles.rightButton}>
            <Image source={Images.remove} style={styles.tickImage} />
            <SmallText bold textStyle={styles.swipeButtons}>
              Cancel
            </SmallText>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

export default SwiperList;
const styles = StyleSheet.create({
  rowFront: {
    height: 110,
    width: '100%',
    backgroundColor: Colors.tabBarColor,
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 5,
  },
  center: {
    width: '40%',
  },
  tickImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  swipeButtons: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnStyle: {
    height: 23,
    backgroundColor: Colors.white,
    padding: 10,
    marginRight: 5,
  },
  btnTextStyle: {
    color: Colors.tabBarColor,
    fontWeight: '100',
    fontSize: 10,
  },
  headingStyles: {
    marginBottom: 5,
    fontWeight: '100',
    color: '#cecece',
  },
  bottomButtons: {
    flexDirection: 'row',
  },
  userName: {
    alignSelf: 'center',
    fontSize: 14,
  },
  profileIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  centerView: {
    flexDirection: 'row',
    marginBottom: -5,
  },
  imageStyle: {
    height: 110,
    width: 110,
    backgroundColor: 'yellow',
    borderRadius: 5,
    marginRight: 10,
  },
  centerText: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  rowBack: {
    flexDirection: 'row',
  },
  leftButton: {
    height: 110,
    marginTop: 5,
    backgroundColor: Colors.green,
    width: '30%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  rightButton: {
    height: 110,
    marginTop: 5,
    backgroundColor: Colors.red,
    width: '30%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
