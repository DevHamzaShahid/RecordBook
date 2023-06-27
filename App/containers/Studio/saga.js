import { call, put, takeLatest, select } from 'redux-saga/effects';
import Actions, { StudioTypes, studio } from './reducer';
import AppActions, { app } from '../Root/reducer';
import { navigate } from '../../utils/rNavigation';
import hitHouseApi from '../../services/hitHouseApi';
import FcmApi from '../../services/fcmApi';
import moment from 'moment';

function* getStudios() {
  try {
    yield put(AppActions.loading(true));
    yield call(FcmApi.requestUserPermission);
    const studios = yield call(hitHouseApi.getStudios);
    if (studios) {
      yield put(Actions.setStudios(studios));
      yield getStudiosByDate(moment().format('YYYY-MM-DD'));
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* getStudiosByDate() {
  try {
    yield put(AppActions.loading(true));
    const bookings = yield call(hitHouseApi.getBookings, null);
    // We have all the booking here
    if (bookings) {
      const bookingsForDate = bookings.filter((booking) =>
        moment().isSame(booking.date, 'day'),
      );

      const dateCollection = bookingsForDate.map((booking) => {
        return booking.studioId;
      });

      let fullyBookedStudioIds = [];
      let findDuplicates = (arr) =>
        arr.filter((item, index) => arr.indexOf(item) != index);
      findDuplicates(dateCollection).map((aStudio) => {
        fullyBookedStudioIds.push(aStudio);
      });
      yield put(Actions.setDatedStudios(fullyBookedStudioIds));
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

export default [
  takeLatest(StudioTypes.GET_STUDIOS, getStudios),
  takeLatest(StudioTypes.GET_STUDIOS_BY_DATE, getStudiosByDate),
];
