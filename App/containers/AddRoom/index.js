import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { Container, Content } from 'native-base';
import { Icon } from 'react-native-elements';
import { Colors } from '@common';
import { SolidButton } from '@Buttons';
import { SwipeListView } from 'react-native-swipe-list-view';
import SwipeCellButton from '../../components/SwipeCellButton';
import { MediumText, SmallText, LargeText } from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import ImagePickerBox from '../../components/ImagePickerBox';
import TextField from '../../components/TextField';
import microValidator from 'micro-validator';
import is from 'is_js';
import styles from './styles';
import Actions from './reducer';
import DropDownPicker from 'react-native-dropdown-picker';

const validationSchema = {
  title: {
    required: {
      errorMsg: 'Please enter room title',
    },
  },
  price: {
    required: {
      errorMsg: 'Please enter price',
    },
  },
  location: {
    required: {
      errorMsg: 'Please enter room location',
    },
  },
};

const AddRoom = ({ route, navigation }) => {
  const { editMode } = route.params;
  const user = useSelector((state) => state.user);
  const studio = useSelector((state) => state.studio);
  const room = useSelector((state) => state.room);
  const promo = editMode ? room.editPromo : room.promo;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '12 HRs', value: '12' },
    { label: '6 HRs', value: '6' }
  ]);
  console.log("new adata from db", studio.selectedStudio);
  const [selectedValue, setSelectedValue] = useState(null);
  const [formData, setFormData] = useState({
    id: editMode ? studio.selectedStudio.id : '',
    docId: editMode ? studio.selectedStudio.docId : '',
    title: editMode ? studio.selectedStudio.title : '',
    price: editMode ? `${studio.selectedStudio.price}` : '',
    location: editMode ? studio.selectedStudio.location : '',
    studioPin: editMode ? studio.selectedStudio.studioPin : '',
    hours: editMode ? studio.selectedStudio.hours : '',
    sixHrPrice: editMode ? studio?.selectedStudio?.sixHrPrice && studio?.selectedStudio?.sixHrPrice : '',
    twelveHrPrice: studio?.selectedStudio?.twelveHrPrice && studio?.selectedStudio?.twelveHrPrice,
  });
  const [images, setImages] = useState(
    editMode ? studio.selectedStudio.imageUrls : [],
  );
  const [errors, setErrors] = useState({});
  const [isImagesModified, setImagesModified] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const dispatch = useDispatch();
  const selectedImages = (image) => {
    setImages(image);
  };
  const handleChange = (event, key) => {
    formData[key] = event;
    setFormData(formData);
  };

  useEffect(() => {
    setValue(formData.hours); // Set initial value of the dropdown
    console.log("gtimages", images);
  }, [images]);

  const handleValueChange = (itemValue) => {
    setValue(itemValue);
    setSelectedValue(itemValue);
    setRefresh(refresh + 3)
  };
  // useEffect(() => {
  //   value && setFormData((prevState) => ({ ...prevState, hours: value }));
  // }, [refresh])
  const saveRoom = () => {
    const Errors = microValidator.validate(validationSchema, formData);
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }
    formData['id'] = `${Date.now()}`;
    formData['price'] = parseInt(formData.price);
    formData['engineerPrice'] = 1000;
    formData['promo'] = room.roomPromos;
    formData['images'] = images.map((aI) => aI.uri);
    formData['aminities'] = room.roomTitleDescs;
    dispatch(Actions.createRoom(formData));
  };

  const keyExtractor = (k) => `${k.id}`;

  const updateRoom = () => {
    const Errors = microValidator.validate(validationSchema, formData);
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }
    formData['imagesModified'] = isImagesModified;
    formData['images'] = images.map((aI) => aI.uri);
    formData['promo'] = room.editRoomPromos;
    formData['aminities'] = room.editRoomTitleDescs;
    dispatch(Actions.updateRoom(formData, studio.selectedStudio.imageUrls));
  };

  //no need it is deleting after updating the room(button). working: remove promo from db as well
  // const removeFromDbAsWell = (data) => {

  //   const docId = studio.selectedStudio.docId;

  //   firestore()
  //     .collection('Studio')
  //     .doc(docId)
  //     .get()
  //     .then((snapshot) => {
  //       const promoArray = snapshot._data.promo;
  //       const itemId = data.item.id;

  //       // Find the index of the item in the promoArray
  //       const index = promoArray.findIndex((item) => item.id === itemId);

  //       if (index !== -1) {
  //         // Remove the item from the promoArray using splice
  //         promoArray.splice(index, 1);

  //         // Update the document with the modified promoArray
  //         firestore()
  //           .collection('Studio')
  //           .doc(docId)
  //           .update({ promo: promoArray })
  //           .then(() => {
  //             console.log('Item deleted successfully from Firestore.');
  //           })
  //           .catch((error) => {
  //             console.error('Error deleting item from Firestore:', error);
  //           });
  //       } else {
  //         console.log('Item not found in the promo array.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error retrieving document from Firestore:', error);
  //     });
  //   setRefresh(refresh + 2)
  // }
  const renderPromos = () => {
    return (
      <SwipeListView
        data={editMode ? room.editRoomPromos : room.roomPromos}
        renderItem={(data, rowMap) => (
          <View style={styles.titleDescContainer} key={data.item.id}>
            <MediumText bold textStyle={styles.title}>
              {data.item.code}
            </MediumText>
            <MediumText textStyle={styles.title}>
              {data.item.discount_type}: {data.item.value}
            </MediumText>
          </View>
        )}
        keyExtractor={keyExtractor}
        renderHiddenItem={(data, rowMap) => (
          <SwipeCellButton
            key={`${data.index}`}
            onPress={() => {
              dispatch(
                editMode
                  ? Actions.removeEditPromoCode(data.item)
                  : Actions.removePromoCode(data.item),
              )
              // delete from fire store as well
              // removeFromDbAsWell(data)
            }
            }
          />
        )}
        rightOpenValue={-75}
      />
    );
  };

  const renderRoomAmenities = () => {
    return (
      <SwipeListView
        data={editMode ? room.editRoomTitleDescs : room.roomTitleDescs}
        renderItem={(data, rowMap) => (
          <View style={styles.titleDescContainer} key={data.item.id}>
            <MediumText bold textStyle={styles.title}>
              {data.item.header}
            </MediumText>
            <MediumText textStyle={styles.title}>{data.item.detail}</MediumText>
          </View>
        )}
        keyExtractor={keyExtractor}
        renderHiddenItem={(data, rowMap) => (
          <SwipeCellButton
            key={`${data.index}`}
            onPress={() => {
              dispatch(
                editMode
                  ? Actions.removeEditRoomTitleDesc(data.item)
                  : Actions.removeRoomTitleDesc(data.item),
              )
            }
            }
          />
        )}
        rightOpenValue={-75}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <Container style={styles.container}>
        <SectionHeader title={editMode ? 'Edit Room' : 'Add Room'} />
        <Content padder>
          <TextField
            placeHolder="Title of Room"
            autoCorrect={false}
            autoCapitalize="none"
            value={formData.title}
            onChangeText={(text) => {
              handleChange(text, 'title');
              setErrors({});
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {errors.title && errors.title[0]}
          </SmallText>
          <View style={styles.addTitle}>
            <MediumText bold textStyle={styles.margin}>
              Add description header and detail
            </MediumText>
            <Icon
              name="add-circle"
              color={Colors.red}
              size={30}
              onPress={() =>
                navigation.navigate(
                  editMode ? 'EditRoomTitleDesc' : 'AddRoomTitleDesc',
                )
              }
            />
          </View>
          {renderRoomAmenities()}
          <MediumText bold textStyle={styles.margin}>
            Set price for 12hr
          </MediumText>
          <View style={styles.price}>
            <LargeText bold textStyle={styles.margin}>
              $
            </LargeText>
            <TextField
              autoCorrect={false}
              autoCapitalize="none"
              value={formData.twelveHrPrice}
              multiline={true}
              keyboardType="decimal-pad"
              textInputStyle={styles.priceText}
              onChangeText={(text) => {
                handleChange(text, 'twelveHrPrice');
                setErrors({});
              }}
            />

            {/* <LargeText bold textStyle={styles.margin}>
            / 12 hr
          </LargeText> */}

            {/* <DropDownPicker
              open={open}
              value={selectedValue || value}
              items={items}
              setOpen={setOpen}
              setValue={handleValueChange}
              setItems={setItems}
              placeholder='Hours'
              style={{
                width: '30%',
              }}
              textStyle={{ color: '#000', textDecorationLine: 'none', zIndex: 9999 }}
              dropDownContainerStyle={{
                width: '30%',
                padding: 5,
              }}
            /> */}
          </View>

          <MediumText bold textStyle={styles.margin}>
            Set price for 6hr
          </MediumText>
          <View style={styles.price}>
            <LargeText bold textStyle={styles.margin}>
              $
            </LargeText>
            <TextField
              autoCorrect={false}
              autoCapitalize="none"
              value={formData.sixHrPrice}
              multiline={true}
              keyboardType="decimal-pad"
              textInputStyle={styles.priceText}
              onChangeText={(text) => {
                handleChange(text, 'sixHrPrice');
                setErrors({});
              }}
            />

            {/* <LargeText bold textStyle={styles.margin}>
            / 12 hr
          </LargeText> */}

            {/* <DropDownPicker
              open={open}
              value={selectedValue || value}
              items={items}
              setOpen={setOpen}
              setValue={handleValueChange}
              setItems={setItems}
              placeholder='Hours'
              style={{
                width: '30%',
              }}
              textStyle={{ color: '#000', textDecorationLine: 'none', zIndex: 9999 }}
              dropDownContainerStyle={{
                width: '30%',
                padding: 5,
              }}
            /> */}
          </View>
          <SmallText textStyle={styles.error} bold>
            {errors.price && errors.price[0]}
          </SmallText>
          <View style={styles.addTitle}>
            <MediumText bold textStyle={styles.margin}>
              Add Gallery Images
            </MediumText>
          </View>
          <ImagePickerBox
            images={images}
            selectedImages={selectedImages}
            setIsImagesModified={(isModified) => setImagesModified(isModified)}
          />
          <TextField
            placeHolder="Set Location"
            autoCorrect={false}
            value={formData.location}
            autoCapitalize="none"
            onChangeText={(text) => {
              handleChange(text, 'location');
              setErrors({});
            }}
          />
          <SmallText textStyle={styles.error} bold>
            {errors.location && errors.location[0]}
          </SmallText>
          <TextField
            placeHolder="Studio PIN Code"
            autoCorrect={false}
            value={formData.studioPin}
            autoCapitalize="none"
            onChangeText={(text) => {
              handleChange(text, 'studioPin');
              setErrors({});
            }}
          />
          <View style={styles.addTitle}>
            <MediumText bold textStyle={styles.margin}>
              Promos
            </MediumText>
            <Icon
              name="add-circle"
              color={Colors.red}
              size={30}
              onPress={() =>
                navigation.navigate(editMode ? 'EditPromoCode' : 'AddPromoCode')
              }
            />
          </View>
          {renderPromos()}
          <SolidButton
            title={editMode ? 'Update Room' : 'Save Room'}
            textStyle={styles.btnTextStyle}
            onPress={editMode ? updateRoom : saveRoom}
          />
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default AddRoom;



