import React from 'react';
import Modal from 'react-native-modal';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Images} from '../../common';
import Constants from '../../common/Constant';
import {Icon} from 'react-native-elements';
import fonts from '../../common/Fonts';

function ExampleImage({isVisible = false, onClose = () => {}}) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <SafeAreaView />
        <Pressable onPress={onClose} hitSlop={10}>
          <Icon
            style={styles.icon}
            name={'closecircle'}
            type={'antdesign'}
            size={32}
            color={'#fff'}
          />
        </Pressable>
        <View style={styles.wrapper}>
          <Text style={{fontFamily: fonts.type.regular}}>
            I am the modal content!
          </Text>
          <Image style={styles.image} source={Images.exampleImage} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'flex-end',
    margin: 24,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: -60,
    width: Constants.screenWidth / 2,
    height: Constants.screenWidth / 2,
    borderRadius: 4,
  },
});
export default ExampleImage;
