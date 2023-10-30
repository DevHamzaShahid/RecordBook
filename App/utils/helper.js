export const isMidnightDealTime = () => {
  const currentTime = new Date();
  // const currentHour = currentTime.getHours();
  const currentHour = 1;
  // Check if current hour is between 0 (midnight) and 4 (4 AM)
  return currentHour >= 0 && currentHour < 5;
};

// export const MAILCHIMP_APIKEY = '3eb2e18f7b594928d5f0e84871243698-us14'
export const MAILCHIMP_APIKEY = "e8ab393392124e896d28432bb84bb061-us9"
// const listId = '461dafbc11'; //audiance id is basically the listID
// export const addUserToMailchimp = async (email, firstName, lastName, phone, address) => {
//   console.log("datatattaat",email,firstName,lastName,phone,address);
//   const data = {
//     email_address: email,
//     status: 'subscribed',
//     merge_fields: {
//       FNAME: firstName,
//       LNAME: lastName,
//       PHONE: phone,
//       ADDRESS: {
//         addr1: address,
//         city: '.',
//         state: '.',
//         zip: '.',
//         country: '.'
//       }
//     },
//     tags: ['customer']
//   };
//   const apikey = MAILCHIMP_APIKEY
//   try {
//     const response = await axios.post(
//       `https://us14.api.mailchimp.com/3.0/lists/${listId}/members`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${apikey}`
//         }
//       }
//     );
//     console.log('User added to Mailchimp successfully:', response.data);
//   } catch (error) {
//     console.error('Error adding user to Mailchimp:', error.response.data);
//   }
// };


