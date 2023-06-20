import React, {useState} from 'react';
import {View, StyleSheet, Modal, Alert, FlatList} from 'react-native';
import {GlobalStyle} from '@common';
import Gallery from 'react-native-image-gallery';
import {MediumText} from '@Typography';
import ImageItem from './ImageItem';
import {Icon} from 'react-native-elements';
const GalleryModal = (props) => {
  const [modalVisible, onChangeModalVisible] = useState(false);

  const uris = props.images.map((aIamge) => {
    return {
      source: {
        uri: aIamge,
      },
    };
  });

  const renderItem = ({item}) => (
    <ImageItem imagePath={item} onPress={() => onChangeModalVisible(true)} />
  );

  const keyExtractor = (k, index) => `${index}`;

  return (
    <View style={styles.container}>
      <MediumText bold textStyle={styles.margin}>
        Gallery
      </MediumText>
      <FlatList
        horizontal
        contentContainerStyle={GlobalStyle.style.flatListStyle}
        data={props.images}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
  );
};

export default GalleryModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    width: '90%',
  },
  containerStyle: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  gallery: {flex: 1, backgroundColor: 'black'},
});
