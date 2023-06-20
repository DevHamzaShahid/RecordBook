import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Modal} from 'react-native';
import {Colors, Fonts, GlobalStyle} from '@common';
import {RegularText, SmallText} from '@Typography';
import {Icon} from 'react-native-elements';

const InfoModal = (props) => (
  <Modal transparent={true} visible={props.visible}>
    <View style={styles.transparent}>
      <View style={styles.semiTransparent}>
        <View style={styles.modalInnerView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <RegularText bold textStyle={{textAlign: 'center'}}>
              {' '}
              Info
            </RegularText>
            <Icon
              name="cancel"
              color="white"
              size={30}
              onPress={props.dismiss}
            />
          </View>
          <RegularText
            textStyle={{marginTop: 10, marginLeft: 10, marginBottom: 15}}>
            {props.modalText}
          </RegularText>
        </View>
      </View>
    </View>
  </Modal>
);

export default InfoModal;

const styles = StyleSheet.create({
  transparent: {
    flex: 1,
    backgroundColor: Colors.semiTransparent,
  },
  semiTransparent: {
    padding: 5,
    marginTop: '50%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: Colors.darkGray,
  },
  modalInnerView: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});
