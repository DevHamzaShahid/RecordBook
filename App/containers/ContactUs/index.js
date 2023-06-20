import LinearGradient from 'react-native-linear-gradient';
import {Container} from 'native-base';
import {Linking, StyleSheet, Text, View} from 'react-native';
import TopNav from '../../components/TopNav';
import fonts from '../../common/Fonts';
import React from 'react';
import SmallText from '../../components/Typography/SmallText';
import MediumText from '../../components/Typography/MediumText';

const ContactUs = ({}) => {
  return (
    <Container>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={{flex: 1}}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <TopNav showBack />

        <View style={styles.wrapper}>
          <Text style={styles.contact}>Contact Us</Text>
          <MediumText>
            For management or questions regarding bookings call{' '}
            <Text
              style={styles.phone}
              onPress={() => Linking.openURL('tel:9253235315')}>
              (925) 323-5315.
            </Text>
          </MediumText>

          <MediumText>
            {'\nFor technical assistance during your session, please call '}
            <Text
              style={styles.phone}
              onPress={() => Linking.openURL('tel:3239636365')}>
              (323) 963-6365.
            </Text>
          </MediumText>
        </View>
      </LinearGradient>
    </Container>
  );
};

const styles = StyleSheet.create({
  contact: {
    fontFamily: fonts.type.regular,
    fontSize: fonts.size.large,
    color: '#fff',
    fontWeight: '700',
    marginVertical: 18,
  },
  wrapper: {
    marginHorizontal: 24,
  },
  phone: {
    textDecorationLine: 'underline',
  },
});

export default ContactUs;
