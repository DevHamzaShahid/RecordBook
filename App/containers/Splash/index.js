import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Actions from '../Profile/reducer';
import {Container, Content} from 'native-base';
import {Images} from '@common';

import styles from './styles';
import Spinner from 'react-native-spinkit';
const Splash = ({navigation}) => {
  useEffect(() => {
    const handleDynamicLink = async (link) => {
      // Check and handle if the link is a email login link
      // navigation.navigate('PhoneVerified');
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    /* When the app is not running and is launched by a magic link the `onLink`
        method won't fire, we can handle the app being launched by a magic link like this */
    dynamicLinks()
      .getInitialLink()
      .then((link) => link && handleDynamicLink(link));

    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  return (
    <Container style={styles.container}>
      <Image
        source={Images.HitHouselogo}
        style={styles.image}
        resizeMode="contain"
      />
    </Container>
  );
};
export default Splash;
