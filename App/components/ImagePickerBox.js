import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import { getDownloadURL } from '../utils/storage';
import { Images, Colors } from '@common';
import { SolidButton } from '@Buttons';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Constant } from '../common';

const ImagePickerBox = (props) => {
  const { selectedImages, setIsImagesModified, images } = props;
  const [imageList, setImageList] = useState([]);
  const [isValue, setIsValue] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [selectedImageForEditing, setEditing] = useState("")

  const [test, setTest] = useState(images.map((image, index) => {
    return { uri: image, id: `${index}` };
  }))
  const { navigate } = useNavigation()
  const isfocused = useIsFocused()
  // useEffect(() => {
  //   if (props.images) {
  //     setImageList(
  //       props?.images.map((image, index) => {
  //         return { uri: image, id: `${index}` };
  //       }),
  //     );
  //   }
  // }, [isfocused]);

  // useEffect(() => {
  //   console.log("Updatedlist", imageList);
  // }, [imageList])
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };

  // const removeImage = (index) => {

  //   const copyList = test.slice()
  //   const newImages = copyList.filter((item, ind) => ind !== index);
  //   console.log("copyList", newImages);
  //   // console.log("newImages");
  //   // selectedImages(newImages);
  //   // setImageList(newImages);
  //   // setIsValue(!isValue);
  //   // setIsImagesModified(true);
  // };
  // const removeImage = (index) => {
  //   setTest(prevState => {
  //     const copyList = [...prevState]
  //     copyList.splice(index, 1);
  //     return copyList;
  //   });
  // };
  const removeImage = (index) => {
    setTest((prevState) => {
      const copyList = [...prevState];
      copyList.splice(index, 1);
      const updatedList = copyList.map((item, i) => ({
        ...item,
        id: `${i}`,
      }));
      return updatedList;
    });
  };

  useEffect(() => {
    selectedImages(test);
    setIsValue(!isValue);
    setIsImagesModified(true);
  }, [test]);
  // async function requestPermissions() {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     ]);
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Permissions granted');
  //     } else {
  //       console.log('Permissions denied');
  //     }
  //     return granted
  //   } catch (err) {
  //     console.warn(err);
  //     return granted
  //   }
  // }
  const changeImage = async () => {
    // const granted = await requestPermissions();
    // console.log(granted)
    // // if (granted) {
    ImageCropPicker.openPicker({
      waitAnimationEnd: false,
      // multiple: true,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 5,
      mediaType: 'any',
      includeBase64: true,
      width: 800, 
      height: 460,
      // height:(Constant.screenWidth * 9) / 16,
      cropperCircleOverlay: false, 
      cropping: true,
      cropperChooseText: 'Crop', 
      cropperToolbarTitle: 'Crop Image', // Set the title for the cropper toolbar
      cropperToolbarColor: '#FFFFFF', // Set the color for the cropper toolbar
      cropperToolbarWidgetColor: '#000000', // Set the color for the cropper toolbar widgets (e.g., buttons)
      cropperActiveWidgetColor: '#FF0000', // Set the color for the active cropper toolbar widget (e.g., button)
      cropperStatusBarColor: '#FFFFFF', // Set the color for the status bar on Android
      cropperStatusBarVisible: false, // Hide the status bar on Android
      cropperToolbarWidgetFontSize: 24, // Set the font size for the cropper toolbar widgets
      cropRect: { x: 0, y: 0, width: 800, height: 500 },
    }).then(response => {
      const source = { uri: response.path, id: `${test.length}` };
      selectedImages([...test, source]);
      setEditing(response.path)
      setImageList([...test, source]);
      setTest((prevState) => [...prevState, source]);
      setIsValue(!isValue);
      setIsImagesModified(true);
    }).catch(error => {
      alert(error.message);
    });
    // }
  };


  const renderItem = useCallback(
    ({ item, index, drag, isActive }) => {
      return (
        <TouchableOpacity style={styles.buttonStyle} onLongPress={drag}>
          <ImageBackground source={{ uri: item.uri }} style={styles.imageStyle}>
            <Icon
              name="cancel"
              color={Colors.tabBarColor}
              size={30}
              onPress={async() => await removeImage(index)}
            />
          </ImageBackground>
        </TouchableOpacity>
      );
    },
    []
  );
 
  const onDragEnd = ({ data }) => {
    const updatedData = data.map((item, index) => ({
      ...item,
      order: index,
    }));

    setTest(updatedData);
    selectedImages(updatedData);
    setIsImagesModified(true);
  };

  return (
    <View>
      <DraggableFlatList
        data={test}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={onDragEnd}
        ListFooterComponent={() => {
          return (
            <View style={styles.chooseFileView}>
              {test.length === 0 && (
                <Icon name="photo-library" size={30} color="white" />
              )}
              <SolidButton
                title="Choose File"
                buttonStyle={styles.chooseFile}
                textStyle={styles.btnTextStyle}
                onPress={changeImage}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
export default ImagePickerBox;
const styles = StyleSheet.create({
  buttonStyle: {
    height: 150,
    width: 150,
    margin: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageStyle: {
    height: 140,
    width: 140,
    padding: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 20,
  },
  chooseFileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chooseFile: {
    marginHorizontal: 20,
    backgroundColor: Colors.tabBarColor,
  },
  pictures: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  addTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  margin: {
    marginVertical: 10,
  },
});
