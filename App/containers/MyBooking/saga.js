import {call, put, takeLatest, select} from 'redux-saga/effects';
import Actions, {BookingTypes, booking} from './reducer';
import {selectUser} from '../Profile/reducer';
import AppActions, {app} from '../Root/reducer';
import {navigate, popToTop} from '../../utils/rNavigation';
import hitHouseApi from '../../services/hitHouseApi';
import AlertApi from '../../services/alert';
import moment from 'moment';

function* getBookings(payload) {
  try {
    yield put(AppActions.loading(true));
    const {uid} = yield select(selectUser);

    const bookings = yield call(hitHouseApi.getBookings, uid);
    const sectionData = [];

    const upcoming = bookings.filter(
      (aBooking) => moment(aBooking.date) > moment(),
    );
    if (upcoming.length > 0) {
      const upcomingResult = upcoming.map((el) => {
        const o = Object.assign({}, el);
        o.inPast = false;
        return o;
      });
      sectionData.push({
        title: 'List bookings',
        data: upcomingResult,
      });
    }
    const past = bookings.filter((aBooking) =>
      moment(aBooking.date).isBefore(),
    );

    if (past.length > 0) {
      const pastResult = past.map((el) => {
        const o = Object.assign({}, el);
        o.inPast = true;
        return o;
      });
      sectionData.push({
        title: 'Past bookings',
        data: pastResult,
      });
    }
    yield put(Actions.setMyBookings(sectionData));

    yield put(Actions.setBookings(bookings));
    if (payload && payload.navigateTo) {
      yield call(navigate, payload.navigateTo);
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    console.log('error', {e});
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* getBookingsForAdmin() {
  try {
    yield put(AppActions.loading(true));
    const bookings = yield call(hitHouseApi.getBookings, null);
    yield put(Actions.setBookings(bookings));
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* getStudioBookings(payload) {
  try {
    yield put(AppActions.loading(true));
    const bookings = yield call(
      hitHouseApi.getStudioBookings,
      payload.studioId,
    );
    yield put(Actions.setStudioBookings(bookings));
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* updateBooking(payload) {
  try {
    yield put(AppActions.loading(true));
    yield call(hitHouseApi.updateBooking, payload.booking);
    if (payload.isAdmin) {
      yield getBookingsForAdmin();
    } else {
      yield getBookings();
    }
    yield put(AppActions.loading(false));
    yield call(popToTop);
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* deleteBooking(payload) {
  try {
    const confirm = yield call(
      AlertApi.confirm,
      'Are you sure you want to delete booking',
    );
    if (confirm) {
      yield put(AppActions.loading(true));
      yield call(hitHouseApi.deleteBooking, payload.booking.docId);
      if (payload.isAdmin) {
        yield getBookingsForAdmin();
      } else {
        yield getBookings();
      }
      if (payload.goBack) {
        yield call(popToTop);
      }
      yield put(Actions.setBookingDeleted(true));
      yield put(AppActions.loading(false));
    }
  } catch (error) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(error));
  }
}

export default [
  takeLatest(BookingTypes.GET_BOOKINGS, getBookings),
  takeLatest(BookingTypes.UPDATE_BOOKING, updateBooking),
  takeLatest(BookingTypes.GET_STUDIO_BOOKINGS, getStudioBookings),
  takeLatest(BookingTypes.GET_BOOKINGS_FOR_ADMIN, getBookingsForAdmin),
  takeLatest(BookingTypes.DELETE_BOOKING, deleteBooking),
];
