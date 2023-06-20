import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content } from 'native-base';
import { Alert } from 'react-native';
import microValidator from 'micro-validator';
import is from 'is_js';
import { Images } from '@common';
import Actions from '../Support/reducer';
import CategoryActions from '../Category/reducer';

import { SolidButton } from '@Buttons';
import { MediumText, LargeText, SmallText } from '@Typography';

import SectionHeader from '../../components/SectionHeader';
import TextField from '../../components/TextField';
import DropDown from '../../components/DropDown';
import ImagePickerBox from '../../components/ImagePickerBox';
import PDFPickerBox from '../../components/PDFPickerBox';
import styles from './styles';

const validationSchema = {
  question: {
    required: {
      errorMsg: 'Please enter question',
    },
  },
  answer: {
    required: {
      errorMsg: 'Please enter answer',
    },
  },
};

const FAQ = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [images, setImages] = useState([]);
  const [pdf, setPDF] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  // const [selectedImage, setSelectedImages] = useState({});

  useEffect(() => {
    dispatch(CategoryActions.getCategories());
  }, []);
  const selectedImages = (imageObj) => {
    setImages(imageObj);
  };
  const selectedPDF = (Obj) => {
    setPDF(Obj);
  };
  const saveFAQ = () => {
    const Errors = microValidator.validate(validationSchema, formData);
    if (!is.empty(Errors)) {
      setErrors(Errors);
      return;
    }
    if (selectedCategory.title == null) {
      Alert.alert('Please select a category');
      return;
    }
    formData['category'] = selectedCategory;
    formData['id'] = `${Date.now()}`;
    formData['color'] = selectedCategory.color;
    formData['images'] = images;
    formData['pdf'] = pdf;
    dispatch(Actions.createFAQ(formData));
  };
  const handleChange = (event, key) => {
    formData[key] = event;
    setFormData(formData);
  };
  return (
    <Container style={styles.container}>
      <SectionHeader bold title="FAQs" />
      <Content padder style={styles.content}>
        <LargeText bold textStyle={styles.addNewText}>
          Add New
        </LargeText>
        <TextField
          placeHolder="Question"
          autoCorrect={false}
          autoCapitalize="none"
          textInputStyle={styles.questions}
          onChangeText={(text) => {
            handleChange(text, 'question');
            setErrors({});
          }}
        />
        <SmallText textStyle={styles.error} bold>
          {errors.question && errors.question[0]}
        </SmallText>
        <TextField
          placeHolder="Answer"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          textInputStyle={styles.answer}
          onChangeText={(text) => {
            handleChange(text, 'answer');
            setErrors({});
          }}
        />
        <SmallText textStyle={styles.error} bold>
          {errors.answer && errors.answer[0]}
        </SmallText>
        <MediumText bold textStyle={styles.margin}>
          Select Category
        </MediumText>
        <DropDown
          dropdownItems={category.categories}
          title={selectedCategory.title}
          onSelection={(val) => setSelectedCategory(val)}
        />
        <MediumText bold textStyle={styles.margin}>
          Add Featured Images
        </MediumText>
        <ImagePickerBox
          selectedImages={selectedImages}
          setIsImagesModified={() => { }}
        />
        <MediumText bold textStyle={styles.margin}>
          Add Featured PDF
        </MediumText>
        <PDFPickerBox selectedPDF={selectedPDF} setIsPDFModified={false} />
        <SolidButton
          title="Save"
          textStyle={styles.btnTextStyle}
          onPress={saveFAQ}
        />
      </Content>
    </Container>
  );
};

export default FAQ;
