// // import { View, Text, Button, TextInput } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import auth from '@react-native-firebase/auth';
// // import { firebase } from '@react-native-firebase/auth';
// // import { log } from 'react-native-reanimated';
// // export default function index() {
// //     // If null, no SMS has been sent
// //     const [confirm, setConfirm] = useState(null);

// //     // verification code (OTP - One-Time-Passcode)
// //     const [code, setCode] = useState('');

// //     // Handle login
// //     function onAuthStateChanged(user) {
// //         if (user) {
// //             console.log("Current user", user);
// //         }
// //     }

// //     useEffect(() => {
// //         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
// //         console.log("Subscriber", subscriber);
// //         return subscriber; // unsubscribe on unmount
// //     }, []);

// //     // Handle the button press
// //     async function signInWithPhoneNumber(phoneNumber) {
// //         try {
// //             const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
// //             console.log('OTP code sent successfully:', confirmation);
// //             setConfirm(confirmation)
// //         } catch (error) {
// //             console.error('Error sending OTP code:', error);
// //         }
// //     }
// //     async function confirmCode() {
// //         try {
// //             const resp = await confirm.confirm(code);
// //             alert(resp)
// //             console.log(resp);
// //         } catch (error) {
// //             console.log('Invalid code.');
// //         }
// //     }


// //     if (!confirm) {
// //         return (
// //             <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
// //                 <Button
// //                     title="Phone Number Sign In"
// //                     onPress={() => signInWithPhoneNumber('+923106952906')}
// //                 />
// //             </View>
// //         );
// //     }




// //     return (
// //         <View style={{ marginTop: 200 }}>
// //             <TextInput value={code} onChangeText={text => setCode(text)} />
// //             <Button title="Confirm Code" onPress={() => confirmCode()} />
// //         </View>
// //     );


// // }



// import axios from "axios";
// import { MAILCHIMP_APIKEY } from "../../utils/helper";
// import {Mailchimp} from '@mailchimp/mailchimp_marketing'
// const mailchimp=new Mailchimp(MAILCHIMP_APIKEY)
// // const mailchimp = require('@mailchimp/mailchimp_marketing');
// import { View, Text, TouchableOpacity } from 'react-native'
// import React from 'react'

// const index = () => {
//     // const addUserToMailchimp = async (email, firstName, lastName) => {
//     //     try {
//     //         var MAILCHIMP_API_KEY = MAILCHIMP_APIKEY;
//     //         var listId = '461dafbc11';
//     //         var url = `https://<dc>.api.mailchimp.com/3.0/lists/${listId}/members`;
//     //         var method = 'POST';
//     //         var headers = {
//     //             'Authorization': 'apikey ' + MAILCHIMP_API_KEY,
//     //             'Accept': 'application/json',
//     //             'Content-Type': 'application/json'
//     //         };
//     //         var body = JSON.stringify({
//     //             email_address: email,
//     //             status: 'subscribed',
//     //             'language': 'english',
//     //             merge_fields: { FNAME: firstName, LNAME: lastName }
//     //         });

//     //         const response = await fetch(url, {
//     //             method,
//     //             headers,
//     //             body
//     //         });

//     //         if (response.ok) {
//     //             const data = await response.json();
//     //             console.log('User added to Mailchimp:', data);
//     //             return data;
//     //         } else {
//     //             throw new Error('Error adding user to Mailchimp');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error adding user to Mailchimp:', error);
//     //         throw error;
//     //     }
//     // };


//     // const registerUser = async (email, firstName, lastName) => {
//     //     try {
//     //         // Your user registration logic here...

//     //         // After registering the user, add them to Mailchimp
//     //         await addUserToMailchimp(email, firstName, lastName);

//     //         // Continue with your app logic...
//     //     } catch (error) {
//     //         console.error('Error registering user:', error);
//     //     }
//     // };
//     // const registerUserMAilchimp = async(email) => {
//     //         await mailchimp.addSubscriber({ email });
//     // }
//     return (
//         <TouchableOpacity onPress={() => { registerUserMAilchimp('eng.hamza9w27@gmail.com') }} style={{ marginTop: 200, marginLeft: 100 }}>
//             <Text>index</Text>
//         </TouchableOpacity>
//     )
// }

// export default index
// // 'eng.hamza927@gmail.com', 'hamza1', 'shahid'


import { View, Text } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index