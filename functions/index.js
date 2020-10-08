const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createStripeCustomer = functions.auth.user().onCreate(events => {
  // user auth data
  const user = event;


  // register Stripe user
  return stripe.customers.create({
    email: user.email,
  }).then(customer => {
    /// update database with stripe customer id
    const updates = {}
    updates[`/customers/${customer.id}`] = user.uid

    updates[`/users/${user.uid}/customerId`] = customer.id
    updates[`/users/${user.uid}/email`] = user.email


    return admin.database().ref().update(updates);
  });
})
