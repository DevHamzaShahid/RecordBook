import {call, put, takeLatest, select} from 'redux-saga/effects';
import Actions, {FaqTypes, faq} from './reducer';
import AppActions, {app} from '../Root/reducer';
import {navigate, popToTop} from '../../utils/rNavigation';
import hitHouseApi from '../../services/hitHouseApi';
import moment from 'moment';

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

export default [takeLatest(FaqTypes.GET_FAQS, getFAQS)];
