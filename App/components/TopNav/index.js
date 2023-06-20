import React from 'react';
import {Image, Pressable, SafeAreaView, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Images} from '../../common';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import RegularText from '../Typography/RegularText';

function TopNav({
  showLogo = false,
  showBack = false,
  title = '',
  rightComp = () => {},
}) {
  const {goBack} = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {showBack ? (
        <Pressable style={styles.goBack} onPress={goBack}>
          <Icon
            name="chevron-left"
            color="white"
            size={30}
            type="material-community"
          />
        </Pressable>
      ) : (
        <View style={styles.goBack} />
      )}
      {showLogo && (
        <Image
          source={Images.HitHouselogo}
          style={styles.logo}
          resizeMode={'contain'}
        />
      )}
      {!!title && (
        <RegularText textStyle={styles.title} bold>
          {title}
        </RegularText>
      )}
      <View style={styles.goBack}>{rightComp?.()}</View>
    </SafeAreaView>
  );
}

export default React.memo(TopNav);
