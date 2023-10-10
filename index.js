/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';





// import { initializeApp } from '@react-native-firebase/app'

// const firebaseConfig = {
//     apiKey: 'AIzaSyCk5Sef4T5Mq2YvB-YJfnCMzGcV_QdTpUQ', // Use the "api_key" value
//     authDomain: 'hithouse-aae5e.firebaseapp.com', // Use the "authDomain" value
//     projectId: 'hithouse-aae5e', // Use the "project_id" value
//     storageBucket: 'hithouse-aae5e.appspot.com', // Use the "storage_bucket" value
//     messagingSenderId: '567786899828', // Use the "messagingSenderId" value
//     appId: '1:567786899828:android:7d4f5db1212bf478608421', // Use the "mobilesdk_app_id" value
//   };
  


//   const firebaseConfig = {
//     projectId: 'hithouse-aae5e',
//     apiKey: 'AIzaSyCk5Sef4T5Mq2YvB-YJfnCMzGcV_QdTpUQ',
//   };
  
//   const app = initializeApp(firebaseConfig);

//   // Initialize Firebase with the configuration
//   initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
