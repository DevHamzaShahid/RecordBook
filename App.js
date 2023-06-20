import React from 'react';
import {Provider} from 'react-redux';
import Root from './App/containers/Root';
import createStore from './App/stores/reducer';

export default () => {
  const {store} = createStore();

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
