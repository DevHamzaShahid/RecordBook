import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {put} from 'redux-saga/effects';
import AppActions from '../containers/Root/reducer';

export const phoneLogin = function* (phone) {
  try {
    yield put(AppActions.loading(true));
    // login with  as a guest user
    const firebaseUserCredential = yield firebase
      .auth()
      .signInWithPhoneNumber(phone);
    //  const firebaseUserCredential = yield firebase.auth().verifyPhoneNumber(phone)
    console.log('phone verification', firebaseUserCredential);
    yield put(AppActions.loading(false));
    return firebaseUserCredential;
  } catch (e) {
    yield put(AppActions.loading(false));
    console.error(e);
  }
  return false;
};

export const sendEmailVerification = function* sendEmailVerification(email) {
  try {
    yield put(AppActions.loading(true));
    yield firebase.auth().currentUser.updateEmail(email);
    //sendSignInLinkToEmail
    const firebaseUserCredential = yield firebase
      .auth()
      .currentUser.sendEmailVerification({
        //handleCodeInApp: true,
        url: `https://hithouse-aae5e.firebaseapp.com?email=${email}`,
        iOS: {
          bundleId: 'com.recordBook.ios',
        },
        android: {
          packageName: 'com.recordbook',
          installApp: true,
          minimumVersion: '12',
        },
        dynamicLinkDomain: 'recordbook.page.link',
      });
    yield put(AppActions.loading(false));
    return firebaseUserCredential;
  } catch (error) {
    yield put(AppActions.loading(false));
    console.error(error);
    return error;
  }
};

export const checkPhoneExiting = function* checkPhoneExiting(phone) {
  try {
    const snapshot = yield firestore()
      .collection('Users')
      .where('phone', '==', phone)
      .get();
    let user = false;
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        user = doc.data();
        user.uid = doc.id;
      });
    }

    return user;
  } catch (error) {
    yield put(AppActions.loading(false));
    console.error(error);
    return false;
  }
};

export const signOut = function* signOut() {
  return firebase.auth().signOut();
};

export const isEmailVerified = function* isEmailVerified() {
  yield firebase.auth().currentUser.reload();
  const currentUser = yield firebase.auth().currentUser;
  console.log('email verified', currentUser.emailVerified);
  return currentUser.emailVerified;
};
