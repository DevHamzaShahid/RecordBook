import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import Actions, { RoomTypes, room } from './reducer';
import StudioActions from '../Studio/reducer';
import MyBookingActions, { booking } from '../MyBooking/reducer';

import AppActions, { app } from '../Root/reducer';
import { navigate, popToTop } from '../../utils/rNavigation';
import hitHouseApi from '../../services/hitHouseApi';
import AlertApi from '../../services/alert';
import {
  uploadImageAsPromise,
  uuidv4,
  deleteImageAsPromise,
  saveImageToFirebaseStorage,
} from '../../utils/storage';

function* createRoom(payload) {
  try {
    yield put(AppActions.loading(true));
    var newRoom = payload.newRoom;
    var promises = []; //empty array
    let images = payload.newRoom.images;
    if (images) {
      var imageNames = [];

      images.forEach((aImage) => {
        let uid = uuidv4();
        promises.push(uploadImageAsPromise(`studio/${uid}.jpeg`, aImage));
        imageNames.push(`${uid}.jpeg`);
      });
      newRoom.images = imageNames;
      newRoom.banner = imageNames[0];
    }
    yield Promise.all(promises).then((values) => {
      console.log(values);
      newRoom.imageUrls = values;
      newRoom.banner = values[0];
    });
    yield call(hitHouseApi.addRoom, newRoom);
    yield put(StudioActions.getStudios());
    yield put(AppActions.loading(false));
    yield call(popToTop);
    //  yield call(navigate, 'My Rooms');
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* updateRoom(payload) {
  try {
    yield put(AppActions.loading(true));
    var updatedRoom = payload.updatedRoom;
  console.log("came", payload.updatedRoom)

    const promises = []; //empty array
    var newsImagesArray = [];
    if (payload.updatedRoom.imagesModified) {
      let images = updatedRoom.images;
      var pattern = /^((http|https|ftp):\/\/)/;

      // DELETE
      let originalImages = payload.originalImages;
      var objToDelete = except(originalImages, images);
      objToDelete.forEach((aImage) => {
        if (pattern.test(aImage)) {
          promises.push(deleteImageAsPromise(aImage));
        }
      });
      console.log(objToDelete);

      // ADD
      var imageNames = [];
      images.forEach((url) => {
        if (!pattern.test(url)) {
          let uid = uuidv4();
          promises.push(uploadImageAsPromise(`studio/${uid}.jpeg`, url));
          imageNames.push(`${uid}.jpeg`);
        } else {
          if (objToDelete.indexOf(url) > -1) {
            //In the array!
          } else {
            //Not in the array
            newsImagesArray.push(url);
          }
        }
      });
      yield Promise.all(promises).then((values) => {
        console.log(values);
        updatedRoom.imageUrls = [
          ...newsImagesArray.filter((n) => n),
          ...values.filter((n) => n),
        ];
        updatedRoom.banner = updatedRoom.imageUrls[0];
      });
    }
    updatedRoom.imagesModified = false;
    updatedRoom.images = null;
    yield call(hitHouseApi.updateRoom, updatedRoom);
    yield put(StudioActions.getStudios());
    yield put(AppActions.loading(false));
    yield call(popToTop);
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

const except = (array, excluded) => {
  var check1 = array.filter(function (value) {
    return excluded.indexOf(value) == -1;
  });

  var check2 = excluded.filter(function (value) {
    return array.indexOf(value) == -1;
  });

  var output = check1.concat(check2);

  return output;
};

// function* updateRoom(payload) {
//   try {
//     yield put(AppActions.loading(true));
//     var updatedRoom = payload.updatedRoom;
//     const promises = []; //empty array
//     if (payload.updatedRoom.imagesModified) {
//       let images = updatedRoom.images;

//       // DELETE
//       let originalImages = payload.originalImages;
//       var deletedImages = [];
//       if (originalImages) {
//         originalImages.forEach((aImage) => {
//           var foundObj = images.find((x) => x.id === `studio/${aImage}`);
//           if (!foundObj) {
//             console.log(`studio/${aImage}`);
//             promises.push(deleteImageAsPromise(`studio/${aImage}`));
//             deletedImages.push(aImage);
//           }
//         });
//       }

//       // ADD
//       if (images) {
//         var imageNames = originalImages ? [...originalImages] : [];
//         if (originalImages && deletedImages.length > 0) {
//           imageNames = imageNames.filter((el) => {
//             return !deletedImages.includes(el);
//           });
//         }
//         images.forEach((aImage, index) => {
//           if (aImage.uri.toString().startsWith('file')) {
//             let uid = uuidv4();
//             promises.push(
//               uploadImageAsPromise(`studio/${uid}.jpeg`, aImage.uri),
//             );
//             imageNames.push(`${uid}.jpeg`);
//           }
//         });
//       }
//       updatedRoom.images = imageNames;
//       updatedRoom.banner = imageNames[0];
//     }
//     updateRoom.imagesModified = null;
//     yield Promise.all(promises);
//     yield call(hitHouseApi.updateRoom, updatedRoom);
//     yield put(StudioActions.getStudios());
//     yield put(AppActions.loading(false));
//     yield call(popToTop);
//   } catch (e) {
//     yield put(AppActions.loading(false));
//     yield put(AppActions.error(e));
//   }
// }

function* deleteRoom(payload) {
  try {
    const confirm = yield call(
      AlertApi.confirm,
      'Are you sure you want to delete Studio',
    );
    if (confirm) {
      yield put(AppActions.loading(true));
      // // GET ALL BOOKINGS FOR THIS STUDIO AND DELETE
      // yield put(MyBookingActions.getStudioBookings(payload.room.docId));
      // const {studioBookings} = yield select(booking);
      // studioBookings.forEach(aBooking => {
      //   yield put();
      //   Actions.deleteBooking(booking.selectedBooking, true, false)
      // })
      let images = payload.room.imageUrls;
      images.forEach((aImage) => {
        deleteImageAsPromise(aImage);
      });
      // TODO Delete any booking linked with this studio
      yield call(hitHouseApi.deleteRoom, payload.room.docId);
      yield put(StudioActions.getStudios());
      yield put(AppActions.loading(false));
    }
  } catch (error) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(error));
  }
}

export default [
  takeLatest(RoomTypes.CREATE_ROOM, createRoom),
  takeLatest(RoomTypes.UPDATE_ROOM, updateRoom),
  takeLatest(RoomTypes.DELETE_ROOM, deleteRoom),
];
