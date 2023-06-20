import storage from '@react-native-firebase/storage';
import {utils, firebase} from '@react-native-firebase/app';
import {put} from 'redux-saga/effects';
import AppActions from '../containers/Root/reducer';

export const saveImageToFirebaseStorage = function* saveImageToFirebaseStorage(
  fileName,
  pathToFile,
) {
  try {
    yield put(AppActions.loading(true));
    console.log(fileName);
    const reference = firebase.storage().ref(fileName);
    yield reference.putFile(pathToFile);
    const url = yield reference.getDownloadURL();

    yield put(AppActions.loading(false));
    return url;
  } catch (e) {
    yield put(AppActions.loading(false));
    console.error(e);
  }
  return false;
};

export const downloadImageFromFirebaseStorage =
  function* downloadImageFromFirebaseStorage(fileName) {
    try {
      yield put(AppActions.loading(true));
      const reference = storage().ref(fileName);
      const url = yield reference.getDownloadURL();
      yield put(AppActions.loading(false));
      return url;
    } catch (e) {
      yield put(AppActions.loading(false));
      console.error(e);
    }
    return null;
  };

export const getDownloadURL = async (path) => {
  return new Promise((resolve, reject) => {
    firebase
      .storage()
      .ref(path)
      .getDownloadURL()
      .then((downloadURL) => {
        resolve(downloadURL);
      })
      .catch((error) => {
        return reject('fail', error);
      });
  });
};

export async function uploadImageAsPromise(fileName, pathToFile) {
  console.log(fileName, pathToFile, 'fileName, pathToFile');
  // var storageRef = firebase.storage().ref(fileName);

  const reference = firebase.storage().ref(fileName);
  console.log('reference', reference);
  await reference.putFile(pathToFile);
  return reference.getDownloadURL();

  //Upload file
  //return storageRef.putFile(pathToFile);

  // //Update progress bar
  // task.on(
  //   'state_changed',
  //   function progress(snapshot) {
  //     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log(percentage);
  //   },
  //   function error(err) {},
  //   function complete() {
  //     var downloadURL = task.snapshot.downloadURL;
  //   },
  // );
  // return task;
}

export function deleteImageAsPromise(uri) {
  var file = firebase.storage().refFromURL(uri);
  var storageRef = firebase.storage().ref(file.path);
  return storageRef.delete();
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
