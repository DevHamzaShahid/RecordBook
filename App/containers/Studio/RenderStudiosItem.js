import React, { useEffect } from 'react';
import StudioItem from '../../components/StudioItem';
import Actions from './reducer';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function RenderStudiosItem({ item }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressStudio = (item) => {
    dispatch(Actions.setSelectedStudio(item));
    navigation.navigate('StudioDetail', { item });
  };

  return (
    <StudioItem
      title={item.title}
      profileImage={item.banner}
      images={item.images}
      imageUrls={item.imageUrls}
      rate={item.price}
      sixHrPrice={item.sixHrPrice}
      twelveHrPrice={item.twelveHrPrice}
      dealPrice={item.dealPrice}
      subtitle={item.location}
      hours={item.hours}
      onPress={() => onPressStudio(item)}
    />
  );
}

export default RenderStudiosItem;
