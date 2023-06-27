import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlobalStyle, Colors, Fonts } from '@common';
import { Icon } from 'react-native-elements';

import { RegularText } from '@Typography';

const ScanSection = props => {
  return (
    <View style={styles.container}>
      <RegularText>Scan section for Modular Information </RegularText>
      <Icon
        containerStyle={styles.iconContainer}
        name="barcode-scan"
        size={100}
        color="gray"
        type="material-community"
      />
    </View>
  );
};
export default ScanSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  iconContainer: {
    marginTop: 20,
  },
});
