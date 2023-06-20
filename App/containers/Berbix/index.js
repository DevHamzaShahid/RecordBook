import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import Actions from '../Profile/reducer';
import AppActions from '../Root/reducer';
import functions from '@react-native-firebase/functions';

import {Container, Content} from 'native-base';
import {Images} from '@common';
import BerbixSdk from 'berbix-react-native';
import styles from './styles';

// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }


const Berbix = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [config, setConfig] = useState({});

  const [error, setError] = useState(null);
  const [sessionCreated, setSessionCreated] = useState(false);

  useEffect(() => {
    dispatch(AppActions.loading(true));
    functions()
      .httpsCallable('getBerbixClientToken')(user)
      .then((response) => {
        setConfig({clientToken: response.data.clientToken});
        dispatch(AppActions.loading(false));
      })
      .catch((err) => {
        dispatch(AppActions.loading(false));
        console.log(err);
      });
  }, []);

  const startFlow = async () => {
    setError(null);

    try {
      await BerbixSdk.startFlow(config);
    } catch (err) {
      setError(err.domain || err.message);
    }
  };

  const createSession = async () => {
    setError(null);

    try {
      await BerbixSdk.createSession(config);
      setSessionCreated(true);
    } catch (err) {
      setError(err.domain || err.message);
    }
  };

  const displayFlow = async () => {
    setError(null);

    try {
      await BerbixSdk.displayFlow();
      setSessionCreated(true);
    } catch (err) {
      setError(err.domain || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Berbix rn sdk</Text>
      <Text style={styles.instructions}>
        {
          'Press "Start Flow" to start Berbix flow automatically after configuration is done'
        }
      </Text>
      <Button title="Start Flow" onPress={startFlow} />

      {Platform.OS === 'ios' && (
        <>
          <Text style={styles.instructions}>
            {'Press "Create session" to start a handled Berbix flow'}
          </Text>
          <Button title="Create Session" onPress={createSession} />
          <Text>{sessionCreated ? 'Session created' : 'No session'}</Text>

          <Button title="Display Flow" onPress={displayFlow} />
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
export default Berbix;
