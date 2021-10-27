const functions = require('firebase-functions');
const firebase = require('firebase-admin');

let firebaseConfig = functions.config().firebase;
firebase.initializeApp(firebaseConfig);

const app = require('./graphql');
exports.app = functions.https.onRequest(app);