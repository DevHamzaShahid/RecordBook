import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Icon} from 'react-native-elements';
import {getDownloadURL} from '../utils/storage';
import {Images, Colors} from '@common';
import {SolidButton} from '@Buttons';

const PDFPickerBox = (props) => {
  const {selectedPDF = {}, IsPDFModified = false} = props;
  const [IsPDFModi, setIsPDFModified] = useState(IsPDFModified);
  // const [IsPDFModified, setPDFModified] = useState(false);
  const [pdfList, setPDFList] = useState([]);
  const [isValue, setIsValue] = useState(false);

  useEffect(() => {
    if (props.pdf) {
      setPDFList(
        props.images.map((image, index) => {
          return {
            uri: image,
            id: index,
          };
        }),
      );
    }
  }, []);

  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };

  const removeImage = (index) => {
    var newImages = pdfList.filter((item, ind) => ind !== index);
    selectedPDF(newImages);
    setPDFList(newImages);
    setIsValue(!isValue);
    setIsPDFModified(true);
  };

  const changePDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res, 'resresresresresresresresresresres');
      const source = {uri: res.fileCopyUri};
      pdfList.push(source);
      selectedPDF(pdfList);
      setPDFList(pdfList);
      setIsValue(!isValue);
      setIsPDFModified(true);
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <View>
      <FlatList
        data={pdfList}
        horizontal
        renderItem={({item, index}) => (
          <View style={styles.buttonStyle}>
            <Icon name="file-pdf-o" type="font-awesome" size={100} />
            <Icon
              name="cancel"
              color={Colors.tabBarColor}
              size={30}
              onPress={() => removeImage(index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => `${index}`}
        ListFooterComponent={() => {
          return (
            <View style={styles.chooseFileView}>
              {pdfList.length === 0 && (
                <Icon name="photo-library" size={30} color="white" />
              )}
              <SolidButton
                title="Choose pdf"
                buttonStyle={styles.chooseFile}
                textStyle={styles.btnTextStyle}
                onPress={() => changePDF()}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
export default PDFPickerBox;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 150,
    width: 150,
    margin: 5,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
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
