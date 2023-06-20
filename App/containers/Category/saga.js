import {call, put, takeLatest, select} from 'redux-saga/effects';
import Actions, {CategoryTypes, category} from './reducer';
import AppActions, {app} from '../Root/reducer';
import {navigate, popToTop} from '../../utils/rNavigation';
import hitHouseApi from '../../services/hitHouseApi';
import AlertApi from '../../services/alert';

function* getCategories() {
  try {
    yield put(AppActions.loading(true));
    const categories = yield call(hitHouseApi.getCategories);
    yield put(Actions.setCategories(categories));
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* createCategory(payload) {
  try {
    yield put(AppActions.loading(true));
    yield call(hitHouseApi.addCategory, payload.newCat);
    yield getCategories();
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* deleteCategory(payload) {
  try {
    const confirm = yield call(
      AlertApi.confirm,
      'Are you sure you want to delete category.',
    );
    if (confirm) {
      yield put(AppActions.loading(true));
      yield call(hitHouseApi.deleteCategory, payload.cat.docId);
      yield getCategories();
      yield put(AppActions.loading(false));
    }
  } catch (error) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(error));
  }
}

export default [
  takeLatest(CategoryTypes.GET_CATEGORIES, getCategories),
  takeLatest(CategoryTypes.CREATE_CATEGORY, createCategory),
  takeLatest(CategoryTypes.DELETE_CATEGORY, deleteCategory),
];
