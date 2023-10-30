import React from 'react';
import { Provider } from 'react-redux';
import Root from './App/containers/Root';
import createStore from './App/stores/reducer';
import axios from 'axios';
import { useEffect } from 'react';
import { MAILCHIMP_APIKEY } from './App/utils/helper';

export default () => {
  const { store } = createStore();

 


  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
