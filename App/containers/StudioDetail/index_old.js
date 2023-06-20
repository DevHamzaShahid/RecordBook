import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {Container} from 'native-base';
import {SolidButton} from '@Buttons';
import {MediumText} from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import SwipperGalleryModal from '../../components/SwipperGalleryModal';

import styles from './styles';
const StudioDetail = ({navigation}) => {
  const studio = useSelector((state) => state.studio);
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
      <SectionHeader title={studio.selectedStudio.title} />
      <ScrollView style={styles.scrollContainer}>
        <SwipperGalleryModal images={studio.selectedStudio.imageUrls} />

        {/* <RegularText bold textStyle={styles.margin}>
          {studio.selectedStudio.title}
        </RegularText> */}
        {renderAmenities()}
      </ScrollView>
      <View style={styles.btnContainer}>
        <SolidButton
          title="Book Now"
          buttonStyle={styles.declineButtonStyle}
          onPress={() => navigation.navigate('ChooseDateTime')}
        />
      </View>
    </Container>
  );
};

export default StudioDetail;
