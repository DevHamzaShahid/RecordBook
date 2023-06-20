import { Colors, GlobalStyle } from '@common';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
// import EmailLinkHandler from '../../components/EmailLinkHandler';

import Navigation from '../../navigation/router';
import ReduxPersist from '../../utils/reduxPersist';
import { navigate } from '../../utils/rNavigation';
import Actions from './reducer';

import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default () => {
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ReduxPersist.active) {
      dispatch(Actions.startup());
    }
  });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      dispatch(Actions.newMessage(true));
      //Alert.alert('', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleDynamicLink = async (link) => {
      // Check and handle if the link is a email login link
      await auth().currentUser.reload();
      dispatch(Actions.startup());
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    // /* When the app is not running and is launched by a magic link the `onLink`
    //     method won't fire, we can handle the app being launched by a magic link like this */
    // dynamicLinks()
    //   .getInitialLink()
    //   .then((link) => link && handleDynamicLink(link));

    // // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  return (
    <View style={[GlobalStyle.style.flex1, { backgroundColor: Colors.black }]}>
      <Navigation />
      {!loading ? null : <Loading />}
    </View>
  );
};
