import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import RegularText from '../../components/Typography/RegularText';
import {Images} from '../../common';
import colors from '../../common/colors';

function UploadImageButton({title = '', imageList,onPress = () => {}}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
     
     {imageList?.length==0?
      <Image
        source={Images.image}
        style={styles.image}
        resizeMode={'contain'}
      />
      :
      <Image
        source={{uri:imageList&&imageList[0]?.uri}}
        style={styles.selectedImage}
        resizeMode={'contain'}
      />
      }
      <RegularText bold>{title}</RegularText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.white,
    borderStyle: 'dashed',
  },
  image: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  selectedImage:{
    width: 150,
    height: 100,
    marginBottom: 8,
  }
});

export default React.memo(UploadImageButton);
