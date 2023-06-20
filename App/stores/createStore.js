import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reduxPersist from '../utils/reduxPersist';
import rehydration from '../services/rehydrationServices';

// creates the store
export default (rootReducer: any, rootSaga: any) => {
  const persistedReducer = persistReducer(
    reduxPersist.storeConfig,
    rootReducer,
  );

  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  // const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  middleware.push(sagaMiddleware);

  /* ------------- Redux Logger Middleware ------------- */

  middleware.push(logger);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));
  const store = createStore(persistedReducer, compose(...enhancers));

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  let persistor;

  // configure persistStore and check reducer version number
  if (reduxPersist.active) {
    persistor = rehydration.updateReducers(store);
  }

  return {store, persistor};
};
