import {call, put, takeLatest, select} from 'redux-saga/effects';
import Actions, {AppTypes} from './reducer';
import ProfileAction, {selectUser} from '../Profile/reducer';
import {isEmailVerified} from '../../utils/auth';
import AlertApi from '../../services/alert';
import FcmApi from '../../services/fcmApi';
import {navigate, popToTop} from '../../utils/rNavigation';

function* error({payload}) {
  yield put(Actions.loading(false));
  if (payload) {
    yield put(Actions.showAlert(payload));
  } else {
    yield put(Actions.showAlert('Something went wrong'));
  }
}
function* startup() {
  const {auth, admin, registration_successful} = yield select(selectUser);
  if (auth) {
    yield put(ProfileAction.getAdmin());
    yield put(ProfileAction.getProfile());
    yield put(ProfileAction.getAllUsers());

    if (registration_successful) {
      // here both phone and email are verified
      let permission = yield call(FcmApi.checkPermission);
      if (permission) {
        let fcmToken = yield call(FcmApi.getToken);
        yield put(ProfileAction.updateFcmToken(fcmToken));
      }
      // yield call(navigate, 'Berbix');
      try {
        yield call(popToTop, null);
      } catch (e) {}
      yield call(navigate, admin ? 'AdminHomeTab' : 'HomeTab');
    } else {
      yield call(navigate, 'PhoneVerified');
    }
  } else {
    // user is either logout or app is just installed.
    yield call(navigate, 'HomeTab');
  }
}

function* alert({payload}) {
  yield call(AlertApi.alert, payload);
}

export default [
  takeLatest(AppTypes.STARTUP, startup),
  takeLatest(AppTypes.ERROR, error),
  takeLatest(AppTypes.SHOW_ALERT, alert),
];
