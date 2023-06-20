import {call, put, takeLatest, select} from 'redux-saga/effects';
import Actions, {FaqTypes, faq} from './reducer';
import AppActions, {app} from '../Root/reducer';
import {navigate, popToTop} from '../../utils/rNavigation';
import hitHouseApi from '../../services/hitHouseApi';
import AlertApi from '../../services/alert';
import {
  uploadImageAsPromise,
  uuidv4,
  deleteImageAsPromise,
  downloadImageFromFirebaseStorage,
  saveImageToFirebaseStorage,
} from '../../utils/storage';

function* getFAQS() {
  try {
    yield put(AppActions.loading(true));
    const faqs = yield call(hitHouseApi.getFAQs);
    yield put(Actions.setFAQS(faqs));
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* createFAQ(payload) {
  try {
    yield put(AppActions.loading(true));
    var newFaq = payload.newFaq;
    let images = payload.newFaq.images;
    let pdf = payload.newFaq.pdf;
    //upload Image
    var promisesImages = [];
    images.forEach((aImage) => {
      let uid = uuidv4();
      promisesImages.push(uploadImageAsPromise(`faq/${uid}.jpeg`, aImage.uri));
    });
    // Upload PDF
    var promisesPdf = [];
    pdf.forEach((pdf) => {
      let uid = uuidv4();
      promisesPdf.push(uploadImageAsPromise(`faq/${uid}.pdf`, pdf.uri));
    });
    yield Promise.all(promisesPdf).then((values) => {
      newFaq.pdf = values;
    });
    yield Promise.all(promisesImages).then((values) => {
      newFaq.images = values;
    });
    yield call(hitHouseApi.addFAQ, newFaq);
    yield put(AppActions.loading(false));
    yield call(popToTop);
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* deleteFAQ(payload) {
  try {
    const confirm = yield call(
      AlertApi.confirm,
      'Are you sure you want to delete FAQ.',
    );
    if (confirm) {
      yield put(AppActions.loading(true));
      let images = payload.faq.images;
      let pdf = payload.faq.pdf;

      const promises = []; //empty array
      if (images) {
        images.forEach((aImage) => {
          promises.push(deleteImageAsPromise(aImage));
        });
      }
      if (pdf) {
        pdf.forEach((aPdf) => {
          promises.push(deleteImageAsPromise(aPdf));
        });
      }
      yield Promise.all(promises);
      yield call(hitHouseApi.deleteFAQ, payload.faq.docId);
      yield getFAQS();
      yield put(AppActions.loading(false));
    }
  } catch (error) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(error));
  }
}

function* deleteChat(payload) {
  try {
    const confirm = yield call(
      AlertApi.confirm,
      'Are you sure you want to delete Chat.',
    );
    if (confirm) {
      yield put(AppActions.loading(true));
      yield call(hitHouseApi.deleteChat, payload.chat._id);
      yield put(AppActions.loading(false));
    }
  } catch (error) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(error));
  }
}

export default [
  takeLatest(FaqTypes.GET_FAQS, getFAQS),
  takeLatest(FaqTypes.CREATE_FAQ, createFAQ),
  takeLatest(FaqTypes.DELETE_FAQ, deleteFAQ),
  takeLatest(FaqTypes.DELETE_CHAT, deleteChat),
];
