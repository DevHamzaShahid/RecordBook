import React, { useState } from 'react';
import { View, StyleSheet, Modal, Alert } from 'react-native';
import { Colors, Constant } from '@common';
import Gallery from 'react-native-image-gallery';
import SwiperItem from './SwiperItem';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { Image } from 'react-native';
const SwipperGalleryModal = (props) => {
  const [modalVisible, onChangeModalVisible] = useState(false);

  const uris = props.images.map((aIamge) => {
    return {
      source: {
        uri: aIamge,
      },
    };
  });

  return (
    <>
      <View style={[styles.wrapper, props.style]}>
        <Swiper
          showsPagination={!props.disableClick}
          dotColor="white"
          // removeClippedSubviews={false}
          activeDotColor={Colors.skyBlue02}>
          {props.images.map((aImage, index) => {
            return (
              <>
                <SwiperItem
                  style={props.styleImage}
                  key={index}
                  imagePath={aImage}
                  disabled={props.disableClick}
                  onPress={() => {
                    if (props.disableClick && props.onPress) {
                      props.onPress();
                    } else {
                      onChangeModalVisible(true);
                    }
                  }}
                />
              </>
            );
          })}
        </Swiper>
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Gallery style={styles.gallery} images={uris} />
          <Icon
            name="cancel"
            color="white"
            containerStyle={styles.containerStyle}
            onPress={() => onChangeModalVisible(false)}
          />
        </Modal>
      </View>
    </>
  );
};

export default SwipperGalleryModal;

const styles = StyleSheet.create({
  container: {},
  containerStyle: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  gallery: { backgroundColor: 'black' },
  wrapper: {
    height: (Constant.screenWidth * 9) / 16,
    width: Constant.screenWidth,
  },
});
