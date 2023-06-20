import {all} from 'redux-saga/effects';
import app from '../containers/Root/saga';
import profile from '../containers/Profile/saga';
import studio from '../containers/Studio/saga';
import booking from '../containers/MyBooking/saga';
import faq from '../containers/Support/saga';
import room from '../containers/AddRoom/saga';
import category from '../containers/Category/saga';

export default function* sagas() {
  yield all([
    ...app,
    ...profile,
    ...studio,
    ...booking,
    ...faq,
    ...room,
    ...category,
  ]);
}
