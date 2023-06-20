import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  ImageBackground,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from '../Studio/reducer';
import AddRoomActions from '../AddRoom/reducer';
import {GlobalStyle, Images} from '@common';
import {SolidButton} from '@Buttons';
import {LargeText, RegularText, MediumText, SmallText} from '@Typography';
import GalleryModal from '../../components/GalleryModal';
import FastImage from 'react-native-fast-image';

import styles from './styles';
const RoomDetail = ({navigation}) => {
  const dispatch = useDispatch();
  const studio = useSelector((state) => state.studio);
  let banner = studio.selectedStudio.banner;

  const onPressDelete = (item) => {
    dispatch(AddRoomActions.deleteRoom(item));
  };
  const onPressEdit = (item) => {
    dispatch(Actions.setSelectedStudio(item));
    dispatch(AddRoomActions.setEditRoomTitleDesc(item.aminities));
    dispatch(AddRoomActions.setEditPromoCode(item.promo));
    navigation.navigate('EditRoom');
  };

  const renderAmenities = () => {
    return studio.selectedStudio.aminities.map((amenity) => {
      return (
        <View key={amenity.id}>
          <MediumText bold textStyle={styles.margin}>
            {amenity.header}
          </MediumText>
          <MediumText textStyle={styles.margin}>{amenity.detail}</MediumText>
        </View>
      );
    });
  };

  return (
    <Container style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.topImageContainer}>
          <FastImage
            style={styles.topImage}
            source={{uri: banner, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <RegularText bold textStyle={styles.margin}>
          {studio.selectedStudio.title}
        </RegularText>
        {renderAmenities()}
        <GalleryModal images={studio.selectedStudio.imageUrls} />
      </ScrollView>
      <View style={[styles.btnContainer,{marginHorizontal:10}]}>
        <SolidButton
          title="Edit"
          buttonStyle={{marginHorizontal:10,}}
          onPress={() => onPressEdit(studio.selectedStudio)}
        />
        <SolidButton
          title="Delete"
          buttonStyle={{marginHorizontal:10}}
          textStyle={styles.btnTextStyle}
          onPress={() => onPressDelete(studio.selectedStudio)}
        />
      </View>
    </Container>
  );
};

export default RoomDetail;
