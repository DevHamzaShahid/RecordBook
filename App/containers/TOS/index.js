import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import Actions from '../Profile/reducer';
import {Container, Content} from 'native-base';
import {Images} from '@common';
import SectionHeader from '../../components/SectionHeader';
import {WebView} from 'react-native-webview';

import styles from './styles';
import TopNav from '../../components/TopNav';
const TOS = ({route, rnavigation}) => {
  const {link, title} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.container}>
        <TopNav title={title} showBack />
        <WebView source={{uri: link}} />
      </Container>
    </SafeAreaView>
  );
};
export default TOS;
