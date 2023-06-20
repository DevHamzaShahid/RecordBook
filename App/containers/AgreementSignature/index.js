import React, { useRef, useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import TopNav from '../../components/TopNav';
import styles from './styles';
import LargeText from '../../components/Typography/LargeText';
import MediumText from '../../components/Typography/MediumText';
import { Icon } from 'react-native-elements';
import SignatureCapture from 'react-native-signature-capture';
import FileSystem from 'react-native-fs';
import Actions from '../MyBooking/reducer';
import { useDispatch } from 'react-redux';
import { Colors } from '../../common';
import { Container } from 'native-base';
import SolidButton from '../../components/Buttons/SolidButton';
import BorderButton from '../../components/Buttons/BorderButton';
import Modal from 'react-native-modal';
import RentalAgreement from './RentalAgreement';
import SmallText from '../../components/Typography/SmallText';
import colors from '../../common/colors';

function AgreementSignature({ navigation }) {
  const refs = useRef();
  const dispatch = useDispatch();
  const [showAgreement, setShowAgreement] = useState(false);
  const [termAccept, setTermsAccepted] = useState(false);
  const [signatureCapture, setSignatureCapture] = useState(false);
  const [showError, setShowError] = useState(false);

  const _onSaveEvent = (result) => {
    const path = FileSystem.TemporaryDirectoryPath + '/signature.png';
    console.log('path', path);
    FileSystem.writeFile(path, result.encoded, 'base64')
      .then((success) => {
        dispatch(Actions.setTermsAccepted(true));
        navigation.replace('ConfirmPay');
      })
      .catch();
  };

  return (
    <Container style={styles.container} bounces={false}>
      <TopNav showBack title={'Agreement & Signature '} />
      <View style={styles.indicatorView}>
        <View style={styles.indicator} />
        <View style={[styles.indicator, { backgroundColor: '#fff' }]} />
      </View>

      <View style={styles.contentView}>
        <LargeText textStyle={styles.agreementTitle}>
          Studio Rental Agreement
        </LargeText>

        <MediumText textStyle={styles.agreementDesc}>
          Please read your Studio Rental Agreement and click the checkbox before
          signing below.
        </MediumText>
      </View>

      <Pressable
        style={styles.agreementView}
        onPress={() => setShowAgreement(true)}>
        <View style={termAccept ? styles.viewCheck : styles.viewUnCheck} />
        <View style={{ flex: 1 }}>
          <MediumText textStyle={styles.agreementText}>
            View & Consent to Rental Agreement
          </MediumText>
          {showError && !termAccept && (
            <SmallText
              textStyle={{ marginLeft: 16, color: colors.red, marginTop: 2 }}>
              *Required.
            </SmallText>
          )}
        </View>
        <Icon
          name="chevron-right"
          color="white"
          size={30}
          type="material-community"
        />
      </Pressable>

      <View style={styles.contentSignatureView}>
        <LargeText textStyle={styles.agreementTitle}>E- Signature</LargeText>
        <MediumText textStyle={styles.eSignatureText}>
          By signing my name in the box below, I acknowledge I have read and
          accept the Studio Rental Agreement.
        </MediumText>

        <View style={styles.signatureView}>
          <SignatureCapture
            style={styles.signature}
            ref={refs}
            onSaveEvent={_onSaveEvent}
            onDragEvent={() => setSignatureCapture(true)}
            saveImageFileInExtStorage={true}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor={Colors.white}
            strokeColor={Colors.black}
            minStrokeWidth={1}
            maxStrokeWidth={3}
            viewMode={'portrait'}
          />

          <View style={styles.signatureLine} pointerEvents={'none'} />
        </View>
      </View>
      <View style={styles.clearButtonView}>
        {showError && !signatureCapture && (
          <SmallText textStyle={{ color: colors.red }}>*Required.</SmallText>
        )}
        <BorderButton
          buttonStyle={styles.clearButton}
          title={'Clear'}
          onPress={() => {
            setSignatureCapture(false);
            refs.current.resetImage();
          }}
        />
      </View>
      <SolidButton
        title={'Confirm Signature'}
        buttonStyle={styles.confirmButton}
        // disabled={!termAccept || !signatureCapture}
        onPress={() => {
          if (!termAccept || !signatureCapture) {
            setShowError(true);
          } else {
            refs.current.saveImage();
          }
        }}
      />

      <Modal isVisible={showAgreement} style={styles.modal}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <LargeText>StudioRentalAgreement</LargeText>
              <Pressable hitSlop={15} onPress={() => setShowAgreement(false)}>
                <Icon
                  name="chevron-down"
                  color="white"
                  size={30}
                  type="material-community"
                />
              </Pressable>
            </View>
          </View>
          <RentalAgreement />

          <Pressable
            style={styles.acceptView}
            onPress={() => setTermsAccepted(!termAccept)}>
            <View style={termAccept ? styles.viewCheck : styles.viewUnCheck} />
            <MediumText textStyle={{ marginLeft: 16 }}>
              I accept and agree to the above Studio Rental Agreement.
            </MediumText>
          </Pressable>

          <SolidButton
            disabled={!termAccept}
            buttonStyle={styles.doneButton}
            title={'Done'}
            onPress={() => setShowAgreement(false)}
          />
        </SafeAreaView>
      </Modal>
    </Container>
  );
}

export default AgreementSignature;
