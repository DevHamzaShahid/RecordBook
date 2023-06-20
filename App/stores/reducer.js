import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from './sagas';

const createStore = () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    app: require('../containers/Root/reducer').reducer,
    user: require('../containers/Profile/reducer').reducer,
    studio: require('../containers/Studio/reducer').reducer,
    booking: require('../containers/MyBooking/reducer').reducer,
    faq: require('../containers/Support/reducer').reducer,
    room: require('../containers/AddRoom/reducer').reducer,
    category: require('../containers/Category/reducer').reducer,
  });
  return configureStore(rootReducer, rootSaga);
};

// singleton
class Store {
  static instance;
  store;

  constructor() {
    if (Store.instance) {
      return Store.instance;
    }

    Store.instance = this;
    const {store} = createStore();
    this.store = store;

    return this;
  }
}

export default () => {
  const s = new Store();
  return {store: s.store};
};
