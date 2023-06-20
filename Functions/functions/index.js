const functions = require('firebase-functions');
var braintree = require('braintree');
var berbix = require('berbix');
const admin = require('firebase-admin');

// INIT WHEN WORKING FROM FIREBASE LIVE SERVER
// admin.initializeApp();

//INIT WHEN WORKING IN FIREBASE LOCAL SERVER
var serviceAccount = require('../hithouse-aae5e-firebase-adminsdk-auill-c215661b40.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hithouse-aae5e.firebaseio.com',
});
var gateway = new braintree.BraintreeGateway({
  // environment: braintree.Environment.Production,
  // merchantId: '5yzrkszxmkjk9fvq',
  // publicKey: 'tkpcgw9bpgvhfjzb',
  // privateKey: '857942a3abc8d74165cbfaa371db0f08',
  environment: braintree.Environment.Sandbox,
  merchantId: 'd635t542pq9qmx86',
  publicKey: 'tr399dr7qh3n8mwr',
  privateKey: '2aa0e6ca4ef6d309900bf02095065256',
});

var client = new berbix.Client({
  //secret_test_aZGrBN0z8rNAGjfLOH1Pcu7T1cRT42Ma
  //secret_live_SXfJDShoYXCCJswioEsO350lzhEw8rZs
  apiSecret: 'secret_test_aZGrBN0z8rNAGjfLOH1Pcu7T1cRT42Ma',
});

exports.getBerbixClientToken = functions.https.onCall(async (request, res) => {
  return await client.createTransaction({
    customerUid: request.uid,
    templateKey: 'tpk_Gnn0QmsAKqKlgPgukijZbYC6CE4TFLpU',
  });
});

exports.getBerbixTransaction = functions.https.onCall(async (request, res) => {
  refreshToken = request.refreshToken; // fetched from database
  // Load refresh token from database into a Token object
  const transactionTokens = berbix.Tokens.fromRefresh(refreshToken);
  const transactionData = await client.fetchTransaction(transactionTokens);
  return transactionData;
});

exports.getClientToken = functions.https.onCall(async (request, res) => {
  var customerId = null;
  if (!request.brainTreeCustomerId) {
    var response = await gateway.customer.create({
      firstName: request.first_name,
      lastName: request.last_name,
      email: request.email,
    });
    customerId = response.customer.id;
  } else {
    customerId = request.brainTreeCustomerId;
  }
  return new Promise((resolve, reject) => {
    gateway.clientToken.generate({customerId: customerId}, (err, result) => {
      if (err) {
        return reject(err);
      }
      var clientToken = result.clientToken;
      return resolve({token: clientToken, customerId: customerId});
    });
  });
});

exports.checkout = functions.https.onCall(async (req, res) => {
  let nonceFromTheClient = req.paymentMethodNonce;
  if (nonceFromTheClient) {
    let amount = req.amount;
    let transaction = gateway.transaction.sale({
      amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
        venmo: {
          profileId: '1953896702662410263',
        },
      },
    });
    let savingData = saveBooking(req.bookings);
    return await Promise.all([transaction, savingData]);
  } else {
    let savingData = saveBooking(req.bookings);
    return await Promise.all([savingData]);
  }
});

exports.sendNotifications = functions.https.onCall(async (req) => {
  const payload = {
    notification: {
      title: req.user_name,
      body: req.text
        ? req.text.length <= 100
          ? req.text
          : req.text.substring(0, 97) + '...'
        : '',
    },
  };
  return await admin.messaging().sendToDevice(req.tokens, payload);
});
exports.sendNotificationsToAll = functions.https.onCall(async (req) => {
  const message = {
    notification: {
      title: req.title,
      body: req.text
        ? req.text.length <= 100
          ? req.text
          : req.text.substring(0, 97) + '...'
        : '',
    },
    topic: 'updates_discounts',
  };
  return await admin.messaging().send(message);
});

exports.sendEmail = functions.https.onCall(async (mail) => {
  return await admin
    .firestore()
    .collection('mail')
    .add(mail)
    .then(() => console.log('Queued email for delivery!'));
});

function saveBooking(bookings) {
  var batch = admin.firestore().batch();
  console.log(bookings);

  bookings.forEach((doc) => {
    var docRef = admin.firestore().collection('Booking').doc(); //automatically generate unique id
    batch.set(docRef, doc);
  });
  return batch.commit();
}
