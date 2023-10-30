import React from 'react';
import { Provider } from 'react-redux';
import Root from './App/containers/Root';
import createStore from './App/stores/reducer';
import axios from 'axios';
import { useEffect } from 'react';
import { MAILCHIMP_APIKEY, addUserToMailchimp } from './App/utils/helper';

export default () => {
  const { store } = createStore();
  // useEffect(() => {
  //   const dataR = {
  //     email_address: 'eng.hamza97@gmail.com',
  //     status: 'subscribed',
  //     merge_fields: {
  //       FNAME: 'Hamza',
  //       LNAME: 'Shahid',
  //       PHONE: '+923106952906',
  //       ADDRESS: {
  //         addr1: 'address street j898 test',
  //         city: '.',
  //         state: '.',
  //         zip: '.',
  //         country: '.'
  //       }
  //     },
  //     tags: ['customer']
  //   };
  //     const listId = '6c9c0c76f1'; //audiance id is basically the listID
  //   (async () => {
  //     const apikey = MAILCHIMP_APIKEY
  //     try {
  //       const response = await axios.post(
  //         `https://us9.api.mailchimp.com/3.0/lists/${listId}/members`,
  //         dataR,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${apikey}`
  //           }
  //         }
  //       );
  //       console.log('User added to Mailchimp successfully:', response.data);
  //     } catch (error) {
  //       console.error('Error adding user to Mailchimp:', error.response.data);
  //     }
  //   })()
  // }, []);
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
