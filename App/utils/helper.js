export const isMidnightDealTime = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  // const currentHour = 1;
  // Check if current hour is between 0 (midnight) and 4 (4 AM)
  return currentHour >= 0 && currentHour < 5;
};

// export const MAILCHIMP_APIKEY = '3eb2e18f7b594928d5f0e84871243698-us14'
export const MAILCHIMP_APIKEY = "9199a0d8cb08da27602683742f0ab875-us14"
export const addUserToMailchimp = async (email_address, FNAME, LNAME, PHONE, addr1) => {
  const listId = '461dafbc11'; //audiance id is basically the listID
  const data = {
    email_address,
    status: 'subscribed',
    merge_fields: {
      FNAME,
      LNAME,
      PHONE,
      ADDRESS: {
        addr1,
        city: '.',
        state: '.',
        zip: '.',
        country: '.'
      }
    },
    tags: ['customer']
  };

  try {
    const response = await axios.post(
      `https://us14.api.mailchimp.com/3.0/lists/${listId}/members`,
      data,
      {
        headers: {
          Authorization: `Bearer ${MAILCHIMP_APIKEY}`
        }
      }
    );
    console.log('User added to Mailchimp successfully:', response.data);
  } catch (error) {
    console.error('Error adding user to Mailchimp:', error.response.data);
  }
};


